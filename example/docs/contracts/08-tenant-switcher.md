# 08．TenantSwitcher

```ts
interface TenantSwitcherProps {
  activeScope: Scope; state: "idle" | "loading-spaces" | "switching" | "failed";
  loadSpaces(organizationId: string, signal: AbortSignal): Promise<{ id: string; label: string }[]>;
  commitScope(next: Scope, requestId: string): Promise<{ scope: Scope; contextVersion: string }>;
  onCommitted(scope: Scope, contextVersion: string): void;
}
```

| 阶段 | 数据与反馈 | 是否改变当前作用域 |
| --- | --- | --- |
| 打开 | 当前组织／空间打勾，组织搜索可用 | 否 |
| 选择组织 | 只修改 draftOrganizationId，清空旧组织的候选空间并加载新列表 | 否 |
| 空间已加载 | 展示该组织可访问空间；原当前作用域与待选组织可辨认 | 否 |
| 选择空间 | 构造完整目标 Scope，开始一次切换事务 | 否 |
| 服务端验证成功 | 原子提交组织、空间、权限上下文和路由归属，关闭面板 | 是 |
| 失败／无权限 | 内联说明原因，保留原 Scope；允许换目标或重试 | 否 |

- 组织与空间是两步选择、一次提交；点击组织不能提前切换全局组织，也不能沿用前一组织的 spaceId。
- 选择已生效的组织与空间直接关闭，不重复请求；无空间时显示“该组织下暂无可访问空间”及获授权的管理入口。
- 连续点击组织 A、B 时，A 的迟到响应不能覆盖 B 的空间；请求需校验组织 ID 与序号。
- 切换中保留原租户标签并显示目标进度，暂停相关写入口；禁止出现新租户标题搭配旧租户业务内容。
- 取得目标上下文后再提交；目标列表未加载时显示目标作用域骨架，不把原数据暂借给目标空间。
- 查询键必须包含 Scope，例如 ["skills", organizationId, spaceId, filters]；切换后终止或忽略旧查询、清空行选择与浮层草稿。
- 旧缓存可按项目策略保留为独立分区；权限撤销与退出登录必须清理相关缓存，不能仅靠隐藏组件隔离。
- 异步任务保留创建时 Scope；旧空间任务完成后不得修改新空间列表，也不得在新空间自动重放写请求。
- 有未保存编辑时执行项目已有离开保护；无未保存编辑时不额外弹二次确认。切换失败必须恢复可操作状态。

---

规范来源：[COMPONENT_CONTRACTS.md](../../../COMPONENT_CONTRACTS.md)。本文件由主规范按章节生成；修改主规范后重新生成，不独立维护第二套规则。
