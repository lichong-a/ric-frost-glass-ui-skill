# 给编码 Agent 的渐进执行入口

沿用 Agent Wan 自然色霜玻璃设计，根据当前业务场景选择自有基础组件；明确需要装饰效果时再选 React Bits，保持真实行为和一致的视觉皮肤。

## 直接复制的任务提示词

```text
请按 Agent Wan Frost Glass UI 技能完成当前页面或组件。

先读 SKILL.md，并按任务只读 examples/reactbits/docs/design-core.md，不要一次加载所有规范、Token 或源码。

普通业务组件先读 examples/reactbits/docs/business/task-router.md，或运行 examples/reactbits/scripts/find-component.mjs "组件名" --provider business --exact；只知道业务场景时用中文意图查询，比较最多2–3项。

只读被选组件的“适用场景”和“替代边界”，然后按需读它的示例、共享符号、样式和契约。装饰效果用 --provider reactbits 定位，不读全目录。新增基础组件为本包自有React实现，不需要安装PrimeReact或套用其Props。

保留所选 React Bits 组件的效果机制与真实交互，用 Agent Wan 低饱和自然色与霜玻璃皮肤统一。普通业务页面只加入本次需求涉及的效果。指定效果已经获得实现授权；高运动/持续动画在需要时加载，提供减少运动、功能失效和资源失败的可读降级。

技术栈、路由、权限、状态管理和数据来源沿用当前项目。根据任务路由读取相应的规范与组件契约分片，先完成必要的功能与布局，再接入装饰效果。视觉数值以 tokens.json 为准，按 CSS_API.md 复用样式。

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
React Bits 效果保持原有机制，外观适配为 Agent Wan；真实业务交互遵循对应组件契约。
```

以上仅提供引用示例，不代表已经修改现有项目。
