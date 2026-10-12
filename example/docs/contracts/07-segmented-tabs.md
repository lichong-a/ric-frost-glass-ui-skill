# 07．Segmented 与 Tabs

```ts
interface SegmentedProps { value: string; items: { id: string; label: string; count?: number }[]; onChange(id: string): void }
interface TabsProps { activeId: string; activation: "automatic" | "manual"; onActivate(id: string): void }
```

| 组件 | 用途与语义 | 项目行为 |
| --- | --- | --- |
| Segmented | 对同一份数据做互斥筛选；默认采用有名称的 radiogroup／radio | 当前值 aria-checked；方向键选择；重置页码并清空表格选择 |
| 按钮式 Segmented | 仅在既有组件库采用按钮组时允许 | 每项 aria-pressed，恰好一项为 true；不要同时使用 tab 语义 |
| Tabs | 切换不同内容面板或导入来源表单 | tablist／tab／tabpanel 关联；当前项 aria-selected |

- 网络请求或重型面板采用手动 Tabs：方向键移动焦点，Enter／Space 激活；即时本地面板可自动激活。
- 状态筛选不会凭空创建独立 tabpanel；视觉样式相似不代表交互语义相同。
- 禁用项必须有原因；空结果不自动跳回“全部”，避免覆盖用户选择。

---

规范来源：[COMPONENT_CONTRACTS.md](../../../COMPONENT_CONTRACTS.md)。本文件由主规范按章节生成；修改主规范后重新生成，不独立维护第二套规则。
