# 1. 执行约定与交付文件

### 1.1 约束强度

- **必须 / MUST**：默认不可偏离。例如左侧导航、文字清晰、浮层不被裁切、统一 Token。
- **应该 / SHOULD**：默认采用；已有项目约束要求调整时，记录具体差异及原因。
- **可选 / MAY**：按页面业务需要选择，不应为凑齐组件而添加。

产品需求、数据权限与可访问性要求优先；同一视觉值以 `tokens.json` 为唯一数值来源，`tokens.css` 必须由它生成。主规范负责视觉和布局，`COMPONENT_CONTRACTS.md` 负责交互状态。图片决定视觉方向；图片中同时展示多个浮层、展示板大标题等排版，不覆盖实际产品行为。

**不要向用户重复询问已经由规范决定的颜色、圆角、侧栏位置或是否使用毛玻璃。** 在现有项目中优先复用路由、状态管理、组件行为和权限体系，只替换或补齐视觉层；不得顺手改动无关业务。

### 1.2 按任务渐进阅读

从 `AGENT_HANDOFF.md` 开始，先读核心视觉约束，再定位当前任务所需的组件或规范章节。**不要求初始化时把完整规范、所有 Token、组件契约与全部示例一起读入上下文。** 下表是资源地图，不是启动时的全文读取清单。精确名称或中文效果查询可直接定位单组件文档，相关路由见 `example/docs/task-router.md`。

| 文件 | 用途 |
|---|---|
| `AGENT_HANDOFF.md` | 给 Agent 的入口与任务提示词 |
| `AGENT_WAN_UI_SPEC.md` | 本文件；完整视觉、布局、组件和工程规范 |
| `tokens.json` | 颜色、尺寸、材质、动效、组件别名的唯一数值源 |
| `tokens.css` | 生成后的 CSS 自定义属性 |
| `theme.css` | 消费变量的基础样式；不承担数据与复杂交互逻辑 |
| `CSS_API.md` | 实际类名、状态属性与组件 Props 到 DOM 的接入映射 |
| [示例维护说明](../../README.md) | 303 个独立示例的运行方式与集成说明 |
| `example/docs/components/`、`example/docs/business/components/` | 分别提供效果与业务组件的真实用法、源码路径、依赖和验收项 |
| `example/scripts/find-component.mjs` | 按英文名称、slug 或中文意图定位单组件 |
| `COMPONENT_CONTRACTS.md` | 下拉、切换、表格、导入等状态及键盘行为 |
| `ACCEPTANCE.md` | 复现检查、状态检查与截图验收要求 |
| `VALIDATION_REPORT.md` | 初始规范包阶段的历史检查及验证范围；当前修改需重新运行维护检查 |
| `references/01-skills-page.png` | 完整页面基准 |
| `references/02-topbar-dropdowns.png` | 顶栏下拉参考 |
| `references/03-foundation-components.png` | 基础组件参考 |
| `references/04-table-overlays.png` | 表格、弹窗与反馈参考 |

本规范不要求 React、Vue 或某个特定组件库。组件必须呈现同一视觉与行为；技术栈沿用目标项目。CSS 示例中的 `aw-` 是设计系统命名空间，不是额外框架依赖。

---

规范来源：[AGENT_WAN_UI_SPEC.md](../../../AGENT_WAN_UI_SPEC.md)。本文件由主规范按章节生成；修改主规范后重新生成，不独立维护第二套规则。
