# 布局与流程

仅在需要按场景选型时读本页；精确名称可直接查询单项指南，不顺序读取整个类别。

| 组件 | 什么时候使用 | 什么时候换用其它能力 |
|---|---|---|
| [Accordion](../components/business-accordion.md) | 独立内容段按需展开，触发按钮关联可见区域 | 互斥页面视图用Tabs；关键内容不应默认隐藏 |
| [Card](../components/business-card.md) | 将一个对象的标题、摘要与相关动作组合在阅读面 | 密集结构化比较用DataTable；装饰特效卡按需选择对应效果组件 |
| [Divider](../components/business-divider.md) | 视觉和语义分隔不同内容组，保持分隔方向与标签 | 有状态的内容切换用Tabs而非分隔线 |
| [Fieldset](../components/business-fieldset.md) | 相关表单字段共享组含义，使用legend命名 | 不相关字段不应只为加边框而放入同一组 |
| [Panel](../components/business-panel.md) | 一个有标题的内容区需要可选展开收起与局部动作 | 多独立面板用Accordion；不同视图用Tabs |
| [ScrollArea](../components/business-scrollarea.md) | 长内容在固定区域内滚动，保留键盘与可见滚动条 | 页面主体不要强行锁进滚动陷阱 |
| [Splitter](../components/business-splitter.md) | 两个工作区需要用户调整比例，保留最小尺寸和键盘 | 普通静态两栏用CSS Grid即可 |
| [Stepper](../components/business-stepper.md) | 任务有明确顺序与当前步骤，前进回退由实际状态驱动 | 已发生事件用Timeline；无顺序视图用Tabs |
| [Tabs](../components/business-tabs.md) | 同一位置展示互斥内容视图，支持方向键与选中面板关联 | 独立内容按需展开用Accordion |
| [Toolbar](../components/business-toolbar.md) | 围绕当前内容组织少量相关动作和筛选 | 页面导航用NavigationMenu，避免无关按钮拼盘 |
| [Inplace](../components/business-inplace.md) | 短内容默认只读，用户明确进入编辑再保存或取消 | 复杂表单用Drawer或独立页面 |
| [Collapsible](../components/business-collapsible.md) | 一个内容块独立展开收起，按钮关联受控区域 | 多个并列块用Accordion；关键错误不应默认收起 |

选定一个组件后只读它的文档、示例与必要共享符号。
