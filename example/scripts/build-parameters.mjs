#!/usr/bin/env node
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { loadComponentDirectory, demoPathFor } from './component-directory.mjs';
import { parameterizeDemo, sourceDigest, staticEnvironment, staticValue, parseDemo } from './lib/demo-parameters.mjs';

const defaultRoot = fileURLToPath(new URL('../', import.meta.url));
export const canonicalTemplatesPath = 'catalog/demo-source-templates.json';

async function jsonFile(root, filename, optional = false) {
  try { return JSON.parse(await readFile(path.join(root, filename), 'utf8')); }
  catch (error) { if (optional && error.code === 'ENOENT') return null; throw error; }
}

export async function readCanonicalTemplates(root = defaultRoot) {
  const data = await jsonFile(root, canonicalTemplatesPath, true);
  if (!data) return { schemaVersion: 1, templates: {} };
  if (data.schemaVersion !== 1 || !data.templates || typeof data.templates !== 'object') throw new Error('Invalid canonical demo source snapshot.');
  for (const [id, template] of Object.entries(data.templates)) {
    if (typeof template.source !== 'string' || sourceDigest(template.source) !== template.sha256) throw new Error(`Canonical demo snapshot integrity mismatch: ${id}`);
  }
  return data;
}

async function catalogHeights(root) {
  const heights = new Map();
  for (const filename of ['src/catalog.ts', 'src/business/catalog.generated.ts']) {
    let source;
    try { source = await readFile(path.join(root, filename), 'utf8'); }
    catch (error) { if (error.code === 'ENOENT') continue; throw error; }
    const environment = await staticEnvironment(source, filename, root);
    const expression = parseDemo('const value = entries;').statements[0].declarationList.declarations[0].initializer;
    const result = staticValue(expression, environment);
    if (result.known && Array.isArray(result.value)) for (const entry of result.value) if (Number.isFinite(entry.minHeight)) heights.set(entry.id, entry.minHeight);
  }
  return heights;
}

async function resourceOptions(root) {
  const labels = { 'chromatic-bloom': '色彩绽放', 'mineral-tide': '矿石潮汐', 'nocturne-orbit': '夜色轨道', 'prismatic-canopy': '棱彩林冠', 'solar-dunes': '日光沙丘', 'vermilion-fold': '朱红折页' };
  let assets;
  try { assets = (await readdir(path.join(root, 'src/assets/restoration'))).filter(filename => filename.endsWith('.svg')).sort(); }
  catch (error) { if (error.code !== 'ENOENT') throw error; assets = []; }
  return [
    ...assets.map(filename => ({ label: `纹理 · ${labels[filename.slice(0, -4)] ?? filename}`, value: `@asset/restoration/${filename}` })),
    ...['山雾', '茶庭', '沙洲', '静水', '林间', '岩纹'].map((label, index) => ({ label: `场景 · ${label}`, value: `@media/scene-${index + 1}.svg` })),
  ];
}

function recordsById(data) {
  const components = data?.components;
  if (!components || typeof components !== 'object') throw new Error('Missing actual parameter API extraction: catalog/parameter-api.json');
  return new Map(Array.isArray(components) ? components.map(component => [component.id, component]) : Object.entries(components));
}

/** Explicit capture freezes finalized, uninstrumented demos; routine builds reuse it. */
export async function buildParameters({ root = defaultRoot, component, capture = false, captureOnly = false, check = false } = {}) {
  root = path.resolve(root);
  if (check && (capture || captureOnly)) throw new Error('--check cannot capture or overwrite canonical templates.');
  const directory = await loadComponentDirectory(root);
  const selected = component ? directory.components.filter(item => item.id === component) : directory.components;
  if (!selected.length) throw new Error(`Unknown component: ${component}`);
  const templates = await readCanonicalTemplates(root);
  const business = await jsonFile(root, 'catalog/business-catalog.json');
  const manifest = await jsonFile(root, 'catalog/upstream-manifest.json');
  const sourceRecords = new Map([
    ...manifest.components.map(item => [item.slug, { ...item, sourcePath: `.upstream/${item.files.find(file => file.path.endsWith(`/${item.id}.tsx`))?.path ?? ''}`, rebuild: Boolean(item.capabilities?.webGL || item.capabilities?.webGPU || item.capabilities?.canvas) }]),
    ...business.components.map(item => [item.id, item]),
  ]);
  if (capture || captureOnly) {
    for (const item of selected) {
      const demoPath = demoPathFor(directory, item.id);
      const source = await readFile(path.join(root, demoPath), 'utf8');
      if (/\b(?:useDemoConfig|useDemoState)\b/.test(source)) throw new Error(`Refusing to capture instrumented demo ${item.id}; restore an authored template first.`);
      templates.templates[item.id] = { demoPath, sha256: sourceDigest(source), source };
    }
    await writeFile(path.join(root, canonicalTemplatesPath), `${JSON.stringify(templates, null, 2)}\n`);
  }
  if (captureOnly) return { captured: selected.length, generated: 0, fields: 0, states: 0, targets: 0 };
  const api = recordsById(await jsonFile(root, 'catalog/parameter-api.json'));
  const annotations = await jsonFile(root, 'catalog/parameter-controls.json', true) ?? {};
  annotations.resources = await resourceOptions(root);
  const heights = await catalogHeights(root);
  const environmentCache = new Map();
  const results = [];
  for (const item of selected) {
    const template = templates.templates[item.id];
    if (!template) throw new Error(`No canonical source for ${item.id}; run --capture only after integration demos are finalized.`);
    const demoPath = demoPathFor(directory, item.id);
    if (demoPath !== template.demoPath) throw new Error(`Demo directory moved after snapshot for ${item.id}; migrate/capture the authored source explicitly.`);
    const actualApi = api.get(item.id);
    if (!actualApi || !Array.isArray(actualApi.props) || !Array.isArray(actualApi.targets)) throw new Error(`Incomplete actual API extraction: ${item.id}`);
    const record = sourceRecords.get(item.id);
    if (!record) throw new Error(`Missing source identity: ${item.id}`);
    if (item.provider === 'react-bits' && actualApi.sourcePath !== record.sourcePath) throw new Error(`Frozen source identity mismatch for ${item.id}: ${actualApi.sourcePath} / ${record.sourcePath}`);
    const environment = await staticEnvironment(template.source, demoPath, root, environmentCache);
    const result = parameterizeDemo({ id: item.id, name: item.name, sourcePath: actualApi.sourcePath, demoPath, source: template.source, api: actualApi, environment, annotations, minHeight: heights.get(item.id) ?? record.minHeight ?? 560, rebuild: record.rebuild });
    results.push({ id: item.id, demoPath, ...result });
  }
  // Prepare all definitions before the first demo write, so extraction failure cannot
  // leave a half-instrumented catalog. No frozen upstream source is ever modified.
  if (!check) await mkdir(path.join(root, 'src/parameters/definitions'), { recursive: true });
  for (const result of results) {
    const filename = path.join(root, 'src/parameters/definitions', `${result.id}.json`);
    const definitionSource = `${JSON.stringify(result.definition, null, 2)}\n`;
    if (check) {
      if (await readFile(filename, 'utf8') !== definitionSource) throw new Error(`Stale parameter definition: ${result.id}`);
      if (await readFile(path.join(root, result.demoPath), 'utf8') !== result.instrumented) throw new Error(`Stale demo instrumentation: ${result.id}`);
    } else {
      await writeFile(filename, definitionSource);
      await writeFile(path.join(root, result.demoPath), result.instrumented);
    }
  }
  return {
    captured: capture ? selected.length : 0,
    generated: results.length,
    fields: results.reduce((count, item) => count + item.definition.fields.length, 0),
    states: results.reduce((count, item) => count + item.definition.fields.filter(field => field.scope === 'state').length, 0),
    targets: results.reduce((count, item) => count + item.definition.targets.length, 0),
  };
}

export function parseArguments(args) {
  const result = {};
  for (let index = 0; index < args.length; index++) {
    const argument = args[index];
    if (argument === '--component' || argument === '--id') {
      if (!args[index + 1] || args[index + 1].startsWith('--')) throw new Error(`${argument} requires a component id.`);
      result.component = args[++index];
    } else if (argument === '--capture') result.capture = true;
    else if (argument === '--capture-only') result.captureOnly = true;
    else if (argument === '--check') result.check = true;
    else throw new Error(`Usage: node scripts/build-parameters.mjs [--component id] [--capture | --capture-only | --check]; unknown argument ${argument}`);
  }
  return result;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    const args = parseArguments(process.argv.slice(2));
    const report = await buildParameters(args);
    console.log(`${args.check ? 'Verified' : 'Generated'} ${report.generated} demo parameter definitions, ${report.fields} real fields, ${report.states} controlled states and ${report.targets} JSX targets${report.captured ? `; captured ${report.captured} authored sources` : ''}.`);
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}
