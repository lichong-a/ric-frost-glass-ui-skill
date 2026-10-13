#!/usr/bin/env node
// Static identity / source / lazy-edge coverage. This does not execute demos.
import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import ts from 'typescript';
import { loadComponentDirectory, componentMetadataFor, demoPathFor, categoryCountsFor, recursiveFiles, validateDirectorySources } from './component-directory.mjs';

const root = path.resolve(fileURLToPath(new URL('../', import.meta.url)));
const relative = filename => path.relative(root, filename).split(path.sep).join('/');
const read = filename => readFile(path.join(root, filename), 'utf8');
const manifest = JSON.parse(await read('catalog/upstream-manifest.json'));
const expected = manifest.components;
if (!Array.isArray(expected) || !expected.length) throw new Error('Official manifest has no component identities.');
const businessManifest = JSON.parse(await read('catalog/business-catalog.json'));
const business = businessManifest.components;
const directory = await loadComponentDirectory(root);
validateDirectorySources(directory, expected, business);
const issues = [];
const pending = [];
const issue = (scope, code, detail) => issues.push({ scope, code, detail });
const slugs = expected.map(entry => entry.slug);
const bySlug = new Map(expected.map(entry => [entry.slug, entry]));
if (new Set(slugs).size !== slugs.length) issue('manifest', 'duplicate-slugs', 'Component slugs must be unique.');
if (manifest.total !== expected.length) issue('manifest', 'total-mismatch', `total=${manifest.total}; components=${expected.length}`);
if (expected.length !== 215 || new Set(slugs).size !== 215 || manifest.total !== 215) issue('manifest', 'invalid-frozen-catalog', 'The frozen official catalog must retain exactly 215 unique source identities.');
if (business.length !== 88 || new Set(business.map(entry => entry.id)).size !== 88 || businessManifest.total !== 88) issue('business-manifest', 'invalid-business-catalog', 'The business catalog must retain exactly 88 unique source identities.');
if (directory.total !== 303 || directory.categories.length !== 13) issue('functional-directory', 'invalid-taxonomy-total', 'The functional taxonomy must contain 303 unique identities and 13 categories.');
const categoryCounts = {};
for (const component of expected) categoryCounts[component.category] = (categoryCounts[component.category] || 0) + 1;
for (const [category, count] of Object.entries(manifest.counts || {})) {
  if (categoryCounts[category] !== count) issue('manifest', 'category-count-mismatch', `${category}: recorded=${count}; actual=${categoryCounts[category] || 0}`);
}

function parse(name, code, kind = ts.ScriptKind.TSX) {
  const source = ts.createSourceFile(name, code, ts.ScriptTarget.Latest, true, kind);
  for (const diagnostic of source.parseDiagnostics) {
    issue(name, 'syntax-error', ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
  }
  return source;
}
function visit(source, fn) {
  function walk(node) { fn(node); ts.forEachChild(node, walk); }
  walk(source);
}
const stringValue = node => node && (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) ? node.text : null;
const propertyName = node => ts.isIdentifier(node) || ts.isStringLiteral(node) || ts.isNumericLiteral(node) ? node.text : null;
const withoutExtension = filename => filename.replace(/\.(?:tsx?|jsx?)$/, '');
const resolveModule = (from, specifier) => withoutExtension(path.resolve(path.dirname(from), specifier));

const fileNames = (await recursiveFiles(path.join(root, 'src/demos'), filename => /\.tsx?$/.test(filename))).map(relative);
for (const name of fileNames) {
  const slug = path.posix.basename(name).replace(/\.tsx?$/, '');
  if (!bySlug.has(slug)) issue(name, 'extra-demo', 'Demo file is absent from the official manifest.');
  else if (name !== demoPathFor(directory, slug)) issue(name, 'wrong-functional-directory', `Expected ${demoPathFor(directory, slug)}`);
  if (!name.endsWith('.tsx')) issue(name, 'unexpected-demo-extension', 'Each registered demonstration must have its own .tsx entry.');
}

const details = [];
for (const entry of expected) {
  const metadata = componentMetadataFor(directory, entry.slug);
  const demoPath = demoPathFor(directory, entry.slug);
  const files = entry.files.map(file => typeof file === 'string' ? file : file.path);
  const primary = files.find(file => file.endsWith(`/${entry.id}.tsx`)) || files.find(file => file.endsWith('.tsx'));
  const sourcePath = primary ? `.upstream/${primary}` : null;
  const detail = { slug: entry.slug, name: metadata.name, sourceName: entry.name, category: metadata.category, sourceCategory: entry.category, demoPath, expectedSourcePath: sourcePath, demoExists: false, defaultExport: false, officialImports: [], rendersOfficialBinding: false, lazyImport: false, catalogEntry: false, documentation: 'pending' };
  details.push(detail);
  if (!primary) issue(entry.slug, 'manifest-primary-source-missing', 'No official TSX implementation is recorded.');
  let code;
  try { code = await read(demoPath); detail.demoExists = true; }
  catch (error) { if (error.code !== 'ENOENT') throw error; issue(entry.slug, 'missing-demo', demoPath); continue; }
  if (!code.trim()) { issue(entry.slug, 'empty-demo', demoPath); continue; }
  const absoluteDemo = path.join(root, demoPath);
  const source = parse(demoPath, code);
  const bindings = new Set();
  const officialImports = [];
  visit(source, node => {
    if (ts.isImportDeclaration(node)) {
      const specifier = stringValue(node.moduleSpecifier);
      if (!specifier || node.importClause?.isTypeOnly) return;
      if (specifier.includes('.upstream/')) {
        const resolved = resolveModule(absoluteDemo, specifier);
        if (specifier.endsWith('.css')) {
          const cssPath = relative(path.resolve(path.dirname(absoluteDemo), specifier));
          if (!files.some(file => `.upstream/${file}` === cssPath)) issue(entry.slug, 'foreign-official-style', cssPath);
          return;
        }
        officialImports.push(relative(resolved));
        if (sourcePath && resolved === withoutExtension(path.join(root, sourcePath))) {
          const clause = node.importClause;
          if (clause?.name) bindings.add(clause.name.text);
          if (clause?.namedBindings && ts.isNamespaceImport(clause.namedBindings)) bindings.add(`${clause.namedBindings.name.text}.`);
          if (clause?.namedBindings && ts.isNamedImports(clause.namedBindings)) {
            for (const element of clause.namedBindings.elements) {
              // Named auxiliary exports alone must not make a wrapper pass.
              const exported = element.propertyName?.text || element.name.text;
              if (!element.isTypeOnly && (exported === entry.id || exported === 'default')) bindings.add(element.name.text);
            }
          }
        }
      }
    }
    if (ts.isExportAssignment(node) && !node.isExportEquals) detail.defaultExport = true;
    if (node.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.DefaultKeyword)) detail.defaultExport = true;
    if (ts.isExportDeclaration(node) && node.exportClause && ts.isNamedExports(node.exportClause) && node.exportClause.elements.some(element => element.name.text === 'default')) detail.defaultExport = true;
  });
  detail.officialImports = [...new Set(officialImports)];
  if (detail.officialImports.length !== 1 || (sourcePath && detail.officialImports[0] !== withoutExtension(sourcePath))) {
    issue(entry.slug, 'official-import-mismatch', `Expected only ${sourcePath}; found ${detail.officialImports.join(', ') || 'none'}`);
  }
  if (!detail.defaultExport) issue(entry.slug, 'missing-default-export', 'The lazy-loaded demo needs a default component export.');
  visit(source, node => {
    if (ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) {
      const tag = node.tagName.getText(source);
      if ([...bindings].some(binding => binding.endsWith('.') ? tag.startsWith(binding) : tag === binding)) detail.rendersOfficialBinding = true;
    }
    if (ts.isCallExpression(node) && /^(React\.)?createElement$/.test(node.expression.getText(source)) && node.arguments[0]) {
      if (bindings.has(node.arguments[0].getText(source))) detail.rendersOfficialBinding = true;
    }
  });
  if (!detail.rendersOfficialBinding) issue(entry.slug, 'no-official-component-render', 'The wrapper must render its imported official component, not only import it or display a placeholder.');
}

let lazyEdges = [];
const loaderPath = 'src/demo-loaders.ts';
try {
  const source = parse(loaderPath, await read(loaderPath), ts.ScriptKind.TS);
  let table;
  visit(source, node => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === 'loaders' && node.initializer && ts.isObjectLiteralExpression(node.initializer)) table = node.initializer;
    if (ts.isImportDeclaration(node) && !node.importClause?.isTypeOnly) {
      const specifier = stringValue(node.moduleSpecifier);
      if (specifier?.includes('/demos/') || specifier?.includes('.upstream/')) issue(loaderPath, 'eager-component-import', specifier);
    }
  });
  if (!table) issue(loaderPath, 'missing-lazy-table', 'Expected an explicit loaders object.');
  for (const property of table?.properties || []) {
    if (!ts.isPropertyAssignment(property)) { issue(loaderPath, 'non-explicit-lazy-entry', property.getText(source)); continue; }
    const slug = propertyName(property.name);
    const initializer = property.initializer;
    const imports = [];
    if (ts.isArrowFunction(initializer) || ts.isFunctionExpression(initializer)) {
      visit(initializer.body, node => {
        if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) imports.push(stringValue(node.arguments[0]));
      });
    }
    const edge = { slug, imports };
    lazyEdges.push(edge);
    if (!bySlug.has(slug)) { issue(loaderPath, 'extra-lazy-entry', String(slug)); continue; }
    const expectedDemo = withoutExtension(path.join(root, demoPathFor(directory, slug)));
    if (imports.length !== 1 || !imports[0] || resolveModule(path.join(root, loaderPath), imports[0]) !== expectedDemo) {
      issue(slug, 'lazy-import-mismatch', `Expected one delayed import of ${demoPathFor(directory, slug)}; found ${JSON.stringify(imports)}`);
      continue;
    }
    details.find(detail => detail.slug === slug).lazyImport = true;
  }
} catch (error) { if (error.code !== 'ENOENT') throw error; issue(loaderPath, 'missing-loader-file', loaderPath); }
if (new Set(lazyEdges.map(edge => edge.slug)).size !== lazyEdges.length) issue(loaderPath, 'duplicate-lazy-entries', 'A component must have one unique lazy edge.');
for (const detail of details) if (!detail.lazyImport) issue(detail.slug, 'missing-valid-lazy-import', loaderPath);

const catalogPath = 'src/catalog.ts';
let galleryEntries = [];
let galleryCategories = [];
const literalData = node => {
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(literalData);
  if (ts.isObjectLiteralExpression(node)) return Object.fromEntries(node.properties.filter(ts.isPropertyAssignment).map(property => [propertyName(property.name), literalData(property.initializer)]));
  if (ts.isNumericLiteral(node)) return Number(node.text);
  return stringValue(node);
};
try {
  const source = parse(catalogPath, await read(catalogPath), ts.ScriptKind.TS);
  visit(source, node => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === 'entries' && node.initializer && ts.isArrayLiteralExpression(node.initializer)) {
      galleryEntries = node.initializer.elements.map(literalData);
    }
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === 'categories' && node.initializer && ts.isArrayLiteralExpression(node.initializer)) galleryCategories = node.initializer.elements.map(literalData);
  });
  if (new Set(galleryEntries.map(entry => entry.id)).size !== galleryEntries.length) issue(catalogPath, 'duplicate-gallery-entries', 'Gallery identities must be unique.');
  for (const entry of galleryEntries) {
    const expectedEntry = bySlug.get(entry.id);
    if (!expectedEntry) { issue(catalogPath, 'extra-gallery-entry', String(entry.id)); continue; }
    const detail = details.find(item => item.slug === entry.id);
    const metadata = componentMetadataFor(directory, entry.id);
    if (entry.name !== metadata.name || entry.sourceName !== expectedEntry.name || entry.exportName !== expectedEntry.id || entry.category !== metadata.category || entry.sourceCategory !== expectedEntry.category || entry.provider !== metadata.provider || JSON.stringify(entry.tags) !== JSON.stringify(metadata.tags) || entry.demoPath !== detail.demoPath || entry.sourcePath !== detail.expectedSourcePath) {
      issue(entry.id, 'gallery-metadata-mismatch', 'Source identity/export/path differs from the frozen manifest, or functional metadata differs from the single category map.');
    } else detail.catalogEntry = true;
  }
} catch (error) { if (error.code !== 'ENOENT') throw error; issue(catalogPath, 'missing-gallery-catalog', catalogPath); }
for (const detail of details) if (!detail.catalogEntry) issue(detail.slug, 'missing-valid-gallery-entry', catalogPath);
function checkCategoryTable(filename, table, ids) {
  const expectedCategories = categoryCountsFor(directory, ids).map(({ id, name, count }) => ({ id, name, count }));
  const actualCategories = table.map(({ id, name, count }) => ({ id, name, count }));
  if (JSON.stringify(actualCategories) !== JSON.stringify(expectedCategories)) issue(filename, 'functional-category-count-mismatch', 'Category identities, names, ordering and subset counts must match catalog/use-categories.json.');
}
checkCategoryTable(catalogPath, galleryCategories, slugs);

let intentCount = 0;
try {
  const intents = JSON.parse(await read('catalog/intent-metadata.json'));
  intentCount = Object.keys(intents).length;
  for (const slug of Object.keys(intents)) if (!bySlug.has(slug)) issue(slug, 'extra-chinese-intent', 'Alias entry has no manifest component.');
  for (const slug of slugs) {
    if (!Array.isArray(intents[slug]?.aliases) || !intents[slug].aliases.some(value => typeof value === 'string' && /[\u3400-\u9fff]/.test(value))) issue(slug, 'missing-chinese-intent', 'Each component needs a Chinese search alias.');
  }
} catch (error) { if (error.code !== 'ENOENT') throw error; issue('catalog', 'missing-chinese-index', 'catalog/intent-metadata.json'); }

const docsDirectory = 'docs/components';
let docsNames = [];
try { docsNames = (await readdir(path.join(root, docsDirectory))).filter(name => name.endsWith('.md')); }
catch (error) { if (error.code !== 'ENOENT') throw error; }
for (const name of docsNames) if (!bySlug.has(name.slice(0, -3))) issue(`${docsDirectory}/${name}`, 'extra-component-doc', 'Document has no manifest component.');
for (const detail of details) {
  const filename = `${docsDirectory}/${detail.slug}.md`;
  let doc;
  try { doc = await read(filename); }
  catch (error) { if (error.code !== 'ENOENT') throw error; pending.push({ scope: detail.slug, code: 'documentation-not-generated', path: filename }); continue; }
  const hasName = doc.startsWith(`# ${detail.name}\n`);
  const hasSource = detail.expectedSourcePath && doc.includes(detail.expectedSourcePath);
  const hasDemo = doc.includes(detail.demoPath);
  const hasUsage = /```tsx\s*\n[\s\S]+?```/.test(doc);
  if (!hasName || !hasSource || !hasDemo || !hasUsage) {
    detail.documentation = 'incomplete';
    pending.push({ scope: detail.slug, code: 'documentation-needs-regeneration', path: filename, hasName, hasSource: !!hasSource, hasDemo, hasUsage });
  } else detail.documentation = 'present-with-example';
}

// Business entries have their own implementations, not official React Bits
// imports. Check their actual TSX, rendered controls, identity, lazy edge and
// guide separately; the frozen-source checks above remain mandatory.
const businessById = new Map(business.map(entry => [entry.id, entry]));
const businessDemoFiles = (await recursiveFiles(path.join(root, 'src/business/demos'), filename => /\.tsx?$/.test(filename))).map(relative);
for (const filename of businessDemoFiles) {
  const id = path.posix.basename(filename).replace(/\.tsx?$/, '');
  if (!businessById.has(id)) issue(filename, 'extra-business-demo', 'Business demo file has no catalog identity.');
  else if (filename !== demoPathFor(directory, id)) issue(filename, 'wrong-functional-directory', `Expected ${demoPathFor(directory, id)}`);
  if (!filename.endsWith('.tsx')) issue(filename, 'unexpected-demo-extension', 'Each business demonstration must have its own .tsx entry.');
}
const businessDetails = [];
for (const entry of business) {
  const metadata = componentMetadataFor(directory, entry.id);
  const demoPath = demoPathFor(directory, entry.id);
  const detail = { id: entry.id, name: metadata.name, category: metadata.category, sourceCategory: metadata.sourceCategory, demoPath, demoExists: false, defaultExport: false, rendersControl: false, lazyImport: false, catalogEntry: false, documentation: 'pending' };
  businessDetails.push(detail);
  if (entry.name !== metadata.name || entry.category !== metadata.category || entry.sourceCategory !== metadata.sourceCategory || entry.sourceName !== metadata.sourceName || entry.provider !== metadata.provider || JSON.stringify(entry.tags) !== JSON.stringify(metadata.tags) || entry.demoPath !== demoPath || entry.sourcePath !== demoPath) issue(entry.id, 'business-manifest-metadata-mismatch', 'Business metadata and actual demo/source paths must match the functional category map.');
  let code;
  try { code = await read(demoPath); detail.demoExists = true; }
  catch (error) { if (error.code !== 'ENOENT') throw error; issue(entry.id, 'missing-business-demo', demoPath); continue; }
  if (!code.trim()) { issue(entry.id, 'empty-business-demo', demoPath); continue; }
  const source = parse(demoPath, code);
  const controls = new Set();
  visit(source, node => {
    if (ts.isImportDeclaration(node) && !node.importClause?.isTypeOnly) {
      const specifier = stringValue(node.moduleSpecifier);
      if (specifier?.startsWith('.')) {
        const resolved = resolveModule(path.join(root, demoPath), specifier);
        if (resolved.startsWith(path.join(root, 'src/business') + path.sep)) {
          if (node.importClause?.name) controls.add(node.importClause.name.text);
          if (node.importClause?.namedBindings && ts.isNamedImports(node.importClause.namedBindings)) {
            for (const element of node.importClause.namedBindings.elements) if (!element.isTypeOnly && element.name.text !== 'BusinessDemo') controls.add(element.name.text);
          }
        }
      }
    }
    if ((ts.isExportAssignment(node) && !node.isExportEquals) || node.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.DefaultKeyword)) detail.defaultExport = true;
    if (ts.isExportDeclaration(node) && node.exportClause && ts.isNamedExports(node.exportClause) && node.exportClause.elements.some(element => element.name.text === 'default')) detail.defaultExport = true;
  });
  visit(source, node => {
    if (ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) {
      const tag = node.tagName.getText(source);
      if (controls.has(tag) || /^(?:input|select|textarea|button|dialog|table|progress|meter|fieldset|nav)$/.test(tag)) detail.rendersControl = true;
      const attributes = new Map(node.attributes.properties.filter(ts.isJsxAttribute).map(attribute => [attribute.name.getText(source), attribute.initializer]));
      // A splitter is a semantic separator with a real keyboard/pointer path,
      // not a decorative div. Require its accessible range and both handlers.
      if (tag === 'div' && stringValue(attributes.get('role')) === 'separator'
        && ['aria-valuenow', 'aria-valuemin', 'aria-valuemax', 'tabIndex', 'onKeyDown', 'onPointerDown', 'onPointerMove'].every(name => attributes.has(name))) detail.rendersControl = true;
    }
  });
  if (!detail.defaultExport) issue(entry.id, 'missing-business-default-export', 'The business lazy entry needs a default component export.');
  if (!detail.rendersControl) issue(entry.id, 'missing-business-control-render', 'The demo must render an owned business capability or semantic interactive control.');
}

const businessLoaderPath = 'src/business/demo-loaders.generated.ts';
const businessLazyEdges = [];
try {
  const source = parse(businessLoaderPath, await read(businessLoaderPath), ts.ScriptKind.TS);
  let table;
  visit(source, node => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === 'loaders' && node.initializer && ts.isObjectLiteralExpression(node.initializer)) table = node.initializer;
    if (ts.isImportDeclaration(node) && !node.importClause?.isTypeOnly) {
      const specifier = stringValue(node.moduleSpecifier);
      if (specifier?.includes('/demos/') || specifier?.includes('/components/') || specifier?.includes('.upstream/')) issue(businessLoaderPath, 'eager-component-import', specifier);
    }
  });
  if (!table) issue(businessLoaderPath, 'missing-lazy-table', 'Expected an explicit loaders object.');
  for (const property of table?.properties || []) {
    if (!ts.isPropertyAssignment(property)) { issue(businessLoaderPath, 'non-explicit-lazy-entry', property.getText(source)); continue; }
    const id = propertyName(property.name);
    const imports = [];
    if (ts.isArrowFunction(property.initializer) || ts.isFunctionExpression(property.initializer)) {
      visit(property.initializer.body, node => { if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) imports.push(stringValue(node.arguments[0])); });
    }
    businessLazyEdges.push({ id, imports });
    if (!businessById.has(id)) { issue(businessLoaderPath, 'extra-lazy-entry', String(id)); continue; }
    if (imports.length !== 1 || !imports[0] || resolveModule(path.join(root, businessLoaderPath), imports[0]) !== withoutExtension(path.join(root, demoPathFor(directory, id)))) issue(id, 'lazy-import-mismatch', `Expected one delayed import of ${demoPathFor(directory, id)}; found ${JSON.stringify(imports)}`);
    else businessDetails.find(detail => detail.id === id).lazyImport = true;
  }
} catch (error) { if (error.code !== 'ENOENT') throw error; issue(businessLoaderPath, 'missing-loader-file', businessLoaderPath); }
if (new Set(businessLazyEdges.map(edge => edge.id)).size !== businessLazyEdges.length) issue(businessLoaderPath, 'duplicate-lazy-entries', 'A business capability must have one unique lazy edge.');
for (const detail of businessDetails) if (!detail.lazyImport) issue(detail.id, 'missing-valid-lazy-import', businessLoaderPath);

const businessCatalogPath = 'src/business/catalog.generated.ts';
let businessGalleryEntries = [];
let businessCategories = [];
try {
  const source = parse(businessCatalogPath, await read(businessCatalogPath), ts.ScriptKind.TS);
  visit(source, node => {
    if (!ts.isVariableDeclaration(node) || !ts.isIdentifier(node.name) || !node.initializer || !ts.isArrayLiteralExpression(node.initializer)) return;
    if (node.name.text === 'entries') businessGalleryEntries = node.initializer.elements.map(literalData);
    if (node.name.text === 'categories') businessCategories = node.initializer.elements.map(literalData);
  });
  if (new Set(businessGalleryEntries.map(entry => entry.id)).size !== businessGalleryEntries.length) issue(businessCatalogPath, 'duplicate-gallery-entries', 'Business gallery identities must be unique.');
  for (const entry of businessGalleryEntries) {
    const manifestEntry = businessById.get(entry.id);
    if (!manifestEntry) { issue(businessCatalogPath, 'extra-gallery-entry', String(entry.id)); continue; }
    const metadata = componentMetadataFor(directory, entry.id);
    if (entry.name !== metadata.name || entry.sourceName !== metadata.sourceName || entry.exportName !== metadata.sourceName || entry.category !== metadata.category || entry.sourceCategory !== metadata.sourceCategory || entry.provider !== metadata.provider || JSON.stringify(entry.tags) !== JSON.stringify(metadata.tags) || entry.demoPath !== demoPathFor(directory, entry.id) || entry.sourcePath !== demoPathFor(directory, entry.id) || entry.guidePath !== manifestEntry.guidePath) issue(entry.id, 'business-gallery-metadata-mismatch', 'Business gallery identity, source/demo paths, guide or functional metadata differ from their catalogs.');
    else businessDetails.find(detail => detail.id === entry.id).catalogEntry = true;
  }
} catch (error) { if (error.code !== 'ENOENT') throw error; issue(businessCatalogPath, 'missing-gallery-catalog', businessCatalogPath); }
checkCategoryTable(businessCatalogPath, businessCategories, business.map(entry => entry.id));
for (const detail of businessDetails) if (!detail.catalogEntry) issue(detail.id, 'missing-valid-gallery-entry', businessCatalogPath);
for (const entry of business) {
  const detail = businessDetails.find(item => item.id === entry.id);
  let doc;
  try { doc = await read(entry.guidePath); }
  catch (error) { if (error.code !== 'ENOENT') throw error; pending.push({ scope: entry.id, code: 'documentation-not-generated', path: entry.guidePath }); continue; }
  const hasName = doc.startsWith(`# ${detail.name}\n`);
  const hasDemo = doc.includes(detail.demoPath);
  const hasUsage = /```tsx\s*\n[\s\S]+?```/.test(doc);
  if (!hasName || !hasDemo || !hasUsage) {
    detail.documentation = 'incomplete';
    pending.push({ scope: entry.id, code: 'documentation-needs-regeneration', path: entry.guidePath, hasName, hasDemo, hasUsage });
  } else detail.documentation = 'present-with-example';
}

// Own styles must reference the design-system token API or an explicitly declared
// local --aw property. Official cached CSS is intentionally not scanned here.
async function ownCssFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await ownCssFiles(filename));
    else if (entry.isFile() && entry.name.endsWith('.css')) files.push(filename);
  }
  return files;
}
const cssFiles = await ownCssFiles(path.join(root, 'src'));
const tokenFiles = [path.resolve(root, '../tokens.css'), path.resolve(root, '../theme.css')];
const declaredTokens = new Set();
const cssContents = new Map();
for (const filename of [...tokenFiles, ...cssFiles]) {
  try {
    const code = await readFile(filename, 'utf8');
    cssContents.set(filename, code);
    for (const match of code.matchAll(/(--aw-[a-zA-Z0-9-]+)\s*:/g)) declaredTokens.add(match[1]);
  } catch (error) { if (error.code !== 'ENOENT') throw error; issue(relative(filename), 'missing-token-foundation', 'The generated token and theme files must be present.'); }
}
const styleReferences = cssFiles.map(filename => {
  const references = [...new Set([...(cssContents.get(filename) || '').matchAll(/var\(\s*(--aw-[a-zA-Z0-9-]+)/g)].map(match => match[1]))];
  const unknown = references.filter(name => !declaredTokens.has(name));
  for (const name of unknown) issue(relative(filename), 'unknown-design-token', name);
  return { path: relative(filename), references, unknown };
});

const report = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  scope: 'Static coverage of manifest identities, actual wrapper imports/render references, lazy edges, metadata and generated documentation. No browser rendering or user interaction is executed.',
  sourceCommit: manifest.sources?.commit,
  status: issues.length ? 'failed' : pending.length ? 'pending-documentation' : 'passed',
  counts: {
    manifest: expected.length, manifestDeclared: manifest.total, categories: categoryCounts,
    totalComponents: directory.total,
    functionalCategories: Object.fromEntries(categoryCountsFor(directory).map(category => [category.id, category.count])),
    demoFiles: fileNames.length, existingExpectedDemos: details.filter(detail => detail.demoExists).length,
    officialRenderReferences: details.filter(detail => detail.rendersOfficialBinding).length,
    lazyEntries: lazyEdges.length, validLazyEntries: details.filter(detail => detail.lazyImport).length,
    galleryEntries: galleryEntries.length, validGalleryEntries: details.filter(detail => detail.catalogEntry).length,
    chineseIntentEntries: intentCount,
    businessManifest: business.length, businessDemoFiles: businessDemoFiles.length,
    existingBusinessDemos: businessDetails.filter(detail => detail.demoExists).length,
    businessControlRenderReferences: businessDetails.filter(detail => detail.rendersControl).length,
    businessLazyEntries: businessLazyEdges.length, validBusinessLazyEntries: businessDetails.filter(detail => detail.lazyImport).length,
    businessGalleryEntries: businessGalleryEntries.length, validBusinessGalleryEntries: businessDetails.filter(detail => detail.catalogEntry).length,
    completeBusinessDocumentation: businessDetails.filter(detail => detail.documentation === 'present-with-example').length,
    documentationFiles: docsNames.length, completeDocumentation: details.filter(detail => detail.documentation === 'present-with-example').length,
    ownCssFiles: cssFiles.length,
    designTokenReferences: new Set(styleReferences.flatMap(file => file.references)).size,
    unknownDesignTokenReferences: new Set(styleReferences.flatMap(file => file.unknown)).size,
    issues: issues.length, pendingDocumentation: pending.length,
  },
  paths: { manifest: 'catalog/upstream-manifest.json', directory: 'catalog/use-categories.json', demos: 'src/demos', lazyImports: loaderPath, gallery: catalogPath, docs: docsDirectory, chineseIntent: 'catalog/intent-metadata.json', businessManifest: 'catalog/business-catalog.json', businessDemos: 'src/business/demos', businessLazyImports: businessLoaderPath, businessGallery: businessCatalogPath },
  issues, pendingDocumentation: pending, styleReferences, details, businessDetails,
};
await mkdir(path.join(root, 'catalog'), { recursive: true });
await writeFile(path.join(root, 'catalog/coverage-report.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(`${report.status.toUpperCase()}: ${expected.length} catalog components; ${report.counts.existingExpectedDemos} wrappers; ${report.counts.officialRenderReferences} official render references; ${report.counts.validLazyEntries} lazy entries; ${report.counts.completeDocumentation} component docs with actual examples.`);
console.log(`Business coverage: ${report.counts.existingBusinessDemos}/${business.length} real demos; ${report.counts.validBusinessLazyEntries}/${business.length} lazy entries; ${report.counts.validBusinessGalleryEntries}/${business.length} metadata entries; ${report.counts.completeBusinessDocumentation}/${business.length} guides. Unified functional directory: ${directory.total} identities in ${directory.categories.length} categories.`);
console.log('Report: catalog/coverage-report.json. This is static coverage, not a browser or interaction acceptance result.');
for (const failure of issues.slice(0, 10)) console.error(`${failure.scope}: ${failure.code} — ${failure.detail}`);
if (issues.length > 10) console.error(`... ${issues.length - 10} further issues are in the report.`);
if (pending.length) console.log(`${pending.length} component documents are pending generation or need real example snippets; they are not counted as passed.`);
process.exitCode = issues.length ? 1 : pending.length ? 2 : 0;
