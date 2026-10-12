# Agent Wan 组件示例库

基于 Agent Wan 自然色霜玻璃规范，将 React Bits 指定索引中的 **215 个组件**逐项接入独立示例。每项都有自己的演示入口、参数用法、中文意图说明和源码定位。选择一个组件后，预览区挂载该组件的真实实现。

现包含 **215 个 React Bits 效果示例 + 88 个自有业务能力，共 303 个独立入口**。新增业务能力使用现有 React、原生 HTML 与 CSS；参考 PrimeReact 的功能目录，不引入其运行时或新增依赖。React Bits 仍统一使用 TypeScript + CSS，不重复统计其它语法变体。

## 1. 启动

需要 Node.js **22.12 或更新版本**。在此示例项目目录中依次执行：

```bash
npm ci
npm run setup:reactbits
npm run dev
```

打开终端打印的本地地址。通过组件名、中文关键词或类别定位示例；选中一项后操作预览中的控件，查看其真实状态与效果。初次安装需要获取 npm 依赖与固定版本的官方资源；setup 输出已处理、已校验和失败文件数，对超时、连接中断和可重试 HTTP 状态最多尝试三次。散列不匹配和其他 HTTP 错误直接报错。再次运行会复用已经校验通过的文件。

完整构建：

```bash
npm run check:coverage
npm run check:types
npm run build
npm run check:build
npm run preview
```

这些是运行命令；本次交付实际执行的结果与未验证范围见 [验证报告](../../VALIDATION_REPORT.md)，不要把命令存在等同于已经验证所有交互。

## 2. 覆盖范围

| 类别 | 数量 | 主要内容 |
|---|---:|---|
| Text Animations · 文字效果 | 33 | 字符入场、打字、翻牌、描边、文字粒子、轮换、计数 |
| Animations · 交互动效 | 41 | 内容过渡、悬停、指针、点击、图像扰动与边框 |
| Components · 组合组件 | 48 | 导航、列表、卡片、布局、画廊、轮播与选择器 |
| Micro · 微交互 | 34 | Agent 状态、聊天输入、录音样式、表单、按钮、反馈 |
| Backgrounds · 背景效果 | 59 | 极光、粒子、线场、网格、光束、流体与三维背景 |
| **合计** | **215** | 一项对应一个独立示例 |

范围固定于 **2026-10-12** 的 [React Bits 索引](https://reactbits.dev/get-started/index)，官方仓库提交为 `2139cb3098d4fedc6264f13e50dcb4694224ba7c`。不包含独立 React Bits Pro 产品、目录未列出的实验项，也不承诺未来新增项自动存在。完整身份、文件散列和来源在 `catalog/upstream-manifest.json`。

### 新增自有业务能力

参考用户提供的 Styled 与 Primitive 目录，按身份去重补充 88 个核心能力；完整的原有相邻项和新增实现对照见 [业务覆盖](docs/business/coverage.md)。每项有独立状态与操作示例、场景边界和按需指南，功能参考不等于沿用外部库的 API。

| 类别 | 数量 |
|---|---:|
| 业务表单 | 29 |
| 业务动作 | 4 |
| 数据与文件 | 10 |
| 布局与流程 | 12 |
| 弹层与焦点 | 6 |
| 业务导航 | 6 |
| 状态反馈 | 10 |
| 媒体浏览 | 3 |
| 基础辅助 | 8 |
| **合计** | **88** |

## 3. 目录中的内容

| 路径 | 用途 |
|---|---|
| `src/demos/<slug>.tsx` | 每项自有演示：真实 Props、受控状态、内容、触发与反馈 |
| `src/shared/` | Agent Wan 主题映射、示例内容、媒体路径及共用样式 |
| `src/business/demos/<id>.tsx` | 88 个自有业务示例；各项独立延迟导入 |
| `src/business/support.tsx` | 仅业务模块共享的字段、按钮、模态与锚点浮层 |
| `catalog/business-catalog.json` | 业务身份、适用场景、替代边界与原有覆盖对照的唯一数据源 |
| `docs/business/` | 业务单项指南、九类场景路由与覆盖对照 |
| `src/runtime/` | 单项预览、延迟加载、偏好同步、错误边界与能力检查 |
| `catalog/` | 固定版本、组件身份、依赖、官方文件散列与资源清单；`intent-metadata.json` 是页面与渐进文档共用的中文意图数据源 |
| `docs/components/<slug>.md` | 单组件的效果要求、参数用法、皮肤与降级规则 |
| `docs/categories/` | 五类简明目录，只在选型时读取 |
| `scripts/find-component.mjs` | 离线组件检索，只输出命中的文档和源码位置 |
| `scripts/setup-reactbits.mjs` | 按固定清单获取官方源码与必要资源并校验散列 |
| `.upstream/` | setup 后生成的官方源码；不随分发包提供 |
| `notices/` | 官方来源、授权文本与相关说明 |

官方组件源码由 setup 从官方固定版本获取。本包保留自有应用壳、逐项接入示例、主题、文档和锁定清单；官方组件实现不再打进模板归档。使用条款以包内 `notices/REACT_BITS_LICENSE.md` 为准。

## 4. 给 Agent 使用

从 [包根 SKILL.md](../../SKILL.md) 开始。普通业务需求先读 [业务路由](docs/business/task-router.md)，明确需要装饰效果时才读 [效果路由](docs/task-router.md)。不要让 Agent 一次读 303 项源码；同名能力用 provider 区分。

在本项目根目录查询：

```bash
node scripts/find-component.mjs "AutoComplete" --provider business --exact
node scripts/find-component.mjs "排序分页" --provider business --limit 3
node scripts/find-component.mjs "Glass Surface" --provider reactbits --exact
node scripts/find-component.mjs "标题逐字出现" --limit 3
node scripts/find-component.mjs "思考过程" --category micro
```

流程是 **入口 → 业务或效果 → 精确名称或中文场景 → 单项用途与边界 → 自有示例 → 必要共享符号与契约**。需要比较方案时只读同类的两三项；需要组装业务页面时追加对应规范和业务契约，不自动引入全部动效。

只想检查或迁移一个组件的官方源码时可以按需获取：

```bash
npm run setup:reactbits -- --component glass-surface
```

该命令适合单组件阅读与接入。运行完整组件库或做完整生产构建前，仍执行不带 `--component` 的全量 setup。

## 5. 主题与效果如何共存

功能、效果和皮肤分开处理：真实选择、导航、输入与动作由组件状态和回调完成；React Bits 提供粒子、曲面、路径、形变等效果机制；Agent Wan 统一茶绿、沙米、象牙白、深墨色、圆角、阅读面与柔影。

保持原组件的可观察特征，避免把所有项目做成同一种悬停卡片。业务文字保持稳定阅读面；强光、持续位移和复杂背景约束在对应预览舞台。某些 Canvas / WebGL 参数需要实际颜色值，使用共享主题映射；不能将 CSS `var(...)` 字符串传入不支持它的图形 API。

移植到已有业务项目时，复制所需自有示例和官方实现的使用部分，按项目方式管理依赖、资源和授权文本；优先保留原有路由、权限和状态管理。React Bits 不替代业务权限、租户事务、搜索竞态与导入扫描等规则，这些仍遵循 [组件契约](../../COMPONENT_CONTRACTS.md)。

## 6. 预览运行方式

目录页加载轻量元数据，选中项才进入独立 iframe 并延迟导入实际演示。切换组件会销毁旧 iframe，避免全局 CSS、光标监听、画布与持续动画在示例之间累积；离开预览区域或页面隐藏时暂停当前演示。这里的 iframe 用于样式与生命周期隔离，不能被当作执行任意陌生脚本的安全边界。

系统启用减少运动时，动态组件先显示未挂载状态；用户可以明确选择仅播放本次预览。缺少所需图形能力、发生渲染错误或上下文丢失时，预览区显示原因及重试入口，目录仍可使用。业务接入时应按单组件文档补充等价的静态内容或原生控制器。

“已挂载”表示 React 演示模块已进入页面，不表示每张图片已加载、每个 GPU 效果已正确出帧或所有交互已验收。字体、硬件图形能力和浏览器实现仍可能影响效果，需要在目标环境实际查看。

## 7. Agent 与设备相关示例

Thought Line、Call Chip、Status Mark、Lattice Loader、Refine Frame 等展示本地模拟状态与公开步骤摘要；它们未连接真实模型任务。Prompt Bar 中的消息、附件与语音交互按示例代码说明执行。Voice Pill 等组件展示录音状态时，是否实际访问设备以自有示例的明确入口和说明为准。

将这些组件接入产品后，以真实任务事件、计时、结果和明确提供的公开内容驱动状态。相机或麦克风只在用户触发相应功能后请求；拒绝权限时保留文本输入或替代展示。

## 8. 常见情况

| 现象 | 处理 |
|---|---|
| 找不到 `.upstream` 下的组件 | 在示例目录执行 `npm run setup:reactbits` |
| setup 下载中断 | 修复网络后重跑相同命令；已校验文件可复用 |
| setup 报散列不匹配 | 不手动跳过校验；确认官方固定版本与本地清单一致后再处理 |
| 预览提示减少动态效果 | 根据需要选择播放本次，或保持当前静态提示 |
| 某个三维效果不支持 | 查看能力提示；选择静态或 DOM 替代方案，不影响其他组件 |
| 源码参数与网上最新文档不一致 | 以本包固定提交的对应源码为准；统一升级清单后再迁移 |
| 构建通过但外观仍有差异 | 在目标浏览器校准字体、色彩、舞台尺寸与实际 Props |

## 9. 更新示例与渐进文档

本包为完整可重建工程。215 个 demo 独立维护；文字动画、动画和组合组件的 122 个参数配方另保留在 `catalog/demo-recipes.json`，可通过 `node scripts/build-demos.mjs` 重建对应 wrapper。其余 Micro / Backgrounds 独立源文件直接维护。不要只改配方生成后的文件却留下过期配方。

修改示例后运行 `npm run docs:build`，把实际 Props 与用法同步进 215 份单组件指南。修改颜色时，在 UI 包根目录编辑 `tokens.json` 并重建 Token；随后在此目录执行 `node scripts/build-example-catalog.mjs`，更新需要实际色值的 palette 和目录，再重建文档。

完整维护检查为 `check:coverage`、`check:types`、`test`、`build` 和 `check:build`。真实交互与截图仍需在目标浏览器执行。本次具体的资源处理、类型兼容和构建依赖见 `UPSTREAM_RUNTIME_AUDIT.md`、`UPSTREAM_TYPE_COMPATIBILITY.md`、`RESOURCE_AUDIT.md`。

## 10. 子路径部署

部署到子目录时按 Vite 的方式设置 base，例如 `npm run build -- --base=/demo/`。示例媒体、字体、上游默认 GLB 和 Draco 路径使用同一 base；本地开发仍默认在 `/` 下运行。嵌入其他项目时，应保留这些资源路径与项目配置之间的对应关系。

Grid Scan 在关闭摄像头时只运行网格效果，`face-api.js` 在启用摄像头并准备模型时动态导入。异步准备、检测和权限请求在暂停或卸载后停止；保持设备能力由调用方明确启用。

## 11. 维护自有业务目录

直接维护 `src/business/demos/` 的自有实现与 `catalog/business-catalog.json` 的场景元数据，再执行 `npm run docs:build`。该命令同步业务指南、查询索引、懒加载入口、包根 Skill 和分发模板；不要手改生成的 `catalog.generated.ts`、`demo-loaders.generated.ts` 或单项文档。新能力必须先有真实实现，不能仅注册名字或说明。

本轮按用户要求未执行测试套件或独立审核。目录与文档的接入状态不等于浏览器验收；生产项目的 API、上传、授权和失败恢复应由目标业务层接入。
