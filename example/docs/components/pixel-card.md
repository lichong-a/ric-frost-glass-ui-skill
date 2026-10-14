# Pixel Card

卡片与面板 · `pixel-card` · 中文意图：像素卡片 / 像素悬停

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-ric-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

像素从中心或指针处点亮卡片。

功能要求：保持内容的语义和可访问名称；只有真实可交互元素可进入焦点顺序。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/cards/pixel-card.tsx](../../src/demos/cards/pixel-card.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Components/PixelCard/PixelCard.tsx](../../.upstream/src/ts-default/Components/PixelCard/PixelCard.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Components/PixelCard/PixelCard.css](../../.upstream/src/ts-default/Components/PixelCard/PixelCard.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/pixel-card.json](../../src/parameters/definitions/pixel-card.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component pixel-card
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Pixel Card 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Components/PixelCard/PixelCard';
import { palette } from '../../shared/demo-support';

// 像素由实际Canvas网格生成，不是静态图案。
// 此演示使用Canvas，容器必须具有非零宽高。

export default function PixelCardDemo() {

  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 340, position: 'relative', display: 'grid', placeItems: 'center', padding: 24, color: palette.ink }}>
      <Component



 colors={["#52604e", "#a6b39a", "#c3ae88"]} glowColor={"#52604e"} shape={"square"} origin={"pointer"} gap={7} pixelSize={2} speed={22} revealDuration={500} spotlight={0.35} glow={0.2} opacity={0.35} fade={0.7} trigger={"hover"} radius={20} clickPulse={true} intro={true} theme={"light"} style={{ "width": 300, "height": 280, "padding": 24, "color": "#1f2d26" }} variant={"default"} introDelay={0} ><div><h3>微光像素</h3><p>将指针移入卡片，观察像素逐个亮起。</p></div></Component>
    </div>
  );
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `variant` | `'default' \| 'blue' \| 'yellow' \| 'pink'` | 否 | `'default'` | 选择组件内置的外观或效果变体。 |
| `colors` | `string \| string[]` | 否 | `未指定` | 颜色组的有序数据集合；每一项按数组元素类型配置。 |
| `gap` | `number` | 否 | `preset.gap` | 相邻单元、卡片或字符之间的间距；单位由组件实现定义。 |
| `speed` | `number` | 否 | `preset.speed` | 动画、流动或滚动的推进速度；不同效果使用各自的速度尺度。 |
| `pixelSize` | `number` | 否 | `2` | 像素尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `shape` | `'square' \| 'circle' \| 'diamond'` | 否 | `'square'` | 形状，控制 pixel card 的对应渲染或交互参数。 |
| `origin` | `'center' \| 'pointer'` | 否 | `'center'` | 起点，控制 pixel card 的对应渲染或交互参数。 |
| `revealDuration` | `number` | 否 | `600` | 显现时长，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `spotlight` | `number` | 否 | `0.5` | 聚光，控制 pixel card 的对应渲染或交互参数。 |
| `glow` | `number` | 否 | `0.5` | 辉光，控制 pixel card 的对应渲染或交互参数。 |
| `glowColor` | `string` | 否 | `preset.glow[tone]` | 辉光颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `opacity` | `number` | 否 | `1` | 不透明度，控制 pixel card 的对应渲染或交互参数。 |
| `fade` | `number` | 否 | `0` | 淡出，控制 pixel card 的对应渲染或交互参数。 |
| `trigger` | `'hover' \| 'click' \| 'always'` | 否 | `'hover'` | 触发方式，控制 pixel card 的对应渲染或交互参数。 |
| `clickPulse` | `boolean` | 否 | `true` | 是否点击脉冲，决定该分支的展示或交互行为。 |
| `intro` | `boolean` | 否 | `true` | 是否入场，决定该分支的展示或交互行为。 |
| `introDelay` | `number` | 否 | `0` | 入场延迟，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `noFocus` | `boolean` | 否 | `preset.noFocus` | 是否禁用焦点，决定该分支的展示或交互行为。 |
| `theme` | `'dark' \| 'light'` | 否 | `'dark'` | 主题，控制 pixel card 的对应渲染或交互参数。 |
| `radius` | `number` | 否 | `24` | 半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `style` | `CSSProperties` | 否 | `未指定` | 容器的 React 内联样式对象，尺寸、布局与 CSS 属性按 CSSProperties 传入。 |
| `children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |

**colors 的真实接入：**

```tsx
colors={[palette.primary, palette.sage, palette.sand]}
```

**style 的真实接入：**

```tsx
style={{ width: 300, height: 280, padding: 24, color: palette.ink }}
```

**children 的真实接入：**

```tsx
children={<><div><h3>微光像素</h3><p>将指针移入卡片，观察像素逐个亮起。</p></div></>}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.colors` | `["#52604e","#a6b39a","#c3ae88"]` | json | 不限 ~ 不限 | 调节结束后重建 |
| `t0.glowColor` | `"#52604e"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.shape` | `"square"` | select | "square" / "circle" / "diamond" | 调节结束后重建 |
| `t0.origin` | `"pointer"` | select | "center" / "pointer" | 调节结束后重建 |
| `t0.gap` | `7` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.pixelSize` | `2` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.speed` | `22` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.revealDuration` | `500` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.spotlight` | `0.35` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.glow` | `0.2` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.opacity` | `0.35` | range | 0 ~ 1 比例 | 调节结束后重建 |
| `t0.fade` | `0.7` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.trigger` | `"hover"` | select | "hover" / "click" / "always" | 调节结束后重建 |
| `t0.radius` | `20` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.clickPulse` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.intro` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.theme` | `"light"` | select | "dark" / "light" | 调节结束后重建 |
| `t0.style` | `{"width":300,"height":280,"padding":24,"color":"#1f2d26"}` | json | 不限 ~ 不限 | 调节结束后重建 |
| `t0.variant` | `"default"` | select | "default" / "blue" / "yellow" / "pink" | 调节结束后重建 |
| `t0.introDelay` | `0` | number | 不限 ~ 不限 | 调节结束后重建 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Ric 皮肤

- 容器、状态色、边界与焦点使用 Agent Ric 规范；交互命中区不随视觉形变缩小。
- 组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。

## 5. 加载、动效与降级

本例实际配置：设备访问与音频行为以本例真实 Props 和显式回调为准。capabilities 是源码扫描提示，不能据此声称已请求相机、录音或播放音频。

- 依赖清单：`react`。安装前复用目标项目的兼容版本，不重复加载。
- 运行类型：本例预览入口不要求预先通过图形接口检查；实际组件内部的可选渲染分支由源码和本例 Props 决定。此说明不等于浏览器运行证明。
- 动效策略：遵从系统减少动效偏好，功能交互保持可用。
- 示例库降级：动态偏好或能力检查不满足时先不挂载本项，显示原因；减少运动时可明确选择仅播放本次。
- 业务接入的静态降级要求：保留可读内容与原生交互，并提供当前组件的静态状态
- 卸载时释放本例监听、计时、动画帧及拥有的渲染资源；不以隐藏 CSS 代替停止循环。

仅当前需求涉及高级运行、资源或设备权限时再读 [效果与降级策略](../effects-policy.md)。

## 6. 验收本组件

1. 参数与对应源码真实 API 一致，构建可导入，安装失败可恢复。
2. 能观察到第 1 节的核心机制，而不只是相同名称的占位卡片。
3. 真实状态 / 事件 / 键盘与必要的触屏等价操作可用。
4. 画布保留本例的效果对比度和原版配色；外壳、阅读面与基础规范一致。
5. 只激活本项；切换或卸载后停止其持续工作。
6. 减少运动与不可用情形保留本节所述等价内容或功能。

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [卡片与面板](../effects/categories/cards.md)；否则直接完成当前组件。
