# 业务组件交互动效

业务示例沿用自然色 Token 和已有 Motion。每个控件在 components 下有独立源码与 CSS Modules，示例只导入实际使用的控件。颜色 Token 可共享；按压、拖动、输入和弹层样式必须由对应组件显式使用。

- 复选框使用 `SpringCheckbox`：原生 input 保留勾选、name、disabled、表单和键盘语义，视觉层提供弹性填充与 SVG 勾线。开关继续使用滑动拨钮。
- 单选使用 `SpringRadio`；分段选择使用 `SegmentedControl`。单选背景跨项滑动，多选保持独立布尔状态，并对背景和勾选标记分别过渡。
- 下拉选择使用 `AnimatedSelect`；搜索建议使用 `DropdownSurface`。选项保留方向键、Enter、Escape 和焦点路径，退出中的浮层会立即退出交互。
- 折叠使用 `AnimatedCollapse`，保留输入状态，并在关闭后将内容设为 inert。`AnimatedSwap` 在内容退出时也移除交互与辅助技术访问，避免快速切换时访问旧内容。
- `DatePicker` 是定制日历，包含周一开始的六周网格、相邻月份、月份切换、今天、清除、范围高亮和日期约束。方向键、Home/End、PageUp/PageDown、Shift+PageUp/PageDown 移动日期，Enter 选择，Escape 关闭并返回触发按钮。值保持 `YYYY-MM-DD`，不通过 UTC 序列化。
- 媒体 `MediaViewer` 参考 Morph Slider 的形状揭示与位移，采用 DOM 转场；没有引入 WebGL 要求。保留图片位置、前后按钮、方向键与缩略图。图片比较增加可拖动分隔柄，并保留精确范围滑块。
- 按钮、输入、滑块、评分与开关使用业务模块内的悬停、按压、焦点与状态反馈；不修改全局主题或其它效果组件。

`useBusinessReducedMotion` 同时读取系统偏好和预览器当前的 `data-motion`。减少动态效果时，控件直接显示最终状态；折叠、选择、日历与媒体浏览依然可用。业务目录的 `motion: none` 继续表示无需阻断业务预览，不代表完全没有局部交互反馈。

接入时按需读取 [SpringCheckbox.tsx](../../src/business/components/SpringCheckbox.tsx)、[DatePicker.tsx](../../src/business/components/DatePicker.tsx) 或 [MediaViewer.tsx](../../src/business/components/MediaViewer.tsx)，复用同名样式及现有 Token。无需新增依赖，也不要同步加载整套演示。

下拉列表按 Glide Select 使用不透明的象牙白阅读面；展开使用位移和尺寸过渡，背景不做透明渐变。禁止对容器内全部 button/input 或 * 添加动画、transform、pointer-events 或 !important 覆盖。
