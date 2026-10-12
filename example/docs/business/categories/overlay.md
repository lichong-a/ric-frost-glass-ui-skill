# 弹层与焦点

仅在需要按场景选型时读本页；精确名称可直接查询单项指南，不顺序读取整个类别。

| 组件 | 什么时候使用 | 什么时候换用其它能力 |
|---|---|---|
| [Dialog](../components/business-dialog.md) | 任务需要临时阻断背景并收集确认或有限输入 | 补充信息用Popover；长编辑任务用Drawer或页面 |
| [Drawer](../components/business-drawer.md) | 需要保留当前页面上下文，临时阅读详情、编辑属性或打开选项；左右侧适合详情与导航，上下侧适合短操作面板 | 简短确认用Dialog；永久导航用Sidebar |
| [OverlayManager](../components/business-overlaymanager.md) | 多个临时浮层需要明确堆叠、最后打开先关闭和焦点恢复 | 单个浮层直接Dialog或Popover，不建立额外管理层 |
| [Popover](../components/business-popover.md) | 锚点旁呈现少量可操作内容，Escape与外部点击可关闭 | 重要确认用Dialog；单句说明用Tooltip |
| [Tooltip](../components/business-tooltip.md) | 简短说明在hover或focus出现，不承载必须完成的操作 | 可交互内容用Popover；关键规则保持常显 |
| [Backdrop](../components/business-backdrop.md) | 临时浮层需要表达背景不可操作，并提供关闭入口 | 普通装饰背景不应阻断点击；模态优先Dialog |

选定一个组件后只读它的文档、示例与必要共享符号。
