# 09．TodoPopover

```ts
type Todo = { id: string; title: string; scopeLabel: string; statusLabel: string; href: string };
interface TodoPopoverProps { items: Todo[]; pendingTotal: number | null; filter: "pending" | "completed"; onFilterChange(value: "pending" | "completed"): void }
```

- 面板为带标题的 section／region，内部为状态筛选、ul／li 列表和“查看全部待办”链接；不使用 menu 或 aria-modal。
- 触发按钮设置 aria-expanded 与 aria-controls；面板不是 menu，不设置 aria-haspopup="menu"。
- 键盘打开时将焦点移到面板标题或首个筛选项；Tab 按自然顺序离开，不循环锁定焦点。
- Escape 关闭并返回触发器；焦点离开整组或点击外部时关闭，不抢走外部新目标的焦点。
- 标题、徽标和页脚分别使用服务端待处理总数与实际展示数量；加载失败不把总数改成 0。
- 点击事项打开所属上下文中的详情；涉及切换空间时复用 TenantSwitcher 事务，权限不足则说明原因。
- 打开面板不标记任务完成；“已完成”由后端状态驱动。完成操作失败时保留事项并显示行内原因。
- 长列表内部滚动，标题与底部入口可保持可见；刷新不无故重置正在浏览的位置。

---

规范来源：[COMPONENT_CONTRACTS.md](../../../COMPONENT_CONTRACTS.md)。本文件由主规范按章节生成；修改主规范后重新生成，不独立维护第二套规则。
