# Glass Surface

卡片与面板 · `glass-surface` · 中文意图：毛玻璃 / 磨砂玻璃 / 玻璃表面 / 毛玻璃卡片

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-ric-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

圆角表面保留对背后内容的局部折射。

功能要求：保持内容的语义和可访问名称；只有真实可交互元素可进入焦点顺序。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/cards/glass-surface.tsx](../../src/demos/cards/glass-surface.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Components/GlassSurface/GlassSurface.tsx](../../.upstream/src/ts-default/Components/GlassSurface/GlassSurface.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Components/GlassSurface/GlassSurface.css](../../.upstream/src/ts-default/Components/GlassSurface/GlassSurface.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/glass-surface.json](../../src/parameters/definitions/glass-surface.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component glass-surface
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Glass Surface 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Components/GlassSurface/GlassSurface';
import { palette } from '../../shared/demo-support';
import { useRef } from "react";
// 显式传入真实图片backdrop，避免只有透明圆角而看不见折射；文字维持墨绿。
// renderer="auto" 根据能力选择SVG折射、WebGL折射或CSS霜玻璃回退；不将WebGL作为挂载前置条件。

export default function GlassSurfaceDemo() {
  const backdropRef = useRef<HTMLImageElement>(null!);
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 400, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <div style={{ position: 'relative', width: '100%', height: 360, overflow: 'hidden', borderRadius: 20 }}><img ref={backdropRef}    src={import.meta.env.BASE_URL + "media/scene-2.svg"} alt={"透过玻璃观察的自然色图形"} style={{ "width": "100%", "height": "100%", "objectFit": "cover" }}  /><div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}><Component  backdrop={backdropRef}              refraction  renderer={"auto"} width={320} height={100} borderRadius={24} blur={12} brightness={52} opacity={0.9} backgroundOpacity={0.22} distortionScale={-100} displace={0.3} redOffset={0} greenOffset={3} blueOffset={6} saturation={0.8} style={{ "color": "#1f2d26", "padding": 24 }} borderWidth={0.07} xChannel={"R"} yChannel={"G"} mixBlendMode={"difference"} ><strong style={{ fontSize: 24 }}>霜玻璃表面</strong></Component></div></div>
    </div>
  );
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `width` | `number \| string` | 否 | `200` | 容器或效果的宽度，CSS 字符串与数值的支持以类型为准。 |
| `height` | `number \| string` | 否 | `80` | 容器或效果的高度，CSS 字符串与数值的支持以类型为准。 |
| `borderRadius` | `number` | 否 | `20` | 边框半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `borderWidth` | `number` | 否 | `0.07` | 边框宽度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `brightness` | `number` | 否 | `50` | 亮度，控制 glass surface 的对应渲染或交互参数。 |
| `opacity` | `number` | 否 | `0.93` | 不透明度，控制 glass surface 的对应渲染或交互参数。 |
| `blur` | `number` | 否 | `11` | 模糊，控制 glass surface 的对应渲染或交互参数。 |
| `displace` | `number` | 否 | `0` | 位移，控制 glass surface 的对应渲染或交互参数。 |
| `backgroundOpacity` | `number` | 否 | `0` | 背景不透明度，控制 glass surface 的对应渲染或交互参数。 |
| `saturation` | `number` | 否 | `1` | 饱和度，控制 glass surface 的对应渲染或交互参数。 |
| `distortionScale` | `number` | 否 | `-180` | 扭曲缩放，控制 glass surface 的对应渲染或交互参数。 |
| `redOffset` | `number` | 否 | `0` | 红色通道偏移，控制 glass surface 的对应渲染或交互参数。 |
| `greenOffset` | `number` | 否 | `10` | 绿色通道偏移，控制 glass surface 的对应渲染或交互参数。 |
| `blueOffset` | `number` | 否 | `20` | 蓝色通道偏移，控制 glass surface 的对应渲染或交互参数。 |
| `xChannel` | `GlassSurfaceChannel` | 否 | `'R'` | X轴通道，控制 glass surface 的对应渲染或交互参数。 |
| `yChannel` | `GlassSurfaceChannel` | 否 | `'G'` | Y轴通道，控制 glass surface 的对应渲染或交互参数。 |
| `mixBlendMode` | `CSSProperties['mixBlendMode']` | 否 | `'difference'` | 效果图层与后方背景叠加时的 CSS 混合模式。 |
| `refraction` | `boolean` | 否 | `true` | 是否折射，决定该分支的展示或交互行为。 |
| `renderer` | `GlassSurfaceRenderer` | 否 | `'auto'` | 渲染器，控制 glass surface 的对应渲染或交互参数。 |
| `backdrop` | `RefObject<GlassSurfaceBackdrop \| null> \| GlassSurfaceBackdrop \| null` | 否 | `未指定` | 遮罩的实际 DOM 或组件句柄引用，用于定位、聚焦或命令调用。 |
| `shape` | `string` | 否 | `未指定` | 形状，控制 glass surface 的对应渲染或交互参数。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `style` | `CSSProperties` | 否 | `{}` | 容器的 React 内联样式对象，尺寸、布局与 CSS 属性按 CSSProperties 传入。 |
| `img.ref` | `Ref<HTMLImageElement> \| undefined` | 否 | `未指定` | 连接实际 DOM 元素或组件命令句柄，支持类型声明中的 ref 形式。 |
| `img.src` | `string \| undefined` | 否 | `未指定` | 加载图像、视频或纹理的资源地址。 |
| `img.alt` | `string \| undefined` | 否 | `未指定` | 图像无法显示及辅助技术读取时的替代文字。 |
| `img.style` | `CSSProperties \| undefined` | 否 | `未指定` | 容器的 React 内联样式对象，尺寸、布局与 CSS 属性按 CSSProperties 传入。 |

**继承的原生属性：**

- `DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**children 的真实接入：**

```tsx
children={<><strong style={{ fontSize: 24 }}>霜玻璃表面</strong></>}
```

**mixBlendMode 的真实接入：**

```tsx
mixBlendMode={"difference"}
```

**backdrop 的真实接入：**

```tsx
const elementRef = useRef<GlassSurfaceBackdrop | null>(null);
// JSX: backdrop={elementRef}
```

**style 的真实接入：**

```tsx
style={{ color: palette.ink, padding: 24 }}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.src` | `"@media/scene-2.svg"` | resource | "@asset/restoration/chromatic-bloom.svg" / "@asset/restoration/mineral-tide.svg" / "@asset/restoration/nocturne-orbit.svg" / "@asset/restoration/prismatic-canopy.svg" / "@asset/restoration/solar-dunes.svg" / "@asset/restoration/vermilion-fold.svg" / "@media/scene-1.svg" / "@media/scene-2.svg" / "@media/scene-3.svg" / "@media/scene-4.svg" / "@media/scene-5.svg" / "@media/scene-6.svg" | 调节结束后重建 |
| `t0.alt` | `"透过玻璃观察的自然色图形"` | text | 不限 ~ 不限 | 调节结束后重建 |
| `t0.style` | `{"width":"100%","height":"100%","objectFit":"cover"}` | json | 不限 ~ 不限 | 调节结束后重建 |
| `t1.renderer` | `"auto"` | select | "auto" / "svg" / "webgl" | 调节结束后重建 |
| `t1.width` | `320` | json | 不限 ~ 不限 | 调节结束后重建 |
| `t1.height` | `100` | json | 不限 ~ 不限 | 调节结束后重建 |
| `t1.borderRadius` | `24` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t1.blur` | `12` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t1.brightness` | `52` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t1.opacity` | `0.9` | range | 0 ~ 1 比例 | 调节结束后重建 |
| `t1.backgroundOpacity` | `0.22` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t1.distortionScale` | `-100` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t1.displace` | `0.3` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t1.redOffset` | `0` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t1.greenOffset` | `3` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t1.blueOffset` | `6` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t1.saturation` | `0.8` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t1.style` | `{"color":"#1f2d26","padding":24}` | json | 不限 ~ 不限 | 调节结束后重建 |
| `t1.borderWidth` | `0.07` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t1.xChannel` | `"R"` | select | "R" / "G" / "B" | 调节结束后重建 |
| `t1.yChannel` | `"G"` | select | "R" / "G" / "B" | 调节结束后重建 |
| `t1.mixBlendMode` | `"difference"` | select | "color" / "-moz-initial" / "inherit" / "initial" / "revert" / "revert-layer" / "unset" / "overlay" / "normal" / "saturation" / "multiply" / "color-burn" / "color-dodge" / "darken" / "difference" / "exclusion" / "hard-light" / "hue" / "lighten" / "luminosity" / "screen" / "soft-light" / "plus-darker" / "plus-lighter" | 调节结束后重建 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

本组件在当前锁定依赖组合下使用明确的类型兼容规则。移植或升级前按需读取 [上游类型兼容说明](../../UPSTREAM_TYPE_COMPATIBILITY.md) 中的对应条目；官方安装文件保持原始字节，不能把本项目的检查结果描述为原始源码未经适配即零诊断。

## 4. Agent Ric 皮肤

- 容器、状态色、边界与焦点使用 Agent Ric 规范；交互命中区不随视觉形变缩小。
- 组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。
- 保留折射、光晕或反光的可观察变化；本例允许深色画布和原版高光强度，阅读文字应保持清晰。

## 5. 加载、动效与降级

本例实际配置：本例未强制指定 renderer，沿用 auto：SVG / WebGL / CSS 由组件选择。提供 backdrop 不代表每个环境都必须先创建 WebGL 上下文。

- 依赖清单：`react`。安装前复用目标项目的兼容版本，不重复加载。
- 运行类型：本例使用 renderer="auto" 的默认路径：优先 SVG 折射，需要时尝试 WebGL，失败时保留 CSS 霜玻璃；不要用强制 WebGL 预检阻断可用的 SVG / CSS 路径。此说明不等于浏览器运行证明。
- 动效策略：局部玻璃效果；renderer auto 自行选择可用路径，不强制持续 GPU 动画。
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
