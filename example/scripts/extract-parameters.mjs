#!/usr/bin/env node
import { readFile, writeFile, rename, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import ts from 'typescript';
import { collectJsxUsage, collectNativeApis, createExtractionProgram, extractComponentApi } from './lib/parameter-extraction.mjs';

const defaultRoot = fileURLToPath(new URL('../', import.meta.url));

/** Recompute the complete catalog from frozen sources and canonical author demos. */
export async function extractParameterApi({ root = defaultRoot } = {}) {
  root = path.resolve(root);
  const readJson = async name => JSON.parse(await readFile(path.join(root, name), 'utf8'));
  const upstream = await readJson('catalog/upstream-manifest.json');
  const business = await readJson('catalog/business-catalog.json');
  if (!Array.isArray(upstream.components) || !Array.isArray(business.components) || upstream.components.length !== 215 || business.components.length !== 88) {
    throw new Error(`API source coverage mismatch: expected 215 locked upstream + 88 business; got ${upstream.components?.length ?? 'invalid'} upstream + ${business.components?.length ?? 'invalid'} business.`);
  }
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
  if (sources.size !== 303) throw new Error(`API source identities are not unique: expected 303 demos; got ${sources.size}.`);
  const sourceOverrides = new Map([...sources].filter(([id]) => canonical[id]?.source).map(([id, entry]) => [path.join(root, entry.demoPath), canonical[id].source]));
  const program = createExtractionProgram(files, root, { sourceOverrides });
  const checker = program.getTypeChecker();
  const relative = file => path.relative(root, file).split(path.sep).join('/');
  const cache = new Map();
  function componentApi(file, exportName, id, usage) {
    const source = program.getSourceFile(file);
    if (!source) throw new Error(`Missing source in API extraction for ${id}: ${relative(file)}`);
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
  return result;
}

/** Compare serialized API semantics, including all target, native and usage fields. */
export function compareParameterApi(source, cached) {
  const differences = [];
  const describe = value => {
    const text = value === undefined ? '<missing>' : JSON.stringify(value);
    return text.length > 180 ? `${text.slice(0, 177)}...` : text;
  };
  const compare = (sourceValue, cachedValue, field) => {
    if (Object.is(sourceValue, cachedValue)) return;
    if (Array.isArray(sourceValue) && Array.isArray(cachedValue)) {
      for (let index = 0; index < Math.max(sourceValue.length, cachedValue.length); index++) {
        const item = sourceValue[index] ?? cachedValue[index];
        const name = item && typeof item === 'object' ? item.name ?? item.tag : undefined;
        compare(sourceValue[index], cachedValue[index], `${field}[${name ?? index}]`);
      }
      return;
    }
    if (sourceValue && cachedValue && typeof sourceValue === 'object' && typeof cachedValue === 'object' && !Array.isArray(sourceValue) && !Array.isArray(cachedValue)) {
      for (const key of [...new Set([...Object.keys(sourceValue), ...Object.keys(cachedValue)])].sort()) {
        // JSON generation omits undefined optional fields; absent and undefined
        // have the same serialized meaning, while null remains a real value.
        compare(sourceValue[key], cachedValue[key], field ? `${field}.${key}` : key);
      }
      return;
    }
    differences.push(`${field || 'catalog'}: source ${describe(sourceValue)}; cached ${describe(cachedValue)}`);
  };
  compare(source, cached, '');
  return differences;
}

/** Check is read-only: it does not write a catalog, temporary file or report. */
export async function checkParameterApi({ root = defaultRoot } = {}) {
  const result = await extractParameterApi({ root });
  const filename = path.join(root, 'catalog/parameter-api.json');
  let cached;
  try { cached = JSON.parse(await readFile(filename, 'utf8')); }
  catch (error) { throw new Error(`Cannot read parameter API catalog ${filename}: ${error.message}`, { cause: error }); }
  const differences = compareParameterApi(result, cached);
  if (differences.length) {
    const limit = 40;
    const remaining = differences.length > limit ? `\n... ${differences.length - limit} more differences.` : '';
    throw new Error(`Stale parameter API catalog: ${differences.length} source differences.\n${differences.slice(0, limit).join('\n')}${remaining}`);
  }
  return result;
}

export async function runExtraction({ root = defaultRoot, check = false } = {}) {
  root = path.resolve(root);
  if (check) return checkParameterApi({ root });
  const result = await extractParameterApi({ root });
  const outputPath = path.join(root, 'catalog/parameter-api.json');
  const temporaryPath = `${outputPath}.tmp-${process.pid}`;
  try {
    await writeFile(temporaryPath, `${JSON.stringify(result, null, 2)}\n`, { flag: 'wx' });
    await rename(temporaryPath, outputPath);
  } finally {
    await rm(temporaryPath, { force: true });
  }
  return result;
}

export function parseExtractionArgs(args) {
  const options = { check: false };
  for (const argument of args) {
    if (argument === '--check') options.check = true;
    else throw new Error(`Unsupported extraction argument: ${argument}`);
  }
  return options;
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  try {
    const options = parseExtractionArgs(process.argv.slice(2));
    const result = await runExtraction(options);
    const action = options.check ? 'Verified source API' : 'Extracted actual API';
    console.log(`${action} for ${result.coverage.components} demos: ${result.coverage.upstream} locked upstream + ${result.coverage.business} business; ${result.coverage.primaryProps} primary fields; ${result.coverage.targetApis} actual JSX target APIs.`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
