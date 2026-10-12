# 数据与文件

仅在需要按场景选型时读本页；精确名称可直接查询单项指南，不顺序读取整个类别。

| 组件 | 什么时候使用 | 什么时候换用其它能力 |
|---|---|---|
| [DataTable](../components/business-datatable.md) | 结构化记录需要列比较、搜索、排序和分页 | 卡片内容浏览用DataView；大数据需服务端分页 |
| [DataView](../components/business-dataview.md) | 同一批记录在列表和网格中浏览，保持选择与筛选 | 跨列精确比较用DataTable |
| [OrderList](../components/business-orderlist.md) | 单个列表中的顺序本身有意义，用户调整优先级 | 两个集合间分配用PickList；不可只提供鼠标拖拽 |
| [OrganizationChart](../components/business-organizationchart.md) | 展示可展开的上下级组织或责任关系并选择节点 | 通用文件目录用Tree；大量树形记录用TreeTable |
| [Paginator](../components/business-paginator.md) | 有界结果集需要前后页和每页数量选择 | 无限加载与服务端游标要按目标API设计 |
| [PickList](../components/business-picklist.md) | 用户在可选与已选集合之间移动对象，支持移除与全选 | 单一字段多选可用CheckboxGroup，不必引入双列表 |
| [Timeline](../components/business-timeline.md) | 按时间顺序呈现已经发生的事件或流程进展 | 未发生步骤用Stepper；复杂排程不属于本例 |
| [Tree](../components/business-tree.md) | 浏览可展开层级并选择节点，保持键盘与选中状态 | 多列树数据用TreeTable；对象选择表单用TreeSelect |
| [TreeTable](../components/business-treetable.md) | 层级记录需要同时比较多列数据并展开子记录 | 纯层级导航用Tree，不加入无用列 |
| [FileUpload](../components/business-fileupload.md) | 用户选择本地文件，验证类型大小数量并能逐项移除 | 真实上传需明确后端与授权，不能模拟外部写入成功 |

选定一个组件后只读它的文档、示例与必要共享符号。
