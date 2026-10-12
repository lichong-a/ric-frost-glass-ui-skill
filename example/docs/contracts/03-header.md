# 03．Header

```ts
interface HeaderProps {
  openPanel: null | "todo" | "tenant" | "user";
  pendingCount: number | null; scopeLabel: string; userLabel: string;
  onPanelChange(panel: HeaderProps["openPanel"]): void;
}
```

- Logo 可导航到已配置首页；首页地址和用户信息由应用提供，不硬编码为示例内容。
- 三个入口使用真实 button；点击已打开入口关闭，打开另一入口关闭前一入口。
- 参考图同时展示多个下拉属于组件陈列；真实顶栏只允许一个上述浮层打开。
- 数量未知时显示加载占位或隐藏徽标，不伪造 0；徽标封顶显示形式由产品配置，完整数量保留在可访问名称中。
- 空间长名称允许两行或省略，完整值可获取；不能挤压待办与用户入口至不可点击。

---

规范来源：[COMPONENT_CONTRACTS.md](../../../COMPONENT_CONTRACTS.md)。本文件由主规范按章节生成；修改主规范后重新生成，不独立维护第二套规则。
