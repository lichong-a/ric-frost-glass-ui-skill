# 05．Input 与 SearchInput

```ts
interface InputProps { value: string; label: string; readOnly?: boolean; disabled?: boolean; error?: string; onChange(value: string): void }
interface SearchInputProps extends InputProps { onSearch(value: string): void; debounceMs?: number }
```

| 状态 | 必须行为 |
| --- | --- |
| default／focus | label 与输入框关联；placeholder 仅补充示例，不能代替 label |
| readOnly | 可聚焦、选择、复制，保留值与表单语义；用户不能修改 |
| disabled | 不可编辑，通常不进入 Tab 顺序；原生表单不提交该字段，需要保留值时由数据模型处理 |
| invalid | 显示具体修正建议，设置 aria-invalid，并用 aria-describedby 关联错误 |

- 搜索默认防抖 250 ms，这是项目交互约定；输入显示值实时更新，不能把防抖作用于输入框回显。
- compositionstart 时取消待执行搜索并进入组合态；组合过程中不查询、不提交、不拦截输入法候选 Enter。
- compositionend 后读取完整字符串并重新开始 250 ms 防抖；同轮重复 input/change 事件不得造成重复查询。
- 非组合态 Enter 立即提交并取消待执行定时器；同时检查事件 isComposing 和组件组合态标记。
- 清除按钮立即提交空查询并取消旧定时器；组件卸载、作用域变化时清除定时器和失效请求。
- 新查询可取消旧请求，但仍必须校验响应序号；仅 AbortController 不足以保证乱序结果不会覆盖。

---

规范来源：[COMPONENT_CONTRACTS.md](../../../COMPONENT_CONTRACTS.md)。本文件由主规范按章节生成；修改主规范后重新生成，不独立维护第二套规则。
