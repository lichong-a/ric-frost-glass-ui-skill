---
name: artifact-template-agent-wan-frost-glass-ui
description: "Build and adapt Agent Wan natural-color frosted-glass React components and pages. Use for business forms, autocomplete, tables, dialogs, navigation, feedback, media and accessibility helpers, as well as requested text, animation and background effects. Choose by concrete business scenario, load only the selected component guide and necessary source, and preserve existing product contracts."
---

# Agent Wan Frost Glass UI

按业务目标选择本包自有基础组件或用户要求的效果，保持自然色霜玻璃规范。资源路径相对本技能根目录。入口保持简短；不要启动时读取完整规范、全部 Token、整个索引或所有源码。

## 渐进式执行

1. 只读 [核心视觉约束](references/design-core.md)，明确目标项目、页面和业务行为。技术栈、状态、数据、权限与路由沿用目标项目。
2. **普通业务先查基础组件**：输入、选择、数据、导航、临时交互、反馈使用 [业务场景路由](references/business/task-router.md)。文字入场、悬停、粒子与背景等明确要求的装饰效果，再查 [效果路由](references/task-router.md)。
3. 有精确组件名直接查询；只有目标时用中文场景查询。脚本只输出命中项的用途、替代边界、指南与源码路径；不要把索引全文放入上下文。
4. 只读命中指南的“什么场景使用”和“不适合或优先替代”。确需比较时最多先读同类 2–3 项。功能同名时用 `--provider business` 或 `--provider effects` 消歧。
5. 单组件指南 → 自有示例 → 本例用到的共享符号和样式 → 当前任务涉及的契约。没有用到的共享函数、类别和组件不继续加载。
6. 在目标项目里接入当前组件，替换示例数据与回调，保留真实状态、键盘、失败与取消路径。只导入所需入口；装饰效果不成为业务唯一入口。
7. 交付实际代码或页面，并明确运行过与未运行的检查。用户自行验收时遵从用户要求，不追加审核或测试流程。

## 查询一个组件

```bash
node scripts/find-component.mjs "AutoComplete" --provider business --exact
node scripts/find-component.mjs "搜索建议" --provider business --limit 3
node scripts/find-component.mjs "排序分页" --provider business --limit 3
node scripts/find-component.mjs "Glass Surface" --provider effects --exact
```

精确名称无需先读类别页。无工具时只在 `references/component-index.json` 中定向检索名称或别名，随后读取对应指南；不把全部匹配资源逐项展开。

## 场景判断

| 目标 | 首选能力 | 替代边界 |
|---|---|---|
| 输入后搜索大量候选对象 | AutoComplete | 少量固定选项用 Select 或 RadioButton |
| 自由名称、备注或标签 | InputText、Textarea、InputTags | 候选对象选择不要伪装自由文本 |
| 对结构化记录搜索排序分页 | DataTable | 卡片浏览用 DataView，层级数据用 TreeTable |
| 按父子关系选择对象 | CascadeSelect、TreeSelect | 浏览目录用 Tree，固定平级项用 Select |
| 临时确认与背景阻断 | Dialog | 长详情用 Drawer，轻量锚点内容用 Popover |
| 主导航与当前项 | NavigationMenu、Sidebar | 一次性动作使用 Menu 或 CommandMenu |
| 非阻断操作反馈 | Toast | 必须处理的错误用常显 Message 或 Dialog |
| 真实完成比例与等待状态 | ProgressBar、ProgressSpinner | 不编造进度或工具执行成功 |
| 已发生事件与未完成步骤 | Timeline、Stepper | 两者不要混用 |
| 任务勾选或装饰性微交互 | 已有 Spring Check 等效果 | 常规布尔字段优先业务 Checkbox |
| 字符入场、光标、粒子与背景 | 用户明确选择的效果组件 | 普通业务页面不默认引入持续动效 |

上述名称指本包能力。业务实现使用 React、原生 HTML 与 CSS，当前交互、类型和回调以自有示例为准。

## 只在需要时读取

- 需要按场景选型：先读一个 [业务类别](references/business/task-router.md)，然后选一个组件。
- 需要页面布局：按 [任务路由](references/task-router.md) 读取相应 AppShell、菜单、表格和异步契约分片。
- 需要皮肤：按 [CSS API](assets/ui-kit/CSS_API.md) 检索当前语义 Token；不要一次读全部 Token。
- 需要动效、GPU 或设备行为：读取被选效果指南和 [加载与降级](references/effects-policy.md)。缺官方源时只为这个 slug 执行文档给出的 setup 命令。
- 需要核对本次能力范围：读取 [业务覆盖对照](references/business/coverage.md)；源码接入数量不等于浏览器验收结果。

## 实现边界

保持茶绿、沙米、象牙白和深墨色的层次，用稳定阅读面、边界、圆角和柔影表达结构。业务专属逻辑留在业务模块，共享基础只管理被实际复用的交互。权限、租户、写入、数据格式和恢复规则沿用目标项目；前端限制不能代替可信服务端校验。

保留所选效果的实际机制。减少运动时停用装饰过渡，但保留必要表单、导航和状态。文件示例只选择、验证和移除本地文件，真实上传需要既有接口和授权；终端示例只处理有限的本地命令，不执行 shell。示例数组和状态不代表真实业务结果。

本包规范与源图是稳定视觉依据；`references/spec/`、`references/contracts/` 是按章节生成的分片，不独立维护第二套规则。只复制目标项目当前需要的实现和直接依赖，保留来源说明。
