import { readFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { loadComponentDirectory } from '../../../scripts/component-directory.mjs';
import { readParameters, defaultUsage, parameterDocs } from './parameter-docs.mjs';

// A business overlay is generated into the same staging tree as effects. The
// caller owns the merged index, purpose routes and final generated manifest.
export async function buildBusinessDocs({ exampleRoot, mode, docPrefix, examplePrefix, effectsTotal, write, preserve }) {
  const manifest = JSON.parse(await readFile(path.join(exampleRoot, 'catalog/business-catalog.json'), 'utf8'));
  const docsPrefix = `${docPrefix}/business`;
  const contractPrefix = `${docPrefix}/contracts`;
  const sourceFamilies = new Set(['form', 'action', 'data', 'panel', 'overlay', 'navigation', 'feedback', 'media', 'utility']);
  const directory = await loadComponentDirectory(exampleRoot);
  const entries = manifest.components.map(entry => {
    const metadata = directory.byId.get(entry.id);
    if (!metadata || metadata.provider !== 'business') throw new Error(`Missing business purpose assignment: ${entry.id}`);
    return { ...entry, name: metadata.name, category: metadata.category };
  });
  const categoryName = entry => directory.categoryById.get(entry.category).name;
  if (entries.length !== manifest.total || new Set(entries.map(entry => entry.id)).size !== entries.length) throw new Error('Invalid business catalog identities.');
  const link = (from, target, label) => `[${label}](${path.posix.relative(path.posix.dirname(from), target)})`;
  const motionGuidePath = `${docsPrefix}/motion-guide.md`;
  const motionGuide = await readFile(path.join(exampleRoot, 'docs/business/motion-guide.md'), 'utf8');
  const relocatedMotionGuide = motionGuide.replaceAll('../../src/business/', `${path.posix.relative(path.posix.dirname(motionGuidePath), `${examplePrefix}/src/business`)}/`);
  if (mode === 'kit') await preserve(motionGuidePath, relocatedMotionGuide, 'example/docs/business/motion-guide.md');
  else await write(motionGuidePath, relocatedMotionGuide);
  const beforeCounts = {};
  const indexEntries = [];
  for (const entry of entries) {
    if (!/^business-[a-z]+$/.test(entry.id) || !sourceFamilies.has(entry.family) || !entry.useWhen || !entry.avoidWhen) throw new Error(`Incomplete business scenario: ${entry.id}`);
    const sourceFile = path.join(exampleRoot, entry.demoPath);
    await access(sourceFile);
    const source = await readFile(sourceFile, 'utf8');
    const parameters = await readParameters(exampleRoot, entry.id);
    const runnableUsage = await defaultUsage(exampleRoot, parameters);
    if (!source.includes('export default')) throw new Error(`Missing demonstration export: ${entry.id}`);
    const guide = `${docsPrefix}/components/${entry.id}.md`;
    const demo = `${examplePrefix}/${entry.demoPath}`;
    beforeCounts[entry.beforeCoverage.status] = (beforeCounts[entry.beforeCoverage.status] || 0) + 1;
    const contracts = entry.contracts.map(slug => link(guide, `${contractPrefix}/${slug}.md`, slug)).join('、');
    await write(guide, `# ${entry.name}\n\n${categoryName(entry)} · \`${entry.id}\` · 中文意图：${entry.aliases.slice(1).join(' / ')}\n\n## 1. 什么场景使用\n\n${entry.useWhen}。\n\n**不适合或优先替代：**${entry.avoidWhen}。\n\n先确认本次任务要解决的业务行为，再选择本组件。普通业务页面优先使用这里的基础能力；只有用户明确要求装饰效果时才追加效果组件。\n\n## 2. 只加载这一项\n\n1. 只读本指南，确认用途与边界。\n2. 只读 ${link(guide, demo, entry.demoPath)}；需核对 API 与 DIY 配置时读 ${link(guide, `${examplePrefix}/src/parameters/definitions/${entry.id}.json`, '本项参数记录')}；共享基础有需要才读 ${link(guide, `${examplePrefix}/src/business/support.tsx`, 'support.tsx')}。\n3. 本例从 components 按需导入独立控件；只读实际导入的 .tsx 及同名 .module.css。布局工具类也显式使用 CSS Modules，不给整块区域的 button/input 套统一动效。\n4. 涉及业务错误、权限、数据或异步行为时才追加对应契约：${contracts}。\n5. 预览库使用本项独立 import() 入口；复制到目标项目时也只接入所需组件和直接依赖。\n\n所有实现使用本项目已有 React、原生语义控件、Motion 和 CSS。完整交互、类型与回调以当前示例代码为准；局部弹性、下拉、媒体与日历效果见 ${link(guide, `${docsPrefix}/motion-guide.md`, '交互动效指南')}。\n\n## 3. 本例真实用法\n\n下面来自当前独立示例。默认导出是一个可运行实例；复制后把本地选项、数据与回调接到目标项目已有业务层，不把演示结果当作后端成功。\n\n\`\`\`tsx\n${runnableUsage.trim()}\n\`\`\`\n\n${parameterDocs(parameters, { guidePath: guide, examplePrefix, provider: 'business' })}\n\n## 4. 接入约束\n\n- 颜色、阅读面、圆角、边界、焦点与阴影使用 Agent Ric Token，业务逻辑留在所属模块。\n- 服务端状态、资源归属与动作权限由既有可信业务接口处理；前端输入限制只服务于体验。\n- 保留本项键盘、名称、空状态、错误状态和恢复入口，清理拥有的监听、计时器、观察器与对象 URL。\n- 文档中的本地数组、文件或短命令只用于示例；不增加未授权的上传、设备访问、外部写入或 shell 执行。\n- 减少运动偏好下保留业务操作，仅停用短过渡；不要因为动效偏好关闭必要表单与菜单。\n\n## 5. 场景级验收\n\n按第 1 节实际业务任务检查状态变化、键盘路径、边界值、失败和取消。只报告运行过的检查；本指南和源码存在不等于已完成浏览器验收。\n\n能力对照：${entry.beforeCoverage.relatedIds.length ? entry.beforeCoverage.relatedIds.join('、') + ' 是已有相邻效果；通用业务行为按本例补齐。' : '此前没有独立可运行业务示例，规范和 CSS 不作为运行覆盖。'}\n\n选型有疑问时返回 ${link(guide, `${docsPrefix}/categories/${entry.category}.md`, categoryName(entry))}，先比较最多 2–3 项。`);
    indexEntries.push({ id:entry.id, name:entry.name, exportName:entry.name, provider:'business', family:entry.family, sourceCategory:directory.byId.get(entry.id).sourceCategory, category:entry.category, categoryLabel:categoryName(entry), aliases:entry.aliases, tags:directory.byId.get(entry.id).tags, description:entry.description, useWhen:entry.useWhen, avoidWhen:entry.avoidWhen, docPath:guide, sourcePath:demo, demoPath:demo, propsPath:`${examplePrefix}/src/parameters/definitions/${entry.id}.json`, motion:'必要交互可用；仅局部过渡遵从减少运动' });
  }
  const coverage = `${docsPrefix}/coverage.md`;
  await write(coverage, `# 业务组件覆盖对照\n\n版本记录：${manifest.capturedAt}。本目录包含 ${entries.length} 个业务核心能力，每项提供独立的使用场景与示例。\n\n此次补充前：${beforeCounts.partial || 0} 项存在相邻效果示例，${beforeCounts['missing-runtime'] || 0} 项缺少独立业务运行示例。规范、CSS 和名称相似不能直接当作完整业务覆盖。此次每项均有独立自有实现和渐进指南；这是源码接入状态，不是浏览器验收结论。\n\n| 能力 | 原有相邻示例 | 此次接入 |\n|---|---|---|\n${entries.map(entry=>`| ${link(coverage,`${docsPrefix}/components/${entry.id}.md`,entry.name)} | ${entry.beforeCoverage.relatedIds.join('、') || '没有独立运行项'} | ${link(coverage,`${examplePrefix}/${entry.demoPath}`,'自有 React 示例')} |`).join('\n')}\n\n不新增运行时依赖；原有 ${effectsTotal} 项效果组件身份与实现继续保留。`);
  return { components: indexEntries, capturedAt: manifest.capturedAt };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.argv.includes('--help')) console.log('Business docs are part of build-progressive.mjs staging. Use build-progressive.mjs --help.');
  else throw new Error('Generate the complete effects + business staging overlay with build-progressive.mjs; a business-only write would leave routes and indices inconsistent.');
}
