import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFile } from 'node:fs/promises';
import { adaptUpstream } from './adapt-upstream.mjs';
const file = new URL('../.upstream/src/ts-default/Animations/LogoLoop/LogoLoop.css', import.meta.url);
test('LogoLoop missing list preflight applies only to its locked component CSS', async () => {
  const original = await readFile(file, 'utf8');
  const transformed = adaptUpstream(original, file.pathname);
  assert.match(transformed, /\.logoloop__list \{\n  list-style: none;\n  margin: 0;\n  padding: 0;/);
  assert.equal(transformed.replace('  list-style: none;\n  margin: 0;\n  padding: 0;\n', ''), original);
  assert.equal(await readFile(file, 'utf8'), original);
  assert.equal(adaptUpstream(original, '/src/another-list.css'), null);
  assert.throws(() => adaptUpstream(original.replace('.logoloop__list {', '.renamed-list {'), file.pathname), /no longer matches/);
});
