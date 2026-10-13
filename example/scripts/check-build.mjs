#!/usr/bin/env node
// Read-only audit of emitted Vite files; the only output is catalog/build-report.json.
// File byte counts are structural evidence, not network, browser or GPU measurements.
import { readFile, readdir, stat, mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import ts from 'typescript';
import { loadComponentDirectory, validateDirectorySources, demoIdentityFromBuildSource, isAllowedRootSharedName } from './component-directory.mjs';

const root = path.resolve(fileURLToPath(new URL('../', import.meta.url)));
const dist = path.join(root, 'dist');
const reportPath = path.join(root, 'catalog/build-report.json');
const relative = filename => path.relative(root, filename).split(path.sep).join('/');
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const issues = [];
const pending = [];
const issue = (scope, code, detail) => issues.push({ scope, code, detail });
const report = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  scope: 'Static audit of the emitted Vite manifest, synchronous and dynamic import graphs, output files and copied public assets. No browser, rendering, network timing or GPU test is performed.',
  byteMeaning: 'All byte values are uncompressed file sizes on disk, counted once per synchronous closure. They are not measured transfer size, loading time, memory use or frame rate.',
  distribution: 'dist/ is a local build artifact and is excluded from the redistributable template. Re-run this check after setup and build to audit a new local build.',
  paths: { manifest: 'dist/.vite/manifest.json', catalog: 'catalog/upstream-manifest.json', businessCatalog: 'catalog/business-catalog.json', directory: 'catalog/use-categories.json', report: 'catalog/build-report.json' },
  status: 'pending-build',
  counts: {},
  rootSyncBytes: null,
  previewSyncBytes: null,
  syncClosures: {},
  heavyChunks: [],
  publicAssets: [],
  components: [],
  issues,
  pending,
};

async function finish() {
  report.status = issues.length ? 'failed' : pending.length ? 'pending-build' : 'passed';
  report.counts.issues = issues.length;
  report.counts.pending = pending.length;
  await mkdir(path.dirname(reportPath), { recursive: true });
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  console.log(`${report.status.toUpperCase()}: ${report.counts.realDemoEntries ?? 0}/303 real demos; ${report.counts.rawUsageEntries ?? 0}/303 usage sources; ${report.counts.guideEntries ?? 0}/303 component guides.`);
  console.log(`Frozen React Bits entries: ${report.counts.frozenRealDemoEntries ?? 0}/215; business entries: ${report.counts.businessRealDemoEntries ?? 0}/88.`);
  console.log(`Lazy parameter definitions: ${report.counts.parameterDefinitionEntries ?? 0}/303.`);
  if (report.rootSyncBytes !== null) console.log(`Synchronous entry JS: index=${report.rootSyncBytes} bytes; preview=${report.previewSyncBytes} bytes. These are raw file sizes, not performance measurements.`);
  console.log('Report: catalog/build-report.json. Exit 0=passed, 1=structural failure, 2=build or guide generation pending.');
  for (const failure of issues.slice(0, 8)) console.error(`${failure.scope}: ${failure.code} — ${failure.detail}`);
  if (issues.length > 8) console.error(`${issues.length - 8} further failures are recorded in the report.`);
  for (const item of pending.slice(0, 3)) console.log(`Pending: ${item.code} — ${item.detail}`);
  process.exitCode = issues.length ? 1 : pending.length ? 2 : 0;
}

async function audit() {
  const catalog = JSON.parse(await readFile(path.join(root, report.paths.catalog), 'utf8'));
  const frozenSlugs = catalog.components?.map(component => component.slug) ?? [];
  const business = JSON.parse(await readFile(path.join(root, report.paths.businessCatalog), 'utf8'));
  const businessIds = business.components?.map(component => component.id) ?? [];
  const directory = await loadComponentDirectory(root);
  validateDirectorySources(directory, catalog.components, business.components);
  const slugs = [...frozenSlugs, ...businessIds];
  const expected = new Set(slugs);
  report.sourceCommit = catalog.sources?.commit;
  report.counts.catalog = frozenSlugs.length;
  report.counts.businessCatalog = businessIds.length;
  report.counts.totalCatalog = slugs.length;
  if (frozenSlugs.length !== 215 || new Set(frozenSlugs).size !== 215 || catalog.total !== 215) {
    issue('catalog', 'invalid-frozen-catalog', `Expected 215 unique component identities; found ${frozenSlugs.length} entries, ${new Set(frozenSlugs).size} unique identities, total=${catalog.total}.`);
  }
  if (businessIds.length !== 88 || new Set(businessIds).size !== 88 || business.total !== 88) issue('business-catalog', 'invalid-business-catalog', `Expected 88 unique business identities; found ${businessIds.length}, total=${business.total}.`);
  if (expected.size !== 303 || directory.total !== 303 || directory.categories.length !== 13) issue('functional-directory', 'invalid-taxonomy-total', 'The combined catalog must retain 303 unique identities and 13 functional categories.');

  // Permit the reviewed light helpers without permitting implementation imports
  // under an equally named shared chunk. All helper edges are checked explicitly.
  const helperImports = new Map([
    ['src/gallery-catalog.ts', new Set(['./catalog', './business/catalog.generated'])],
    ['src/parameters/validation.ts', new Set()],
    ['src/parameters/usage.ts', new Set()],
    ['src/parameters/load.ts', new Set()],
    ['src/parameters/DemoConfig.tsx', new Set(['react', './validation', './assets'])],
    ['src/parameters/assets.ts', new Set()],
  ]);
  for (const [filename, allowed] of helperImports) {
    const code = await readFile(path.join(root, filename), 'utf8');
    const source = ts.createSourceFile(filename, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    for (const diagnostic of source.parseDiagnostics) issue(filename, 'root-helper-syntax-error', ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
    function visit(node) {
      if ((ts.isImportDeclaration(node) && !node.importClause?.isTypeOnly) || (ts.isExportDeclaration(node) && !node.isTypeOnly && node.moduleSpecifier)) {
        const specifier = node.moduleSpecifier;
        if (!ts.isStringLiteral(specifier) || !allowed.has(specifier.text)) issue(filename, 'root-helper-implementation-import', specifier.getText(source));
      }
      if (ts.isCallExpression(node)) {
        if (node.expression.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(node.expression) && node.expression.text === 'require')) issue(filename, 'unexpected-root-helper-module-load', node.getText(source));
        if (node.expression.getText(source) === 'import.meta.glob') {
          const pattern = node.arguments[0];
          const globOptions = new Map(node.arguments[1] && ts.isObjectLiteralExpression(node.arguments[1]) ? node.arguments[1].properties.filter(ts.isPropertyAssignment).map(property => [ts.isIdentifier(property.name) || ts.isStringLiteral(property.name) ? property.name.text : property.name.getText(source), property.initializer]) : []);
          const eager = globOptions.get('eager')?.kind === ts.SyntaxKind.TrueKeyword;
          const definitionGlob = filename === 'src/parameters/load.ts' && ts.isStringLiteral(pattern) && pattern.text === './definitions/*.json' && !eager;
          const query = globOptions.get('query');
          const imported = globOptions.get('import');
          const artworkUrlGlob = filename === 'src/parameters/assets.ts' && ts.isStringLiteral(pattern) && pattern.text === '../assets/restoration/*.svg' && eager && query && ts.isStringLiteral(query) && query.text === '?url' && imported && ts.isStringLiteral(imported) && imported.text === 'default';
          if (!definitionGlob && !artworkUrlGlob) issue(filename, 'unexpected-root-helper-glob', 'Only per-definition lazy JSON or the explicit local SVG URL table is permitted. Implementation, raw SVG and eager parameter-definition globs are forbidden.');
        }
      }
      ts.forEachChild(node, visit);
    }
    visit(source);
  }

  let bytes;
  try { bytes = await readFile(path.join(root, report.paths.manifest)); }
  catch (error) {
    if (error.code !== 'ENOENT') throw error;
    pending.push({ code: 'vite-manifest-missing', detail: 'Run npm run setup:components and npm run build before this check.' });
    return;
  }
  const manifest = JSON.parse(bytes.toString('utf8'));
  report.manifestSha256 = digest(bytes);
  report.counts.manifestEntries = Object.keys(manifest).length;
  const entries = Object.entries(manifest);
  const classified = { real: new Map(), usage: new Map(), guide: new Map(), definition: new Map() };
  for (const [key, value] of entries) {
    const source = (value.src || key).replaceAll('\\', '/').replace(/^\.\//, '');
    const demo = demoIdentityFromBuildSource(directory, source);
    const guide = source.match(/^docs\/(business\/)?components\/([^/]+)\.md\?raw$/);
    const definition = source.match(/^src\/parameters\/definitions\/([^/]+)\.json$/);
    const kind = demo ? demo.kind : guide ? 'guide' : definition ? 'definition' : null;
    if (!kind) continue;
    const slug = demo?.id || guide?.[2] || definition[1];
    if (demo && demo.actualPath !== demo.expectedPath) issue(key, 'wrong-functional-demo-path', `Expected ${demo.expectedPath ?? 'a registered source identity'}; found ${demo.actualPath}.`);
    const metadata = directory.byId.get(slug);
    if (guide && metadata && Boolean(guide[1]) !== (metadata.provider === 'business')) issue(key, 'wrong-guide-provider-path', slug);
    if (classified[kind].has(slug)) issue(key, 'duplicate-dynamic-identity', `${kind}:${slug}`);
    classified[kind].set(slug, key);
    if (!expected.has(slug)) issue(key, 'unlisted-component-entry', `${kind}:${slug} is absent from the frozen/business component catalogs.`);
    if (value.isDynamicEntry !== true) issue(key, 'not-a-dynamic-entry', 'A component, usage source, guide or parameter definition must be emitted as a dynamic entry.');
  }
  report.counts.realDemoEntries = classified.real.size;
  report.counts.rawUsageEntries = classified.usage.size;
  report.counts.guideEntries = classified.guide.size;
  report.counts.parameterDefinitionEntries = classified.definition.size;
  report.counts.frozenRealDemoEntries = frozenSlugs.filter(slug => classified.real.has(slug)).length;
  report.counts.businessRealDemoEntries = businessIds.filter(id => classified.real.has(id)).length;
  report.counts.frozenRawUsageEntries = frozenSlugs.filter(slug => classified.usage.has(slug)).length;
  report.counts.businessRawUsageEntries = businessIds.filter(id => classified.usage.has(id)).length;
  report.counts.frozenGuideEntries = frozenSlugs.filter(slug => classified.guide.has(slug)).length;
  report.counts.businessGuideEntries = businessIds.filter(id => classified.guide.has(id)).length;
  for (const kind of ['real', 'usage', 'definition']) {
    for (const slug of slugs) if (!classified[kind].has(slug)) issue(slug, `missing-${kind}-entry`, `The build has no ${kind} dynamic entry for this component.`);
  }
  const missingGuides = slugs.filter(slug => !classified.guide.has(slug));
  if (missingGuides.length) pending.push({ code: 'guide-build-incomplete', detail: `${missingGuides.length} guide entries are absent. Complete docs/components and docs/business/components, then rebuild so the Gallery glob includes them.`, slugs: missingGuides });

  const outputReferences = new Map();
  const reference = (filename, owner) => {
    if (typeof filename !== 'string' || !filename) { issue(owner, 'invalid-output-reference', String(filename)); return; }
    const destination = path.resolve(dist, filename);
    if (!destination.startsWith(dist + path.sep)) { issue(owner, 'output-outside-dist', filename); return; }
    const owners = outputReferences.get(filename) || [];
    owners.push(owner);
    outputReferences.set(filename, owners);
  };
  for (const [key, value] of entries) {
    reference(value.file, key);
    for (const filename of [...(value.css || []), ...(value.assets || [])]) reference(filename, key);
    for (const dependency of [...(value.imports || []), ...(value.dynamicImports || [])]) {
      if (!manifest[dependency]) issue(key, 'missing-manifest-dependency', dependency);
    }
  }
  const fileBytes = new Map();
  const fileContents = new Map();
  await Promise.all([...outputReferences].map(async ([filename, owners]) => {
    try {
      const file = path.resolve(dist, filename);
      if (!(await stat(file)).isFile()) throw new Error('Not a regular file.');
      const contents = await readFile(file);
      fileBytes.set(filename, contents.length);
      if (/\.(?:js|css)$/.test(filename)) fileContents.set(filename, contents.toString('utf8'));
    } catch (error) { issue(filename, 'missing-output-file', `${error.message}; referenced by ${owners.join(', ')}`); }
  }));
  report.counts.distReferencedFiles = outputReferences.size;
  report.counts.existingReferencedFiles = fileBytes.size;

  function closure(start, dynamic = false) {
    const seen = new Set();
    const queue = [start];
    while (queue.length) {
      const key = queue.pop();
      if (seen.has(key) || !manifest[key]) continue;
      seen.add(key);
      queue.push(...(manifest[key].imports || []));
      if (dynamic) queue.push(...(manifest[key].dynamicImports || []));
    }
    return seen;
  }
  // Track whether each path traversed at least one import() edge.
  function dynamicReachable(start) {
    const seen = new Set();
    const result = new Set();
    const queue = [[start, false]];
    while (queue.length) {
      const [key, delayed] = queue.pop();
      const state = `${Number(delayed)}:${key}`;
      if (seen.has(state) || !manifest[key]) continue;
      seen.add(state);
      if (delayed) result.add(key);
      for (const dependency of manifest[key].imports || []) queue.push([dependency, delayed]);
      for (const dependency of manifest[key].dynamicImports || []) queue.push([dependency, true]);
    }
    return result;
  }
  const rootNames = ['index.html', 'preview.html'];
  const rootClosures = new Map(rootNames.map(name => [name, closure(name)]));
  const lazyRoots = new Map(rootNames.map(name => [name, dynamicReachable(name)]));
  const realKeys = new Set(classified.real.values());
  const allComponentEntries = new Set(Object.values(classified).flatMap(map => [...map.values()]));
  const demoClosures = new Map([...classified.real].map(([slug, key]) => [slug, closure(key)]));

  // These are emitted implementation signatures, not catalog strings such as
  // dependencies:["gsap","ogl","three"]. The root shared chunk legitimately holds metadata.
  const signatures = [
    ['gsap', /\b(?:GSAP|ScrollTrigger|SplitText)\s+\d+\.\d+\.\d+/],
    ['ogl', /\bOGL:\s/],
    ['three', /\b__THREE__\b|THREE\.(?:WebGLRenderer|WebGPURenderer|BufferGeometry|Object3D|Texture|FileLoader)/],
    ['react-three-fiber', /\b__r3f\b|\bR3F:/],
    ['face-api', /\btinyFaceDetector\.loadFromUri\b|\bfaceLandmark68TinyNet\b/],
    ['vgpu', /\bVGPUError\b/],
    ['matter-js', /matter-js\s+\d+\.\d+\.\d+/],
  ];
  for (const [key, value] of entries) {
    if (!value.file?.endsWith('.js') || /\?raw$/.test(value.src || key)) continue;
    const code = fileContents.get(value.file) || '';
    const libraries = signatures.filter(([, expression]) => expression.test(code)).map(([name]) => name);
    if (!libraries.length) continue;
    const synchronousRoots = rootNames.filter(name => rootClosures.get(name).has(key));
    const consumers = [...demoClosures].filter(([, nodes]) => nodes.has(key)).map(([slug]) => slug).sort();
    report.heavyChunks.push({ key, file: value.file, bytes: fileBytes.get(value.file), libraries, synchronousRoots, demoConsumers: consumers });
    if (synchronousRoots.length) issue(key, 'eager-effect-library', `${libraries.join(', ')} implementation is in the synchronous closure of ${synchronousRoots.join(', ')}.`);
  }
  for (const name of rootNames) {
    if (!manifest[name]?.isEntry) { issue(name, 'missing-root-entry', 'The build must expose both HTML entry points.'); continue; }
    try { if (!(await stat(path.join(dist, name))).isFile()) throw new Error('Not a file.'); }
    catch { issue(name, 'missing-html-output', `dist/${name}`); }
    const nodes = [...rootClosures.get(name)].sort();
    for (const key of nodes) {
      if (allComponentEntries.has(key) || /(?:^|\/)\.upstream\//.test(key)) issue(name, 'eager-component-entry', key);
      if (key !== name && manifest[key].file?.endsWith('.js') && !isAllowedRootSharedName(manifest[key].name)) {
        issue(name, 'unexpected-root-dependency', `${key} is outside the permitted React, catalog, preview-runtime and reviewed parameter helpers. Review it before expanding the allow-list.`);
      }
    }
    const jsFiles = [...new Set(nodes.map(key => manifest[key].file).filter(filename => filename?.endsWith('.js')))];
    const cssFiles = [...new Set(nodes.flatMap(key => manifest[key].css || []))];
    const jsBytes = jsFiles.reduce((sum, filename) => sum + (fileBytes.get(filename) || 0), 0);
    const cssBytes = cssFiles.reduce((sum, filename) => sum + (fileBytes.get(filename) || 0), 0);
    report.syncClosures[name] = { nodes, jsFiles, cssFiles, jsBytes, cssBytes, totalJsAndCssBytes: jsBytes + cssBytes };
  }
  report.rootSyncBytes = report.syncClosures['index.html']?.jsBytes ?? null;
  report.previewSyncBytes = report.syncClosures['preview.html']?.jsBytes ?? null;

  for (const slug of slugs) {
    const real = classified.real.get(slug);
    const usage = classified.usage.get(slug);
    const guide = classified.guide.get(slug);
    const definition = classified.definition.get(slug);
    const metadata = directory.byId.get(slug);
    const component = { slug, provider: metadata?.provider, category: metadata?.category, realEntry: real || null, usageEntry: usage || null, guideEntry: guide || null, definitionEntry: definition || null };
    for (const [kind, key, owner] of [['real', real, 'preview.html'], ['usage', usage, 'index.html'], ['guide', guide, 'index.html'], ['definition', definition, 'index.html'], ['definitionPreview', definition, 'preview.html']]) {
      component[`${kind}DynamicallyReachable`] = Boolean(key && lazyRoots.get(owner).has(key));
      if (key && !component[`${kind}DynamicallyReachable`]) issue(key, 'unreachable-dynamic-entry', `No path containing import() exists from ${owner}.`);
    }
    component.staticDependencies = [...(demoClosures.get(slug) || [])].filter(key => key !== real).sort();
    for (const dependency of component.staticDependencies) {
      if (realKeys.has(dependency)) issue(real, 'cross-demo-synchronous-import', dependency);
    }
    report.components.push(component);
  }
  report.counts.realDynamicallyReachable = report.components.filter(item => item.realDynamicallyReachable).length;
  report.counts.usageDynamicallyReachable = report.components.filter(item => item.usageDynamicallyReachable).length;
  report.counts.guidesDynamicallyReachable = report.components.filter(item => item.guideDynamicallyReachable).length;
  report.counts.definitionsDynamicallyReachable = report.components.filter(item => item.definitionDynamicallyReachable).length;
  report.counts.definitionsPreviewDynamicallyReachable = report.components.filter(item => item.definitionPreviewDynamicallyReachable).length;

  // Public assets bypass Vite's manifest. Check their actual copied bytes as well.
  async function publicFiles(directory) {
    const result = [];
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const filename = path.join(directory, entry.name);
      if (entry.isDirectory()) result.push(...await publicFiles(filename));
      else if (entry.isFile()) result.push(filename);
    }
    return result;
  }
  for (const filename of (await publicFiles(path.join(root, 'public'))).sort()) {
    const assetPath = path.relative(path.join(root, 'public'), filename).split(path.sep).join('/');
    const original = await readFile(filename);
    const asset = { source: relative(filename), output: `dist/${assetPath}`, bytes: original.length, sha256: digest(original), copied: false };
    try { asset.copied = digest(await readFile(path.join(dist, assetPath))) === asset.sha256; }
    catch { /* A missing copied file is reported together with stale bytes below. */ }
    if (!asset.copied) issue(asset.output, 'missing-or-stale-public-asset', 'The public resource is absent from dist or differs from its current source bytes. Rebuild after setup.');
    report.publicAssets.push(asset);
  }
  report.counts.publicAssetFiles = report.publicAssets.length;
  report.counts.verifiedPublicAssetCopies = report.publicAssets.filter(asset => asset.copied).length;
  report.counts.heavyChunks = report.heavyChunks.length;
}

try { await audit(); }
catch (error) { issue('build-audit', 'audit-error', error.stack || error.message || String(error)); }
await finish();
