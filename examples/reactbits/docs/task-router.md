# 按任务渐进加载

本次清单：215 个组件；日期 2026-10-12；固定版本 `2139cb3098d4fedc6264f13e50dcb4694224ba7c`。每项对应独立示例；有明确名称时直接读取当前指南。名称查询直接到单组件文档，不必先读类别。

## 1. 按已有信息定位

| 用户已有信息 | 下一步 |
|---|---|
| 精确英文名或 slug | 运行 `find-component.mjs "名称" --exact`，只读返回的单组件文档 |
| 中文效果意图 | 运行 `find-component.mjs "中文意图" --limit 5`，先看最相关一项 |
| 只知道类别或要比较方案 | 只读下方对应类别页，选出 1–3 项再读组件文档 |
| 只要求普通业务控件 | 读取基础规范/契约分片；不强行选一个装饰效果 |
| 用户明确要求全部组件 | 按五类分批实现和逐项核对清单；每个任务只加载分配的组件文档 |

## 2. 五类目录

| 类别 | 组件数 | 用途 |
|---|---:|---|
| [文字效果](categories/text-animations.md) | 33 | 字符、标题、数字、滚动和阅读揭示 |
| [交互动效](categories/animations.md) | 41 | 入场、悬停、点击、光标、图像过渡和边缘 |
| [组合组件](categories/components.md) | 48 | 导航、列表、卡片、布局、画廊和选择控制 |
| [微交互](categories/micro.md) | 34 | Agent状态、消息输入、表单、按钮、选择和反馈 |
| [背景效果](categories/backgrounds.md) | 59 | 渐变、线场、网格、光束、粒子、流体与空间 |

## 3. 页面与基础行为

| 任务 | 先读 | 需要时追加 |
|---|---|---|
| 页面外壳 / 侧栏 / 顶栏 | [页面框架](spec/08-app-shell.md)、[AppShell](contracts/01-app-shell.md) | [Sidebar](contracts/02-sidebar.md)、[Header](contracts/03-header.md) |
| 按钮 / 输入 / 选择 / 开关 | [基础视觉](spec/09-controls.md) | [Button](contracts/04-button.md)、[Input](contracts/05-input.md)、[Select](contracts/06-select.md)、[Segmented / Tabs](contracts/07-segmented-tabs.md) |
| 表格 / 筛选 / 行操作 / 分页 | [表格](spec/10-table.md)、[DataTable](contracts/11-data-table.md) | [RowActions](contracts/12-row-actions.md)、[Pagination](contracts/16-pagination.md) |
| 菜单 / 弹窗 / 抽屉 / 提示 | [浮层](spec/11-overlays.md)、[浮层与键盘](contracts/19-overlays-keyboard.md) | [确认弹窗](contracts/14-confirm-dialog.md)、[抽屉与Tooltip](contracts/17-drawer-tooltip.md) |
| 租户切换 / 导入与扫描 | [TenantSwitcher](contracts/08-tenant-switcher.md) 或 [ImportDialog](contracts/13-import-dialog.md) | 只读取所涉状态和失败回退 |
| 状态 / 计时 / Toast / 空态 | [反馈](spec/12-feedback.md)、[反馈契约](contracts/15-feedback.md) | Micro 中按具体名称检索；真实任务与示例数据分开 |
| 动效 / 指针 / Canvas / WebGL | [效果与降级](effects-policy.md) | 只读所选组件的实际依赖与源码 |
| 接入 Token / 主题 / Portal | [CSS API](../../../CSS_API.md) | [工程接入](spec/14-integration.md) |
| 验证当前结果 | 单组件文档的验收项 | [UI验收](spec/16-acceptance.md)、[完整验收清单](../../../ACCEPTANCE.md)（只选本次范围） |

## 4. 避免上下文膨胀

第一次只读 SKILL、核心约束和当前路由；第二次只读单组件文档；第三次才读取实际示例/Props/源码。遇到共用实现仅再读直接依赖。不要全文输出完整 catalog、所有 Props 或动态 import 表，也不要把多个组件源码打包成一个大提示词。

所选实现尚未准备时，按单组件文档从包根运行准备命令；自有示例文件随包保留。组件路径以检索结果为准，不按名字猜目录。
