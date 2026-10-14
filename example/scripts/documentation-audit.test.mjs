import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp, mkdir, readFile, readdir, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { auditDocumentation, extractMarkdownLinks, markdownAnchors, parseMarkdownTables, documentedApiRows } from './lib/documentation-audit.mjs';

const cli = fileURLToPath(new URL('./check-docs.mjs', import.meta.url));
const component = (id, name, provider, category) => ({ id, name, sourceName: name, provider, category, sourceCategory: provider === 'business' ? 'business-navigation' : 'text-animations', tags: [provider, provider === 'business' ? 'business-navigation' : 'text-animations'] });
const categories = [{ id: 'text', name: '文字动效', description: '文字' }, { id: 'navigation', name: '导航与菜单', description: '菜单' }];
const components = [component('text-one', 'Text One', 'react-bits', 'text'), component('business-tabs', 'Tabs', 'business', 'navigation')];
const prop = { name: 'mode', type: "'words' | 'letters'", required: false, defaultExpression: "'words'" };
const cell = value => String(value).replaceAll('|', '\\|');
async function write(root, file, content) {
  await mkdir(path.dirname(path.join(root, file)), { recursive: true });
  await writeFile(path.join(root, file), typeof content === 'string' ? content : `${JSON.stringify(content, null, 2)}\n`);
}

async function fixture(t, mode = 'kit') {
  const root = await mkdtemp(path.join(tmpdir(), 'agent-ric-doc-audit-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const docs = mode === 'kit' ? 'example/docs' : 'references/example';
  const example = mode === 'kit' ? 'example' : 'assets/ui-kit/example';
  const records = components.map(item => ({ ...item, provider: item.provider === 'business' ? 'business' : 'effects', categoryLabel: categories.find(category => category.id === item.category).name, docPath: `${docs}/${item.provider === 'business' ? 'business/' : ''}components/${item.id}.md`, demoPath: `${example}/src/${item.provider === 'business' ? 'business/' : ''}demos/${item.category}/${item.id}.tsx`, sourcePath: `${example}/src/${item.provider === 'business' ? 'business/' : ''}demos/${item.category}/${item.id}.tsx`, propsPath: `${example}/src/parameters/definitions/${item.id}.json` }));
  const index = { schemaVersion: 1, total: 2, businessTotal: 1, effectsTotal: 1, providerCounts: { business: { text: 0, navigation: 1 }, effects: { text: 1, navigation: 0 } }, counts: { text: 1, navigation: 1 }, components: records };
  const api = { schemaVersion: 1, components: {} };
  for (let number = 0; number < components.length; number++) {
    const item = components[number];
    const native = item.provider === 'business';
    const sourcePath = records[number].sourcePath.replace(/^assets\/ui-kit\//, '').slice('example/'.length);
    const definition = { version: 1, id: item.id, sourcePath, demoPath: sourcePath, apiScope: native ? 'native-composition' : 'component-props', props: native ? [] : [prop], targets: native ? [{ name: 'TabsLeaf', componentName: 'TabsLeaf', sourcePath: 'src/business/components/TabsLeaf.tsx', props: [prop] }] : [], fields: [] };
    api.components[item.id] = { id: item.id, sourcePath, apiScope: definition.apiScope, props: definition.props, targets: definition.targets };
    await write(root, `example/src/parameters/definitions/${item.id}.json`, definition);
    await write(root, `example/${sourcePath}`, 'export default function Example() {}\n');
    const rows = documentedApiRows(definition).map(prop => `| \`${prop.key}\` | \`${cell(prop.type)}\` | 否 | \`${prop.defaultExpression}\` | 合法字段 |`).join('\n');
    const resourceLinks = [records[number].demoPath, records[number].propsPath].map(file => `[源](${path.posix.relative(path.posix.dirname(records[number].docPath), file)})`).join(' ');
    await write(root, records[number].docPath, `# ${item.name}\n\n${records[number].categoryLabel} · \`${item.id}\`\n\n${resourceLinks}\n\n${native ? '本示例函数不接收额外公开 Props，能力由原生元素与上述叶组件组合。\n\n' : ''}### 完整组件 API\n\n| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |\n|---|---|---|---|---|\n${rows}\n`);
  }
  await write(root, 'example/src/business/components/TabsLeaf.tsx', 'export const TabsLeaf = () => null;\n');
  await write(root, 'example/catalog/use-categories.json', { schemaVersion: 1, total: 2, categories, components });
  await write(root, 'example/catalog/upstream-manifest.json', { schemaVersion: 1, total: 1, components: [{ slug: 'text-one', name: 'Text One', category: 'text-animations', files: [{ path: 'src/TextOne.tsx' }] }] });
  await write(root, 'example/catalog/business-catalog.json', { schemaVersion: 1, total: 1, components: [{ id: 'business-tabs', name: 'Tabs', sourceName: 'Tabs', sourceCategory: 'business-navigation', family: 'navigation' }] });
  await write(root, 'example/catalog/parameter-api.json', api);
  await write(root, 'example/catalog/asset-lock.json', { schemaVersion: 1, files: [{ destination: 'public/assets/model.glb' }] });
  await write(root, 'example/package.json', { type: 'module', scripts: { 'check:docs': 'node scripts/check-docs.mjs' }, dependencies: { motion: '1.0.0' }, devDependencies: { '@types/react': '1.0.0' } });
  await write(root, 'example/package-lock.json', { lockfileVersion: 3, packages: { 'node_modules/framer-motion': { version: '1.0.0' } } });
  await write(root, `${docs}/component-index.json`, index);
  await write(root, `${docs}/design-core.md`, '# 核心规范\n');
  await write(root, 'scripts/real-entry.mjs', 'console.log("example");\n');
  await write(root, 'SKILL.md', `# 渐进式 Skill\n\n[核心](${docs}/design-core.md) [业务](${docs}/business/task-router.md) [效果](${docs}/effects/task-router.md)\n`);
  for (const view of [{ prefix: docs, records }, { prefix: `${docs}/effects`, records: records.filter(entry => entry.provider === 'effects') }, { prefix: `${docs}/business`, records: records.filter(entry => entry.provider === 'business') }]) {
    const subset = categories.filter(category => view.records.some(entry => entry.category === category.id));
    await write(root, `${view.prefix}/task-router.md`, `# 任务路由\n\n本次清单：${view.records.length} 个组件。\n\n| 类别 | 组件数 | 用途 |\n|---|---:|---|\n${subset.map(category => `| [${category.name}](categories/${category.id}.md) | ${view.records.filter(entry => entry.category === category.id).length} | ${category.description} |`).join('\n')}\n`);
    for (const category of subset) {
      const file = `${view.prefix}/categories/${category.id}.md`;
      const selected = view.records.filter(entry => entry.category === category.id);
      await write(root, file, `# ${category.name}\n\n${selected.length} 个组件。\n\n| 组件 | 用途 | 来源与标签 |\n|---|---|---|\n${selected.map(entry => `| [${entry.name}](${path.posix.relative(path.posix.dirname(file), entry.docPath)}) | 用途 | ${entry.provider} |`).join('\n')}\n`);
    }
  }
  return { root, docs, records };
}
async function mutate(root, file, transform) {
  await writeFile(path.join(root, file), transform(await readFile(path.join(root, file), 'utf8')));
}
async function snapshot(root) {
  const files = [];
  const visit = async directory => {
    for (const item of await readdir(directory, { withFileTypes: true })) {
      const filename = path.join(directory, item.name);
      if (item.isDirectory()) await visit(filename);
      else files.push([path.relative(root, filename), await readFile(filename, 'utf8')]);
    }
  };
  await visit(root);
  return files.sort(([a], [b]) => a.localeCompare(b));
}
async function assertFailure(root, code, field) {
  const result = await auditDocumentation({ root });
  assert.ok(result.failures.some(failure => failure.code === code && (!field || failure.message.includes(field))), JSON.stringify(result.failures, null, 2));
  return result;
}

test('a complete tiny directory passes and the audit is read-only', async t => {
  const { root } = await fixture(t);
  const before = await snapshot(root);
  const result = await auditDocumentation({ root });
  assert.deepEqual(result.failures, []);
  assert.equal(result.componentCount, 2);
  assert.ok(result.linkCount > 10);
  assert.deepEqual(await snapshot(root), before);
});

test('GFM tables preserve escaped union pipes and code/default spelling', () => {
  const [table] = parseMarkdownTables("| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |\n|---|---|---|---|---|\n| `mode` | `'words' \\| 'letters'` | 否 | `'words'` | 文档 |\n");
  assert.equal(table.rows[0].cells.length, 5);
  assert.equal(table.rows[0].cells[1], "`'words' \\| 'letters'`");
  assert.equal(documentedApiRows({ props: [], targets: [{ name: 'Leaf', props: [prop] }] })[0].key, 'Leaf.mode');
});

test('links handle reference syntax, HTML media, balanced destinations and duplicate Unicode anchors', () => {
  const markdown = '# 中文入口\n# 中文入口\n<a id="manual"></a>\n[阅读](other(file).md#中文入口-1)\n[规范][source]\n![图片](assets/a.png)\n<img src="assets/b.png">\n[source]: other.md\n\n```tsx\nconst value = "[假的](missing.md)";\n```\n`[也不检查](no.md)`\n';
  assert.deepEqual([...markdownAnchors(markdown)], ['中文入口', '中文入口-1', 'manual']);
  assert.deepEqual(extractMarkdownLinks(markdown).map(link => link.destination), ['other(file).md#中文入口-1', 'other.md', 'assets/a.png', 'assets/b.png']);
});

test('broken targets and anchors fail, valid headings and explicit anchors pass', async t => {
  const { root } = await fixture(t);
  await write(root, 'read-links.md', '[bad](missing.md) [bad anchor](SKILL.md#missing)\n');
  const bad = await assertFailure(root, 'link-missing', 'missing.md');
  assert.ok(bad.failures.some(failure => failure.code === 'anchor-missing'));
  await write(root, 'read-links.md', '[good](SKILL.md#渐进式-skill)\n');
  assert.deepEqual((await auditDocumentation({ root })).failures, []);
});

test('removed GPU-document links are failures even if the obsolete file exists', async t => {
  const { root } = await fixture(t);
  await write(root, 'gpu-preview-fixes.md', '# 历史文档\n');
  await write(root, 'README.md', '[old](gpu-preview-fixes.md)\n');
  await assertFailure(root, 'deleted-document-link', 'gpu-preview-fixes.md');
  await write(root, 'README.md', '# 当前说明\n');
  assert.deepEqual((await auditDocumentation({ root })).failures, []);
});

test('API type, required, default and owner mutations are detected individually', async t => {
  const { root, records } = await fixture(t);
  const file = records[0].docPath;
  const original = await readFile(path.join(root, file), 'utf8');
  for (const [before, after, field] of [["'words' \\| 'letters'", 'number', 'mode.type'], ['| 否 |', '| 是 |', 'mode.required'], ["| `'words'` |", '| `123` |', 'mode.default']]) {
    await write(root, file, original.replace(before, after));
    await assertFailure(root, 'api-row-field', field);
    await write(root, file, original);
    assert.deepEqual((await auditDocumentation({ root })).failures, []);
  }
  await mutate(root, records[1].docPath, text => text.replace('TabsLeaf.mode', 'OtherLeaf.mode'));
  const owner = await assertFailure(root, 'api-row-unknown', 'OtherLeaf.mode');
  assert.ok(owner.failures.some(failure => failure.code === 'api-row-missing' && failure.message.includes('TabsLeaf.mode')));
});

test('source/API mismatches cannot be hidden by changing only documentation defaults', async t => {
  const { root, records } = await fixture(t);
  await mutate(root, 'example/src/parameters/definitions/text-one.json', text => {
    const value = JSON.parse(text);
    value.props[0].defaultExpression = "'letters'";
    return JSON.stringify(value);
  });
  await mutate(root, records[0].docPath, text => text.replace("| `'words'` |", "| `'letters'` |"));
  await assertFailure(root, 'definition-api-field', 'mode.defaultExpression');
});

test('category counts, names, duplicate membership and component ownership fail and restore', async t => {
  const { root, docs } = await fixture(t);
  const file = `${docs}/categories/navigation.md`;
  const original = await readFile(path.join(root, file), 'utf8');
  await write(root, file, original.replace('1 个组件', '7 个组件'));
  await assertFailure(root, 'category-count', 'expected 1');
  await write(root, file, original.replace('[Tabs]', '[Other Name]'));
  await assertFailure(root, 'category-component-name', 'business-tabs.name');
  await write(root, file, original + original.split('\n').find(line => line.startsWith('| [Tabs]')) + '\n');
  await assertFailure(root, 'category-component-duplicate', 'business-tabs');
  await write(root, file, original.replace('business-tabs.md', 'text-one.md'));
  await assertFailure(root, 'category-component', 'text-one');
  await write(root, file, original);
  assert.deepEqual((await auditDocumentation({ root })).failures, []);
});

test('root and provider router totals and category subset counts use the source identities', async t => {
  const { root, docs } = await fixture(t);
  await mutate(root, `${docs}/task-router.md`, text => text.replace('2 个组件', '1 个组件').replace('| 1 | 菜单', '| 7 | 菜单'));
  await assertFailure(root, 'router-total', 'expected 2');
  await assertFailure(root, 'router-category-count', 'navigation.count');
  await mutate(root, `${docs}/business/task-router.md`, text => text.replace('navigation.md', 'text.md'));
  await assertFailure(root, 'router-category', 'text');
});

test('overview counts and indexed provider totals cannot drift from the source catalog', async t => {
  const { root, docs } = await fixture(t);
  await write(root, 'README.md', '| 用途分类 | 数量 | 适用场景 |\n|---|---:|---|\n| [导航与菜单](example/docs/categories/navigation.md) | 7 | 菜单 |\n| **合计** | **7** | 范围 |\n');
  await assertFailure(root, 'overview-category-count', 'navigation.count');
  await assertFailure(root, 'overview-total', 'expected 1');
  await write(root, 'README.md', '# 文档\n');
  await mutate(root, `${docs}/component-index.json`, text => {
    const index = JSON.parse(text);
    index.effectsTotal = 7;
    index.providerCounts.business.navigation = 7;
    return JSON.stringify(index);
  });
  await assertFailure(root, 'index-effects-total', 'effectsTotal');
  await assertFailure(root, 'index-provider-count', 'providerCounts.business.navigation');
  await assertFailure(root, 'index-provider-total', 'category sum must be 1');
  await mutate(root, `${docs}/component-index.json`, text => {
    const index = JSON.parse(text);
    index.effectsTotal = 1;
    index.providerCounts.business = 1;
    return JSON.stringify(index);
  });
  await assertFailure(root, 'index-provider-schema', 'providerCounts.business');
  await mutate(root, `${docs}/component-index.json`, text => {
    const index = JSON.parse(text);
    index.providerCounts.business = { text: 0, navigation: 1 };
    return JSON.stringify(index);
  });
  assert.deepEqual((await auditDocumentation({ root })).failures, []);
  await mutate(root, `${docs}/component-index.json`, text => {
    const index = JSON.parse(text);
    delete index.providerCounts.business.text;
    return JSON.stringify(index);
  });
  await assertFailure(root, 'index-provider-count', 'providerCounts.business.text: expected 0');
  await mutate(root, `${docs}/component-index.json`, text => {
    const index = JSON.parse(text);
    index.providerCounts.business.text = 0;
    return JSON.stringify(index);
  });
  assert.deepEqual((await auditDocumentation({ root })).failures, []);
});

test('business source entries remain runnable demos when the public API belongs to a leaf component', async t => {
  const { root, records } = await fixture(t);
  const file = 'example/src/parameters/definitions/business-tabs.json';
  const definition = JSON.parse(await readFile(path.join(root, file), 'utf8'));
  definition.sourcePath = 'src/business/components/TabsLeaf.tsx';
  await write(root, file, definition);
  await mutate(root, 'example/catalog/parameter-api.json', text => {
    const value = JSON.parse(text);
    value.components['business-tabs'].sourcePath = definition.sourcePath;
    return JSON.stringify(value);
  });
  assert.deepEqual((await auditDocumentation({ root })).failures, []);
  await mutate(root, 'example/docs/component-index.json', text => {
    const value = JSON.parse(text);
    value.components.find(component => component.id === 'business-tabs').sourcePath = `example/${definition.sourcePath}`;
    return JSON.stringify(value);
  });
  await assertFailure(root, 'index-source-path', records[1].demoPath);
});

test('legacy category pages require explicit migration markers and no component table', async t => {
  const { root, docs } = await fixture(t);
  const file = `${docs}/business/categories/panel.md`;
  await write(root, file, '# 旧目录\n\n| 组件 | 用途 |\n|---|---|\n| [Tabs](../components/business-tabs.md) | 菜单 |\n');
  await assertFailure(root, 'legacy-category-stub');
  await write(root, file, '<!-- generated-category-migration -->\n\n# 旧业务来源标签入口（迁移）\n\n[导航与菜单](navigation.md)\n');
  assert.deepEqual((await auditDocumentation({ root })).failures, []);
});

test('command script entries and npm scripts are checked without executing them', async t => {
  const { root } = await fixture(t);
  await write(root, 'README.md', '```bash\nnode scripts/missing.mjs\nnpm run missing\n```\n');
  const before = await snapshot(root);
  await assertFailure(root, 'command-missing', 'scripts/missing.mjs');
  await assertFailure(root, 'npm-script-missing', 'scripts.missing');
  assert.deepEqual(await snapshot(root), before);
  await write(root, 'README.md', '```bash\nnode scripts/real-entry.mjs\nnpm run check:docs\n```\n');
  assert.deepEqual((await auditDocumentation({ root })).failures, []);
});

test('known installed resources require labels; arbitrary cache paths are never whitelisted', async t => {
  const { root, docs } = await fixture(t);
  const file = `${docs}/installed.md`;
  await write(root, file, '[实现](../.upstream/src/TextOne.tsx)\n');
  await assertFailure(root, 'conditional-resource-label');
  await write(root, file, '| 实现（准备后存在） | [源](../../.upstream/src/TextOne.tsx) |\n');
  await assertFailure(root, 'link-missing');
  await write(root, file, '| 实现（准备后存在） | [源](../.upstream/src/Invented.tsx) |\n');
  await assertFailure(root, 'conditional-resource-unknown');
  await write(root, file, '| 实现（准备后存在） | [源](../.upstream/src/TextOne.tsx) |\n');
  // The exact pinned path may be absent before setup, but not an invented file.
  assert.deepEqual((await auditDocumentation({ root })).failures, []);
  await mutate(root, file, text => text.replace('TextOne.tsx', 'Invented.tsx'));
  await assertFailure(root, 'conditional-resource-unknown', 'Invented.tsx');
});

test('installed dependency references use real locked transitive dependencies and reject invented files', async t => {
  const { root, docs } = await fixture(t);
  await mutate(root, 'example/catalog/parameter-api.json', text => {
    const value = JSON.parse(text);
    value.components['text-one'].inherited = [{ type: 'MotionProps', reference: 'node_modules/framer-motion/dist/index.d.ts' }];
    return JSON.stringify(value);
  });
  const file = `${docs}/dependency.md`;
  await write(root, file, '| 原生类型（依赖安装后存在） | [完整类型](../node_modules/framer-motion/dist/index.d.ts) |\n');
  assert.deepEqual((await auditDocumentation({ root })).failures, []);
  await mutate(root, file, text => text.replace('dist/index.d.ts', 'dist/invented.d.ts'));
  await assertFailure(root, 'conditional-resource-unknown', 'invented.d.ts');
});

test('source templates are validated after both kit and skill reference mappings', async t => {
  const { root } = await fixture(t);
  const file = 'example/tooling/progressive/templates/SKILL.md';
  await write(root, file, '# 模板\n\n[核心](references/design-core.md) [业务](references/business/task-router.md) [效果](references/effects/task-router.md)\n');
  assert.deepEqual((await auditDocumentation({ root })).failures, []);
  await mutate(root, file, text => text.replace('design-core.md', 'missing.md'));
  await assertFailure(root, 'link-missing', 'example/docs/missing.md');
});

test('generated kit and skill staging do not use old source docs to hide a missing output', async t => {
  const { root: sourceRoot } = await fixture(t);
  for (const mode of ['kit', 'skill']) {
    const { root, docs } = await fixture(t, mode);
    const files = (await snapshot(root)).map(([file]) => file).filter(file => file.endsWith('.md') || file === `${docs}/component-index.json`);
    await write(root, `${docs}/generated-files.json`, { schemaVersion: 1, mode, files: [...files, `${docs}/generated-files.json`] });
    const result = await auditDocumentation({ root, sourceRoot, mode, generatedOnly: true });
    assert.deepEqual(result.failures, [], JSON.stringify(result.failures));
    await rm(path.join(root, `${docs}/categories/navigation.md`));
    const missing = await auditDocumentation({ root, sourceRoot, mode, generatedOnly: true });
    assert.ok(missing.failures.some(failure => failure.code === 'generated-file-missing'));
    assert.ok(missing.failures.some(failure => failure.code === 'required-document-missing' && failure.file.endsWith('/categories/navigation.md')));
  }
});

test('manifest omission cannot bypass a real generated guide, and preserved docs are narrowly scoped', async t => {
  const { root, docs, records } = await fixture(t);
  const files = (await snapshot(root)).map(([file]) => file).filter(file => file.endsWith('.md') && file !== records[0].docPath);
  await write(root, `${docs}/generated-files.json`, { schemaVersion: 1, mode: 'kit', files, preservedFiles: [{ path: records[0].docPath, sourcePath: records[0].docPath }] });
  const result = await auditDocumentation({ root, generatedOnly: true });
  assert.ok(result.failures.some(failure => failure.code === 'preserved-file-scope'));
  assert.ok(result.failures.some(failure => failure.code === 'generated-required-undeclared'));
});

test('CLI exits nonzero with the offending file and field and never creates an audit report', async t => {
  const { root, records } = await fixture(t);
  const green = spawnSync(process.execPath, [cli, '--root', root], { encoding: 'utf8' });
  assert.equal(green.status, 0, green.stderr);
  await mutate(root, records[0].docPath, text => text.replace("| `'words'` |", '| `42` |'));
  const before = await snapshot(root);
  const red = spawnSync(process.execPath, [cli, '--root', root], { encoding: 'utf8' });
  assert.equal(red.status, 1);
  assert.match(red.stderr, /text-one\.md.*api-row-field/);
  assert.match(red.stderr, /mode\.default/);
  assert.deepEqual(await snapshot(root), before);
});
