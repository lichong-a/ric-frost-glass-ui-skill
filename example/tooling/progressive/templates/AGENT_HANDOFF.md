# 给编码 Agent 的渐进执行入口

沿用 Agent Wan 自然色霜玻璃设计，根据当前业务场景选择基础组件；明确需要装饰效果时再选对应效果组件，保持真实行为和一致的视觉皮肤。

## 直接复制的任务提示词

```text
请按 Agent Wan Frost Glass UI 技能完成当前页面或组件。

先读技能 SKILL.md 和 references/design-core.md，不要一次加载所有规范、Token 或源码。

普通业务组件先读 references/business/task-router.md，或运行 scripts/find-component.mjs "组件名" --provider business --exact；只知道业务场景时用中文意图查询，比较最多2–3项。

--category 只筛选当前主用途，例如 "导航" --category navigation --provider business --limit 3。旧来源分类、family、micro 与 components 用 --tag，例如 "完成勾选" --tag micro --provider effects --limit 3；来源标签不作为主分类。

只读被选组件的“适用场景”和“替代边界”，然后按需读它的示例、共享符号、样式和契约。装饰效果从 references/effects/task-router.md 或用 --provider effects 定位；跨来源比较只读 references/task-router.md 中当前用途的一行。业务组件的使用方式以本包示例和类型为准。完整 API、源码默认值、本例 DIY 与容器设置分别核对，不把演示默认值当成组件契约。

保留所选组件的效果机制与真实交互，用 Agent Wan 低饱和自然色与霜玻璃皮肤统一。普通业务页面只加入本次需求涉及的效果。高运动和持续动画在需要时加载，提供减少运动、功能失效和资源失败的可读降级。

技术栈、路由、权限、状态管理和数据来源沿用当前项目。根据任务路由读取相应的规范与组件契约分片，先完成必要的功能与布局，再接入装饰效果。视觉数值以 tokens.json 为准，按 CSS_API.md 复用样式。

滚动区域使用统一 scrollbar Token。弹窗按说明、确认、危险、表单、步骤、详情或全屏场景选型；抽屉明确上下左右方向和模态行为；角落通知区分短 Toast 与持续 Notice。仅追加当前需要的尺寸、浮层、反馈规范和第15、17、19节行为契约，不同时加载全部浮层资料。

按组件文档与本次业务契约执行实际验证。报告已实现的组件与状态、启动方式、执行过的检查和未验证项。不能用静态截图冒充真实交互，也不能将未执行的浏览器检查报告为通过。

本次需求：
[填写页面、组件、数据、目标项目和运行环境；当前上下文已有则直接沿用。]
```

## 只有规范包、没有技能安装目录时

本包与技能中的 `assets/ui-kit/` 对应。先读包根的 `SKILL.md`，按业务场景定位自有组件或明确需要的效果。核心规范是 `AGENT_WAN_UI_SPEC.md`；只读取当前任务对应的章节和 `COMPONENT_CONTRACTS.md` 条目。业务与效果的单组件目录、源码和运行说明在示例项目内；不要为找一个组件读取整个项目。

如需要在项目的既有 `AGENTS.md` 中配置引用，追加一段简短入口，不覆盖原有约束：

```markdown
## Agent Wan 前端设计

新增或调整 UI 时使用 Agent Wan Frost Glass UI 技能。
遵循技能的渐进加载入口：按精确组件名或中文意图定位，只读取本次任务所需资源。
Token 与基础规范以 design-system/agent-wan/ 内文件为准。
所选效果保持原有机制，外观遵循 Agent Wan；真实业务交互遵循对应组件契约。
```

以上仅提供引用示例，不代表已经修改现有项目。
