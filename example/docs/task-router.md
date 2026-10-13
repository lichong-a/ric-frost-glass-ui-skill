# 按任务渐进加载

本次清单：303 个组件；日期 2026-10-12。每项对应独立示例；有明确名称时直接查询单组件指南，无需先读类别。

1. 有精确名称：运行 `find-component.mjs "名称" --exact`，只读命中指南。
2. 只有中文场景：运行 `find-component.mjs "中文意图" --limit 3`，最多比较 2–3 项。
3. 只知道用途：先读下方一个用途类别；来源分类、family、micro 与 components 用 `--tag` 过滤。
4. 单组件指南 → 自有示例 → 实际导入的源码、共享符号和样式 → 当前任务涉及的契约。禁止加载完整索引、所有 Props 或全量源码。

普通业务先看 [业务路由](business/task-router.md)；明确要求装饰效果时再看 [效果路由](effects/task-router.md)。

## 用途分类

| 类别 | 组件数 | 用途 |
|---|---:|---|
| [文字动效](categories/text.md) | 28 | 标题、正文、字符与字形的动态表达 |
| [背景与光效](categories/background.md) | 66 | 页面背景、纹理、粒子与空间光效 |
| [指针与轨迹](categories/pointer.md) | 16 | 指针形态、悬停响应与移动轨迹 |
| [滚动与转场](categories/scroll.md) | 12 | 滚动触发、进入视口与状态转场 |
| [媒体与轮播](categories/media.md) | 31 | 图片、图集、轮播、模型与媒体比较 |
| [卡片与面板](categories/cards.md) | 24 | 对象卡片、阅读面与内容面板 |
| [表单与选择](categories/form.md) | 45 | 文本输入、数值调整、选项与字段语义 |
| [按钮与操作](categories/actions.md) | 13 | 动作入口、提交、快捷操作与撤销 |
| [导航与菜单](categories/navigation.md) | 17 | 页面导航、命令查找与菜单选择 |
| [数据与文件](categories/data.md) | 18 | 记录、层级、列表、文件与结果浏览 |
| [布局与流程](categories/layout.md) | 7 | 工作区分隔、内容布局与顺序流程 |
| [状态与反馈](categories/feedback.md) | 16 | 等待、进度、通知与结果状态 |
| [弹层与辅助](categories/overlay.md) | 10 | 对话框、提示、浮层与焦点辅助 |

## 3. 页面与基础行为

| 任务 | 先读 | 需要时追加 |
|---|---|---|
| 页面外壳 / 侧栏 / 顶栏 | [页面框架](spec/08-app-shell.md)、[AppShell](contracts/01-app-shell.md) | [Sidebar](contracts/02-sidebar.md)、[Header](contracts/03-header.md) |
| 按钮 / 输入 / 选择 / 开关 | [基础视觉](spec/09-controls.md) | [Button](contracts/04-button.md)、[Input](contracts/05-input.md)、[Select](contracts/06-select.md)、[Segmented / Tabs](contracts/07-segmented-tabs.md) |
| 表格 / 筛选 / 行操作 / 分页 | [表格](spec/10-table.md)、[DataTable](contracts/11-data-table.md) | [RowActions](contracts/12-row-actions.md)、[Pagination](contracts/16-pagination.md) |
| 菜单 / 各类弹窗 / 四向抽屉 / 提示 | [浮层](spec/11-overlays.md)、[浮层与键盘](contracts/19-overlays-keyboard.md) | [确认弹窗](contracts/14-confirm-dialog.md)、[抽屉与Tooltip](contracts/17-drawer-tooltip.md) |
| 租户切换 / 导入与扫描 | [TenantSwitcher](contracts/08-tenant-switcher.md) 或 [ImportDialog](contracts/13-import-dialog.md) | 只读取所涉状态和失败回退 |
| 状态 / 计时 / 四角Notice / Toast / 空态 | [反馈](spec/12-feedback.md)、[反馈契约](contracts/15-feedback.md) | 用具体名称或 --tag micro 检索；真实任务与示例数据分开 |
| 动效 / 指针 / Canvas / WebGL | [效果与降级](effects-policy.md) | 只读所选组件的实际依赖与源码 |
| 统一滚动条 / 长正文与局部滚动 | [尺寸与滚动条](spec/06-geometry.md)、[滚动条样式入口](../../CSS_API.md) | 表格、弹窗或抽屉只追加自身相关契约 |
| 接入 Token / 主题 / Portal | [CSS API](../../CSS_API.md) | [工程接入](spec/14-integration.md) |
| 验证当前结果 | 单组件文档的验收项 | [UI验收](spec/16-acceptance.md)、[完整验收清单](../../ACCEPTANCE.md)（只选本次范围） |

## 4. 避免上下文膨胀

第一次只读 SKILL、核心约束和当前路由；第二次只读单组件文档；第三次才读取实际示例/Props/源码。遇到共用实现仅再读直接依赖。不要全文输出完整 catalog、所有 Props 或动态 import 表，也不要把多个组件源码打包成一个大提示词。

所选实现尚未准备时，按单组件文档从包根运行准备命令；自有示例文件随包保留。组件路径以检索结果为准，不按名字猜目录。
