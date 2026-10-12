# Agent Wan 组件示例库

**303 个独立入口，按场景选型、逐项预览、渐进读取。**

示例库包含 88 个业务基础能力和 215 个交互效果。每项都有实际演示、参数用法、具体中文说明与接入指南。视觉遵循 Agent Wan 的自然色霜玻璃规范，组件行为由真实状态与回调驱动。

## 开始使用

需要 Node.js **22.12 或更新版本**。以下命令均在整个项目的根目录执行：

```bash
node scripts/example.mjs setup
node scripts/example.mjs dev --port 5174
```

打开终端显示的本地地址，通过英文名称、中文意图或类别定位示例。首次准备需要网络；安装脚本会按固定清单校验资源，对超时、连接中断与可重试 HTTP 状态最多尝试三次。再次运行会复用已校验文件，散列不匹配时明确报错。

仅准备当前要读取的效果：

```bash
node scripts/example.mjs setup --component glass-surface
```

完整运行或生产构建前执行全量准备。构建与预览入口：

```bash
node scripts/example.mjs build
node scripts/example.mjs preview
```

## 能力范围

| 业务类别 | 数量 | 适用场景 |
| --- | ---: | --- |
| 业务表单 | 29 | 输入、选择、日期、校验与标签 |
| 业务动作 | 4 | 提交、动作分组与确认 |
| 数据与文件 | 10 | 表格、树、分页、文件选择与移动 |
| 布局与流程 | 12 | 内容分区、折叠、分栏与步骤 |
| 弹层与焦点 | 6 | 临时输入、侧边详情与就地说明 |
| 业务导航 | 6 | 主导航、路径与动作菜单 |
| 状态反馈 | 10 | 消息、进度、标签与占位 |
| 媒体浏览 | 3 | 图片、轮播与对比 |
| 基础辅助 | 8 | 焦点、挂载与辅助语义 |
| **业务合计** | **88** | [按场景选型](docs/business/task-router.md) |

| 交互效果 | 数量 | 可观察特征 |
| --- | ---: | --- |
| 文字效果 | 33 | 字符入场、打字、翻牌、描边、轮换与计数 |
| 交互动效 | 41 | 过渡、悬停、指针、点击、图像扰动与边框 |
| 组合组件 | 48 | 导航、卡片、画廊、轮播与选择器 |
| 微交互 | 34 | 任务状态、聊天输入、表单、按钮与反馈 |
| 背景效果 | 59 | 粒子、网格、光束、流体与三维背景 |
| **效果合计** | **215** | [按效果选型](docs/task-router.md) |

一项对应一个独立示例，不重复统计语言或样式变体。[业务能力清单](docs/business/coverage.md) 说明现有相邻项、具体用途与优先替代方案。

## 交给 Agent

从 [项目 Skill](../SKILL.md) 开始。业务需求先查基础能力；明确需要文字、指针或背景动效时再查效果。英文名称相同时使用 `business` 或 `effects` 区分：

```bash
node scripts/find-component.mjs "AutoComplete" --provider business --exact
node scripts/find-component.mjs "排序分页" --provider business --limit 3
node scripts/find-component.mjs "Glass Surface" --provider effects --exact
node scripts/find-component.mjs "标题逐字出现" --provider effects --limit 3
```

读取顺序为 **目标 → 用途与替代边界 → 单项指南 → 实际示例 → 必要共享符号与契约**。有明确名称时直接读单项；需要比较时先读同类两三项，不加载全部 303 项源码。

## 代码与文档

以下路径相对示例目录，维护时从实际入口顺着直接依赖读取。

| 路径 | 用途 |
| --- | --- |
| `src/Gallery.tsx` | 目录、搜索、详情和预览操作 |
| `src/demos/<slug>.tsx` | 215 个效果的独立演示与真实参数 |
| `src/business/demos/<id>.tsx` | 88 个业务示例，各项独立延迟导入 |
| `src/business/support.tsx` | 业务模块内实际复用的字段、按钮与浮层 |
| `src/shared/` | 主题映射、媒体路径与共用样式 |
| `src/runtime/` | 延迟加载、偏好同步、隔离与错误恢复 |
| `catalog/business-catalog.json` | 业务身份、中文子标题、适用场景与替代边界 |
| `catalog/intent-metadata.json` | 效果示例与指南共用的中文意图 |
| `catalog/` | 固定资源清单、依赖、版本与散列 |
| `docs/components/` | 逐项效果机制、参数、资源与降级说明 |
| `docs/business/` | 逐项业务用法、场景路由与覆盖对照 |
| `docs/spec/`、`docs/contracts/` | 按章节生成的视觉规范与行为契约 |
| `.upstream/` | 准备命令生成的实现缓存 |
| `notices/` | 资源来源与必要声明 |

缓存、依赖和构建产物不随模板分发。固定来源、散列与声明独立维护，组件页面只呈现用途与接入说明。

## 预览与接入边界

目录加载轻量元数据；选中一项才进入独立 iframe 并导入演示。切换、暂停、离开预览区域或隐藏页面时释放旧实例，避免全局样式、事件、画布与持续动画累积。iframe 用于样式与生命周期隔离。

系统减少运动时，动态演示先显示未挂载提示，用户可以选择播放本次预览。缺少图形能力、加载失败或渲染错误时，保留原因与重试入口。“已挂载”仅表示 React 演示进入页面；字体、资源、GPU 与实际交互仍需在目标环境验收。

接入产品时保留已有路由、权限、状态和接口。示例中的任务计时、消息与短命令是本地演示；上传、模型执行、租户与事务需要真实业务服务。设备权限由用户主动触发，拒绝时保留等价入口。行为约束见 [组件契约](../COMPONENT_CONTRACTS.md)。

## 维护方式

视觉数值以项目根 `tokens.json` 为准，修改后重建 Token。业务能力维护实际 demo 与 `business-catalog.json`；效果参数配方维护在 `catalog/demo-recipes.json`，对应 wrapper 通过 `scripts/build-demos.mjs` 生成。其余独立效果源文件直接维护。

只重建一项效果时，在示例目录执行 `node scripts/build-demos.mjs --component count-up`。数字展示如用于组件总数，读取页面共用的 `gallery-catalog.ts`，避免在配方与示例中写死数量。滚动条和浮层外观入口见 [CSS API](../CSS_API.md)，类型、方向、关闭与通知规则按主规范对应章节读取。

修改示例、场景或生成器后，在项目根同步文档：

```bash
node scripts/example.mjs docs
```

该入口同步单项指南、路由、检索索引、业务加载入口、根 Skill 与交接说明。不要手改生成目录作为第二套事实源。

维护检查在示例目录使用现有 `check:coverage`、`check:types`、`test`、`build` 和 `check:build`；只报告实际执行过的项目。历史记录见 [验证报告](../VALIDATION_REPORT.md)，类型与运行条件分别见 `UPSTREAM_TYPE_COMPATIBILITY.md`、`UPSTREAM_RUNTIME_AUDIT.md`、`RESOURCE_AUDIT.md`。

子路径构建时设置同一资源 base：

```bash
node scripts/example.mjs build --base=/demo/
```

媒体、字体、模型和解码器沿用此 base。相机模型只在明确启用对应设备功能时动态准备；异步准备、检测与权限请求应在暂停或卸载后停止。

## 常见情况

| 现象 | 处理 |
| --- | --- |
| 缺少实现缓存或媒体资源 | 在项目根重新执行准备命令 |
| 网络中断 | 恢复网络后重跑同一命令，已校验内容会复用 |
| 散列不匹配 | 核对固定版本与清单，保留校验失败信息 |
| 系统减少动态效果 | 选择播放本次，或使用静态内容 |
| 当前图形效果不支持 | 查看能力提示，按指南使用静态或 DOM 替代 |
| 参数与其他版本不一致 | 以本包固定实现与当前示例为准 |
| 构建通过但外观不同 | 在目标浏览器检查字体、舞台尺寸与实际参数 |
