# 16．Pagination

```ts
interface PaginationProps { page: number; pageSize: number; total: number | null; pageSizeOptions: number[]; loading: boolean; onChange(page: number, pageSize: number): void }
```

- page 从 1 开始；pageSize 与选项由调用方明确提供，禁止以图片页数或记录数作为默认。
- 使用有名称的 nav；页码按钮标注“第 N 页”，当前页 aria-current="page"；省略号不是可点击按钮。
- 首页禁用上一页，已知末页禁用下一页；total 未知时不编造总页数，使用服务端游标／hasNext 的独立模式。
- 查询或页大小变化回到第 1 页并清空选择；删除导致当前页越界时请求最后有效页。
- 同作用域翻页可保留旧行并显示忙碌状态，成功后替换；失败显示重试与原数据状态，不能呈现为零结果。

---

规范来源：[COMPONENT_CONTRACTS.md](../../../COMPONENT_CONTRACTS.md)。本文件由主规范按章节生成；修改主规范后重新生成，不独立维护第二套规则。
