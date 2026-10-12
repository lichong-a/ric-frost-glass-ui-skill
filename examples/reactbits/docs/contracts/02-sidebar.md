# 02．Sidebar

```ts
type NavItem = { id: string; label: string; href?: string; children?: NavItem[]; disabledReason?: string };
interface SidebarProps { items: NavItem[]; activeId: string; collapsed: boolean; onNavigate(id: string): void }
```

- 使用 nav 和普通链接；页面导航不是 menu，不添加 menuitem 键盘语义。
- 当前页面链接具有 aria-current="page"；展开组是 button，具有 aria-expanded 与 aria-controls。
- 展开组、当前路由、鼠标悬停、键盘焦点分别呈现；展开某组不改变路由，不强制关闭无关组。
- 折叠后保留可访问名称；图标 Tooltip 同时支持键盘焦点，不能作为名称的唯一来源。
- 权限决定可见入口；服务器拒绝深链时仍显示“无访问权限”，隐藏导航不代替权限校验。

---

规范来源：[COMPONENT_CONTRACTS.md](../../../../COMPONENT_CONTRACTS.md)。本文件由主规范按章节生成；修改主规范后重新生成，不独立维护第二套规则。
