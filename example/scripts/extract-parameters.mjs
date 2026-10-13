#!/usr/bin/env node
import { readFile, writeFile, rename, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { collectJsxUsage, collectNativeApis, createExtractionProgram, extractComponentApi } from './lib/parameter-extraction.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const readJson = async name => JSON.parse(await readFile(path.join(root, name), 'utf8'));
const upstream = await readJson('catalog/upstream-manifest.json');
const business = await readJson('catalog/business-catalog.json');
const sourceTemplatePath = 'catalog/demo-source-templates.json';
const canonical = existsSync(path.join(root, sourceTemplatePath)) ? (await readJson(sourceTemplatePath)).templates ?? {} : {};
const categories = existsSync(path.join(root, 'catalog/use-categories.json')) ? await readJson('catalog/use-categories.json') : undefined;
const categoryEntries = new Map(categories?.components?.map(entry => [entry.id, entry]) ?? []);
const appCatalog = programCatalog(await readFile(path.join(root, 'src/catalog.ts'), 'utf8'));
function programCatalog(code) {
  const source = ts.createSourceFile('catalog.ts', code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const entries = new Map();
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (declaration.name.getText() !== 'entries' || !ts.isArrayLiteralExpression(declaration.initializer ?? {})) continue;
      for (const item of declaration.initializer.elements) {
        if (!ts.isObjectLiteralExpression(item)) continue;
        const fields = Object.fromEntries(item.properties.filter(ts.isPropertyAssignment).filter(property => ts.isStringLiteralLike(property.initializer)).map(property => [property.name.text, property.initializer.text]));
        if (fields.id) entries.set(fields.id, fields);
      }
    }
  }
  return entries;
}
const files = [];
const sources = new Map();
const findDemo = (entry, upstreamEntry) => {
  const canonicalDemoPath = canonical[upstreamEntry ? entry.slug : entry.id]?.demoPath;
  const candidates = upstreamEntry
    ? [canonicalDemoPath, appCatalog.get(entry.slug)?.demoPath, entry.localDemoPath, `src/demos/${categoryEntries.get(entry.slug)?.category}/${entry.slug}.tsx`, `src/demos/${entry.category}/${entry.slug}.tsx`, `src/demos/${entry.slug}.tsx`]
    : [canonicalDemoPath, entry.demoPath, entry.sourcePath, `src/business/demos/${entry.family}/${entry.id}.tsx`, `src/business/demos/${entry.id}.tsx`];
  return candidates.filter(Boolean).find(file => existsSync(path.join(root, file)));
};
for (const entry of upstream.components) {
  const file = entry.files.find(file => file.path.endsWith(`/${entry.id}.tsx`));
  if (!file) throw new Error(`Missing locked primary source for ${entry.slug}`);
  const sourcePath = `.upstream/${file.path}`;
  const demoPath = findDemo(entry, true);
  if (!demoPath) throw new Error(`Missing live demo for ${entry.slug}`);
  sources.set(entry.slug, { ...entry, sourcePath, demoPath, upstream: true });
  files.push(path.join(root, sourcePath), path.join(root, demoPath));
}
for (const entry of business.components) {
  const demoPath = findDemo(entry, false);
  if (!demoPath) throw new Error(`Missing business demo for ${entry.id}`);
  sources.set(entry.id, { ...entry, demoPath, upstream: false });
  files.push(path.join(root, demoPath));
}
const sourceOverrides = new Map([...sources].filter(([id]) => canonical[id]?.source).map(([id, entry]) => [path.join(root, entry.demoPath), canonical[id].source]));
const program = createExtractionProgram(files, root, { sourceOverrides });
const checker = program.getTypeChecker();
const relative = file => path.relative(root, file).split(path.sep).join('/');
const cache = new Map();
function componentApi(file, exportName, id, usage) {
  const source = program.getSourceFile(file);
  const exports = checker.getExportsOfModule(checker.getSymbolAtLocation(source));
  const requestedExportName = exportName;
  if (!exports.some(symbol => symbol.name === exportName) && exportName === 'default') {
    const sourceName = path.basename(file, '.tsx');
    if (!exports.some(symbol => symbol.name === sourceName)) throw new Error(`Missing primary export for ${file}`);
    exportName = sourceName;
  }
  const key = `${file}:${exportName}`;
  if (!cache.has(key)) cache.set(key, extractComponentApi(program, file, { root, id, exportName }));
  const api = structuredClone(cache.get(key));
  api.id = id;
  if (requestedExportName !== exportName) api.integrationExport = { requested: requestedExportName, declared: exportName, reason: 'locked-integration-adapter' };
  for (const prop of api.props) {
    const examples = usage?.filter(item => item.name === prop.name).map(item => item.code) ?? [];
    if (examples.length) {
      prop.usageExamples = [...new Set(examples)];
      if (prop.valueKind !== 'ref') prop.codeExample = examples[0];
    }
  }
  return api;
}

const primaryBusiness = {
  'business-checkbox': 'SpringCheckbox', 'business-checkboxgroup': 'SpringCheckbox',
  'business-datepicker': 'DatePicker', 'business-radiobutton': 'SpringRadio',
  'business-select': 'AnimatedSelect', 'business-cascadeselect': 'AnimatedSelect',
  'business-slider': 'RangeSlider', 'business-togglebutton': 'ToggleButton',
  'business-togglebuttongroup': 'SegmentedControl', 'business-buttongroup': 'SegmentedControl',
  'business-button': 'Button', 'business-orderlist': 'ReorderItems',
  'business-organizationchart': 'OrganizationNodes', 'business-paginator': 'Pager',
  'business-tree': 'TreeRows', 'business-dialog': 'Dialog', 'business-drawer': 'Dialog',
  'business-overlaymanager': 'Dialog', 'business-backdrop': 'Dialog', 'business-popover': 'Popover',
  'business-carousel': 'MediaViewer', 'business-compare': 'ImageCompare', 'business-gallery': 'MediaViewer',
  'business-animateonscroll': 'MotionSurface', 'business-motion': 'MotionSurface',
  'business-focustrap': 'FocusRegion', 'business-collapsible': 'AnimatedCollapse',
  'business-portal': 'LocalPortal', 'business-visuallyhidden': 'ScreenReaderText',
};

function demoTargets(entry) {
  const file = path.join(root, entry.demoPath);
  const source = program.getSourceFile(file);
  const nativeElements = collectNativeApis(program, file, root);
  const nativeByTag = new Map(nativeElements.map(element => [element.tag, element]));
  const importByName = new Map();
  for (const statement of source.statements) {
    if (!ts.isImportDeclaration(statement) || !statement.importClause) continue;
    const specifier = statement.moduleSpecifier.text;
    const resolution = ts.resolveModuleName(specifier, file, program.getCompilerOptions(), ts.sys).resolvedModule;
    if (!resolution || !resolution.resolvedFileName.endsWith('.tsx') || /node_modules/.test(resolution.resolvedFileName)) continue;
    const add = (name, exported) => importByName.set(name, { file: resolution.resolvedFileName, exportName: exported });
    if (statement.importClause.name) add(statement.importClause.name.text, 'default');
    if (statement.importClause.namedBindings && ts.isNamedImports(statement.importClause.namedBindings)) {
      for (const element of statement.importClause.namedBindings.elements) add(element.name.text, element.propertyName?.text ?? element.name.text);
    }
  }
  const targets = new Map();
  const visit = node => {
    if (ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) {
      const name = node.tagName.getText();
      const imported = importByName.get(name);
      const native = nativeByTag.get(name);
      if ((imported && !['BusinessDemo', 'DemoPanel'].includes(name)) || native) {
        if (!targets.has(name)) {
          const usage = collectJsxUsage(program, file, [name]);
          const api = imported ? componentApi(imported.file, imported.exportName, entry.slug ?? entry.id, usage) : undefined;
          targets.set(name, {
            name,
            componentName: api?.componentName ?? name,
            ...(api ? { exportName: api.exportName, sourcePath: relative(imported.file), propsType: api.propsType, indexSignatures: api.indexSignatures, integrationExport: api.integrationExport } : {}),
            native: !!native,
            apiScope: api?.apiScope ?? 'native-element',
            props: api?.props ?? native.observedProps,
            inherited: api?.inherited ?? [{ type: native.type, reference: native.reference, mdnReference: native.mdnReference, description: native.description }],
            occurrences: [],
          });
        }
        targets.get(name).occurrences.push({
          line: source.getLineAndCharacterOfPosition(node.getStart()).line + 1,
          attributes: node.attributes.properties.filter(ts.isJsxAttribute).map(attribute => attribute.name.getText()),
        });
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { targets: [...targets.values()], nativeElements };
}

const components = {};
for (const [id, entry] of sources) {
  const { targets, nativeElements } = demoTargets(entry);
  let api;
  if (entry.upstream) {
    const target = targets.find(target => target.sourcePath === entry.sourcePath && target.exportName === 'default');
    api = componentApi(path.join(root, entry.sourcePath), 'default', id, target ? collectJsxUsage(program, path.join(root, entry.demoPath), [target.name]) : []);
    api.upstreamCommit = upstream.sources.commit;
    api.upstreamSourceUrl = entry.sourceUrl;
  } else {
    const primary = targets.find(target => target.name === primaryBusiness[id]);
    api = primary ? componentApi(path.join(root, primary.sourcePath), primary.exportName, id, collectJsxUsage(program, path.join(root, entry.demoPath), [primary.name])) : {
      id,
      componentName: entry.name,
      sourcePath: entry.demoPath,
      exportName: 'default',
      propsType: '{}',
      apiScope: 'native-composition',
      props: [],
      inherited: nativeElements.map(element => ({ type: element.type, reference: element.reference, mdnReference: element.mdnReference, tag: element.tag, description: element.description })),
      notes: ['该业务能力由示例函数组合原生元素与下面的叶组件；示例函数没有接收公开 Props。原生属性按元素列出，演示内部 useState 配置不作为公开 Props 或组件默认值。'],
      extraction: { method: 'typescript-type-checker-and-source-ast', typescriptVersion: ts.version, defaultPolicy: 'literal-syntax-only-no-code-execution', nativeFields: 'referenced-as-inherited-types' },
    };
    api.businessDescription = entry.description;
  }
  api.demoPath = entry.demoPath;
  api.demoSourceKind = canonical[id]?.source ? 'canonical-authored-template' : 'workspace-source';
  if (canonical[id]?.source) api.demoSourceTemplate = sourceTemplatePath;
  api.targets = targets;
  api.nativeElements = nativeElements;
  components[id] = api;
}
const propCount = Object.values(components).reduce((count, component) => count + component.props.length, 0);
const result = {
  version: 1,
  source: { upstreamManifest: 'catalog/upstream-manifest.json', businessCatalog: 'catalog/business-catalog.json', typescriptVersion: ts.version },
  coverage: {
    components: Object.keys(components).length,
    upstream: upstream.components.length,
    business: business.components.length,
    primaryProps: propCount,
    componentApis: Object.values(components).filter(component => component.apiScope === 'component-props').length,
    nativeCompositions: Object.values(components).filter(component => component.apiScope === 'native-composition').length,
    targetApis: Object.values(components).reduce((count, component) => count + component.targets.length, 0),
  },
  components,
};
const outputPath = path.join(root, 'catalog/parameter-api.json');
const temporaryPath = `${outputPath}.tmp-${process.pid}`;
try {
  await writeFile(temporaryPath, `${JSON.stringify(result, null, 2)}\n`, { flag: 'wx' });
  await rename(temporaryPath, outputPath);
} finally {
  await rm(temporaryPath, { force: true });
}
console.log(`Extracted actual API for ${result.coverage.components} demos: ${result.coverage.upstream} locked upstream + ${result.coverage.business} business; ${propCount} primary fields; ${result.coverage.targetApis} actual JSX target APIs.`);
