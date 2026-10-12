# 15．Toast 与 InlineFeedback

```ts
interface ToastMessage { id: string; kind: "success" | "error" | "info"; title: string; description?: string; actionLabel?: string; onAction?(): void; onDismiss(): void }
interface InlineFeedbackProps { kind: "warning" | "error" | "info"; message: string; persistent: boolean; retry?(): void }
```

- 成功 Toast 默认 5 秒后关闭；鼠标悬停或焦点位于内部时暂停计时。这是项目约定，不是无障碍规范规定的固定时长。
- 错误 Toast 不自动隐藏；提供明确关闭与适用的重试入口。去重依据 operationId／错误标识，不能不断堆叠同一失败。
- 成功与普通信息使用 role="status"／礼貌播报；需要即时处理的错误使用 role="alert"，避免同一消息在多处重复播报。
- Toast 不抢焦点；关闭按钮名称包含目标消息。重试复用已确认安全的操作语义，不盲目重复可能已成功的导入。
- 表单字段错误留在字段附近；数据加载失败留在数据区；扫描警告留在记录上下文，Toast 不能代替这些反馈。
- 通知进入与离开遵守主规范动效和减少动效设置；出现 Toast 不挤动页面布局。

---

规范来源：[COMPONENT_CONTRACTS.md](../../../../COMPONENT_CONTRACTS.md)。本文件由主规范按章节生成；修改主规范后重新生成，不独立维护第二套规则。
