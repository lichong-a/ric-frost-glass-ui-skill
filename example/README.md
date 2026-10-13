# Agent Wan 组件示例库

**303 个独立入口，按场景选型、逐项预览、渐进读取。**

示例库包含 88 个业务基础能力和 215 个交互效果。每项都有实际演示、参数用法、具体中文说明与接入指南。外壳沿用 Agent Wan 自然色霜玻璃规范；效果画布保留 React Bits 的配色、对比度与机制。组件行为由真实状态与回调驱动。

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

| 用途分类 | 数量 | 适用场景 |
| --- | ---: | --- |
| [文字动效](docs/categories/text.md) | 28 | 标题、正文、字符与字形的动态表达 |
| [背景与光效](docs/categories/background.md) | 66 | 页面背景、纹理、粒子与空间光效 |
| [指针与轨迹](docs/categories/pointer.md) | 16 | 指针形态、悬停响应与移动轨迹 |
| [滚动与转场](docs/categories/scroll.md) | 12 | 滚动触发、进入视口与状态转场 |
| [媒体与轮播](docs/categories/media.md) | 31 | 图片、图集、轮播、模型与媒体比较 |
| [卡片与面板](docs/categories/cards.md) | 24 | 对象卡片、阅读面与内容面板 |
| [表单与选择](docs/categories/form.md) | 45 | 文本输入、数值调整、选项与字段语义 |
| [按钮与操作](docs/categories/actions.md) | 13 | 动作入口、提交、快捷操作与撤销 |
| [导航与菜单](docs/categories/navigation.md) | 17 | 页面导航、命令查找与菜单选择 |
| [数据与文件](docs/categories/data.md) | 18 | 记录、层级、列表、文件与结果浏览 |
| [布局与流程](docs/categories/layout.md) | 7 | 工作区分隔、内容布局与顺序流程 |
| [状态与反馈](docs/categories/feedback.md) | 16 | 等待、进度、通知与结果状态 |
| [弹层与辅助](docs/categories/overlay.md) | 10 | 对话框、提示、浮层与焦点辅助 |
| **合计** | **303** | 215 个 React Bits 效果与 88 个业务能力 |

每个组件只有一个主分类。微交互、组合组件、业务基础及原来源保留为搜索标签；全部轮播、画廊、Masonry 与图片对比集中在媒体分类，菜单集中在导航分类。`Carousel · React Bits` 与 `Carousel · 基础轮播` 保留独立能力，原组件 ID 和 `#组件ID` 链接继续可用。上一项／下一项遵从当前分类和搜索结果。

## 调节与复制

参数面板位于预览下方，常用参数展开，高级参数折叠。支持数字、范围、开关、枚举、颜色、文本、本地资源和适合编辑的 JSON 数据。参数类型、完整 API、源码默认值、本例配置与容器设置分别记录；回调、ref、React 节点通过实际 TSX 接入。

普通参数即时更新，构造阶段与图形参数在结束调节后重建。错误输入保留最后有效预览；受控值通过原组件回调同步。切换组件会记住各自修改，刷新恢复默认。提供“恢复默认”“重播”“复制当前用法／配置”；用法源码默认显示当前配置的可复制 TSX，另有完整示例源码入口。

Scroll Float、Scroll Velocity、Scroll Reveal 在预览框内使用两屏：完整引导屏之后才出现动画正文，支持原生滚轮、键盘启动和回到起点的重播。24 项还原默认配置见 `catalog/text-scroll-restoration.json`、`catalog/visual-restoration.json`。本地纹理素材来源与许可见 [素材说明](src/assets/restoration/README.md)。

## 交给 Agent

从 [项目 Skill](../SKILL.md) 开始。业务需求先查基础能力；明确需要文字、指针或背景动效时再查效果。英文名称相同时使用 `business` 或 `effects` 区分：

```bash
node scripts/find-component.mjs "AutoComplete" --provider business --exact
node scripts/find-component.mjs "排序分页" --provider business --limit 3
node scripts/find-component.mjs "Glass Surface" --provider effects --exact
node scripts/find-component.mjs "标题逐字出现" --provider effects --limit 3
node scripts/find-component.mjs --category navigation --provider business --limit 10
node scripts/find-component.mjs --category navigation --tag micro --provider effects
```

读取顺序为 **目标 → 用途与替代边界 → 单项指南 → 实际示例 → 必要共享符号与契约**。有明确名称时直接读单项；需要比较时先读同类两三项，不加载全部 303 项源码。

[全库用途导航](docs/task-router.md)统计全部 303 项；[业务场景导航](docs/business/task-router.md)统计 88 项；[效果导航](docs/effects/task-router.md)统计 215 项。三个入口共用 13 个用途分类，各自只展示对应范围。`--category` 选择主用途，`--tag` 过滤来源与标签；旧来源类别参数仍能查询，并提示改用标签过滤。

## 代码与文档

以下路径相对示例目录，维护时从实际入口顺着直接依赖读取。

| 路径 | 用途 |
| --- | --- |
| `src/Gallery.tsx` | 目录、搜索、详情和预览操作 |
| `src/demos/<用途>/<slug>.tsx` | 215 个效果的独立演示与真实参数 |
| `src/business/demos/<用途>/<id>.tsx` | 88 个业务示例，各项独立延迟导入 |
| `src/business/components/` | 按需导入的业务控件与其独立 CSS Modules |
| `src/business/support.tsx` | 兼容入口；示例优先直接导入所需控件 |
| `src/shared/` | 主题映射、媒体路径与共用样式 |
| `src/runtime/` | 延迟加载、偏好同步、隔离与错误恢复 |
| `catalog/business-catalog.json` | 业务身份、中文子标题、适用场景与替代边界 |
| `catalog/use-categories.json` | 全库唯一用途分类、来源标签和目录路径 |
| `src/parameters/definitions/<id>.json` | 当前组件完整 API、DIY 配置和用法模板；按需加载 |
| `catalog/parameter-api.json` | 从锁定源码与业务实现提取的真实类型及默认值 |
| `catalog/demo-source-templates.json` | 作者示例源，保留还原布局、回调及私有样式导入 |
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

Aero Shards 与 Shape Waves 等待原版首帧标记后才报告可用。WebGPU 不可用、启动超时或渲染失败时，预览框显示当前原因、重新检查和手动开启兼容演示的入口。Canvas 演示有明确标记，其材质与光效不等同于原版；兼容绘制失败也提供恢复入口。

接入产品时保留已有路由、权限、状态和接口。示例中的任务计时、消息与短命令是本地演示；上传、模型执行、租户与事务需要真实业务服务。设备权限由用户主动触发，拒绝时保留等价入口。行为约束见 [组件契约](../COMPONENT_CONTRACTS.md)。

## 维护方式

外壳与业务控件的视觉数值来自根 `tokens.json`。`catalog/use-categories.json` 决定全库分类、名称、目录与加载路径；业务与 React Bits 示例仍各自在自己的根目录下。新效果使用私有 CSS Modules，不在共享文件覆盖上游组件。锁定上游源码不手改，已有适配器只对明确组件和锁定内容做变换并配套回归验证。

参数提取、编辑器和源码生成共用定义。`catalog/demo-source-templates.json` 保存作者示例；常规生成以此为准，保留本轮效果还原、CSS Modules、回调和素材。旧 `demo-recipes.json` 仅作为首次构造的历史输入；已有作者模板时，`build-demos.mjs` 使用当前模板和参数生成器。修改作者示例时同步更新模板，再提取 API、生成参数与文档。`--capture` 只允许未插桩的作者源，避免把生成结果当成新的事实源。

在示例目录执行：

```bash
npm run catalog:build
node scripts/extract-parameters.mjs
npm run parameters:build
npm run docs:build
npm run check:parameters
npm run check:docs
```

单项效果重新生成使用 `node scripts/build-demos.mjs --component cubes`；全部模板验证使用 `node scripts/build-parameters.mjs --check`。完整用法另外接受 TypeScript 检查，检查器在内存中替换成可复制源，不覆盖实际示例文件。

修改示例、场景或生成器后，在项目根同步文档：

```bash
node scripts/example.mjs docs
```

该入口同步单项指南、路由、检索索引、业务加载入口、根 Skill 与交接说明。不要手改生成目录作为第二套事实源。

文档先在暂存目录合并并校验，再更新生成清单拥有的文件；手写文档保留。`node scripts/extract-parameters.mjs --check` 从实际源码重新提取 API 并比较记录，`npm run check:docs` 同时检查类型记录、类别计数、链接、锚点和指南中的参数表，检查过程不生成文档。

维护检查在示例目录使用现有 `check:coverage`、`check:parameters`、`check:docs`、`check:types`、`test`、`build` 和 `check:build`；只报告实际执行过的项目。历史记录见 [验证报告](../VALIDATION_REPORT.md)，类型与运行条件分别见 `UPSTREAM_TYPE_COMPATIBILITY.md`、`UPSTREAM_RUNTIME_AUDIT.md`、`RESOURCE_AUDIT.md`。

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
