# 01．AppShell

```ts
type Scope = { organizationId: string; spaceId: string };
interface AppShellProps {
  scope: Scope; routeId: string; navigationExpanded: boolean;
  contextState: "ready" | "switching" | "unavailable";
  onNavigationExpandedChange(next: boolean): void;
}
```

- DOM 顺序为跳过导航链接、Header、Sidebar、main；main 具有唯一标题关联和可作为跳转目标的 ID。
- 顶栏跨页面顶部，Logo 在左，右侧入口次序为待办、租户与空间、个人信息；侧栏从顶栏下开始。
- 桌面主内容为主要纵向滚动区；侧栏过长时可独立滚动，整页不得产生不必要的双纵向滚动条。
- 页面背景连续铺设；滚动、路由切换或打开下拉时，背景不得随每个玻璃组件分别重建。
- 窄屏进入主规范指定布局后，侧栏变为 Drawer；路由导航成功时关闭抽屉，将焦点移到新页标题。
- 刷新或深链进入时先恢复作用域与权限，再展示业务数据；无效空间显示明确恢复入口，不静默切换到别人的空间。

---

规范来源：[COMPONENT_CONTRACTS.md](../../../../COMPONENT_CONTRACTS.md)。本文件由主规范按章节生成；修改主规范后重新生成，不独立维护第二套规则。
