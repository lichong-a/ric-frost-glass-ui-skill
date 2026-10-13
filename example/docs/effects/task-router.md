# 按效果场景渐进选型

本次清单：215 个效果组件；日期 2026-10-12。每项对应独立示例；有明确名称时直接查询单组件指南，无需先读类别。

1. 有精确名称：运行 `find-component.mjs "名称" --provider effects --exact`，只读命中指南。
2. 只有中文场景：运行 `find-component.mjs "中文意图" --provider effects --limit 3`，最多比较 2–3 项。
3. 只知道用途：先读下方一个用途类别；来源分类、family、micro 与 components 用 `--tag` 过滤。
4. 单组件指南 → 自有示例 → 实际导入的源码、共享符号和样式 → 当前任务涉及的契约。禁止加载完整索引、所有 Props 或全量源码。

## 用途分类

| 类别 | 组件数 | 用途 |
|---|---:|---|
| [文字动效](categories/text.md) | 28 | 标题、正文、字符与字形的动态表达 |
| [背景与光效](categories/background.md) | 66 | 页面背景、纹理、粒子与空间光效 |
| [指针与轨迹](categories/pointer.md) | 16 | 指针形态、悬停响应与移动轨迹 |
| [滚动与转场](categories/scroll.md) | 10 | 滚动触发、进入视口与状态转场 |
| [媒体与轮播](categories/media.md) | 28 | 图片、图集、轮播、模型与媒体比较 |
| [卡片与面板](categories/cards.md) | 20 | 对象卡片、阅读面与内容面板 |
| [表单与选择](categories/form.md) | 14 | 文本输入、数值调整、选项与字段语义 |
| [按钮与操作](categories/actions.md) | 8 | 动作入口、提交、快捷操作与撤销 |
| [导航与菜单](categories/navigation.md) | 10 | 页面导航、命令查找与菜单选择 |
| [数据与文件](categories/data.md) | 7 | 记录、层级、列表、文件与结果浏览 |
| [布局与流程](categories/layout.md) | 1 | 工作区分隔、内容布局与顺序流程 |
| [状态与反馈](categories/feedback.md) | 6 | 等待、进度、通知与结果状态 |
| [弹层与辅助](categories/overlay.md) | 1 | 对话框、提示、浮层与焦点辅助 |

返回 [全库任务路由](../task-router.md)。
