# 业务导航

仅在需要按场景选型时读本页；精确名称可直接查询单项指南，不顺序读取整个类别。

| 组件 | 什么时候使用 | 什么时候换用其它能力 |
|---|---|---|
| [Breadcrumb](../components/business-breadcrumb.md) | 展示当前层级位置并提供上级导航目标 | 平级主导航用NavigationMenu |
| [ContextMenu](../components/business-contextmenu.md) | 操作依赖当前对象，通过右键和可见按钮都能打开 | 关键操作不能仅隐藏在右键菜单 |
| [Menu](../components/business-menu.md) | 一组相关动作通过菜单选择，保留禁用与键盘状态 | 内容导航用NavigationMenu；复杂检索用CommandMenu |
| [NavigationMenu](../components/business-navigationmenu.md) | 页面或模块之间导航，有清晰的当前项和目标 | 一次性动作使用Menu；层级位置用Breadcrumb |
| [Sidebar](../components/business-sidebar.md) | 工作区需要持续的模块导航与可收起侧栏 | 临时详情用Drawer；不复制已有AppShell的第二套状态 |
| [CommandMenu](../components/business-commandmenu.md) | 很多动作需要统一搜索、方向键选择和Enter触发 | 少量固定动作使用Menu或可见Button |

选定一个组件后只读它的文档、示例与必要共享符号。
