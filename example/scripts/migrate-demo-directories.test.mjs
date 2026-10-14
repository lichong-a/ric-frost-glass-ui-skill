import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp, mkdir, readFile, writeFile, rm, access } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createComponentDirectory } from './component-directory.mjs';
import { rewriteRelativeImports, rewriteRelativeCssUrls, planDemoDirectoryMigration, applyDemoDirectoryMigration } from './migrate-demo-directories.mjs';

const fixtureDirectory = () => createComponentDirectory({
  schemaVersion: 1, total: 2, categories: [{ id: 'media', name: '媒体与轮播' }, { id: 'form', name: '表单与选择' }],
  components: [
    { id: 'card', name: 'Card', sourceName: 'Card', category: 'media', sourceCategory: 'components', provider: 'react-bits', tags: ['components', 'react-bits'] },
    { id: 'business-field', name: 'Field', sourceName: 'Field', category: 'form', sourceCategory: 'business-form', provider: 'business', tags: ['business-form', 'business'] },
  ],
});
async function fixture(t) {
  const root = await mkdtemp(path.join(tmpdir(), 'agent-ric-taxonomy-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(path.join(root, 'src/demos'), { recursive: true });
  await mkdir(path.join(root, 'src/business/demos'), { recursive: true });
  await writeFile(path.join(root, 'src/demos/card.tsx'), "import Card from '../../.upstream/Card';\nimport './Card.module.css';\nimport { MEDIA } from '../shared/media';\nexport default function Demo() { return <Card label='../shared/do-not-touch' items={MEDIA}/>; }\n");
  await writeFile(path.join(root, 'src/demos/Card.module.css'), '.card { background: url("../../public/card.svg"); }\n');
  await writeFile(path.join(root, 'src/business/demos/business-field.tsx'), "import { Field } from '../components/Field';\nimport { MEDIA } from '../../shared/media';\nexport default function Demo() { return <Field items={MEDIA}/>; }\n");
  return root;
}

test('AST relocation updates module specifiers but preserves UI strings and package imports', () => {
  const code = `import { x } from '../shared/x';\nimport type { Value } from './other-demo';\nexport { value } from './other-demo';\nconst a = () => import('./other-demo?raw');\ntype T = import('./other-demo').T;\nconst r = require('./other-demo');\nimport { useState } from 'react';\nconst label = '../shared/do-not-touch';\nconst ui = <span title='../shared/do-not-touch'>../shared/do-not-touch</span>;\n`;
  const relocations = new Map([['/example/src/demos/other-demo.tsx', '/example/src/demos/form/other-demo.tsx']]);
  const result = rewriteRelativeImports(code, '/example/src/demos/card.tsx', '/example/src/demos/media/card.tsx', relocations);
  assert.equal(result.changedImports, 6);
  assert.match(result.code, /from '\.\.\/\.\.\/shared\/x'/);
  assert.equal((result.code.match(/\.\.\/form\/other-demo/g) ?? []).length, 5);
  assert.match(result.code, /other-demo\?raw/);
  assert.match(result.code, /from 'react'/);
  assert.equal((result.code.match(/\.\.\/shared\/do-not-touch/g) ?? []).length, 3);
  assert.throws(() => rewriteRelativeImports('const a = () => import(`./${name}`);', '/old/demo.tsx', '/new/demo.tsx'), /computed relative module import/);
  assert.throws(() => rewriteRelativeImports("const a = () => import('./' + name);", '/old/demo.tsx', '/new/demo.tsx'), /computed relative module import/);
});

test('CSS relocation rebases local URLs and imports while preserving external and fragment URLs', () => {
  const code = '@import "../shared/base.css"; .card { background:url("../../public/card.svg"); mask: url( #shape ); } .remote { background: url( "https://example.test/card.svg" ); }';
  const result = rewriteRelativeCssUrls(code, '/example/src/demos/Card.module.css', '/example/src/demos/media/Card.module.css');
  assert.match(result, /@import "\.\.\/\.\.\/shared\/base.css"/);
  assert.match(result, /url\("\.\.\/\.\.\/\.\.\/public\/card.svg"\)/);
  assert.match(result, /url\( #shape \)/);
  assert.match(result, /url\( "https:\/\/example.test\/card.svg" \)/);
});

test('a migration moves both providers and owned CSS, preserves source identities and is idempotent', async t => {
  const root = await fixture(t);
  const directory = fixtureDirectory();
  const plan = await planDemoDirectoryMigration(root, directory);
  assert.equal(plan.moves, 3);
  await access(path.join(root, 'src/demos/card.tsx'));
  await assert.rejects(access(path.join(root, 'src/demos/media/card.tsx')), { code: 'ENOENT' });
  const result = await applyDemoDirectoryMigration(plan);
  assert.equal(result.moved, 3);
  const effect = await readFile(path.join(root, 'src/demos/media/card.tsx'), 'utf8');
  assert.match(effect, /from '\.\.\/\.\.\/\.\.\/\.upstream\/Card'/);
  assert.match(effect, /from '\.\.\/\.\.\/shared\/media'/);
  assert.match(effect, /label='\.\.\/shared\/do-not-touch'/);
  assert.match(effect, /import '\.\/Card.module.css'/);
  const business = await readFile(path.join(root, 'src/business/demos/form/business-field.tsx'), 'utf8');
  assert.match(business, /from '\.\.\/\.\.\/components\/Field'/);
  assert.match(business, /from '\.\.\/\.\.\/\.\.\/shared\/media'/);
  assert.match(await readFile(path.join(root, 'src/demos/media/Card.module.css'), 'utf8'), /\.\.\/\.\.\/\.\.\/public\/card.svg/);
  await assert.rejects(access(path.join(root, 'src/demos/card.tsx')), { code: 'ENOENT' });
  const second = await planDemoDirectoryMigration(root, directory);
  assert.equal(second.moves, 0); assert.equal(second.files.length, 0);
});

test('a conflict anywhere in the plan prevents all demo writes', async t => {
  const root = await fixture(t);
  const original = await readFile(path.join(root, 'src/demos/card.tsx'), 'utf8');
  await mkdir(path.join(root, 'src/business/demos/form'));
  await writeFile(path.join(root, 'src/business/demos/form/business-field.tsx'), 'export default function Existing() { return null; }');
  await assert.rejects(planDemoDirectoryMigration(root, fixtureDirectory()), /Both legacy and categorized demos/);
  assert.equal(await readFile(path.join(root, 'src/demos/card.tsx'), 'utf8'), original);
  await assert.rejects(access(path.join(root, 'src/demos/media/card.tsx')), { code: 'ENOENT' });
});

test('a changed source after preflight remains untouched', async t => {
  const root = await fixture(t);
  const plan = await planDemoDirectoryMigration(root, fixtureDirectory());
  const changed = 'export default function NewWork() { return <button>New work</button>; }';
  await writeFile(path.join(root, 'src/business/demos/business-field.tsx'), changed);
  await assert.rejects(applyDemoDirectoryMigration(plan), /changed after preflight/);
  assert.equal(await readFile(path.join(root, 'src/business/demos/business-field.tsx'), 'utf8'), changed);
  await assert.rejects(access(path.join(root, 'src/demos/media/card.tsx')), { code: 'ENOENT' });
});

test('a newly created destination after preflight is preserved and blocks all writes', async t => {
  const root = await fixture(t);
  const plan = await planDemoDirectoryMigration(root, fixtureDirectory());
  await mkdir(path.join(root, 'src/business/demos/form'));
  const destination = path.join(root, 'src/business/demos/form/business-field.tsx');
  const newWork = 'export default function ExistingWork() { return <button>Existing work</button>; }';
  await writeFile(destination, newWork);
  await assert.rejects(applyDemoDirectoryMigration(plan), /destination appeared after preflight/);
  assert.equal(await readFile(destination, 'utf8'), newWork);
  await access(path.join(root, 'src/demos/card.tsx'));
  await assert.rejects(access(path.join(root, 'src/demos/media/card.tsx')), { code: 'ENOENT' });
});
