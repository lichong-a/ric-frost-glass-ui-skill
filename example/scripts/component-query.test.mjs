import assert from 'node:assert/strict';
import test from 'node:test';
import { execFile } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const exec = promisify(execFile);
const root = fileURLToPath(new URL('../', import.meta.url));
const script = path.join(root, 'tooling/progressive/scripts/find-component.mjs');

async function fixture(t) {
  const temporary = await mkdtemp(path.join(tmpdir(), 'wan-component-query-'));
  t.after(() => rm(temporary, { recursive: true, force: true }));
  const actual = JSON.parse(await readFile(path.join(root, 'docs/component-index.json'), 'utf8'));
  const ids = new Set(['business-tabs', 'business-panel', 'business-splitter', 'gooey-nav', 'branched-menu', 'scrub-field']);
  const components = actual.components.filter(item => ids.has(item.id));
  const index = path.join(temporary, 'index.json');
  await writeFile(index, JSON.stringify({ components }));
  return index;
}

async function query(index, args) {
  const result = await exec(process.execPath, [script, '--index', index, '--json', '--limit', '20', ...args]);
  return { ...result, output: JSON.parse(result.stdout) };
}

test('purpose category labels do not include components with the same old family tag', async t => {
  const index = await fixture(t);
  const { output } = await query(index, ['--category', '布局与流程', '--provider', 'business']);
  assert.ok(output.matches.length > 0);
  assert.ok(output.matches.every(item => item.category === 'layout'));
  assert.ok(!output.matches.some(item => item.id === 'business-tabs'));
});

test('source tags filter within the selected purpose category without changing its identity', async t => {
  const index = await fixture(t);
  const { output } = await query(index, ['--category', 'navigation', '--tag', 'micro', '--provider', 'effects']);
  assert.deepEqual(output.matches.map(item => item.id), ['branched-menu']);
  assert.equal(output.matches[0].category, 'navigation');
  assert.equal(output.tag, 'micro');
});

test('legacy source-category arguments remain usable and explain the tag migration', async t => {
  const index = await fixture(t);
  const { output, stderr } = await query(index, ['--category', 'micro']);
  assert.ok(output.matches.some(item => item.id === 'branched-menu'));
  assert.ok(output.matches.some(item => item.id === 'scrub-field'));
  assert.ok(Array.isArray(output.warnings));
  assert.ok(output.warnings.some(message => message.includes('--tag')));
  assert.match(stderr, /--tag/);
});

test('an unknown purpose category is rejected with useful choices', async t => {
  const index = await fixture(t);
  await assert.rejects(query(index, ['--category', 'made-up-category']), error => {
    assert.match(error.stderr, /用途分类/);
    assert.match(error.stderr, /navigation/);
    return true;
  });
});

test('exact names and provider disambiguation retain the same direct guide and source', async t => {
  const index = await fixture(t);
  const { output } = await query(index, ['Tabs', '--provider', 'business', '--exact']);
  assert.equal(output.totalMatches, 1);
  assert.equal(output.matches[0].id, 'business-tabs');
  assert.equal(output.matches[0].readFirst, 'example/docs/business/components/business-tabs.md');
  assert.equal(output.matches[0].example, 'example/src/business/demos/navigation/business-tabs.tsx');
});
