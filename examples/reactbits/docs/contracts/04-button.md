# 04．Button

```ts
interface ButtonProps {
  variant: "primary" | "secondary" | "ghost" | "danger" | "danger-outline" | "warning";
  size?: "small" | "medium" | "large"; disabled?: boolean; loading?: boolean;
  accessibleLabel?: string; type?: "button" | "submit" | "reset";
  onPress(): void | Promise<void>;
}
```

- 默认 type="button"；只有明确提交表单的按钮使用 submit。图标按钮必须提供独立可访问名称。
- loading 保留原宽度和操作文案，显示忙碌提示并阻止重复提交；不能仅替换成无名称的旋转图标。
- 普通禁用采用原生 disabled；若加载时需保留焦点，可用 aria-disabled 与 aria-busy，并在事件层阻止触发。
- 禁用原因放在可关联的说明或邻近文本中；不能依赖无法获得焦点的禁用按钮触发 Tooltip。
- 异步操作以服务端结果决定成功反馈；组件不得因点击已发生就立即发出成功 Toast。

---

规范来源：[COMPONENT_CONTRACTS.md](../../../../COMPONENT_CONTRACTS.md)。本文件由主规范按章节生成；修改主规范后重新生成，不独立维护第二套规则。
