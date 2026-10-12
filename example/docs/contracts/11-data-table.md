# 11．DataTable

```ts
interface DataTableProps<T> {
  rows: T[]; getRowId(row: T): string; selectable?: boolean;
  selectedIds: string[]; selectionScope: "page";
  isRowSelectable?(row: T): boolean;
  onSelectionChange(ids: string[], reason: "row" | "page" | "query-change" | "refresh"): void;
}
```

- 默认 selectable=false；仅需要批量操作时展示选择列，不为复刻图片无条件加入复选框。
- 使用原生 table、caption 或关联标题、thead、tbody、th scope="col"；无需电子表格式导航时不使用 role="grid"。
- 表头 checkbox 仅操作当前页可选择行；名称为“选择本页全部可选记录”，不暗示选择全部查询结果。
- 可选行数为 0 时表头复选框禁用；全部选中为 checked，部分选中为 indeterminate，读屏状态为 mixed。
- 行选择仅通过 checkbox 改变；名称链接负责查看，编辑按钮负责编辑，点击空白行默认不切换选择。
- 基准 selectionScope="page"：翻页、页大小、排序、关键词、筛选或 Scope 改变均清空选择，并移除过期批量操作条。
- 当前页刷新仅保留仍存在且仍可选的 ID；记录停用或权限变化使其不可选时也要移除。
- 批量操作条显示“已选择本页 N 项”；提交使用已选 ID 快照，返回后逐项呈现成功与失败，不能笼统宣称全部成功。
- 若以后扩展跨页选择，必须另建明确的选择模型和“选择全部筛选结果”确认入口；本规范不允许隐式跨页保留。
- 列排序用表头内 button；仅当前排序列设置 aria-sort，排序状态加入请求与 URL 状态。
- 表格行高基准 52，文本长时可按主规范增高；不能固定高度后遮挡多行说明。横向滚动只影响表格区域。
- 名称和状态不只依赖颜色；版本取实际数据，未知值显示约定占位，不默认填充图片中的版本。

---

规范来源：[COMPONENT_CONTRACTS.md](../../../COMPONENT_CONTRACTS.md)。本文件由主规范按章节生成；修改主规范后重新生成，不独立维护第二套规则。
