import assert from 'node:assert/strict';
import { readFile, mkdtemp, writeFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { createExtractionProgram, extractComponentApi } from './lib/parameter-extraction.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const catalog = JSON.parse(await readFile(path.join(root, 'catalog/parameter-api.json'), 'utf8'));
const api = id => catalog.components[id];
const prop = (id, name) => api(id).props.find(prop => prop.name === name);

test('the actual API catalog covers every frozen and business demo with independent JSX targets', async () => {
  const upstream = JSON.parse(await readFile(path.join(root, 'catalog/upstream-manifest.json'), 'utf8'));
  const business = JSON.parse(await readFile(path.join(root, 'catalog/business-catalog.json'), 'utf8'));
  assert.equal(catalog.version, 1);
  assert.equal(Object.keys(catalog.components).length, upstream.total + business.total);
  for (const entry of upstream.components) assert.ok(api(entry.slug)?.props.length, `missing locked API: ${entry.slug}`);
  for (const entry of business.components) {
    const component = api(entry.id);
    assert.ok(component, entry.id);
    assert.ok(component.targets.length, `missing actual target APIs: ${entry.id}`);
    assert.equal(new Set(component.targets.map(target => target.name)).size, component.targets.length);
    for (const target of component.targets) assert.ok(target.occurrences.length, `${entry.id}/${target.name}`);
  }
  const datePicker = api('business-datepicker');
  assert.equal(datePicker.componentName, 'DatePicker');
  assert.ok(!datePicker.props.some(prop => prop.name === 'variant'), 'Button props must not leak into DatePicker');
  assert.ok(datePicker.targets.some(target => target.name === 'Field'));
});

test('Cubes exposes every declared custom field and its real gap default without internal settings', () => {
  assert.equal(prop('cubes', 'gap').type, 'number');
  assert.equal(prop('cubes', 'gap').required, false);
  assert.equal(prop('cubes', 'gap').defaultValue, 0.18);
  assert.equal(prop('cubes', 'gap').defaultExpression, '0.18');
  assert.equal(prop('cubes', 'edgeStyle').type, 'CubesEdgeStyle');
  assert.deepEqual(prop('cubes', 'edgeStyle').options, ['solid', 'dashed', 'dotted', 'none']);
  assert.ok(api('cubes').inherited.some(type => type.type === 'HTMLAttributes<HTMLDivElement>'));
  assert.ok(api('cubes').props.length < 50, 'native HTML fields should stay grouped as inherited types');
  assert.ok(!api('cubes').props.some(prop => ['vertices', 'indices', 'config', 'aPosition', 'uSize'].includes(prop.name)));
});

test('GlitchText shadows default to enabled and its content remains required', () => {
  assert.equal(prop('glitch-text', 'enableShadows').defaultValue, true);
  assert.equal(prop('glitch-text', 'enableShadows').defaultExpression, 'true');
  assert.equal(prop('glitch-text', 'enableOnHover').defaultValue, false);
  assert.equal(prop('glitch-text', 'children').type, 'string');
  assert.equal(prop('glitch-text', 'children').required, true);
  assert.ok(!api('glitch-text').props.some(prop => prop.name.startsWith('--')), 'private CSS custom properties are not public Props');
  assert.ok(!api('glitch-text').inherited.some(type => /^FC</.test(type.type)), 'React.FC is an annotation, not inherited native props');
});

test('callbacks, references and structured options retain their contracts and code usage', () => {
  assert.equal(prop('business-datepicker', 'onChange').type, '(value: string) => void');
  assert.equal(prop('business-datepicker', 'onChange').valueKind, 'callback');
  assert.equal(prop('business-datepicker', 'onChange').editable, false);
  assert.match(prop('business-datepicker', 'onChange').codeExample, /onChange=/);
  const focusRef = prop('business-focustrap', 'returnFocusRef');
  assert.equal(focusRef.type, 'RefObject<HTMLElement | null>');
  assert.equal(focusRef.valueKind, 'ref');
  assert.match(focusRef.codeExample, /useRef<HTMLElement \| null>/);
  const options = prop('business-select', 'options');
  assert.match(options.type, /readonly.*value: string; label: string/);
  assert.ok(options.details);
  assert.equal(options.editable, false);
  const input = api('business-inputtext').nativeElements.find(element => element.tag === 'input');
  assert.match(input.type, /InputHTMLAttributes<HTMLInputElement>/);
  assert.match(input.observedProps.find(prop => prop.name === 'onChange').type, /ChangeEventHandler/);
  assert.ok(input.observedProps.every(prop => prop.defaultExpression === undefined), 'example attributes are not component defaults');
});

test('memo and forwardRef extraction respects aliases, nested types, inherited exclusions and literal-only defaults', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'wan-parameter-extraction-'));
  const file = path.join(directory, 'Fixture.tsx');
  const reactTypePath = path.join(root, 'node_modules/@types/react/index').split(path.sep).join('/');
  try {
    await writeFile(file, `import React, { forwardRef, memo } from ${JSON.stringify(reactTypePath)};
      interface PrivateSettings { shaderPosition: number; secretHelper: string }
      type Entry = { id: string; label: React.ReactNode; disabled?: boolean };
      type Props = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> & {
        variant?: 'soft' | 'strong'; count: number; enabled?: boolean; entries?: Entry[];
        onChange: (entry: Entry, index: number) => void; expression?: number; pressed?: boolean; imageSrc?: string;
      };
      const initialEntries = [{ id: 'one', label: 'First' }];
      const shouldNotRun = () => { throw new Error('EXTRACTION EXECUTED CODE'); };
      const Inner = forwardRef<HTMLButtonElement, Props>((props, ref) => {
        const { variant = 'soft', enabled = true, entries = initialEntries, expression = shouldNotRun(), pressed, imageSrc, ...rest } = props;
        const styleVariant = pressed ? 'primary' : 'secondary';
        const internalSource = imageSrc ?? null;
        return null;
      });
      export default memo(Inner);
    `);
    const program = createExtractionProgram([file], root);
    const component = extractComponentApi(program, file, { root, id: 'fixture' });
    const byName = new Map(component.props.map(prop => [prop.name, prop]));
    assert.equal(byName.get('variant').defaultValue, 'soft');
    assert.equal(byName.get('enabled').defaultValue, true);
    assert.equal(byName.get('count').required, true);
    assert.deepEqual(byName.get('entries').defaultValue, [{ id: 'one', label: 'First' }]);
    assert.equal(byName.get('entries').defaultExpression, 'initialEntries');
    assert.equal(byName.get('expression').defaultExpression, 'shouldNotRun()');
    assert.ok(!Object.hasOwn(byName.get('expression'), 'defaultValue'));
    assert.equal(byName.get('onChange').type, '(entry: Entry, index: number) => void');
    assert.ok(component.inherited.some(type => /Omit<React.ButtonHTMLAttributes/.test(type.type)));
    assert.ok(!byName.has('shaderPosition'));
    assert.ok(!byName.has('secretHelper'));
    assert.ok(!byName.has('onClick'), 'unhandled native events remain inherited');
    assert.ok(!Object.hasOwn(byName.get('pressed'), 'defaultValue'), 'a derived appearance is not the pressed Prop default');
    assert.ok(!Object.hasOwn(byName.get('pressed'), 'defaultExpression'));
    assert.equal(byName.get('imageSrc').defaultExpression, 'null');
    assert.equal(byName.get('imageSrc').defaultAcceptsAsProp, false);
    assert.ok(!Object.hasOwn(byName.get('imageSrc'), 'defaultValue'), 'an internal null sentinel is not a public string value');
  } finally {
    await rm(directory, { recursive: true });
  }
});

test('every documented custom prop has Chinese meaning and compound values have usable examples', () => {
  for (const component of Object.values(catalog.components)) {
    for (const prop of component.props) {
      assert.match(prop.description, /[\u4e00-\u9fff]/, `${component.id}.${prop.name}`);
      assert.equal(typeof prop.required, 'boolean', `${component.id}.${prop.name}`);
      assert.ok(prop.type && prop.codeExample, `${component.id}.${prop.name}`);
      if (['callback', 'object', 'array', 'ref', 'react-node'].includes(prop.valueKind)) assert.equal(prop.control, 'code', `${component.id}.${prop.name}`);
    }
  }
});

test('canonical authored source overrides the transformed demo in memory without changing the file', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'wan-parameter-template-'));
  const file = path.join(directory, 'Template.tsx');
  const transformed = 'export default function Transformed() { return null; }\n';
  const authored = 'export default function Authored({ count = 7 }: { count?: number }) { return null; }\n';
  try {
    await writeFile(file, transformed);
    const program = createExtractionProgram([file], root, { sourceOverrides: new Map([[file, authored]]) });
    const component = extractComponentApi(program, file, { root, id: 'canonical' });
    assert.equal(component.componentName, 'Authored');
    assert.equal(component.props.find(prop => prop.name === 'count').defaultValue, 7);
    assert.equal(await readFile(file, 'utf8'), transformed);
  } finally {
    await rm(directory, { recursive: true });
  }
});
