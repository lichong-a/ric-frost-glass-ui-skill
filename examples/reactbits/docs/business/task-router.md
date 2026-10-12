# 按业务场景渐进选型

本页只负责找到下一份必要资源，不把全部组件和 API 放入上下文。

1. 判断任务是业务行为还是装饰效果。表单、选择、数据、导航、反馈先查业务目录；文字粒子、悬停和背景等明确效果再查 React Bits。
2. 有组件名：运行 `find-component.mjs "AutoComplete" --provider business --exact`，只读返回指南。
3. 只有中文场景：运行 `find-component.mjs "输入时搜索候选" --provider business --limit 3`，结合 when 与 avoidWhen 选择一项。
4. 无精确目标才读下方一个类别页；比较最多 2–3 项后停止扩展阅读。
5. 单组件指南 → 自有示例 → 用到的共享符号与样式 → 当前任务涉及的行为契约。不要复制所有入口或全量导入。

| 业务目标 | 下一页 |
|---|---|
| 业务表单 | [业务表单](categories/form.md) |
| 业务动作 | [业务动作](categories/action.md) |
| 数据与文件 | [数据与文件](categories/data.md) |
| 布局与流程 | [布局与流程](categories/panel.md) |
| 弹层与焦点 | [弹层与焦点](categories/overlay.md) |
| 业务导航 | [业务导航](categories/navigation.md) |
| 状态反馈 | [状态反馈](categories/feedback.md) |
| 媒体浏览 | [媒体浏览](categories/media.md) |
| 基础辅助 | [基础辅助](categories/utility.md) |

典型判断：输入后查找很多候选 → AutoComplete；少量固定选项 → Select 或 RadioButton；结构化记录比较 → DataTable；自由说明 → Textarea；临时阻断确认 → Dialog；较多详情编辑 → Drawer；轻量锚点内容 → Popover；非阻断结果 → Toast；已经发生的事件 → Timeline；未完成的顺序步骤 → Stepper。

所有新增项为项目自有 React 与原生 HTML 实现。参考组件目录不等于引入该产品运行时或复制其公开 Props 契约。
