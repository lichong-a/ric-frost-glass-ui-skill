# Glare Hover

卡片与面板 · `glare-hover` · 中文意图：悬停扫光 / 高光掠过

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

亮斑按指针方向掠过表面。

功能要求：装饰层不拦截业务点击、不隐藏真实指针，不成为完成业务的唯一操作方式。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/cards/glare-hover.tsx](../../src/demos/cards/glare-hover.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Animations/GlareHover/GlareHover.tsx](../../.upstream/src/ts-default/Animations/GlareHover/GlareHover.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Animations/GlareHover/GlareHover.css](../../.upstream/src/ts-default/Animations/GlareHover/GlareHover.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/glare-hover.json](../../src/parameters/definitions/glare-hover.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component glare-hover
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Glare Hover 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Animations/GlareHover/GlareHover';
import { palette } from '../../shared/demo-support';

// 指针方向改变掠过图片的镜面高光。

export default function GlareHoverDemo() {

  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component


   width={"100%"} height={"320px"} background={"#faf7f0"} borderRadius={"20px"} borderColor={"#a6b39a"} mode={"hover"} variant={"streak"} glareColor={"#faf7f0"} glareOpacity={0.4} glareSize={28} softness={0.7} glareAngle={-45} blendMode={"screen"} rimGlint={true} transitionDuration={550} interval={3} playOnce={false} intro={false} style={{  }} ><img    src={import.meta.env.BASE_URL + "media/scene-3.svg"} alt={"自然色图形上的玻璃高光"} style={{ "width": "100%", "height": "100%", "objectFit": "cover" }}  /></Component>
    </div>
  );
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `width` | `string` | 否 | `'auto'` | 容器或效果的宽度，CSS 字符串与数值的支持以类型为准。 |
| `height` | `string` | 否 | `'auto'` | 容器或效果的高度，CSS 字符串与数值的支持以类型为准。 |
| `background` | `string` | 否 | `'transparent'` | 背景，控制 glare hover 的对应渲染或交互参数。 |
| `borderRadius` | `string` | 否 | `'10px'` | 边框半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `borderColor` | `string` | 否 | `'transparent'` | 边框颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `glareColor` | `string` | 否 | `'#ffffff'` | 眩光颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `glareOpacity` | `number` | 否 | `0.5` | 眩光不透明度，控制 glare hover 的对应渲染或交互参数。 |
| `glareAngle` | `number` | 否 | `-45` | 眩光角度，控制 glare hover 的对应渲染或交互参数。 |
| `glareSize` | `number` | 否 | `30` | 眩光尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `softness` | `number` | 否 | `0.6` | 柔和度，控制 glare hover 的对应渲染或交互参数。 |
| `variant` | `Variant` | 否 | `'streak'` | 选择组件内置的外观或效果变体。 |
| `blendMode` | `CSSProperties['mixBlendMode']` | 否 | `'screen'` | 混合模式的结构化配置；对象字段按完整类型传入并由组件读取。 |
| `rimGlint` | `boolean` | 否 | `true` | 是否轮缘微光，决定该分支的展示或交互行为。 |
| `mode` | `Mode` | 否 | `'hover'` | 选择组件的渲染或交互工作模式。 |
| `transitionDuration` | `number` | 否 | `650` | 过渡时长，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `interval` | `number` | 否 | `3` | 间隔，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `playOnce` | `boolean` | 否 | `false` | 是否播放仅一次，决定该分支的展示或交互行为。 |
| `intro` | `boolean` | 否 | `false` | 是否入场，决定该分支的展示或交互行为。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `style` | `CSSProperties` | 否 | `{}` | 容器的 React 内联样式对象，尺寸、布局与 CSS 属性按 CSSProperties 传入。 |
| `img.src` | `string \| undefined` | 否 | `未指定` | 加载图像、视频或纹理的资源地址。 |
| `img.alt` | `string \| undefined` | 否 | `未指定` | 图像无法显示及辅助技术读取时的替代文字。 |
| `img.style` | `CSSProperties \| undefined` | 否 | `未指定` | 容器的 React 内联样式对象，尺寸、布局与 CSS 属性按 CSSProperties 传入。 |

**继承的原生属性：**

- `DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**children 的真实接入：**

```tsx
children={<><img src={MEDIA[2]} alt="自然色图形上的玻璃高光" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></>}
```

**blendMode 的真实接入：**

```tsx
blendMode="screen"
```

**style 的真实接入：**

```tsx
style={{}}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.width` | `"100%"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.height` | `"320px"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.background` | `"#faf7f0"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.borderRadius` | `"20px"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.borderColor` | `"#a6b39a"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.mode` | `"hover"` | select | "hover" / "follow" / "loop" / "click" | 即时应用 |
| `t0.variant` | `"streak"` | select | "streak" / "twin" / "sheen" | 即时应用 |
| `t0.glareColor` | `"#faf7f0"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.glareOpacity` | `0.4` | number | 不限 ~ 不限 | 即时应用 |
| `t0.glareSize` | `28` | number | 不限 ~ 不限 | 即时应用 |
| `t0.softness` | `0.7` | number | 不限 ~ 不限 | 即时应用 |
| `t0.glareAngle` | `-45` | number | 不限 ~ 不限 | 即时应用 |
| `t0.blendMode` | `"screen"` | select | "color" / "-moz-initial" / "inherit" / "initial" / "revert" / "revert-layer" / "unset" / "overlay" / "normal" / "saturation" / "multiply" / "color-burn" / "color-dodge" / "darken" / "difference" / "exclusion" / "hard-light" / "hue" / "lighten" / "luminosity" / "screen" / "soft-light" / "plus-darker" / "plus-lighter" | 即时应用 |
| `t0.rimGlint` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.transitionDuration` | `550` | number | 不限 ~ 不限 | 即时应用 |
| `t0.interval` | `3` | number | 不限 ~ 不限 | 即时应用 |
| `t0.playOnce` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.intro` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.style` | `{}` | json | 不限 ~ 不限 | 即时应用 |
| `t1.src` | `"@media/scene-3.svg"` | resource | "@asset/restoration/chromatic-bloom.svg" / "@asset/restoration/mineral-tide.svg" / "@asset/restoration/nocturne-orbit.svg" / "@asset/restoration/prismatic-canopy.svg" / "@asset/restoration/solar-dunes.svg" / "@asset/restoration/vermilion-fold.svg" / "@media/scene-1.svg" / "@media/scene-2.svg" / "@media/scene-3.svg" / "@media/scene-4.svg" / "@media/scene-5.svg" / "@media/scene-6.svg" | 即时应用 |
| `t1.alt` | `"自然色图形上的玻璃高光"` | text | 不限 ~ 不限 | 即时应用 |
| `t1.style` | `{"width":"100%","height":"100%","objectFit":"cover"}` | json | 不限 ~ 不限 | 即时应用 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Wan 皮肤

- 容器、状态色、边界与焦点使用 Agent Wan 规范；交互命中区不随视觉形变缩小。
- 组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。
- 保留折射、光晕或反光的可观察变化；本例允许深色画布和原版高光强度，阅读文字应保持清晰。

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
