#!/usr/bin/env node
import { readFile, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { loadComponentDirectory, demoPathFor } from './component-directory.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
async function pureModule(filename) {
  const source = await readFile(path.join(root, filename), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
}
const validation = await pureModule('src/parameters/validation.ts');
const usage = await pureModule('src/parameters/usage.ts');
const directory = await loadComponentDirectory(root);
const api = JSON.parse(await readFile(path.join(root, 'catalog/parameter-api.json'), 'utf8'));
const failures = [];
let fields = 0, states = 0, props = 0, controls = 0;
for (const entry of directory.components) {
  const definition = JSON.parse(await readFile(path.join(root, 'src/parameters/definitions', `${entry.id}.json`), 'utf8'));
  const fail = message => failures.push(`${entry.id}: ${message}`);
  if (definition.version !== 1 || definition.id !== entry.id || definition.demoPath !== demoPathFor(directory, entry.id)) fail('definition identity or path mismatch');
  if (JSON.stringify(definition.props) !== JSON.stringify(api.components[entry.id].props)) fail('primary API differs from extracted source');
  const defaults = validation.defaultValues(definition);
  if (new Set(definition.fields.map(field => field.key)).size !== definition.fields.length) fail('duplicate control key');
  if (!validation.validateValues(definition, defaults)) fail('invalid default configuration');
  for (const field of definition.fields) {
    fields++; if (field.scope === 'state') states++;
    if (!field.description || !field.type || !['live', 'rebuild'].includes(field.apply)) fail(`incomplete parameter ${field.key}`);
    if (field.scope === 'prop') {
      const target = definition.targets.find(target => target.id === field.target);
      if (!target || !target.props?.some(prop => prop.name === field.name)) fail(`control has no real prop: ${field.key}`);
      else controls++;
    }
  }
  props += definition.props.length;
  for (const target of definition.targets) {
    if (target.sourcePath) await access(path.join(root, target.sourcePath));
    for (const prop of target.props ?? []) if (!prop.name || !prop.type || !prop.description) fail(`incomplete API for ${target.name}.${prop.name}`);
  }
  const current = usage.currentUsage(definition, defaults);
  const parsed = ts.createSourceFile(`${entry.id}.tsx`, current, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  if (parsed.parseDiagnostics.length) fail('copyable usage TSX does not parse');
  if (/__AW_(?:PROPS|STATE|VALUE)_/.test(current)) fail('usage has an unresolved marker');
  if (/\buseDemo(?:Config|State)\b/.test(current)) fail('copyable usage still depends on the gallery configuration');
}
const report = { total: directory.total, primaryProps: props, fields, controlledStates: states, mappedPropControls: controls, failures };
await writeFile(path.join(root, 'catalog/parameter-report.json'), `${JSON.stringify(report, null, 2)}\n`);
if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1; }
else console.log(`Verified ${directory.total} complete API records/default usages, ${fields} valid fields, ${controls} mapped prop controls and ${states} controlled values.`);
