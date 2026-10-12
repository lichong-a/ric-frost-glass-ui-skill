# 15．Toast 与 InlineFeedback

```ts
interface ToastMessage { id: string; kind: "success" | "error" | "info"; title: string; description?: string; actionLabel?: string; onAction?(): void; onDismiss(): void }
type NoticePlacement = "top-start" | "top-end" | "bottom-start" | "bottom-end";
interface NoticeMessage { id: string; operationId?: string; kind: "success" | "error" | "warning" | "info"; title: string; description: string; persistent: boolean; onDismiss(): void; actionLabel?: string; onAction?(): void }
interface InlineFeedbackProps { kind: "warning" | "error" | "info"; message: string; persistent: boolean; retry?(): void }
```

- 成功 Toast 默认 5 秒后关闭；鼠标悬停或焦点位于内部时暂停计时。这是项目约定，不是无障碍规范规定的固定时长。
- 错误 Toast 不自动隐藏；提供明确关闭与适用的重试入口。去重依据 operationId／错误标识，不能不断堆叠同一失败。
- 成功与普通信息使用 role="status"／礼貌播报；需要即时处理的错误使用 role="alert"，避免同一消息在多处重复播报。
- Toast 不抢焦点；关闭按钮名称包含目标消息。重试复用已确认安全的操作语义，不盲目重复可能已成功的导入。
- 表单字段错误留在字段附近；数据加载失败留在数据区；扫描警告留在记录上下文，Toast 不能代替这些反馈。
- 通知进入与离开遵守主规范动效和减少动效设置；出现 Toast 不挤动页面布局。
- Notice 用于较完整的结果、任务与恢复说明；错误、警告或带操作的 Notice 默认不自动消失。`placement` 由所属页面或通知服务统一设置，同一范围不同时创建四个互相竞争的通知栈。
- 四个位置使用同一宽度、间距、状态色与关闭行为；窄屏顶部位置降到同侧底部。最多三条同时可见，余下进入队列或可访问列表，重复 operationId 更新原消息。
- 顶部通知按事件顺序向下扩展，底部通知向上扩展；使用 DOM 顺序与键盘读取顺序一致的队列，不通过视觉 reverse 反转焦点顺序。
- 暂停计时累计剩余时间，离开悬停或焦点后从剩余时长继续；页面隐藏也暂停。关闭、替换与卸载时清理计时器，不逐帧向辅助技术播报倒计时。
- 模态内产生的通知应位于当前可访问和 top-layer 上下文，不能被背景 inert 隐藏；无需处理的提示不抢焦点，必须决定的失败使用 Dialog。

---

规范来源：[COMPONENT_CONTRACTS.md](../../../COMPONENT_CONTRACTS.md)。本文件由主规范按章节生成；修改主规范后重新生成，不独立维护第二套规则。
