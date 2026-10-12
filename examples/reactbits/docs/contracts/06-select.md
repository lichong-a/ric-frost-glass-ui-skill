# 06．Select 与 MultiSelect

```ts
type Option = { id: string; label: string; description?: string; disabled?: boolean };
interface SelectProps { value: string | null; options: Option[]; searchable?: boolean; onChange(id: string | null): void }
interface MultiSelectProps { values: string[]; options: Option[]; onChange(ids: string[]): void }
```

- Select 用于选择表单值；优先原生 select，定制时实现 combobox 与 listbox／option，不能套用动作 menu。[Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)
- 当前已提交值与键盘活动选项分离；方向键浏览，Enter 提交，Escape 关闭且保留原已提交值。
- 定制输入保持名称、展开状态、弹层关联与活动选项关联；option 的 aria-selected 对应实际选择状态。
- 搜索型 Select 采用第 05 节输入法规则；“没有匹配选项”不是可选 option，不因输入任意文本自动创建业务值。
- MultiSelect 使用触发按钮、非模态浮层、独立搜索框和 aria-multiselectable="true" 的 listbox。
- 多选项使用 option 与 aria-selected；复选图形是展示层，option 内不再嵌套真实 checkbox 或链接。[Listbox](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/)
- 搜索框接收文字输入；焦点在列表时上下键浏览、Space 切换当前项，选择后保留浮层，Escape 关闭。
- 多选直接提交每次勾选；Escape 不撤销已提交值。“清空全部”放在列表外，并说明清除的是全部已选项。
- 长标签省略后保留完整可访问名称；移除标签按钮名称为“移除：标签名”。失效选项明确标注，不能静默删掉业务值。

---

规范来源：[COMPONENT_CONTRACTS.md](../../../../COMPONENT_CONTRACTS.md)。本文件由主规范按章节生成；修改主规范后重新生成，不独立维护第二套规则。
