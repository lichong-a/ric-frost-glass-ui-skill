# 17．Drawer 与 Tooltip

| 组件 | 建议状态 | 必须行为 |
| --- | --- | --- |
| Drawer | closed／opening／open／closing | 窄屏导航使用模态 dialog；有标题、关闭按钮、焦点约束与背景 inert |
| Tooltip | hidden／visible | hover 与 focus 可触发，Escape 可隐藏，内容本身不可交互，不吸收焦点 |

- Drawer 沿用对话框键盘规则；打开时聚焦标题或首项，关闭后返回原触发器；导航成功则移至新页标题。
- 大屏常驻详情区域不是模态 Drawer；若采用非模态抽屉，不设置 aria-modal、不锁焦点，也不让背景 inert。
- Tooltip 使用 role="tooltip" 与 aria-describedby；按钮自身仍有名称。信息必须可在键盘操作下获取。
- 可点击链接、确认按钮、长篇报告放在 Popover 或 Dialog，不能放进 Tooltip。

---

规范来源：[COMPONENT_CONTRACTS.md](../../../COMPONENT_CONTRACTS.md)。本文件由主规范按章节生成；修改主规范后重新生成，不独立维护第二套规则。
