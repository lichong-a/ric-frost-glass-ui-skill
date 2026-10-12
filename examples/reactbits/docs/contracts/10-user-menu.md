# 10．UserMenu

```ts
interface UserMenuProps { user: { name: string; roleLabel: string }; onAction(action: "profile" | "security" | "preferences" | "help" | "logout"): void }
```

- 用户身份摘要放在菜单容器之外；动作区采用 menu／menuitem，分隔线采用 separator，避免把普通说明文字伪装成菜单项。
- 触发器具有 aria-haspopup="menu" 与 aria-expanded；Enter／Space 打开并聚焦第一项。[Menu Button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)
- 菜单内上下键浏览、Home／End 到首尾、Enter／Space 执行动作、Escape 返回触发器；Tab 离开时关闭。
- 偏好设置若使用真正子菜单，键盘 ArrowRight 进入、ArrowLeft 返回；主题单选使用 menuitemradio 与 aria-checked。
- 当前规范若尚未提供某主题实现，不能把该项做成点击无效的可用操作；由应用传入可用项与禁用说明。
- 退出登录失败需说明会话是否仍有效；退出成功清理身份、作用域缓存与待提交草稿，并导航至配置的登录页。

---

规范来源：[COMPONENT_CONTRACTS.md](../../../../COMPONENT_CONTRACTS.md)。本文件由主规范按章节生成；修改主规范后重新生成，不独立维护第二套规则。
