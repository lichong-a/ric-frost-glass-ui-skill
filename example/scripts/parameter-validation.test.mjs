import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
async function pureModule(file) {
  const source = await readFile(new URL(file, import.meta.url), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
}
const validation = await pureModule('../src/parameters/validation.ts');
const usage = await pureModule('../src/parameters/usage.ts');
const definition = { version: 1, id: 'cubes', name: 'Cubes', fields: [
  { key: 't0.gap', name: 'gap', scope: 'prop', target: 't0', control: 'range', defaultValue: 0.18, min: 0, max: 1 },
  { key: 't0.items', name: 'items', scope: 'prop', target: 't0', control: 'json', defaultValue: [{ id: 'a', height: 120 }], shape: { kind: 'array', items: { kind: 'object', required: ['id', 'height'], properties: { id: { kind: 'string' }, height: { kind: 'number' } } } } },
], targets: [{ id: 't0', name: 'Component' }], usageTemplate: 'export default function Demo() { return <Component /*__AW_PROPS_t0__*/ />; }' };
test('unique task identities reject the entire invalid order configuration without rewriting IDs', () => {
  const field = { ...definition.fields[1], uniqueBy: 'id' };
  const guarded = { ...definition, fields: [field] };
  const valid = [{ id: 'a', height: 100 }, { id: 'b', height: 200 }];
  const duplicate = [{ id: 'a', height: 100 }, { id: 'a', height: 200 }];
  assert.equal(validation.validateValues(guarded, { 't0.items': valid }), true);
  assert.equal(validation.validateValues(guarded, { 't0.items': duplicate }), false);
  assert.match(validation.validateField(field, duplicate), /唯一|重复/);
  assert.deepEqual(duplicate.map(item => item.id), ['a', 'a']);
});
test('invalid field edits never form an accepted preview configuration', () => {
  assert.equal(validation.validateValues(definition, { 't0.gap': 0.5 }), true);
  assert.equal(validation.validateValues(definition, { 't0.gap': -3 }), false);
  assert.equal(validation.validateValues(definition, { 't0.gap': null }), false);
  assert.equal(validation.validateValues(definition, { 't0.madeUp': 1 }), false);
  assert.equal(validation.validateValues(definition, { 't0.items': [{ id: 'a' }] }), false);
  assert.equal(validation.validateValues(definition, { 't0.items': [{ id: 'a', height: '120' }] }), false);
  assert.equal(validation.validateValues(definition, { 't0.items': [{ id: 'b', height: 200 }] }), true);
});
test('current usage serializes accepted values into valid TSX, including literal hostile text', () => {
  const result = usage.currentUsage(definition, { 't0.gap': 0.5, 't0.items': [{ id: '"/><script>alert(1)</script>', height: 150 }] });
  assert.match(result, /gap=\{0.5\}/);
  assert.match(result, /height.*150/);
  const parsed = ts.createSourceFile('Demo.tsx', result, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  assert.equal(parsed.parseDiagnostics.length, 0);
  assert.doesNotMatch(result, /__AW_PROPS/);
});
test('configuration rejects prototype keys, nonfinite values and oversized nested data', () => {
  assert.equal(validation.isDemoValues(JSON.parse('{"constructor":{"x":1}}')), false);
  assert.equal(validation.isDemoValues({ speed: NaN }), false);
  assert.equal(validation.isDemoValues({ particles: Array(513).fill(1) }), false);
  assert.equal(validation.isDemoValues({ color: '#5227ff' }), true);
});
test('nullable values retain null and validate each declared union branch', () => {
  const nullable = { key: 't0.selected', name: 'selected', scope: 'prop', target: 't0', control: 'json', defaultValue: 'initial', shape: { kind: 'union', variants: [{ kind: 'null' }, { kind: 'string' }] } };
  assert.equal(validation.validateField(nullable, null), null);
  assert.equal(validation.validateField(nullable, 'next'), null);
  assert.notEqual(validation.validateField(nullable, {}), null);
  const result = usage.currentUsage({ ...definition, fields: [nullable] }, { 't0.selected': null });
  assert.match(result, /selected=\{null\}/);
});
test('literal dollar patterns and resource characters cannot alter template substitution', () => {
  const field = { key: 't0.text', name: 'text', scope: 'prop', target: 't0', control: 'text', defaultValue: '' };
  const text = '$& $\' $` ${2 + 2}';
  const result = usage.currentUsage({ ...definition, fields: [field] }, { 't0.text': text });
  assert.ok(result.includes(`text={${JSON.stringify(text)}}`));
  assert.doesNotMatch(result, /__AW_PROPS/);
  for (const value of ['@media/scene`-1.svg', '@public/${2 + 2}.svg']) {
    const resource = { ...field, key: 't0.src', name: 'src', control: 'resource' };
    const snippet = usage.currentUsage({ ...definition, fields: [resource] }, { 't0.src': value });
    const parsed = ts.createSourceFile('Demo.tsx', snippet, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    assert.equal(parsed.parseDiagnostics.length, 0);
    assert.ok(snippet.includes(JSON.stringify(value.replace(/^@(?:media|public)\//, value.startsWith('@media') ? 'media/' : ''))));
  }
});
test('unknown artwork inside editable structured data is rejected before renderer dispatch', () => {
  const field = { key: 't0.items', name: 'items', control: 'json', resources: ['@asset/restoration/mineral-tide.svg'] };
  assert.equal(validation.validateField(field, [{ img: '@asset/restoration/mineral-tide.svg' }]), null);
  assert.notEqual(validation.validateField(field, [{ img: '@asset/restoration/missing.svg' }]), null);
});
test('CSS alpha colors preserve their channel while native pickers receive valid RGB', () => {
  assert.deepEqual(validation.colorPickerParts('#ffffff26'), { rgb: '#ffffff', alpha: '26' });
  assert.deepEqual(validation.colorPickerParts('#abc8'), { rgb: '#aabbcc', alpha: '88' });
  assert.deepEqual(validation.colorPickerParts('#abc'), { rgb: '#aabbcc', alpha: '' });
  assert.equal(validation.colorPickerParts('#12345'), null);
  assert.equal(validation.colorPickerParts('#1234567'), null);
  assert.equal(validation.validateField({ control: 'color' }, '#12345680'), null);
  assert.notEqual(validation.validateField({ control: 'color' }, '#1234567'), null);
});
