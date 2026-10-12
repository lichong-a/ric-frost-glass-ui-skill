#!/usr/bin/env node
// Static identity / source / lazy-edge coverage. This does not execute demos.
import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import ts from 'typescript';

const root = path.resolve(fileURLToPath(new URL('../', import.meta.url)));
const relative = filename => path.relative(root, filename).split(path.sep).join('/');
const read = filename => readFile(path.join(root, filename), 'utf8');
const manifest = JSON.parse(await read('catalog/upstream-manifest.json'));
const expected = manifest.components;
if (!Array.isArray(expected) || !expected.length) throw new Error('Official manifest has no component identities.');
const issues = [];
const pending = [];
const issue = (scope, code, detail) => issues.push({ scope, code, detail });
const slugs = expected.map(entry => entry.slug);
const bySlug = new Map(expected.map(entry => [entry.slug, entry]));
if (new Set(slugs).size !== slugs.length) issue('manifest', 'duplicate-slugs', 'Component slugs must be unique.');
if (manifest.total !== expected.length) issue('manifest', 'total-mismatch', `total=${manifest.total}; components=${expected.length}`);
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

let fileNames = [];
try { fileNames = (await readdir(path.join(root, 'src/demos'), { withFileTypes: true })).filter(entry => entry.isFile() && /\.tsx?$/.test(entry.name)).map(entry => entry.name); }
catch (error) { if (error.code !== 'ENOENT') throw error; }
const demoNames = new Set(fileNames.map(name => name.replace(/\.tsx?$/, '')));
for (const name of fileNames) {
  const slug = name.replace(/\.tsx?$/, '');
  if (!bySlug.has(slug)) issue(`src/demos/${name}`, 'extra-demo', 'Demo file is absent from the official manifest.');
  if (!name.endsWith('.tsx')) issue(`src/demos/${name}`, 'unexpected-demo-extension', 'Each registered demonstration must have its own .tsx entry.');
}

const details = [];
for (const entry of expected) {
  const demoPath = `src/demos/${entry.slug}.tsx`;
  const files = entry.files.map(file => typeof file === 'string' ? file : file.path);
  const primary = files.find(file => file.endsWith(`/${entry.id}.tsx`)) || files.find(file => file.endsWith('.tsx'));
  const sourcePath = primary ? `.upstream/${primary}` : null;
  const detail = { slug: entry.slug, name: entry.name, category: entry.category, demoPath, expectedSourcePath: sourcePath, demoExists: false, defaultExport: false, officialImports: [], rendersOfficialBinding: false, lazyImport: false, catalogEntry: false, documentation: 'pending' };
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
    const expectedDemo = path.join(root, `src/demos/${slug}`);
    if (imports.length !== 1 || !imports[0] || resolveModule(path.join(root, loaderPath), imports[0]) !== expectedDemo) {
      issue(slug, 'lazy-import-mismatch', `Expected one delayed import of ./demos/${slug}; found ${JSON.stringify(imports)}`);
      continue;
    }
    details.find(detail => detail.slug === slug).lazyImport = true;
  }
} catch (error) { if (error.code !== 'ENOENT') throw error; issue(loaderPath, 'missing-loader-file', loaderPath); }
if (new Set(lazyEdges.map(edge => edge.slug)).size !== lazyEdges.length) issue(loaderPath, 'duplicate-lazy-entries', 'A component must have one unique lazy edge.');
for (const detail of details) if (!detail.lazyImport) issue(detail.slug, 'missing-valid-lazy-import', loaderPath);

const catalogPath = 'src/catalog.ts';
let galleryEntries = [];
try {
  const source = parse(catalogPath, await read(catalogPath), ts.ScriptKind.TS);
  visit(source, node => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === 'entries' && node.initializer && ts.isArrayLiteralExpression(node.initializer)) {
      galleryEntries = node.initializer.elements.map(element => {
        if (!ts.isObjectLiteralExpression(element)) return {};
        return Object.fromEntries(element.properties.filter(ts.isPropertyAssignment).map(property => [propertyName(property.name), stringValue(property.initializer)]));
      });
    }
  });
  if (new Set(galleryEntries.map(entry => entry.id)).size !== galleryEntries.length) issue(catalogPath, 'duplicate-gallery-entries', 'Gallery identities must be unique.');
  for (const entry of galleryEntries) {
    const expectedEntry = bySlug.get(entry.id);
    if (!expectedEntry) { issue(catalogPath, 'extra-gallery-entry', String(entry.id)); continue; }
    const detail = details.find(item => item.slug === entry.id);
    if (entry.name !== expectedEntry.name || entry.category !== expectedEntry.category || entry.demoPath !== detail.demoPath || entry.sourcePath !== detail.expectedSourcePath) {
      issue(entry.id, 'gallery-metadata-mismatch', 'Name, category, demo or official source path differs from the frozen manifest.');
    } else detail.catalogEntry = true;
  }
} catch (error) { if (error.code !== 'ENOENT') throw error; issue(catalogPath, 'missing-gallery-catalog', catalogPath); }
for (const detail of details) if (!detail.catalogEntry) issue(detail.slug, 'missing-valid-gallery-entry', catalogPath);

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
const tokenFiles = [path.resolve(root, '../../tokens.css'), path.resolve(root, '../../theme.css')];
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
    demoFiles: fileNames.length, existingExpectedDemos: details.filter(detail => detail.demoExists).length,
    officialRenderReferences: details.filter(detail => detail.rendersOfficialBinding).length,
    lazyEntries: lazyEdges.length, validLazyEntries: details.filter(detail => detail.lazyImport).length,
    galleryEntries: galleryEntries.length, validGalleryEntries: details.filter(detail => detail.catalogEntry).length,
    chineseIntentEntries: intentCount,
    documentationFiles: docsNames.length, completeDocumentation: details.filter(detail => detail.documentation === 'present-with-example').length,
    ownCssFiles: cssFiles.length,
    designTokenReferences: new Set(styleReferences.flatMap(file => file.references)).size,
    unknownDesignTokenReferences: new Set(styleReferences.flatMap(file => file.unknown)).size,
    issues: issues.length, pendingDocumentation: pending.length,
  },
  paths: { manifest: 'catalog/upstream-manifest.json', demos: 'src/demos', lazyImports: loaderPath, gallery: catalogPath, docs: docsDirectory, chineseIntent: 'catalog/intent-metadata.json' },
  issues, pendingDocumentation: pending, styleReferences, details,
};
await mkdir(path.join(root, 'catalog'), { recursive: true });
await writeFile(path.join(root, 'catalog/coverage-report.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(`${report.status.toUpperCase()}: ${expected.length} catalog components; ${report.counts.existingExpectedDemos} wrappers; ${report.counts.officialRenderReferences} official render references; ${report.counts.validLazyEntries} lazy entries; ${report.counts.completeDocumentation} component docs with actual examples.`);
console.log('Report: catalog/coverage-report.json. This is static coverage, not a browser or interaction acceptance result.');
for (const failure of issues.slice(0, 10)) console.error(`${failure.scope}: ${failure.code} — ${failure.detail}`);
if (issues.length > 10) console.error(`... ${issues.length - 10} further issues are in the report.`);
if (pending.length) console.log(`${pending.length} component documents are pending generation or need real example snippets; they are not counted as passed.`);
process.exitCode = issues.length ? 1 : pending.length ? 2 : 0;
