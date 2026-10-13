import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

async function moduleFor(name) {
  const source = await readFile(new URL(`../src/effects/webgpu-compatibility/${name}.ts`, import.meta.url), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
}

test('missing WebGPU and insecure contexts show unavailable without starting a compatibility renderer', async () => {
  const { selectBackend } = await moduleFor('backend');
  assert.equal((await selectBackend(true)).backend, 'unavailable');
  let calls = 0;
  const gpu = { requestAdapter: async () => { calls++; return {}; } };
  assert.equal((await selectBackend(false, gpu)).backend, 'unavailable');
  assert.equal(calls, 0);
  assert.equal((await selectBackend(true, gpu)).backend, 'webgpu');
  assert.equal(calls, 1);
});

test('a null adapter or failed adapter request leaves the original unavailable and retryable', async () => {
  const { selectBackend } = await moduleFor('backend');
  for (const requestAdapter of [async () => null, async () => { throw new Error('device unavailable'); }]) {
    const result = await selectBackend(true, { requestAdapter });
    assert.equal(result.backend, 'unavailable');
    assert.ok(result.reason);
  }
});

test('an adapter request that never settles cannot leave the preview loading indefinitely', async () => {
  const { selectBackend } = await moduleFor('backend');
  const result = await selectBackend(true, { requestAdapter: () => new Promise(() => {}) }, 5);
  assert.equal(result.backend, 'unavailable');
});

test('cancelling an adapter check releases its timer while safely ignoring the unabortable GPU request', async t => {
  const { selectBackend } = await moduleFor('backend');
  const timers = new Map();
  t.mock.method(globalThis, 'setTimeout', callback => { timers.set(1, callback); return 1; });
  t.mock.method(globalThis, 'clearTimeout', id => timers.delete(id));
  const controller = new AbortController();
  let resolved;
  void selectBackend(true, { requestAdapter: () => new Promise(() => {}) }, 1500, controller.signal).then(result => { resolved = result; });
  assert.equal(timers.size, 1);
  controller.abort();
  for (let count = 0; count < 4; count++) await Promise.resolve();
  assert.equal(timers.size, 0, 'a disposed preview must release its adapter-check timeout');
  assert.equal(resolved?.backend, 'unavailable');
});

async function lifecycleFixture(probe = async () => ({ backend: 'webgpu' })) {
  const { createWebGPULifecycle } = await moduleFor('backend');
  const states = [], timers = new Map();
  let serial = 0, readiness, disconnected = 0;
  const lifecycle = createWebGPULifecycle(probe, state => states.push(state), {
    setTimer: (callback, delay) => { timers.set(++serial, { callback, delay }); return serial; },
    clearTimer: id => timers.delete(id),
    observeReady: (_, callback) => { readiness = callback; return () => { readiness = undefined; disconnected++; }; },
  });
  const current = () => states.at(-1);
  const flush = async () => { await Promise.resolve(); await Promise.resolve(); };
  lifecycle.retry(); await flush();
  return { lifecycle, current, states, timers, flush, signal: ready => readiness?.(ready), disconnected: () => disconnected };
}

test('an available adapter mounts the original but only its real first-frame marker reports ready', async () => {
  const f = await lifecycleFixture();
  assert.equal(f.current().phase, 'starting');
  const attempt = f.current().attempt;
  const stop = f.lifecycle.mountOriginal({}, attempt);
  assert.equal(f.current().phase, 'starting');
  f.signal(false);
  assert.equal(f.current().phase, 'starting');
  f.signal(true);
  assert.equal(f.current().phase, 'ready');
  assert.equal(f.timers.size, 0);
  stop(); f.lifecycle.dispose();
  assert.equal(f.disconnected(), 1);
});

test('an original that never paints stops after 15 seconds and requires explicit compatibility opt-in', async () => {
  const f = await lifecycleFixture();
  f.lifecycle.mountOriginal({}, f.current().attempt);
  const timeout = [...f.timers.values()][0];
  assert.equal(timeout.delay, 15000);
  timeout.callback();
  assert.equal(f.current().phase, 'unavailable');
  assert.ok(f.current().reason);
  assert.equal(f.disconnected(), 1);
  f.signal(true);
  assert.equal(f.current().phase, 'unavailable', 'late first-frame notifications cannot remount a stopped renderer');
  f.lifecycle.openCompatibility();
  assert.equal(f.current().phase, 'compatibility');
  assert.equal(f.current().ready, false);
  f.lifecycle.canvasReady(f.current().attempt);
  assert.equal(f.current().ready, true);
  f.lifecycle.dispose();
});

test('WebGPU and compatibility failures remain recoverable without activating a different renderer', async () => {
  const f = await lifecycleFixture();
  const attempt = f.current().attempt;
  f.lifecycle.mountOriginal({}, attempt); f.signal(true);
  f.lifecycle.failOriginal(new Error('device lost'), attempt);
  assert.equal(f.current().phase, 'unavailable');
  assert.match(f.current().detail, /device lost/);
  assert.equal(f.timers.size, 0);
  f.lifecycle.openCompatibility();
  f.lifecycle.failCanvas(new Error('context lost'), f.current().attempt);
  assert.equal(f.current().phase, 'unavailable');
  assert.match(f.current().detail, /context lost/);
  f.lifecycle.retry(); await f.flush();
  assert.equal(f.current().phase, 'starting', 'retry checks WebGPU again instead of reopening Canvas');
  f.lifecycle.failOriginal(new Error('stale failure'), attempt);
  assert.equal(f.current().phase, 'starting');
  f.lifecycle.dispose();
});

test('a stopped or superseded adapter check ignores its late result', async () => {
  const resolves = [];
  const f = await lifecycleFixture(() => new Promise(resolve => resolves.push(resolve)));
  assert.equal(f.current().phase, 'checking');
  f.lifecycle.retry();
  resolves[0]({ backend: 'webgpu' }); await f.flush();
  assert.equal(f.current().phase, 'checking');
  f.lifecycle.dispose();
  const count = f.states.length;
  resolves[1]({ backend: 'webgpu' }); await f.flush();
  assert.equal(f.states.length, count);
  assert.equal(f.timers.size, 0);
});

test('compatibility cannot open during a successful original or an in-flight check', async () => {
  const f = await lifecycleFixture();
  f.lifecycle.openCompatibility();
  assert.equal(f.current().phase, 'starting');
  f.lifecycle.dispose();
});

test('shard paths move with time and preserve finite geometry at small and wide preview sizes', async () => {
  const { shardPose } = await moduleFor('aero-model');
  for (const flow of ['stream', 'vortex', 'ribbon']) {
    for (const [width, height] of [[320, 560], [1000, 560]]) {
      const first = shardPose(8, 100, 0, { flow }, width, height);
      const next = shardPose(8, 100, 3, { flow }, width, height);
      assert.notDeepEqual(first, next);
      assert.ok(Object.values(next).every(Number.isFinite));
      assert.ok(next.width > 0 && next.height > next.width);
    }
  }
});

test('repel and gather gestures change the actual shard geometry', async () => {
  const { shardPose } = await moduleFor('aero-model');
  const before = shardPose(8, 100, 0, {}, 1000, 560);
  const pointer = { x: before.x, y: before.y, active: true, gather: 0 };
  const repelled = shardPose(8, 100, 0, { interaction: 'repel' }, 1000, 560, pointer);
  assert.notDeepEqual(repelled, before);
  const target = { x: 500, y: 280, active: true, gather: 1 };
  const gathered = shardPose(8, 100, 0, {}, 1000, 560, target);
  assert.ok(Math.hypot(gathered.x - 500, gathered.y - 280) < Math.hypot(before.x - 500, before.y - 280));
});

test('shape waves change shape/brightness with time and respect explicit shape and size parameters', async () => {
  const { shapeCell } = await moduleFor('shape-model');
  const first = shapeCell(10, 8, 0, {}, 1000, 560);
  const later = shapeCell(10, 8, 4, {}, 1000, 560);
  assert.notDeepEqual(first, later);
  assert.equal(shapeCell(10, 8, 0, { shapes: 'circle' }, 1000, 560).shape, 'circle');
  assert.ok(shapeCell(10, 8, 0, { dotSize: 1 }, 1000, 560).size > shapeCell(10, 8, 0, { dotSize: 0.3 }, 1000, 560).size);
  assert.ok(later.level >= 0 && later.level <= 1);
});

test('shape charges brighten the hovered cell and intro progress reveals it', async () => {
  const { shapeCell } = await moduleFor('shape-model');
  const before = shapeCell(10, 8, 0, {}, 1000, 560, 0);
  const charged = shapeCell(10, 8, 0, {}, 1000, 560, 1);
  assert.ok(charged.hover > before.hover);
  assert.equal(shapeCell(10, 8, 0, { intro: true }, 1000, 560, 0, 0).reveal, 0);
  assert.equal(shapeCell(10, 8, 2, { intro: true }, 1000, 560, 0, 2).reveal, 1);
});

test('Canvas rendering freezes paused time and releases RAF, observers, listeners and held pointers', async () => {
  const { startCanvas } = await moduleFor('canvas-loop');
  const listeners = new Map(), captures = new Set(), queue = new Map();
  let serial = 0, disconnected = 0;
  const canvas = {
    getContext: () => ({ setTransform() {} }),
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 320, height: 200 }),
    addEventListener: (name, handler) => listeners.set(name, handler),
    removeEventListener: name => listeners.delete(name),
    setPointerCapture: id => captures.add(id),
    hasPointerCapture: id => captures.has(id),
    releasePointerCapture: id => captures.delete(id),
  };
  const frames = [], props = { paused: false };
  const stop = startCanvas(canvas, () => props, (_, state) => frames.push(structuredClone(state)), {
    request: callback => { queue.set(++serial, callback); return serial; },
    cancel: id => queue.delete(id),
    pixelRatio: 1,
    observeResize: () => () => disconnected++,
  });
  function tick(time) { const [id, callback] = [...queue][0]; queue.delete(id); callback(time); }
  tick(0); tick(40);
  assert.ok(frames[1].time > frames[0].time);
  props.paused = true; tick(80);
  assert.equal(frames[2].time, frames[1].time);
  listeners.get('pointerdown')({ clientX: 120, clientY: 100, pointerId: 7 });
  assert.ok(captures.has(7));
  stop(); stop();
  assert.equal(queue.size, 0); assert.equal(listeners.size, 0); assert.equal(captures.size, 0);
  assert.equal(disconnected, 1);
});

test('a Canvas paint failure stops its RAF, observer, listeners and held pointer before reporting failure', async () => {
  const { startCanvas } = await moduleFor('canvas-loop');
  const listeners = new Map(), captures = new Set(), queue = new Map();
  let serial = 0, disconnected = 0;
  const canvas = {
    getContext: () => ({ setTransform() {} }),
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 320, height: 200 }),
    addEventListener: (name, handler) => listeners.set(name, handler),
    removeEventListener: name => listeners.delete(name),
    setPointerCapture: id => captures.add(id),
    hasPointerCapture: id => captures.has(id),
    releasePointerCapture: id => captures.delete(id),
  };
  const failures = [];
  const stop = startCanvas(canvas, () => ({}), () => { throw new Error('paint failed'); }, {
    request: callback => { queue.set(++serial, callback); return serial; },
    cancel: id => queue.delete(id), pixelRatio: 1,
    observeResize: () => () => disconnected++,
  }, { onError: error => failures.push(error.message) });
  listeners.get('pointerdown')({ clientX: 120, clientY: 100, pointerId: 7 });
  const [id, callback] = [...queue][0]; queue.delete(id);
  let escaped;
  try { callback(0); } catch (error) { escaped = error; }
  assert.equal(listeners.size, 0, 'a stopped renderer must not retain interactive listeners');
  assert.equal(queue.size, 0);
  assert.equal(captures.size, 0);
  assert.equal(disconnected, 1);
  assert.equal(escaped, undefined, 'the failure is handled by the demo status card');
  assert.deepEqual(failures, ['paint failed']);
  stop();
  callback(40);
  assert.deepEqual(failures, ['paint failed'], 'disposed callbacks cannot paint or report again');
});

test('Canvas readiness is reported once after a successful paint, never on setup alone', async () => {
  const { startCanvas } = await moduleFor('canvas-loop');
  const queue = new Map();
  let serial = 0, paints = 0, ready = 0;
  const stop = startCanvas({
    getContext: () => ({ setTransform() {} }),
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 320, height: 200 }),
    addEventListener() {}, removeEventListener() {}, hasPointerCapture: () => false,
  }, () => ({}), () => paints++, {
    request: callback => { queue.set(++serial, callback); return serial; },
    cancel: id => queue.delete(id), pixelRatio: 1, observeResize: () => () => {},
  }, { onReady: () => { assert.ok(paints > 0); ready++; } });
  assert.equal(ready, 0);
  for (const time of [0, 40]) {
    const [id, callback] = [...queue][0]; queue.delete(id); callback(time);
  }
  assert.equal(ready, 1, 'the first painted frame must tell the runtime it is ready');
  stop();
});

test('an unavailable or throwing 2D context returns a handled failure without installing a loop', async () => {
  const { startCanvas } = await moduleFor('canvas-loop');
  for (const getContext of [() => null, () => { throw new Error('2D context denied'); }]) {
    let sideEffects = 0;
    const failures = [];
    const stop = startCanvas({ getContext }, () => ({}), () => sideEffects++, {
      request: () => { sideEffects++; return 1; }, cancel: () => sideEffects++, pixelRatio: 1,
      observeResize: () => { sideEffects++; return () => sideEffects++; },
    }, { onReady: () => sideEffects++, onError: error => failures.push(error.message) });
    stop(); stop();
    assert.equal(sideEffects, 0);
    assert.equal(failures.length, 1);
  }
});
