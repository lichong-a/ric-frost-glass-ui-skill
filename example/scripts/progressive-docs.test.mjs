import test from 'node:test';
import assert from 'node:assert/strict';
import { access, cp, mkdir, mkdtemp, readFile, readdir, rm, symlink, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parameterDocs } from '../tooling/progressive/scripts/parameter-docs.mjs';
import * as generatedOutput from '../tooling/progressive/scripts/generated-output.mjs';
import { extractParameterApi } from './extract-parameters.mjs';

const exampleRoot = path.resolve(fileURLToPath(new URL('../', import.meta.url)));
const generator = path.join(exampleRoot, 'tooling/progressive/scripts/build-progressive.mjs');
const rebuild = path.join(exampleRoot, 'tooling/progressive/rebuild-kit-docs.mjs');
const parseJson = async file => JSON.parse(await readFile(file, 'utf8'));
async function save(root, relative, content) {
  const target = path.join(root, relative);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, typeof content === 'string' ? content : JSON.stringify(content, null, 2));
}
async function fixture(root) {
  const use = await parseJson(path.join(exampleRoot, 'catalog/use-categories.json'));
  const catalog = await parseJson(path.join(exampleRoot, 'catalog/upstream-manifest.json'));
  const business = await parseJson(path.join(exampleRoot, 'catalog/business-catalog.json'));
  const effects = catalog.components.filter(item => ['spring-check', 'glass-surface', 'split-text', 'aero-shards', 'shape-waves'].includes(item.slug));
  const businessEntries = business.components.filter(item => ['business-button', 'business-tabs', 'business-divider', 'business-card'].includes(item.id));
  const ids = new Set([...effects.map(item => item.slug), ...businessEntries.map(item => item.id)]);
  await save(root, 'example/catalog/use-categories.json', { ...use, total: ids.size, components: use.components.filter(item => ids.has(item.id)) });
  await save(root, 'example/catalog/upstream-manifest.json', { ...catalog, total: effects.length, components: effects });
  await save(root, 'example/catalog/business-catalog.json', { ...business, total: businessEntries.length, components: businessEntries });
  await save(root, 'AGENT_WAN_UI_SPEC.md', Array.from({ length: 17 }, (_, index) => `## ${index + 1}. Specification\n\nFixture section.\n`).join('\n'));
  await save(root, 'COMPONENT_CONTRACTS.md', Array.from({ length: 22 }, (_, index) => `## ${index}. Contract\n\nFixture contract.\n`).join('\n'));
  await save(root, 'example/docs/business/motion-guide.md', '# Authored motion guide\n\n[Button](../../src/business/components/Button.tsx)\n');
  await save(root, 'example/src/parameters/usage.ts', await readFile(path.join(exampleRoot, 'src/parameters/usage.ts'), 'utf8'));
  for (const entry of [...effects.map(item => ({ ...item, id: item.slug })), ...businessEntries]) {
    const definition = await parseJson(path.join(exampleRoot, `src/parameters/definitions/${entry.id}.json`));
    await save(root, `example/src/parameters/definitions/${entry.id}.json`, definition);
    await save(root, `example/${definition.demoPath}`, 'export default function Demo() { return null; }\n');
    if (entry.demoPath) await save(root, `example/${entry.demoPath}`, 'export default function Demo() { return null; }\n');
  }
  return { root, ids };
}
function run(root, output, mode) {
  const result = spawnSync(process.execPath, [generator, '--catalog', path.join(root, 'example/catalog/upstream-manifest.json'), '--kit-root', root, '--output-root', output, '--mode', mode], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr || result.stdout);
}
const linkedGuides = markdown => [...markdown.matchAll(/\| \[[^\]]+\]\(([^)]+\/components\/([^/]+)\.md)\)/g)].map(match => match[2]);
const definition = () => ({
  id: 'business-fixture', props: [{ name: 'speed', type: 'number', required: false, defaultExpression: '2', description: 'Speed.' }],
  targets: [], inherited: [{ type: 'MotionProps', reference: 'node_modules/framer-motion/dist/index.d.ts' }, { type: 'HTMLAttributes', reference: 'https://react.dev/reference/react-dom/components/common' }],
  fields: [{ key: 't0.speed', name: 'speed', scope: 'prop', defaultValue: 9, control: 'number', min: 1, max: 12, apply: 'live' }, { key: 'height', name: 'height', scope: 'container', description: 'Stage height.', defaultValue: 400, min: 100, max: 900, unit: 'px' }],
});

for (const [mode, guidePath, examplePrefix] of [
  ['kit', 'example/docs/business/components/business-fixture.md', 'example'],
  ['skill', 'references/example/business/components/business-fixture.md', 'assets/ui-kit/example'],
]) {
  test(`inherited installed type links resolve from the ${mode} guide location`, () => {
    const markdown = parameterDocs(definition(), { guidePath, examplePrefix, provider: 'business' });
    const href = markdown.match(/\[完整类型与原生属性\]\(([^)]+)\)/)[1];
    assert.equal(path.posix.normalize(path.posix.join(path.posix.dirname(guidePath), href)), `${examplePrefix}/node_modules/framer-motion/dist/index.d.ts`);
    assert.match(markdown, /安装依赖后存在/);
    assert.match(markdown, /\]\(https:\/\/react.dev\/reference\/react-dom\/components\/common\)/);
  });
}
test('API source defaults stay separate from editable demo defaults and container settings', () => {
  const markdown = parameterDocs(definition(), { guidePath: 'example/docs/business/components/business-fixture.md', examplePrefix: 'example', provider: 'business' });
  assert.match(markdown, /\| 源码默认值 \|/);
  const [api, afterApi] = markdown.split('### 本例配置与 DIY');
  const [controls, container] = afterApi.split('### 演示容器设置');
  assert.match(api, /\| `speed` \| `number` \| 否 \| `2` \|/);
  assert.match(controls, /\| `t0.speed` \| `9` \|/);
  assert.doesNotMatch(controls, /Stage height/);
  assert.match(container, /`height`.*`400`px/);
  assert.doesNotMatch(markdown, /上游默认值/);
});
test('API targets with different requiredness keep both contracts', () => {
  const record = definition();
  record.inherited = [];
  record.targets = [{ name: 'Other', props: [{ ...record.props[0], required: true }], inherited: [] }];
  const markdown = parameterDocs(record);
  assert.match(markdown, /\| `speed` \| `number` \| 否 \|/);
  assert.match(markdown, /\| `Other.speed` \| `number` \| 是 \|/);
});
test('business API rows identify the leaf contract separately from the demonstration entry', () => {
  const record = definition();
  record.sourcePath = 'src/business/components/SpringCheckbox.tsx';
  record.apiScope = 'component-props';
  record.targets = [{ name: 'SpringCheckbox', sourcePath: record.sourcePath, props: record.props }];
  const guidePath = 'example/docs/business/components/business-fixture.md';
  const markdown = parameterDocs(record, { guidePath, examplePrefix: 'example', provider: 'business' });
  assert.match(markdown, /默认导出.*演示入口/);
  assert.match(markdown, /下表.*无前缀.*SpringCheckbox/);
  const sourceLink = [...markdown.matchAll(/\]\(([^)]+)\)/g)].find(match => match[1].endsWith('/SpringCheckbox.tsx'));
  assert.ok(sourceLink, 'the known leaf API source must be reachable');
  assert.equal(path.posix.normalize(path.posix.join(path.posix.dirname(guidePath), sourceLink[1])), 'example/src/business/components/SpringCheckbox.tsx');
});

for (const mode of ['kit', 'skill']) {
  test(`${mode} generation joins purpose routes, provider views and source-category migration without live output writes`, async t => {
    const temporary = await mkdtemp(path.join(tmpdir(), 'agent-wan-doc-fixture-'));
    t.after(() => rm(temporary, { recursive: true, force: true }));
    const source = path.join(temporary, 'source');
    const first = path.join(temporary, 'first');
    const second = path.join(temporary, 'second');
    await fixture(source);
    run(source, first, mode);
    const docs = mode === 'kit' ? 'example/docs' : 'references/example';
    const index = await parseJson(path.join(first, docs, 'component-index.json'));
    assert.equal(index.total, 9);
    assert.equal(index.businessTotal, 4);
    assert.equal(index.effectsTotal, 5);
    assert.equal(index.counts.navigation, 1);
    assert.equal(index.providerCounts.business.text, 0);
    const prefix = mode === 'kit' ? 'example' : 'assets/ui-kit/example';
    const buttonEntry = index.components.find(entry => entry.id === 'business-button');
    assert.equal(buttonEntry.sourcePath, buttonEntry.demoPath);
    const buttonGuidePath = path.posix.join(docs, 'business/components/business-button.md');
    const buttonGuide = await readFile(path.join(first, buttonGuidePath), 'utf8');
    const resources = [...buttonGuide.matchAll(/\]\(([^)#]+)\)/g)].map(match => path.posix.normalize(path.posix.join(path.posix.dirname(buttonGuidePath), match[1])));
    assert.ok(resources.includes(`${prefix}/src/business/components/Button.tsx`), 'the actual API implementation must be linked separately from the query entry');
    assert.ok(resources.includes(buttonEntry.propsPath), 'the selected definition must be linked');
    assert.match(await readFile(path.join(first, docs, 'task-router.md'), 'utf8'), /9 个组件/);
    assert.match(await readFile(path.join(first, docs, 'effects/task-router.md'), 'utf8'), /5 个效果组件/);
    assert.match(await readFile(path.join(first, docs, 'business/task-router.md'), 'utf8'), /4 个业务组件/);
    const navigation = await readFile(path.join(first, docs, 'business/categories/navigation.md'), 'utf8');
    assert.deepEqual(linkedGuides(navigation), ['business-tabs']);
    assert.deepEqual(linkedGuides(await readFile(path.join(first, docs, 'categories/cards.md'), 'utf8')).sort(), ['business-card', 'glass-surface']);
    assert.deepEqual(linkedGuides(await readFile(path.join(first, docs, 'effects/categories/cards.md'), 'utf8')), ['glass-surface']);
    const tabs = await readFile(path.join(first, docs, 'business/components/business-tabs.md'), 'utf8');
    assert.match(tabs, /\]\(\.\.\/categories\/navigation\.md\)/);
    const action = await readFile(path.join(first, docs, 'business/categories/action.md'), 'utf8');
    assert.match(action, /generated-category-migration/);
    assert.match(action, /\]\(actions\.md\)/);
    const panel = await readFile(path.join(first, docs, 'business/categories/panel.md'), 'utf8');
    assert.match(panel, /\]\(cards\.md\)/);
    assert.match(panel, /\]\(navigation\.md\)/);
    const sourceCategory = await readFile(path.join(first, docs, 'categories/micro.md'), 'utf8');
    assert.match(sourceCategory, /旧来源标签入口/);
    assert.match(sourceCategory, /\]\(form\.md\)/);
    const gpu = await readFile(path.join(first, docs, 'components/aero-shards.md'), 'utf8');
    assert.match(gpu, /1\.5 秒/);
    assert.match(gpu, /15 秒/);
    assert.match(gpu, /用户点击“打开兼容演示”后才挂载 Canvas 2D/);
    assert.match(gpu, /“Canvas 兼容演示”/);
    assert.match(gpu, /“重试原版”/);
    assert.doesNotMatch(gpu, /运行兼容预览/);
    assert.doesNotMatch(gpu, /自动使用.*Canvas/);
    const generated = await parseJson(path.join(first, docs, 'generated-files.json'));
    assert.equal(generated.schemaVersion, 1);
    assert.equal(generated.mode, mode);
    assert.ok(generated.files.includes(`${docs}/generated-files.json`));
    if (mode === 'kit') assert.ok(!generated.files.includes(`${docs}/business/motion-guide.md`));
    await Promise.all(generated.files.map(file => access(path.join(first, file))));
    run(source, second, mode);
    const repeat = await parseJson(path.join(second, docs, 'generated-files.json'));
    assert.deepEqual(repeat, generated);
    for (const file of generated.files) assert.equal(await readFile(path.join(first, file), 'utf8'), await readFile(path.join(second, file), 'utf8'), `nondeterministic generated file: ${file}`);
    await assert.rejects(access(path.join(source, docs, 'component-index.json')));
    assert.deepEqual(await readdir(path.join(source, 'example/docs')), ['business']);
  });
}
test('rebuild refuses a changed implementation even when API cache and definitions agree with each other', async t => {
  const temporary = await mkdtemp(path.join(tmpdir(), 'agent-wan-doc-fresh-'));
  t.after(() => rm(temporary, { recursive: true, force: true }));
  const source = path.join(temporary, 'source');
  const sourceExample = path.join(source, 'example');
  const target = path.join(temporary, 'target');
  await cp(path.join(exampleRoot, 'src'), path.join(sourceExample, 'src'), { recursive: true });
  await symlink(path.join(exampleRoot, '.upstream'), path.join(sourceExample, '.upstream'), 'dir');
  await symlink(path.join(exampleRoot, 'node_modules'), path.join(sourceExample, 'node_modules'), 'dir');
  for (const filename of ['upstream-manifest.json', 'business-catalog.json', 'use-categories.json', 'demo-source-templates.json']) {
    await save(source, `example/catalog/${filename}`, await readFile(path.join(exampleRoot, 'catalog', filename), 'utf8'));
  }
  const actual = await extractParameterApi({ root: sourceExample });
  await save(source, 'example/catalog/parameter-api.json', actual);
  const buttonDefinitionPath = path.join(sourceExample, 'src/parameters/definitions/business-button.json');
  const cachedDefinition = await readFile(buttonDefinitionPath, 'utf8');
  const buttonDefinition = JSON.parse(cachedDefinition);
  const cachedVariant = buttonDefinition.props.find(prop => prop.name === 'variant');
  assert.equal(cachedVariant.defaultExpression, actual.components['business-button'].props.find(prop => prop.name === 'variant').defaultExpression);
  await save(source, 'AGENT_WAN_UI_SPEC.md', Array.from({ length: 17 }, (_, index) => `## ${index + 1}. Specification\n\nFixture section.\n`).join('\n'));
  await save(source, 'COMPONENT_CONTRACTS.md', Array.from({ length: 22 }, (_, index) => `## ${index}. Contract\n\nFixture contract.\n`).join('\n'));
  await save(source, 'example/docs/business/motion-guide.md', '# Authored motion guide\n');
  // The real source validator imported by the rebuild entry must reject before
  // a downstream docs checker could accept two mutually stale snapshots.
  await save(source, 'example/scripts/check-docs.mjs', 'process.exitCode = 0;\n');
  await save(target, 'example/docs/task-router.md', 'Existing router');
  const sourceFile = path.join(sourceExample, 'src/business/components/Button.tsx');
  const original = await readFile(sourceFile, 'utf8');
  assert.match(original, /variant = 'primary'/);
  await writeFile(sourceFile, original.replace("variant = 'primary'", "variant = 'danger'"));
  const result = spawnSync(process.execPath, [rebuild, '--kit-root', source, '--output-root', target], { encoding: 'utf8', timeout: 90_000 });
  assert.equal(result.status, 1, result.stderr || result.stdout);
  assert.match(result.stderr, /Stale parameter API catalog/);
  assert.match(result.stderr, /business-button.*variant.*defaultExpression/);
  assert.equal(await readFile(path.join(target, 'example/docs/task-router.md'), 'utf8'), 'Existing router');
  assert.equal(await readFile(buttonDefinitionPath, 'utf8'), cachedDefinition, 'fresh validation must not rewrite stale definitions');
  await assert.rejects(access(path.join(target, 'example/docs/component-index.json')));
});

async function overlayFixture(t) {
  const root = await mkdtemp(path.join(tmpdir(), 'agent-wan-doc-apply-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const target = path.join(root, 'target');
  const staging = path.join(root, 'staging');
  const previous = generatedOutput.createGeneratedWriter(target, 'kit');
  await previous.write('example/docs/components/current.md', 'old current');
  await previous.write('example/docs/components/obsolete.md', 'old obsolete');
  await previous.finish();
  await save(target, 'example/docs/handwritten.md', 'authored note');
  await save(target, 'example/docs/business/motion-guide.md', 'authored motion');
  const next = generatedOutput.createGeneratedWriter(staging, 'kit');
  await next.write('example/docs/components/current.md', 'new current');
  await next.preserve('example/docs/business/motion-guide.md', 'staged motion');
  await next.finish();
  return { stagingRoot: staging, targetRoot: target, mode: 'kit' };
}
test('a rejected staging validation leaves existing generated and authored documents untouched', async t => {
  const options = await overlayFixture(t);
  assert.equal(typeof generatedOutput.applyGeneratedOverlay, 'function', 'validated overlay application is missing');
  await assert.rejects(generatedOutput.applyGeneratedOverlay({ ...options, validate: async () => { throw new Error('Fixture validation rejected'); }, pruneGenerated: true }), /validation rejected/);
  assert.equal(await readFile(path.join(options.targetRoot, 'example/docs/components/current.md'), 'utf8'), 'old current\n');
  assert.equal(await readFile(path.join(options.targetRoot, 'example/docs/components/obsolete.md'), 'utf8'), 'old obsolete\n');
  assert.equal(await readFile(path.join(options.targetRoot, 'example/docs/handwritten.md'), 'utf8'), 'authored note');
});
test('obsolete generated docs require explicit cleanup and authored docs are never rewritten', async t => {
  const options = await overlayFixture(t);
  assert.equal(typeof generatedOutput.applyGeneratedOverlay, 'function', 'validated overlay application is missing');
  await assert.rejects(generatedOutput.applyGeneratedOverlay({ ...options, validate: async () => {} }), /obsolete.*--prune-generated/i);
  assert.equal(await readFile(path.join(options.targetRoot, 'example/docs/components/current.md'), 'utf8'), 'old current\n');
  await generatedOutput.applyGeneratedOverlay({ ...options, validate: async () => {}, pruneGenerated: true });
  assert.equal(await readFile(path.join(options.targetRoot, 'example/docs/components/current.md'), 'utf8'), 'new current\n');
  await assert.rejects(access(path.join(options.targetRoot, 'example/docs/components/obsolete.md')));
  assert.equal(await readFile(path.join(options.targetRoot, 'example/docs/handwritten.md'), 'utf8'), 'authored note');
  assert.equal(await readFile(path.join(options.targetRoot, 'example/docs/business/motion-guide.md'), 'utf8'), 'authored motion');
});
test('a tampered generated manifest cannot overwrite application sources', async t => {
  const options = await overlayFixture(t);
  const manifestFile = path.join(options.stagingRoot, 'example/docs/generated-files.json');
  const manifest = await parseJson(manifestFile);
  manifest.files.push('example/src/main.tsx');
  await save(options.stagingRoot, 'example/src/main.tsx', 'unexpected replacement');
  await save(options.targetRoot, 'example/src/main.tsx', 'application source');
  await save(options.stagingRoot, 'example/docs/generated-files.json', manifest);
  await assert.rejects(generatedOutput.applyGeneratedOverlay({ ...options, validate: async () => {}, pruneGenerated: true }), /outside.*generated|unmanaged/i);
  assert.equal(await readFile(path.join(options.targetRoot, 'example/src/main.tsx'), 'utf8'), 'application source');
});
test('a partial catalog cannot bypass the source preflight through an accepting docs checker', async t => {
  const temporary = await mkdtemp(path.join(tmpdir(), 'agent-wan-doc-rebuild-'));
  t.after(() => rm(temporary, { recursive: true, force: true }));
  const source = path.join(temporary, 'source');
  const target = path.join(temporary, 'target');
  await fixture(source);
  await save(target, 'example/docs/task-router.md', 'Existing router');
  await save(source, 'example/scripts/check-docs.mjs', 'process.exitCode = 0;\n');
  const result = spawnSync(process.execPath, [rebuild, '--kit-root', source, '--output-root', target], { encoding: 'utf8' });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /API source coverage mismatch.*215.*88/);
  assert.equal(await readFile(path.join(target, 'example/docs/task-router.md'), 'utf8'), 'Existing router');
  await assert.rejects(access(path.join(target, 'example/docs/component-index.json')));
});
for (const mode of ['kit', 'skill']) {
  test(`${mode} read-only rebuild requires complete source coverage and leaves current docs untouched`, async t => {
    const temporary = await mkdtemp(path.join(tmpdir(), 'agent-wan-doc-check-'));
    t.after(() => rm(temporary, { recursive: true, force: true }));
    const source = path.join(temporary, 'source');
    await fixture(source);
    await save(source, 'example/docs/task-router.md', 'Existing router');
    await save(source, 'example/scripts/check-docs.mjs', 'process.exitCode = 0;\n');
    const result = spawnSync(process.execPath, [rebuild, '--kit-root', source, '--mode', mode, '--check'], { encoding: 'utf8' });
    assert.equal(result.status, 1, result.stderr || result.stdout);
    assert.match(result.stderr, /API source coverage mismatch.*215.*88/);
    assert.equal(await readFile(path.join(source, 'example/docs/task-router.md'), 'utf8'), 'Existing router');
    await assert.rejects(access(path.join(source, 'example/docs/component-index.json')));
    await assert.rejects(access(path.join(source, 'references/example/component-index.json')));
  });
}
