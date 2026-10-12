import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

// Load only pure policy / protocol / registry functions. No React, DOM emulator,
// component renderer, browser, canvas, or upstream implementation is executed.
async function importPureTypeScript(relativePath) {
  const filename = new URL(relativePath, import.meta.url);
  const text = await readFile(filename, 'utf8');
  const compiled = ts.transpileModule(text, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  assert.doesNotMatch(compiled, /^\s*import\s/m, 'Pure runtime modules must not pull component or effect modules into this test.');
  return import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
}
const policy = await importPureTypeScript('../src/runtime/policy.ts');
const protocol = await importPureTypeScript('../src/runtime/protocol.ts');
const { createPreviewRegistry } = await importPureTypeScript('../src/runtime/registry.ts');

test('system motion preference gates dynamic entries with explicit local overrides', () => {
  assert.equal(policy.isMotionReduced('system', true), true);
  assert.equal(policy.isMotionReduced('system', false), false);
  assert.equal(policy.isMotionReduced('allow', true), false);
  assert.equal(policy.isMotionReduced('reduce', false), true);
  assert.equal(policy.shouldGateMotion({ motion: 'continuous' }, true), true);
  assert.equal(policy.shouldGateMotion({ motion: 'interactive' }, true), true);
  assert.equal(policy.shouldGateMotion({ motion: 'none' }, true), false);
  assert.equal(policy.shouldGateMotion({ motion: 'continuous' }, false), false);
  assert.equal(policy.parseMotionMode('invalid'), 'system');
});

test('frame URLs retain application base path and reject an outside origin or protocol', () => {
  const build = overrides => protocol.buildPreviewUrl({ previewUrl: 'preview.html', baseUrl: 'https://demo.example/my-app/', componentId: 'spring-check', channel: 'instance-1', motion: 'system', ...overrides });
  const url = build();
  assert.equal(url.pathname, '/my-app/preview.html');
  assert.equal(url.searchParams.get('component'), 'spring-check');
  assert.equal(url.searchParams.get('channel'), 'instance-1');
  assert.equal(url.searchParams.get('motion'), 'system');
  assert.throws(() => build({ previewUrl: 'https://external.example/preview.html' }), /origin/);
  assert.throws(() => build({ previewUrl: 'javascript:alert(1)' }), /HTTP/);
});

test('message envelopes require typed protocol fields and matching component instance', () => {
  const envelope = { protocol: protocol.PREVIEW_PROTOCOL, channel: 'instance-1', componentId: 'spring-check' };
  assert.equal(protocol.isFrameMessage({ ...envelope, type: 'status', status: 'ready' }), true);
  assert.equal(protocol.isFrameMessage({ ...envelope, type: 'status', status: 'invented' }), false);
  assert.equal(protocol.isFrameMessage({ ...envelope, type: 'status', status: 'error', detail: {} }), false);
  assert.equal(protocol.isFrameMessage({ ...envelope, protocol: 'other', type: 'frame-ready' }), false);
  assert.equal(protocol.isFrameMessage(null), false);
  assert.equal(protocol.isHostMessage({ ...envelope, type: 'preferences', active: false, motion: 'system' }), true);
  assert.equal(protocol.isHostMessage({ ...envelope, type: 'preferences', active: 'false', motion: 'system' }), false);
  assert.equal(protocol.isMatchingEnvelope(envelope, 'instance-1', 'spring-check'), true);
  assert.equal(protocol.isMatchingEnvelope(envelope, 'instance-2', 'spring-check'), false);
  assert.equal(protocol.isMatchingEnvelope(envelope, 'instance-1', 'other-component'), false);
});

test('registry checks both directions of the mapping without executing lazy imports', () => {
  let imported = 0;
  const loader = async () => { imported += 1; return { default: () => null }; };
  const entry = { id: 'spring-check', name: 'Spring Check', category: 'micro', motion: 'interactive', webgl: 'none' };
  const registry = createPreviewRegistry([entry], { 'spring-check': loader });
  assert.equal(imported, 0);
  assert.equal(registry.getLoader('spring-check'), loader);
  assert.equal(registry.getEntry('unknown'), undefined);
  assert.throws(() => createPreviewRegistry([entry], {}), /Missing/);
  assert.throws(() => createPreviewRegistry([entry, entry], { 'spring-check': loader }), /Duplicate/);
  assert.throws(() => createPreviewRegistry([entry], { 'spring-check': loader, extra: loader }), /no catalog entry/);
  assert.throws(() => createPreviewRegistry([{ ...entry, id: '../invalid' }], {}), /Invalid/);
});

test('preview height metadata is finite, rounded and bounded', () => {
  assert.equal(policy.normalizePreviewHeight(undefined), 560);
  assert.equal(policy.normalizePreviewHeight(Number.NaN), 560);
  assert.equal(policy.normalizePreviewHeight(Infinity), 560);
  assert.equal(policy.normalizePreviewHeight(12), 320);
  assert.equal(policy.normalizePreviewHeight(999999), 1200);
  assert.equal(policy.normalizePreviewHeight(500.7), 501);
});

test('capability policy accepts plain DOM work and rejects graphics without a browser', async () => {
  assert.equal(typeof document, 'undefined');
  assert.deepEqual(await policy.detectGraphicsSupport('none'), { available: true });
  assert.equal((await policy.detectGraphicsSupport('webgl')).available, false);
  assert.equal((await policy.detectGraphicsSupport('webgpu')).available, false);
});
