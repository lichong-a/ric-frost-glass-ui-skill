#!/usr/bin/env node
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const exampleRoot = path.resolve(fileURLToPath(new URL('../../../', import.meta.url)));
const kitRoot = path.resolve(exampleRoot, '..');
const options = { mode: 'kit', output: kitRoot };
for (let index = 2; index < process.argv.length; index += 2) {
  const key = process.argv[index];
  if (!['--mode', '--output-root'].includes(key) || !process.argv[index + 1]) throw new Error('Usage: build-business.mjs [--mode kit|skill] [--output-root DIR]');
  if (key === '--mode') options.mode = process.argv[index + 1];
  else options.output = path.resolve(process.argv[index + 1]);
}
if (!['kit', 'skill'].includes(options.mode)) throw new Error('Invalid business documentation mode.');
const manifest = JSON.parse(await readFile(path.join(exampleRoot, 'catalog/business-catalog.json'), 'utf8'));
const skillMode = options.mode === 'skill';
const examplePrefix = skillMode ? 'assets/ui-kit/example' : 'example';
const docsPrefix = skillMode ? 'references/example/business' : 'example/docs/business';
const indexPath = skillMode ? 'references/example/component-index.json' : 'example/docs/component-index.json';
const contractPrefix = skillMode ? 'references/example/contracts' : 'example/docs/contracts';
const categoryLabels = { form:'业务表单', action:'业务动作', data:'数据与文件', panel:'布局与流程', overlay:'弹层与焦点', navigation:'业务导航', feedback:'状态反馈', media:'媒体浏览', utility:'基础辅助' };
const entries = manifest.components;
if (entries.length !== manifest.total || new Set(entries.map(entry => entry.id)).size !== entries.length) throw new Error('Invalid business catalog identities.');
async function write(relative, content) {
  const output = path.resolve(options.output, relative);
  if (!output.startsWith(options.output + path.sep)) throw new Error('Output path is outside the selected root.');
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, content.endsWith('\n') ? content : content + '\n');
}
const link = (from, target, label) => `[${label}](${path.posix.relative(path.posix.dirname(from), target)})`;
const tableText = value => String(value).replaceAll('|', '\\|').replaceAll('\n', ' ');
const beforeCounts = {};
const indexEntries = [];
for (const entry of entries) {
  if (!/^business-[a-z]+$/.test(entry.id) || !categoryLabels[entry.family] || !entry.useWhen || !entry.avoidWhen) throw new Error(`Incomplete business scenario: ${entry.id}`);
  const sourceFile = path.join(exampleRoot, entry.demoPath);
  await access(sourceFile);
  const source = await readFile(sourceFile, 'utf8');
  if (!source.includes('export default')) throw new Error(`Missing demonstration export: ${entry.id}`);
  const guide = `${docsPrefix}/components/${entry.id}.md`;
  const demo = `${examplePrefix}/${entry.demoPath}`;
  beforeCounts[entry.beforeCoverage.status] = (beforeCounts[entry.beforeCoverage.status] || 0) + 1;
  const contracts = entry.contracts.map(slug => link(guide, `${contractPrefix}/${slug}.md`, slug)).join('、');
  await write(guide, `# ${entry.name}\n\n${categoryLabels[entry.family]} · \`${entry.id}\` · 中文意图：${entry.aliases.slice(1).join(' / ')}\n\n## 1. 什么场景使用\n\n${entry.useWhen}。\n\n**不适合或优先替代：**${entry.avoidWhen}。\n\n先确认本次任务要解决的业务行为，再选择本组件。普通业务页面优先使用这里的基础能力；只有用户明确要求装饰效果时才追加效果组件。\n\n## 2. 只加载这一项\n\n1. 只读本指南，确认用途与边界。\n2. 只读 ${link(guide, demo, entry.demoPath)}；共享基础有需要才读 ${link(guide, `${examplePrefix}/src/business/support.tsx`, 'support.tsx')}。\n3. 本例若导入 primitives，再定位该文件中被使用的符号，不加载其它示例。样式按需检索 ${link(guide, `${examplePrefix}/src/business/business.css`, '业务 Token 皮肤')} 中的对应类。\n4. 涉及业务错误、权限、数据或异步行为时才追加对应契约：${contracts}。\n5. 预览库使用本项独立 import() 入口；复制到目标项目时也只接入所需组件和直接依赖。\n\n所有实现使用本项目已有 React、原生 HTML 和 CSS。完整交互、类型与回调以当前示例代码为准。\n\n## 3. 本例真实用法\n\n下面来自当前独立示例。默认导出是一个可运行实例；复制后把本地选项、数据与回调接到目标项目已有业务层，不把演示结果当作后端成功。\n\n\`\`\`tsx\n${source.trim()}\n\`\`\`\n\n## 4. 接入约束\n\n- 颜色、阅读面、圆角、边界、焦点与阴影使用 Agent Wan Token，业务逻辑留在所属模块。\n- 服务端状态、资源归属与动作权限由既有可信业务接口处理；前端输入限制只服务于体验。\n- 保留本项键盘、名称、空状态、错误状态和恢复入口，清理拥有的监听、计时器、观察器与对象 URL。\n- 文档中的本地数组、文件或短命令只用于示例；不增加未授权的上传、设备访问、外部写入或 shell 执行。\n- 减少运动偏好下保留业务操作，仅停用短过渡；不要因为动效偏好关闭必要表单与菜单。\n\n## 5. 场景级验收\n\n按第 1 节实际业务任务检查状态变化、键盘路径、边界值、失败和取消。只报告运行过的检查；本指南和源码存在不等于已完成浏览器验收。\n\n能力对照：${entry.beforeCoverage.relatedIds.length ? entry.beforeCoverage.relatedIds.join('、') + ' 是已有相邻效果；通用业务行为按本例补齐。' : '此前没有独立可运行业务示例，规范和 CSS 不作为运行覆盖。'}\n\n选型有疑问时返回 ${link(guide, `${docsPrefix}/categories/${entry.family}.md`, categoryLabels[entry.family])}，先比较最多 2–3 项。`);
  indexEntries.push({ id:entry.id, name:entry.name, exportName:entry.name, provider:'business', category:entry.category, categoryLabel:categoryLabels[entry.family], aliases:entry.aliases, tags:[categoryLabels[entry.family], '业务基础', '原生 React'], description:entry.description, useWhen:entry.useWhen, avoidWhen:entry.avoidWhen, docPath:guide, sourcePath:demo, demoPath:demo, propsPath:null, motion:'必要交互可用；仅局部过渡遵从减少运动' });
}
for (const [family, label] of Object.entries(categoryLabels)) {
  const subset = entries.filter(entry => entry.family === family);
  const filename = `${docsPrefix}/categories/${family}.md`;
  await write(filename, `# ${label}\n\n仅在需要按场景选型时读本页；精确名称可直接查询单项指南，不顺序读取整个类别。\n\n| 组件 | 什么时候使用 | 什么时候换用其它能力 |\n|---|---|---|\n${subset.map(entry => `| ${link(filename, `${docsPrefix}/components/${entry.id}.md`, entry.name)} | ${tableText(entry.useWhen)} | ${tableText(entry.avoidWhen)} |`).join('\n')}\n\n选定一个组件后只读它的文档、示例与必要共享符号。`);
}
const router = `${docsPrefix}/task-router.md`;
await write(router, `# 按业务场景渐进选型\n\n本页只负责找到下一份必要资源，不把全部组件和 API 放入上下文。\n\n1. 判断任务是业务行为还是装饰效果。表单、选择、数据、导航、反馈先查业务目录；文字粒子、悬停和背景等明确效果再查效果组件。\n2. 有组件名：运行 \`find-component.mjs "AutoComplete" --provider business --exact\`，只读返回指南。\n3. 只有中文场景：运行 \`find-component.mjs "输入时搜索候选" --provider business --limit 3\`，结合 when 与 avoidWhen 选择一项。\n4. 无精确目标才读下方一个类别页；比较最多 2–3 项后停止扩展阅读。\n5. 单组件指南 → 自有示例 → 用到的共享符号与样式 → 当前任务涉及的行为契约。不要复制所有入口或全量导入。\n\n| 业务目标 | 下一页 |\n|---|---|\n${Object.entries(categoryLabels).map(([family,label])=>`| ${label} | ${link(router, `${docsPrefix}/categories/${family}.md`,label)} |`).join('\n')}\n\n典型判断：输入后查找很多候选 → AutoComplete；少量固定选项 → Select 或 RadioButton；结构化记录比较 → DataTable；自由说明 → Textarea；临时阻断确认 → Dialog；较多详情编辑 → Drawer；轻量锚点内容 → Popover；非阻断结果 → Toast；已经发生的事件 → Timeline；未完成的顺序步骤 → Stepper。\n\n所有业务能力使用 React 与原生 HTML 实现，当前交互与资源边界以本包源码为准。`);
const coverage = `${docsPrefix}/coverage.md`;
await write(coverage, `# 业务组件覆盖对照\n\n版本记录：${manifest.capturedAt}。本目录包含 ${entries.length} 个业务核心能力，每项提供独立的使用场景与示例。\n\n此次补充前：${beforeCounts.partial || 0} 项存在相邻效果示例，${beforeCounts['missing-runtime'] || 0} 项缺少独立业务运行示例。规范、CSS 和名称相似不能直接当作完整业务覆盖。此次每项均有独立自有实现和渐进指南；这是源码接入状态，不是浏览器验收结论。\n\n| 能力 | 原有相邻示例 | 此次接入 |\n|---|---|---|\n${entries.map(entry=>`| ${link(coverage,`${docsPrefix}/components/${entry.id}.md`,entry.name)} | ${entry.beforeCoverage.relatedIds.join('、') || '没有独立运行项'} | ${link(coverage,`${examplePrefix}/${entry.demoPath}`,'自有 React 示例')} |`).join('\n')}\n\n不新增运行时依赖；原有 ${215} 项效果组件身份与实现继续保留。`);
const existingIndex = JSON.parse(await readFile(path.join(options.output, indexPath), 'utf8'));
existingIndex.components = [...existingIndex.components.filter(entry => !entry.id.startsWith('business-')), ...indexEntries];
existingIndex.total = existingIndex.components.length;
existingIndex.businessTotal = entries.length;
existingIndex.counts = Object.fromEntries([...new Set(existingIndex.components.map(entry => entry.category))].map(category => [category, existingIndex.components.filter(entry => entry.category === category).length]));
await write(indexPath, JSON.stringify(existingIndex, null, 2));
const runtimeEntries = entries.map(entry => ({ id:entry.id, name:entry.name, category:entry.category, exportName:entry.name, description:entry.description, subtitle:entry.subtitle, aliases:entry.aliases, dependencies:entry.dependencies, docsUrl:'', sourcePath:entry.sourcePath, demoPath:entry.demoPath, guidePath:entry.guidePath, motion:entry.motion, webgl:entry.webgl, minHeight:entry.minHeight }));
const categories = Object.entries(categoryLabels).map(([family,name])=>({id:`business-${family}`,name,count:entries.filter(entry=>entry.family===family).length}));
if (!skillMode && options.output === kitRoot) {
  await write(`${examplePrefix}/src/business/catalog.generated.ts`, `// Generated from catalog/business-catalog.json; metadata only.\nimport type { CatalogEntry } from '../catalog';\nexport const entries: CatalogEntry[] = ${JSON.stringify(runtimeEntries,null,2)};\nexport const categories = ${JSON.stringify(categories,null,2)};`);
  await write(`${examplePrefix}/src/business/demo-loaders.generated.ts`, `// One lazy edge per business capability.\nimport type { DemoLoaders } from '../runtime/types';\nexport const loaders: DemoLoaders = {\n${entries.map(entry=>`  '${entry.id}': () => import('./demos/${entry.id}'),`).join('\n')}\n};`);
}
console.log(`Generated ${entries.length} business guides and scenario routes; combined lookup ${existingIndex.total} entries.`);
