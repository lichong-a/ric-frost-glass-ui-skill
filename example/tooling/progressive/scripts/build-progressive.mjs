#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { categories as sourceCategories, intentMetadata } from './intent-metadata.mjs';
import { loadComponentDirectory } from '../../../scripts/component-directory.mjs';
import { readParameters, defaultUsage, parameterDocs } from './parameter-docs.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const options = { mode: 'skill' };
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) {
  const key = args[i].replace(/^--/, '');
  if (key === 'help') {
    process.stdout.write('Usage: node build-progressive.mjs --catalog FILE --kit-root DIR --output-root DIR [--mode skill|kit] [--example-prefix PATH] [--demos-root DIR]\n');
    process.exit(0);
  }
  if (!args[i].startsWith('--') || !args[i + 1]) throw new Error(`Invalid argument: ${args[i]}`);
  options[key] = args[++i];
}
const catalogPath = options.catalog;
const outputRoot = options['output-root'] || options.out;
const kitRoot = options['kit-root'];
if (!catalogPath || !outputRoot || !kitRoot) throw new Error('--catalog, --kit-root and --output-root are required.');
if (!['skill', 'kit'].includes(options.mode)) throw new Error('--mode must be skill or kit.');
const isSkill = options.mode === 'skill';
const kitPrefix = isSkill ? 'assets/ui-kit' : '';
const examplePrefix = options['example-prefix'] || (isSkill ? 'assets/ui-kit/example' : 'example');
const docPrefix = isSkill ? 'references/example' : 'example/docs';
const scriptPath = isSkill ? 'scripts/find-component.mjs' : 'example/scripts/find-component.mjs';
const setupRunner = isSkill ? 'node assets/ui-kit/scripts/example.mjs' : 'node scripts/example.mjs';
const source = JSON.parse(await fs.readFile(catalogPath, 'utf8'));
const raw = Array.isArray(source) ? source : source.components;
const exampleRoot = path.resolve(path.dirname(catalogPath), '..');
const directory = await loadComponentDirectory(exampleRoot);
const categories = Object.fromEntries(directory.categories.map(item => [item.id, { label: item.name, intent: item.description, baseMotion: '遵从系统减少动效偏好，功能交互保持可用', fallback: '保留可读内容与原生交互，并提供当前组件的静态状态' }]));
if (!Array.isArray(raw) || !raw.length) throw new Error('Catalog has no components.');
const previewCatalogPath = options['preview-catalog'] || (options['demos-root'] ? path.join(path.dirname(options['demos-root']), 'catalog.ts') : null);
let previewEntries = [];
if (previewCatalogPath) {
  const generatedCatalog = await fs.readFile(previewCatalogPath, 'utf8');
  const match = generatedCatalog.match(/export const entries[^=]*= ([\s\S]+?);\nexport const categories =/);
  if (!match) throw new Error(`Cannot read the generated preview entry table: ${previewCatalogPath}`);
  previewEntries = JSON.parse(match[1]);
}
const previewById = new Map(previewEntries.map(entry => [entry.id, entry]));
const assetLockPath = options['asset-lock'] || path.join(path.dirname(catalogPath), 'asset-lock.json');
let installedAssetFiles = [];
try {
  const assetLock = JSON.parse(await fs.readFile(assetLockPath, 'utf8'));
  installedAssetFiles = assetLock.files || [];
} catch (error) {
  if (error.code !== 'ENOENT' || options['asset-lock']) throw error;
}
const root = path.resolve(outputRoot);
if (root === path.resolve(kitRoot) || root === path.resolve(path.dirname(catalogPath))) {
  throw new Error('Use a separate output-root, then merge the reviewed overlay.');
}
const p = (...parts) => path.posix.join(...parts.filter(Boolean));
const asRootPath = value => {
  if (!value) return null;
  if (value.startsWith('assets/ui-kit/')) return isSkill ? value : value.slice('assets/ui-kit/'.length);
  if (value.startsWith('example/')) return p(kitPrefix, value);
  if (value.startsWith('src/') || value.startsWith('.upstream/')) return p(examplePrefix, value);
  return value;
};
const escapeCell = x => String(x ?? '').replaceAll('|', '\\|').replace(/\r?\n/g, ' ');
const unique = xs => [...new Set(xs.filter(Boolean))];
const link = (from, target, label = target) => `[${label}](${path.posix.relative(path.posix.dirname(from), target)})`;
async function write(relative, body) {
  if (relative.startsWith('/') || relative.split('/').includes('..')) throw new Error(`Unsafe output path: ${relative}`);
  const dest = path.join(root, relative);
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, body.endsWith('\n') ? body : `${body}\n`, 'utf8');
}
const entries = raw.map(item => {
  const slug = item.slug || String(item.id || item.name).replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase();
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`Invalid slug: ${slug}`);
  const sourceCategory = ({ TextAnimations: 'text-animations', 'Text Animations': 'text-animations', Animations: 'animations', Components: 'components', Micro: 'micro', Backgrounds: 'backgrounds' })[item.category] || item.category;
  if (!sourceCategories[sourceCategory]) throw new Error(`Unknown source category: ${item.category}`);
  const metadata = directory.byId.get(slug);
  if (!metadata) throw new Error(`Missing purpose category: ${slug}`);
  const category = metadata.category;
  const routing = intentMetadata[slug];
  if (!routing) throw new Error(`Missing Chinese routing metadata: ${slug}`);
  const sourceFiles = (item.files || []).map(f => typeof f === 'string' ? f : f.path);
  const sourceFile = sourceFiles.find(f => f.endsWith(`/${item.id}.tsx`)) || sourceFiles.find(f => f.endsWith('.tsx')) || item.sourcePath;
  if (!sourceFile) throw new Error(`Missing source: ${slug}`);
  const sourcePath = sourceFile.startsWith('src/') ? p(examplePrefix, '.upstream', sourceFile) : sourceFile;
  const styles = sourceFiles.filter(f => f.endsWith('.css')).map(f => p(examplePrefix, '.upstream', f));
  const docPath = p(docPrefix, 'components', `${slug}.md`);
  const caps = item.capabilities || {};
  const preview = previewById.get(slug);
  const previewGpu = preview ? preview.webgl !== 'none' : null;
  const gpu = slug !== 'glass-surface' && (previewGpu ?? (caps.webGL || caps.webGPU || item.dependencies?.some(x => ['three', 'ogl', '@react-three/fiber'].includes(x))));
  const highMotion = gpu || sourceCategory === 'backgrounds' || /cursor|trail|falling|spiral|lanyard|ballpit|hyperspeed|crumple|glitch/.test(slug);
  const runtimeTier = slug === 'glass-surface'
    ? '本例使用 renderer="auto" 的默认路径：优先 SVG 折射，需要时尝试 WebGL，失败时保留 CSS 霜玻璃；不要用强制 WebGL 预检阻断可用的 SVG / CSS 路径'
    : preview
      ? preview.webgl === 'none'
        ? '本例预览入口不要求预先通过图形接口检查；实际组件内部的可选渲染分支由源码和本例 Props 决定'
        : `本例预览入口声明需 ${preview.webgl === 'webgpu' ? 'WebGPU' : preview.webgl === 'webgl2' ? 'WebGL 2' : 'WebGL'}；这是当前示例的运行配置，不是仅凭源码关键词推断`
      : '源码扫描标签仅用于发现潜在分支；未提供预览入口配置，具体需要的能力须按实际 Props 与源码确认';
  return {
    ...item, id: slug, exportName: item.id || item.exportName, name: metadata.name || item.name || item.title,
    category, sourceCategory, categoryLabel: categories[category].label,
    aliases: unique([...(item.aliases || []), ...routing.aliases]),
    tags: unique([...(metadata.tags || []), ...(item.tags || []), categories[category].label, ...(highMotion ? ['按需挂载'] : [])]),
    description: item.description || routing.effectContract,
    effectContract: item.effectContract || routing.effectContract,
    motion: item.motion || (slug === 'glass-surface' ? '局部玻璃效果；renderer auto 自行选择可用路径，不强制持续 GPU 动画' : highMotion ? '按需启用的持续 / 高运动效果' : categories[category].baseMotion),
    fallback: item.fallback || categories[category].fallback,
    sourcePath, stylePaths: styles,
    demoPath: asRootPath(preview?.demoPath) || p(examplePrefix, 'src/demos', category, `${slug}.tsx`),
    propsPath: p(examplePrefix, 'src/parameters/definitions', `${slug}.json`),
    installedAssets: installedAssetFiles.filter(file => file.components?.includes(slug)).map(file => p(examplePrefix, file.destination)),
    docPath,
    runtimeTier,
    previewRequirement: preview?.webgl || null,
    highMotion,
  };
});
if (new Set(entries.map(c => c.id)).size !== entries.length) throw new Error('Duplicate component slug.');
if (new Set(entries.map(c => c.name)).size !== entries.length) throw new Error('Duplicate component name.');
const byCategory = Object.fromEntries(Object.keys(categories).map(key => [key, entries.filter(c => c.category === key)]));
const missingAliases = Object.keys(intentMetadata).filter(slug => !entries.some(c => c.id === slug));
const counts = Object.fromEntries(Object.entries(byCategory).map(([key, value]) => [key, value.length]));
const provenance = source.sources || source.source || {};
const sourceDate = source.capturedAt || source.captured_at || '随清单固定';

const specSlugs = ['execution', 'references', 'principles', 'color', 'typography', 'geometry', 'glass', 'app-shell', 'controls', 'table', 'overlays', 'feedback', 'a11y-motion', 'integration', 'web-pages', 'acceptance', 'sources'];
const contractSlugs = ['common', 'app-shell', 'sidebar', 'header', 'button', 'input', 'select', 'segmented-tabs', 'tenant-switcher', 'todo-popover', 'user-menu', 'data-table', 'row-actions', 'import-dialog', 'confirm-dialog', 'feedback', 'pagination', 'drawer-tooltip', 'auxiliary', 'overlays-keyboard', 'acceptance', 'sources'];
async function splitDocument(filename, destination, slugs, startsAt) {
  const markdown = await fs.readFile(path.join(kitRoot, filename), 'utf8');
  const starts = [...markdown.matchAll(/^## (\d+)[.．、]?[^\n]*$/gm)];
  const result = [];
  for (let i = 0; i < starts.length; i++) {
    const number = Number(starts[i][1]);
    const slug = slugs[number - startsAt];
    if (!slug) throw new Error(`Unexpected section in ${filename}: ${number}`);
    const target = p(docPrefix, destination, `${String(number).padStart(2, '0')}-${slug}.md`);
    let body = markdown.slice(starts[i].index, starts[i+1]?.index ?? markdown.length).trim();
    body = body.replace(/^## /, '# ');
    body = body.replace(/\]\((?!https?:|mailto:|#)([^)]+)\)/g, (_, href) => `](${path.posix.relative(path.posix.dirname(target), p(kitPrefix, href))})`);
    const title = body.split('\n')[0].replace(/^# /, '');
    await write(target, `${body}\n\n---\n\n规范来源：${link(target, p(kitPrefix, filename), filename)}。本文件由主规范按章节生成；修改主规范后重新生成，不独立维护第二套规则。`);
    result.push({ number, title, path: target });
  }
  return result;
}
const specSections = await splitDocument('AGENT_WAN_UI_SPEC.md', 'spec', specSlugs, 1);
const contractSections = await splitDocument('COMPONENT_CONTRACTS.md', 'contracts', contractSlugs, 0);
const spec = (n) => specSections.find(s => s.number === n).path;
const contract = (n) => contractSections.find(s => s.number === n).path;

const corePath = p(docPrefix, 'design-core.md');
await write(corePath, `# Agent Wan 核心视觉约束\n\n本页是首次加载的短约束。任务需要某一类组件时再读取对应章节，不在此复制完整 Token。\n\n- **保留外观层次**：茶绿 / 沙米的低频环境透色，象牙白阅读面，深墨绿文字，少量宋体主标题。圆角、细亮边、柔影与不同厚度的霜玻璃共同构成风格。\n- **页面布局**：顶栏独占整行，Logo 左，待办 / 租户空间 / 个人信息右；左导航、右工作区。完整页面图确定布局与信息密度，组件板只补充外观。\n- **数值来源**：${link(corePath, p(kitPrefix, 'tokens.json'), 'tokens.json')} 为权威；只检索当前使用的语义变量。主色、圆角、透明度和阴影不得在组件里另建近似值。若 GPU 参数需要数值色，复用示例中的主题映射或在运行时解析 Token，不能把 \`var(...)\` 直接传给不支持 CSS 变量的着色器 API。\n- **功能 / 效果 / 皮肤**：功能来自目标项目及基础契约；所选组件提供对应的效果机制；Agent Wan 提供配色、排版、阅读面和交互边界。三者分别保持，不用同一个悬停效果替代所有组件。\n- **安静与展示并存**：业务页面按需求选择效果；组件展示允许演示每个完整效果。高运动、指针跟随、Canvas / WebGL 与物理效果仅在活跃示例或明确需要的位置运行。\n- **文字保持可读**：禁止对含文字的容器整体降低透明度，禁止通过整块 \`filter: blur()\` 制造玻璃。文字揭示效果短暂模糊时仍保留可访问的完整文案，并在减少运动时直接显示终态。\n- **保留交互质量**：hover、selected、focus、disabled、loading 分开；所有变形控件仍有稳定可点击范围、键盘路径与可访问名称。\n\n按需：${link(corePath, spec(4), '颜色')} · ${link(corePath, spec(5), '字体')} · ${link(corePath, spec(6), '尺寸')} · ${link(corePath, spec(7), '玻璃材质')} · ${link(corePath, spec(8), '页面框架')} · ${link(corePath, p(docPrefix, 'effects-policy.md'), '效果与降级策略')}。`);

const policyPath = p(docPrefix, 'effects-policy.md');
await write(policyPath, `# 效果、功能、加载与降级\n\n## 1. 保留组件身份\n\n每个组件文档的“必须保留”说明可观察机制。调整茶绿、沙米、墨色、面板圆角和柔影；保留其路径运动、粒子、折射、形变或操作规律。降低饱和度不等于把效果删除。用户已点名某个动态组件或要求全组件示例时，直接实现被要求的效果；普通后台任务只添加需求涉及的效果。\n\n可调范围优先通过实际 Props 实现。源码没有对应 Props 时，在目标项目副本中适配，记录改动；不能伪造一个不存在的参数。业务阅读面保持稳定，强烈光影限制在展示舞台或非关键装饰层。\n\n## 2. 按需取官方实现\n\n交付目录包含自有示例、主题、清单和安装脚本。**官方组件源码不随模板或 ZIP 再分发**，安装后出现在示例项目的 \`.upstream/\`。组件文档同时给出随包 demo 和安装后的源码路径。\n\n当所选实现尚未准备，在包根运行：\n\n\`\`\`bash\n${setupRunner} setup --component <slug>\n\`\`\`\n\n脚本按本次清单固定版本从官方来源取得所需实现；保留来源与授权文本。网络失败时保留明确安装状态和重试路径，不能用同名空壳冒充可运行组件。阅读源码只打开被选组件及其直接依赖。复用到业务网站前检查项目现有依赖，不要求为一个组件加载全目录。\n\n## 3. 活跃挂载与生命周期\n\n- 组件目录页只渲染索引和封面；进入单项示例才动态 import。可见且启用后再开始持续动画。切换、隐藏或卸载时释放当前效果。\n- 清理事件监听、观察器、RAF、定时器与相关 GPU 资源；语音或相机轨道用完即停止。实现是否已清理必须查看实际源码与运行结果。\n- 预留固定舞台尺寸与可读加载面，避免资源加载时页面跳动。懒加载失败显示组件名称、原因摘要和重试入口。\n- 组件依赖逐项由清单核对；同一依赖复用项目版本。不可仅因关键词判断它实际启用了 WebGL 或设备权限，索引中的 capabilities 是扫描提示。\n\n## 4. 减少运动与触屏\n\n\`prefers-reduced-motion: reduce\` 下不挂载装饰性持续动画；标题输出完整文本、数字输出真实终值、导航选中直接到位、图像提供静态浏览。只有 CSS 关闭动效不足以停止 Canvas / WebGL，必要时在 React 条件渲染层选择降级。\n\n指针跟随效果只在适用指针设备中启用；触屏使用等价点击或原生控件，不能要求 hover 才能操作。装饰层不拦截点击，不隐藏真实指针，不抢占全局滚动。高位移或眩光的预览提供运行 / 暂停控制。\n\n## 5. WebGL、资源和权限失败\n\n| 情况 | 降级行为 |\n|---|---|\n| WebGL / WebGPU 不可用或上下文丢失 | 用静态图片、原内容或 Agent Wan 环境渐变保留版面；显示可读状态，不重复无上限重建 |\n| GPU、Canvas 模块或依赖加载失败 | 当前示例显示失败和重试，其他目录仍可用 |\n| 模型、图像或字体加载失败 | 使用稳定尺寸的替代内容与描述；不隐藏业务文案 |\n| 相机、麦克风无权限 | 仅在用户主动点击对应功能后请求；拒绝后保留替代输入 / 图片，并说明状态 |\n| 减少透明度或 backdrop-filter 不可用 | 使用 Token 中的稳定底色与可辨边界 |\n\n## 6. Agent UI 的真实状态\n\nThought Line、Call Chip、Status Mark、Lattice Loader、Refine Frame、Voice Pill 和 Prompt Bar 只呈现业务层明确提供的公开状态、步骤摘要、内容与计时。不要编造模型隐藏推理、工具成功或录音结果。演示计时/状态必须标为示例，生产中以真实任务事件为准。\n\n## 7. 检查范围\n\n确认加载前后、重试、卸载、窄屏、键盘、触屏、减少运动和不可用环境；行为验收按 ${link(policyPath, spec(13), '可访问性与动效规则')} 和对应契约。是否完成浏览器视觉和真实交互检查分别记录，不能以 Token 或构建校验代替。`);

const routerPath = p(docPrefix, 'task-router.md');
await write(routerPath, `# 按任务渐进加载\n\n本次清单：${entries.length} 个组件；日期 ${sourceDate}；固定版本 \`${provenance.commit || provenance.revision || '见示例清单'}\`。每项对应独立示例；有明确名称时直接读取当前指南。名称查询直接到单组件文档，不必先读类别。\n\n## 1. 按已有信息定位\n\n| 用户已有信息 | 下一步 |\n|---|---|\n| 精确英文名或 slug | 运行 \`find-component.mjs "名称" --exact\`，只读返回的单组件文档 |\n| 中文效果意图 | 运行 \`find-component.mjs "中文意图" --limit 5\`，先看最相关一项 |\n| 只知道类别或要比较方案 | 只读下方对应类别页，选出 1–3 项再读组件文档 |\n| 只要求普通业务控件 | 读取基础规范/契约分片；不强行选一个装饰效果 |\n| 用户明确要求全部组件 | 按十三个用途分类分批实现和逐项核对清单；每个任务只加载分配的组件文档 |\n\n## 2. 十三个用途分类\n\n| 类别 | 组件数 | 用途 |\n|---|---:|---|\n${Object.entries(byCategory).map(([key, list]) => `| ${link(routerPath, p(docPrefix, 'categories', `${key}.md`), categories[key].label)} | ${list.length} | ${categories[key].intent} |`).join('\n')}\n\n## 3. 页面与基础行为\n\n| 任务 | 先读 | 需要时追加 |\n|---|---|---|\n| 页面外壳 / 侧栏 / 顶栏 | ${link(routerPath, spec(8), '页面框架')}、${link(routerPath, contract(1), 'AppShell')} | ${link(routerPath, contract(2), 'Sidebar')}、${link(routerPath, contract(3), 'Header')} |\n| 按钮 / 输入 / 选择 / 开关 | ${link(routerPath, spec(9), '基础视觉')} | ${link(routerPath, contract(4), 'Button')}、${link(routerPath, contract(5), 'Input')}、${link(routerPath, contract(6), 'Select')}、${link(routerPath, contract(7), 'Segmented / Tabs')} |\n| 表格 / 筛选 / 行操作 / 分页 | ${link(routerPath, spec(10), '表格')}、${link(routerPath, contract(11), 'DataTable')} | ${link(routerPath, contract(12), 'RowActions')}、${link(routerPath, contract(16), 'Pagination')} |\n| 菜单 / 各类弹窗 / 四向抽屉 / 提示 | ${link(routerPath, spec(11), '浮层')}、${link(routerPath, contract(19), '浮层与键盘')} | ${link(routerPath, contract(14), '确认弹窗')}、${link(routerPath, contract(17), '抽屉与Tooltip')} |\n| 租户切换 / 导入与扫描 | ${link(routerPath, contract(8), 'TenantSwitcher')} 或 ${link(routerPath, contract(13), 'ImportDialog')} | 只读取所涉状态和失败回退 |\n| 状态 / 计时 / 四角Notice / Toast / 空态 | ${link(routerPath, spec(12), '反馈')}、${link(routerPath, contract(15), '反馈契约')} | Micro 中按具体名称检索；真实任务与示例数据分开 |\n| 动效 / 指针 / Canvas / WebGL | ${link(routerPath, policyPath, '效果与降级')} | 只读所选组件的实际依赖与源码 |\n| 统一滚动条 / 长正文与局部滚动 | ${link(routerPath, spec(6), '尺寸与滚动条')}、${link(routerPath, p(kitPrefix, 'CSS_API.md'), '滚动条样式入口')} | 表格、弹窗或抽屉只追加自身相关契约 |\n| 接入 Token / 主题 / Portal | ${link(routerPath, p(kitPrefix, 'CSS_API.md'), 'CSS API')} | ${link(routerPath, spec(14), '工程接入')} |\n| 验证当前结果 | 单组件文档的验收项 | ${link(routerPath, spec(16), 'UI验收')}、${link(routerPath, p(kitPrefix, 'ACCEPTANCE.md'), '完整验收清单')}（只选本次范围） |\n\n## 4. 避免上下文膨胀\n\n第一次只读 SKILL、核心约束和当前路由；第二次只读单组件文档；第三次才读取实际示例/Props/源码。遇到共用实现仅再读直接依赖。不要全文输出完整 catalog、所有 Props 或动态 import 表，也不要把多个组件源码打包成一个大提示词。\n\n所选实现尚未准备时，按单组件文档从包根运行准备命令；自有示例文件随包保留。组件路径以检索结果为准，不按名字猜目录。`);

function skinFor(c) {
  if (c.skin) return Array.isArray(c.skin) ? c.skin : [c.skin];
  const common = ['组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。', '保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。'];
  if (c.sourceCategory === 'backgrounds') common.unshift('画布优先保留 React Bits 的原版配色与可观察强度，背景有独立边界并为光晕预留空间；业务正文使用稳定阅读面。');
  else if (c.sourceCategory === 'text-animations') common.unshift('标题按页面层级选择宋体或 UI 字体；正文保持无衬线。动画终态必须是完整、清晰、可复制的文字。');
  else common.unshift('容器、状态色、边界与焦点使用 Agent Wan 规范；交互命中区不随视觉形变缩小。');
  if (/glass|glare|reflect|holo|metal|chrome|prism|glow|electric|star|iridescence/.test(c.id)) common.push('保留折射、光晕或反光的可观察变化；本例允许深色画布和原版高光强度，阅读文字应保持清晰。');
  return common;
}
function behaviorFor(c) {
  if (['thought-line','call-chip','status-mark','lattice-loader','refine-frame'].includes(c.id)) return '状态、计时和公开步骤摘要来自任务数据。示例明确标注为模拟；不伪造隐藏推理或完成结果。';
  if (['prompt-bar','voice-pill','curved-input','code-slots','scrub-field'].includes(c.id)) return '提供真实受控值、可访问标签、键盘输入、中文输入法和错误状态；权限与提交只在明确动作后执行。';
  if (/menu|nav|sidebar|dock/.test(c.id)) return '保持真实链接/导航语义、当前项状态、键盘路径与可见焦点；展开菜单按基础浮层契约处理。';
  if (/button|commit|shredder|swipe-row/.test(c.id)) return '将视觉触发与真实动作回调分开；禁用/加载阻止重复提交，提供普通点击或键盘的等价操作，危险动作按确认契约处理。';
  if (/slider|select|wheel|dial|radio|check|switch|toggle|segment|rating|heart|counter|gauge|stepper/.test(c.id)) return '由真实 value / state 与回调驱动；操作可用键盘完成，不能只在动画内部保存业务状态。';
  if (/gallery|carousel|spiral|posters|stack|wall|masonry|card-swap/.test(c.id)) return '图片说明与次序可理解；提供触屏和键盘可达的浏览路径，自动播放可暂停，资源失败时保留稳定布局。';
  return c.sourceCategory === 'backgrounds' || c.sourceCategory === 'animations' ? '装饰层不拦截业务点击、不隐藏真实指针，不成为完成业务的唯一操作方式。' : '保持内容的语义和可访问名称；只有真实可交互元素可进入焦点顺序。';
}
function actualPermissionNotes(c) {
  const notes = {
    'glass-surface': '本例未强制指定 renderer，沿用 auto：SVG / WebGL / CSS 由组件选择。提供 backdrop 不代表每个环境都必须先创建 WebGL 上下文。',
    'reflective-card': '本例初始不挂载相机组件；只有用户点击“启动摄像头反射”后才挂载并请求相机。没有许可时不能声称反射视频已经运行；停止或关闭预览后释放相关资源。',
    'voice-pill': '本例显式设置 reactive="simulated"，只演示波形、切换和计时，不请求麦克风、不录音。若产品需要真实音频模式，按实际 API 在用户主动操作后接入。',
    'prompt-bar': '本例 onDictate 返回模拟文本、onAttach 返回模拟文件名；不会读取本机文件或录音。发送和停止均为本地演示状态，真实模型与附件服务需由业务层接入。',
    'grid-scan': '本例 enableWebcam=false、enableGyro=false、showPreview=false；应用适配层同时阻止禁用相机时加载相机模型。源码有相机相关分支，不代表本例会请求设备。',
    'fluid-glass': '本例为真实 Three / Fiber 的 lens 模式，需要 setup 后的 public/assets/3d 模型、public/assets/draco 解码器及 public/assets/fonts/RobotoFlex.ttf。应用适配层将 useGLTF 的解码目录指向 /assets/draco/，两个 Text 使用本地字体；资源不随模板再分发，缺失时先运行本组件 setup。浏览器资源 URL 对应 public 下的相对路径。',
  };
  return notes[c.id] || '设备访问与音频行为以本例真实 Props 和显式回调为准。capabilities 是源码扫描提示，不能据此声称已请求相机、录音或播放音频。';
}
async function propsSnippet(c) {
  return defaultUsage(exampleRoot, await readParameters(exampleRoot, c.id));
}
let withProps = 0;
for (const c of entries) {
  const componentPath = c.docPath;
  const snippet = await propsSnippet(c);
  if (snippet) withProps++;
  const props = Array.isArray(c.props) ? c.props : [];
  const typeCompatibility = ['target-cursor', 'animated-list', 'glass-surface', 'shuffle', 'split-flap-text'].includes(c.id)
    ? `\n\n本组件在当前锁定依赖组合下使用明确的类型兼容规则。移植或升级前按需读取 ${link(componentPath, p(examplePrefix, 'UPSTREAM_TYPE_COMPATIBILITY.md'), '上游类型兼容说明')} 中的对应条目；官方安装文件保持原始字节，不能把本项目的检查结果描述为原始源码未经适配即零诊断。`
    : '';
  const propsText = parameterDocs(await readParameters(exampleRoot, c.id));
  await write(componentPath, `# ${c.name}\n\n${c.categoryLabel} · \`${c.id}\` · 中文意图：${c.aliases.join(' / ')}\n\n目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)\n\n## 1. 必须保留\n\n${c.effectContract}。\n\n功能要求：${behaviorFor(c)}\n\n## 2. 只读本组件的资源\n\n| 资源 | 位置与用途 |\n|---|---|\n| 自有示例（随包） | ${link(componentPath, c.demoPath, c.demoPath)} |\n| 组件实现（准备后存在） | ${link(componentPath, c.sourcePath, c.sourcePath)} |\n${c.stylePaths.length ? `| 组件 CSS（准备后存在） | ${c.stylePaths.map(s => link(componentPath, s, s)).join('、')} |\n` : ''}${c.propsPath ? `| 单独 Props 记录 | ${link(componentPath, c.propsPath, c.propsPath)} |\n` : ''}${c.installedAssets.map(asset => `| 安装资源（setup 后存在） | ${link(componentPath, asset, asset)} |\n`).join('')}| 固定版本 | \`${provenance.commit || provenance.revision || '见catalog'}\` |\n\n先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：\n\n\`\`\`bash\n${setupRunner} setup --component ${c.id}\n\`\`\`\n\n安装完成再读取对应源码及直接依赖。无需加载其余 ${entries.length - 1} 项。\n\n## 3. 本例参数与 API\n\n${snippet ? `以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。\n\n\`\`\`tsx\n${snippet}\n\`\`\`` : '本例参数在上方随包 demo 中；当前生成阶段未内嵌可核验片段。读取该文件，不使用凭空编写的 Props。'}\n\n${propsText}${typeCompatibility}\n\n## 4. Agent Wan 皮肤\n\n${skinFor(c).map(s => `- ${s}`).join('\n')}\n\n## 5. 加载、动效与降级\n\n本例实际配置：${actualPermissionNotes(c)}\n\n- 依赖清单：${c.dependencies?.length ? c.dependencies.map(x => `\`${x}\``).join('、') : '未记录外部依赖；读取源码 import 核对'}。安装前复用目标项目的兼容版本，不重复加载。\n- 运行类型：${c.runtimeTier}。此说明不等于浏览器运行证明。\n- 动效策略：${c.motion}。\n- 示例库降级：动态偏好或能力检查不满足时先不挂载本项，显示原因；减少运动时可明确选择仅播放本次。\n- 业务接入的静态降级要求：${c.fallback}\n- 卸载时释放本例监听、计时、动画帧及拥有的渲染资源；不以隐藏 CSS 代替停止循环。\n\n仅当前需求涉及高级运行、资源或设备权限时再读 ${link(componentPath, policyPath, '效果与降级策略')}。\n\n## 6. 验收本组件\n\n1. 参数与对应源码真实 API 一致，构建可导入，安装失败可恢复。\n2. 能观察到第 1 节的核心机制，而不只是相同名称的占位卡片。\n3. 真实状态 / 事件 / 键盘与必要的触屏等价操作可用。\n4. 画布保留本例的效果对比度和原版配色；外壳、阅读面与基础规范一致。\n5. 只激活本项；切换或卸载后停止其持续工作。\n6. 减少运动与不可用情形保留本节所述等价内容或功能。\n\n只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 ${link(componentPath, p(docPrefix, 'categories', `${c.category}.md`), c.categoryLabel)}；否则直接完成当前组件。`);
}
for (const [category, list] of Object.entries(byCategory)) {
  const categoryPath = p(docPrefix, 'categories', `${category}.md`);
  await write(categoryPath, `# ${categories[category].label}\n\n${list.length} 项 · ${categories[category].intent}。只在没有明确组件名或需要同类比较时读取本页；选定一项后直接到其文档，不顺序读取全部。\n\n| 组件 | 中文意图 | 必须保留的特征 |\n|---|---|---|\n${list.map(c => `| ${link(categoryPath, c.docPath, c.name)} | ${escapeCell(c.aliases.slice(0,3).join(' / '))} | ${escapeCell(c.effectContract)} |`).join('\n')}\n\n动效默认：${categories[category].baseMotion}。降级：${categories[category].fallback}\n\n需要页面 / 业务行为时回到 ${link(categoryPath, routerPath, '任务路由')}。`);
}

const index = {
  schemaVersion: 1, capturedAt: sourceDate, total: entries.length, counts,
  source: { revision: provenance.commit || provenance.revision || null }, officialSourcesBundled: false,
  components: entries.map(c => ({ id: c.id, name: c.name, exportName: c.exportName, provider: 'effects', sourceCategory: c.sourceCategory, category: c.category, categoryLabel: c.categoryLabel, aliases: c.aliases, tags: c.tags, description: c.description, docPath: c.docPath, sourcePath: c.sourcePath, demoPath: c.demoPath, propsPath: c.propsPath, motion: c.motion }))
};
await write(p(docPrefix, 'component-index.json'), JSON.stringify(index, null, 2));
let queryScript = await fs.readFile(path.join(here, 'find-component.mjs'), 'utf8');
queryScript = queryScript.replace("'../references/component-index.json'", JSON.stringify(path.posix.relative(path.posix.dirname(scriptPath), p(docPrefix, 'component-index.json'))));
queryScript = queryScript.replaceAll('references/task-router.md', `${docPrefix}/task-router.md`);
await write(scriptPath, queryScript);

let skill = await fs.readFile(path.join(here, '../templates/SKILL.md'), 'utf8');
if (isSkill) {
  skill = skill.replaceAll('references/', 'references/example/');
} else {
  skill = skill.replaceAll('references/', `${docPrefix}/`).replaceAll('assets/ui-kit/', '');
}
await write('SKILL.md', skill);
let handoff = await fs.readFile(path.join(here, '../templates/AGENT_HANDOFF.md'), 'utf8');
handoff = handoff.replaceAll('references/', `${docPrefix}/`);
if (!isSkill) handoff = handoff.replace(`先读技能 SKILL.md 和 ${docPrefix}/design-core.md`, `先读 SKILL.md，并按任务只读 ${docPrefix}/design-core.md`);
await write(isSkill ? p(kitPrefix, 'AGENT_HANDOFF.md') : 'AGENT_HANDOFF.md', handoff);
try {
  await fs.access(path.join(path.dirname(catalogPath), 'business-catalog.json'));
  const business = spawnSync(process.execPath, [path.join(here, 'build-business.mjs'), '--mode', options.mode, '--output-root', root], { stdio: 'inherit' });
  if (business.error) throw business.error;
  if (business.status !== 0) throw new Error(`Business documentation generator exited with ${business.status}.`);
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}
const finalIndex = JSON.parse(await fs.readFile(path.join(root, docPrefix, 'component-index.json'), 'utf8'));
await write(p(docPrefix, 'generation-report.json'), JSON.stringify({ generatedAt: new Date().toISOString(), total: finalIndex.total, reactBitsTotal: entries.length, businessTotal: finalIndex.businessTotal || 0, categories: finalIndex.counts, componentDocs: finalIndex.total, docsWithDemoSnippet: withProps + (finalIndex.businessTotal || 0), specSections: specSections.length, contractSections: contractSections.length, unusedRoutingAliases: missingAliases, officialSourcesBundled: false, verification: 'Generation and path shape only; run final asset presence, setup, build and UI checks separately.' }, null, 2));
process.stdout.write(`${JSON.stringify({ outputRoot: root, components: finalIndex.total, categories: finalIndex.counts, docsWithDemoSnippet: withProps + (finalIndex.businessTotal || 0), specSections: specSections.length, contractSections: contractSections.length, index: p(docPrefix, 'component-index.json'), script: scriptPath }, null, 2)}\n`);
