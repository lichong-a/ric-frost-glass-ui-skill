import assert from 'node:assert/strict';
import test, { before, after } from 'node:test';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import { createElement, act, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { renderToStaticMarkup } from 'react-dom/server';
import { installPreviewDom } from './test-support/preview-dom.mjs';
import { waitForCondition } from './test-support/wait-for-condition.mjs';

let server, PreviewRuntime, IsolatedPreview, useWebGPUCompatibility;
before(async () => {
  server = await createServer({ root: fileURLToPath(new URL('../', import.meta.url)), server: { middlewareMode: true, hmr: false }, appType: 'custom' });
  ({ PreviewRuntime } = await server.ssrLoadModule('/src/runtime/PreviewRuntime.tsx'));
  ({ IsolatedPreview } = await server.ssrLoadModule('/src/runtime/IsolatedPreview.tsx'));
  ({ useWebGPUCompatibility } = await server.ssrLoadModule('/src/effects/webgpu-compatibility/useWebGPUCompatibility.tsx'));
  // Use the real loader and its shared Vite module cache; no definition or Runtime is replaced.
  const { loadDefinition } = await server.ssrLoadModule('/src/parameters/load.ts');
  await loadDefinition('aero-shards');
});

test('the mounted-condition wait survives more than 100 scheduler turns within its time bound', async () => {
  let turns = 0, elapsed = 0, mounted = false;
  await waitForCondition(() => mounted, {
    description: 'the mounted fixture', timeoutMs: 5000, now: () => elapsed,
    yieldTurn: async () => { turns++; elapsed++; if (turns === 250) mounted = true; },
  });
  assert.equal(mounted, true);
  assert.equal(turns, 250);
});

test('the mounted-condition wait fails at its time bound when the fixture never mounts', async () => {
  let elapsed = 0;
  await assert.rejects(waitForCondition(() => false, {
    description: 'the mounted fixture', timeoutMs: 5000, now: () => elapsed,
    yieldTurn: async () => { elapsed += 1000; },
  }), /Timed out after 5000 ms waiting for the mounted fixture/);
});

test('a slow scheduler turn cannot extend the mounted-condition deadline', async () => {
  let elapsed = 0, mounted = false;
  await assert.rejects(waitForCondition(() => mounted, {
    description: 'the mounted fixture', timeoutMs: 5000, now: () => elapsed,
    yieldTurn: async () => { elapsed = 6000; mounted = true; },
  }), /Timed out after 5000 ms/);
});

async function mountDemo({ gpu, original, painter } = {}) {
  const dom = installPreviewDom({ embedded: false });
  globalThis.navigator.gpu = gpu;
  function Demo() { return useWebGPUCompatibility(createElement(original ?? 'div'), painter ?? (() => () => {}), { componentName: 'Aero Shards' }); }
  const root = createRoot(dom.container);
  try { await act(async () => root.render(createElement(Demo))); }
  catch (error) { await act(async () => root.unmount()); dom.restore(); throw error; }
  return { ...dom, async stop() { await act(async () => root.unmount()); dom.restore(); } };
}

async function click(dom, text) {
  const button = dom.container.querySelectorAll('button').find(item => item.textContent === text);
  assert.ok(button, `missing action: ${text}`);
  const event = new Event('click', { bubbles: true });
  Object.defineProperty(event, 'target', { value: button });
  await act(async () => dom.container.dispatchEvent(event));
}

test('an unavailable original shows a named recovery card and waits for user compatibility opt-in', async () => {
  let paints = 0;
  const dom = await mountDemo({ painter: () => { paints++; return () => {}; } });
  try {
    assert.match(dom.container.textContent, /Aero Shards.*暂不可用/);
    assert.equal(paints, 0);
    assert.equal(dom.container.querySelector('canvas'), null);
    await click(dom, '打开兼容演示');
    assert.equal(paints, 1);
    assert.ok(dom.container.querySelector('canvas'));
    assert.match(dom.container.textContent, /Canvas 兼容演示/);
  } finally { await dom.stop(); }
});

test('a compatibility setup error returns to the recovery card without escaping the React subtree', async () => {
  const dom = await mountDemo({ painter: () => { throw new Error('2D context creation failed'); } });
  try {
    await click(dom, '打开兼容演示');
    assert.equal(dom.container.querySelector('canvas'), null);
    assert.match(dom.container.textContent, /Aero Shards.*暂不可用/);
    assert.match(dom.container.querySelector('details')?.textContent ?? '', /2D context creation failed/);
    assert.equal(dom.container.querySelector('details').getAttribute('open'), null);
    await click(dom, '重新检查');
    assert.equal(dom.container.querySelector('canvas'), null);
  } finally { await dom.stop(); }
});

test('the mounted original waits for its data-ready marker and handles a post-ready renderer failure', async () => {
  let setReady, failOriginal;
  function Original({ onError }) { const [ready, set] = useState(false); setReady = set; failOriginal = onError; return createElement('div', { 'data-ready': ready }); }
  const dom = await mountDemo({ gpu: { requestAdapter: async () => ({}) }, original: Original });
  try {
    assert.equal(dom.container.firstChild.getAttribute('data-effect-state'), 'starting');
    await act(async () => setReady(true));
    assert.equal(dom.container.firstChild.getAttribute('data-effect-state'), 'ready');
    await act(async () => failOriginal(new Error('device lost after presentation')));
    assert.equal(dom.container.firstChild.getAttribute('data-effect-state'), 'unavailable');
    assert.equal(dom.container.querySelector('[data-ready]'), null);
    assert.equal(dom.container.querySelector('canvas'), null);
  } finally { await dom.stop(); }
});

for (const [statusMode, expectedMounted] of [['demo', true], [undefined, false]]) {
  test(`${statusMode ?? 'default'} host status preserves its iframe error recovery contract`, async () => {
    const dom = installPreviewDom();
    const root = createRoot(dom.container);
    const entry = { id: 'aero-shards', name: 'Aero Shards', category: 'background', motion: 'continuous', webgl: 'none', ...(statusMode ? { statusMode } : {}) };
    try {
      await act(async () => root.render(createElement(IsolatedPreview, { entry, previewUrl: '/preview.html', motion: 'allow' })));
      const frame = dom.container.querySelector('iframe');
      const url = new URL(frame.getAttribute('src'));
      const event = new Event('message');
      Object.assign(event, { origin: dom.window.location.origin, source: frame.contentWindow, data: { protocol: 'agent-wan-reactbits/v1', channel: url.searchParams.get('channel'), componentId: entry.id, type: 'status', status: 'error', detail: 'recoverable demo failure' } });
      await act(async () => dom.window.dispatchEvent(event));
      assert.equal(dom.container.querySelector('iframe') === frame, expectedMounted);
    } finally { await act(async () => root.unmount()); dom.restore(); }
  });
}
after(async () => { await server?.close(); });

async function mountRuntime(statusMode, { gpu, Demo } = {}) {
  const dom = installPreviewDom();
  globalThis.navigator.gpu = gpu;
  const entry = { id: 'aero-shards', name: 'Aero Shards', category: 'background', motion: 'continuous', webgl: 'none', ...(statusMode ? { statusMode } : {}) };
  const loader = async () => ({ default: Demo ?? (() => createElement('div', null, 'original awaiting first frame')) });
  const root = createRoot(dom.container);
  try {
    await act(async () => root.render(createElement(PreviewRuntime, { registry: { getEntry: () => entry, getLoader: () => loader, entries: [entry] } })));
    await act(async () => {
      const envelope = { protocol: 'agent-wan-reactbits/v1', channel: 'test-channel', componentId: entry.id };
      dom.hostMessage({ ...envelope, type: 'preferences', active: true, motion: 'allow' });
      dom.hostMessage({ ...envelope, type: 'configuration', revision: 0, values: {} });
    });
    await waitForCondition(() => dom.container.textContent.includes('original awaiting first frame'), {
      description: 'the real Runtime demo subtree to mount',
      yieldTurn: () => act(async () => new Promise(resolve => setImmediate(resolve))),
    });
  } catch (error) {
    const lastRender = dom.container.textContent;
    await act(async () => root.unmount()); dom.restore();
    throw new Error(`${error.message}\nLast rendered state: ${lastRender}`, { cause: error });
  }
  return { ...dom, async stop() { await act(async () => root.unmount()); dom.restore(); } };
}

test('a demo-managed preview does not announce ready simply because React mounted', async () => {
  const dom = await mountRuntime('demo');
  try {
    assert.match(dom.container.textContent, /original awaiting first frame/);
    assert.equal(dom.messages.some(message => message.type === 'status' && message.status === 'ready'), false, 'only the demo may confirm the rendered first frame');
  } finally { await dom.stop(); }
});

test('entries without statusMode preserve the runtime mount-ready protocol', async () => {
  const dom = await mountRuntime();
  try {
    assert.match(dom.container.textContent, /original awaiting first frame/);
    assert.equal(dom.messages.some(message => message.type === 'status' && message.status === 'ready'), true);
  } finally { await dom.stop(); }
});

test('demo first-frame, failure, compatibility and retry statuses reach the host through the existing protocol', async () => {
  let setReady, failOriginal, canvasEvents, stopped = 0, probes = 0;
  function Original({ onError }) {
    const [ready, set] = useState(false); setReady = set; failOriginal = onError;
    return createElement('div', { 'data-ready': ready }, 'original awaiting first frame');
  }
  const painter = (_, __, lifecycle) => { canvasEvents = lifecycle; return () => stopped++; };
  function Demo() {
    return useWebGPUCompatibility(createElement(Original), painter, { componentName: 'Aero Shards' });
  }
  const dom = await mountRuntime('demo', { gpu: { requestAdapter: async () => { probes++; return {}; } }, Demo });
  const statuses = () => dom.messages.filter(message => message.type === 'status');
  try {
    assert.equal(statuses().some(message => message.status === 'ready'), false);
    await act(async () => setReady(true));
    assert.equal(statuses().at(-1).status, 'ready');
    assert.equal(statuses().at(-1).detail, 'WebGPU 原版已就绪');
    await act(async () => failOriginal(new Error('GPU device lost')));
    assert.equal(statuses().at(-1).status, 'unsupported');
    assert.equal(dom.container.querySelector('canvas'), null);
    await click(dom, '打开兼容演示');
    assert.equal(statuses().at(-1).status, 'loading');
    await act(async () => canvasEvents.onReady());
    assert.equal(statuses().at(-1).status, 'ready');
    assert.equal(statuses().at(-1).detail, 'Canvas 兼容演示已就绪');
    await click(dom, '重试原版');
    assert.equal(probes, 2);
    assert.equal(stopped, 1);
    assert.equal(dom.container.querySelector('canvas'), null);
    assert.equal(statuses().at(-1).status, 'loading');
    await act(async () => canvasEvents.onError(new Error('late compatibility error')));
    assert.equal(statuses().at(-1).status, 'loading', 'disposed Canvas callbacks cannot stop the new original');
  } finally { await dom.stop(); }
});

test('the initial WebGPU status names the component and does not silently render compatibility', () => {
  function Demo() { return useWebGPUCompatibility(createElement('div'), () => () => {}, { componentName: 'Aero Shards' }); }
  const html = renderToStaticMarkup(createElement(Demo));
  assert.match(html, /Aero Shards/);
  assert.match(html, /WebGPU/);
  assert.doesNotMatch(html, /<canvas/);
});
