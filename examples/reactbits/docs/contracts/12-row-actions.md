# 12．RowActions

```ts
type RowAction = "view" | "edit" | "tags" | "duplicate" | "disable" | "delete";
interface RowActionsProps { rowId: string; rowName: string; actions: RowAction[]; pending?: RowAction; onAction(action: RowAction, rowId: string): Promise<void> }
```

- 图标或组合按钮名称包含对象，例如“编辑：会议纪要整理”“更多操作：会议纪要整理”。
- 行内按钮、链接、checkbox、菜单项不触发可选的整行详情事件；停止事件冒泡不能代替真实交互元素。
- 更多菜单使用标准 menu，Portal 到统一浮层容器；跟随触发器定位，不能被表格 overflow 或圆角裁切。
- 打开菜单不选择该行；操作对象取稳定 rowId，不取“当前选中行”或渲染索引。
- 停用和删除必须调用各自 ConfirmDialog；复制成功依据后端返回的新 ID／名称，不能仅复制展示行伪装成功。
- 菜单关闭时按关闭原因恢复焦点；原记录被删除后聚焦相邻记录的名称链接或表格标题。

---

规范来源：[COMPONENT_CONTRACTS.md](../../../../COMPONENT_CONTRACTS.md)。本文件由主规范按章节生成；修改主规范后重新生成，不独立维护第二套规则。
