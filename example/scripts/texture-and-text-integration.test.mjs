import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFile } from 'node:fs/promises';
import { adaptUpstream } from './adapt-upstream.mjs';
test('local SVG textures carry intrinsic dimensions required by WebGL image uploads', async () => {
  for (let index = 1; index <= 6; index++) {
    const source = await readFile(new URL(`../public/media/scene-${index}.svg`, import.meta.url), 'utf8');
    const root = source.match(/<svg\b[^>]*>/)[0];
    assert.match(root, /\bwidth="800"/);
    assert.match(root, /\bheight="600"/);
    assert.match(root, /\bviewBox="0 0 800 600"/);
  }
});
test('ScrambledText retains char scrambling and adds word boundaries in its locked adapter', async () => {
  const file = new URL('../.upstream/src/ts-default/TextAnimations/ScrambledText/ScrambledText.tsx', import.meta.url);
  const original = await readFile(file, 'utf8');
  const transformed = adaptUpstream(original, file.pathname);
  assert.match(transformed, /type: 'words,chars'/);
  assert.match(transformed, /charsRef\.current = split\.chars/);
  assert.equal(transformed.replace("type: 'words,chars'", "type: 'chars'"), original);
  assert.equal(await readFile(file, 'utf8'), original);
  assert.throws(() => adaptUpstream(original.replace("type: 'chars'", "type: 'words'"), file.pathname), /no longer matches/);
});
