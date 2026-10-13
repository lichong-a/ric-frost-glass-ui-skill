import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

async function moduleFor(name) {
  const source = await readFile(new URL(`../src/effects/webgpu-compatibility/${name}.ts`, import.meta.url), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
}

test('missing WebGPU and insecure contexts select the working Canvas backend without requesting a device', async () => {
  const { selectBackend } = await moduleFor('backend');
  assert.equal((await selectBackend(true)).backend, 'canvas');
  let calls = 0;
  const gpu = { requestAdapter: async () => { calls++; return {}; } };
  assert.equal((await selectBackend(false, gpu)).backend, 'canvas');
  assert.equal(calls, 0);
  assert.equal((await selectBackend(true, gpu)).backend, 'webgpu');
  assert.equal(calls, 1);
});

test('a null adapter or failed adapter request selects Canvas rather than rejecting the preview', async () => {
  const { selectBackend } = await moduleFor('backend');
  for (const requestAdapter of [async () => null, async () => { throw new Error('device unavailable'); }]) {
    const result = await selectBackend(true, { requestAdapter });
    assert.equal(result.backend, 'canvas');
    assert.ok(result.reason);
  }
});

test('an adapter request that never settles cannot leave the preview loading indefinitely', async () => {
  const { selectBackend } = await moduleFor('backend');
  const result = await selectBackend(true, { requestAdapter: () => new Promise(() => {}) }, 5);
  assert.equal(result.backend, 'canvas');
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
