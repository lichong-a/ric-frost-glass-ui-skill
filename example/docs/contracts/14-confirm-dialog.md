# 14．ConfirmDialog

```ts
interface ConfirmDialogProps { kind: "disable" | "delete"; target: { id: string; name: string }; phase: "idle" | "submitting" | "failed"; onConfirm(): Promise<void>; onClose(): void }
```

| 操作 | 必须说明 | 成功后行为 |
| --- | --- | --- |
| disable | 对象名称、停止可用范围、是否可重新启用；运行中任务如何处理由后端策略提供 | 更新停用状态，保留记录；给出可恢复入口 |
| delete | 对象名称、实际删除范围、是否可恢复及已知依赖影响 | 以服务端结果移除或标记删除，不将其解释成停用 |

- 警告与危险操作采用不同文案和语义色；不能只更换按钮颜色而复用“确认操作”。
- 对话框具有可见标题与取消按钮；初始焦点放在取消或说明标题，避免误触破坏性确认。[Modal Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- submitting 阻止重复确认，保留原文案；失败保留对话框并显示原因，不能先移除行再悄悄恢复。
- Escape／关闭按钮关闭视图；请求已提交后关闭不表示撤销。若支持业务撤销，必须使用单独且有结果的操作。
- 类型名称二次输入只在业务明确要求时启用，不默认给所有停用和删除添加额外步骤。

---

规范来源：[COMPONENT_CONTRACTS.md](../../../COMPONENT_CONTRACTS.md)。本文件由主规范按章节生成；修改主规范后重新生成，不独立维护第二套规则。
