# Gradual Blur

滚动与转场 · `gradual-blur` · 中文意图：渐进模糊 / 逐层清晰

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

内容根据滚动或触发条件逐渐解除模糊。

功能要求：装饰层不拦截业务点击、不隐藏真实指针，不成为完成业务的唯一操作方式。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/scroll/gradual-blur.tsx](../../src/demos/scroll/gradual-blur.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Animations/GradualBlur/GradualBlur.tsx](../../.upstream/src/ts-default/Animations/GradualBlur/GradualBlur.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Animations/GradualBlur/GradualBlur.css](../../.upstream/src/ts-default/Animations/GradualBlur/GradualBlur.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/gradual-blur.json](../../src/parameters/definitions/gradual-blur.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component gradual-blur
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Gradual Blur 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import Component from '../../../.upstream/src/ts-default/Animations/GradualBlur/GradualBlur';


import styles from './gradual-blur.module.css';

export default function GradualBlurDemo() {
  return (
    <section className={styles.stage} data-visual-demo="gradual-blur" aria-label="带底部渐进模糊的滚动内容">
      <div className={styles.scroll} tabIndex={0} aria-label="滚动阅读色彩札记">
        <span className={styles.eyebrow}>FIELD NOTES / 01</span>
        <h2 className={styles.title}>光与色彩之间</h2>
        <p className={styles.lead}>向下滚动，图像与文字逐层经过柔和的模糊边界。</p>
        <img className={styles.image}   src={new URL("../../assets/restoration/nocturne-orbit.svg", import.meta.url).href} alt={"蓝紫色球体与亮黄色轨道构成的原创纹理图"}  />
        <h3 className={styles.subtitle}>清晰，逐渐融入远处</h3>
        <p className={styles.copy}>清晰的阅读区留在上方，底部用多层模糊营造深度。移动内容时，细节缓慢消散，边界仍然柔和。</p>
        <p className={styles.copy}>光、纹理和留白共同决定一幅画的节奏。把注意力放在当前的内容上，继续滚动发现下一处颜色。</p>
        <img className={styles.image}   src={new URL("../../assets/restoration/mineral-tide.svg", import.meta.url).href} alt={"蓝、紫、粉红和青色组成的原创矿物潮汐纹理图"}  />
        <h3 className={styles.subtitle}>流动的色彩</h3>
        <p className={styles.copy}>另一幅图像经过相同边界，在滚动中观察纹理如何从锐利过渡到模糊，再回到清晰的阅读区域。</p>
        <p className={styles.copy}>这段内容可以继续阅读。每一层模糊只覆盖下边缘，始终保留足够的清晰区域。</p>
      </div>
      <Component
             target={"parent"} position={"bottom"} height={"8rem"} strength={2} divCount={8} curve={"bezier"} exponential={true} opacity={1} zIndex={2} animated={false} duration={"0.3s"} easing={"ease-out"} responsive={false} style={{  }}  />
    </section>
  );
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | 否 | `'bottom'` | 位置，控制 gradual blur 的对应渲染或交互参数。 |
| `strength` | `number` | 否 | `2` | 强度，控制 gradual blur 的对应渲染或交互参数。 |
| `height` | `string` | 否 | `'6rem'` | 容器或效果的高度，CSS 字符串与数值的支持以类型为准。 |
| `width` | `string` | 否 | `未指定` | 容器或效果的宽度，CSS 字符串与数值的支持以类型为准。 |
| `divCount` | `number` | 否 | `5` | 模糊分层数量，控制 gradual blur 的对应渲染或交互参数。 |
| `exponential` | `boolean` | 否 | `false` | 是否指数分布，决定该分支的展示或交互行为。 |
| `zIndex` | `number` | 否 | `1000` | Z轴索引，控制 gradual blur 的对应渲染或交互参数。 |
| `animated` | `boolean \| 'scroll'` | 否 | `false` | 播放动画，控制 gradual blur 的对应渲染或交互参数。 |
| `duration` | `string` | 否 | `'0.3s'` | 一次动画或过渡的持续时长，时间单位以组件实现和示例为准。 |
| `easing` | `string` | 否 | `'ease-out'` | 动画进度的缓动曲线名称或函数，按类型传入。 |
| `opacity` | `number` | 否 | `1` | 不透明度，控制 gradual blur 的对应渲染或交互参数。 |
| `curve` | `'linear' \| 'bezier' \| 'ease-in' \| 'ease-out' \| 'ease-in-out'` | 否 | `'linear'` | 曲线，控制 gradual blur 的对应渲染或交互参数。 |
| `responsive` | `boolean` | 否 | `false` | 是否响应式，决定该分支的展示或交互行为。 |
| `mobileHeight` | `string` | 否 | `未指定` | 移动端高度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `tabletHeight` | `string` | 否 | `未指定` | 平板高度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `desktopHeight` | `string` | 否 | `未指定` | 桌面端高度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `mobileWidth` | `string` | 否 | `未指定` | 移动端宽度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `tabletWidth` | `string` | 否 | `未指定` | 平板宽度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `desktopWidth` | `string` | 否 | `未指定` | 桌面端宽度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `preset` | `\| 'top' \| 'bottom' \| 'left' \| 'right' \| 'subtle' \| 'intense' \| 'smooth' \| 'sharp' \| 'header' \| 'footer' \| 'sidebar' \| 'page-header' \| 'page-footer'` | 否 | `未指定` | 预设，控制 gradual blur 的对应渲染或交互参数。 |
| `gpuOptimized` | `boolean` | 否 | `未指定` | 是否图形加速优化策略，决定该分支的展示或交互行为。 |
| `hoverIntensity` | `number` | 否 | `未指定` | 悬停强度，控制 gradual blur 的对应渲染或交互参数。 |
| `target` | `'parent' \| 'page'` | 否 | `'parent'` | 效果作用范围或 Portal 挂载目标，按类型传入父级/页面/DOM。 |
| `onAnimationComplete` | `() => void` | 否 | `未指定` | 动画全部结束时调用，供调用方更新后续界面状态。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `style` | `CSSProperties` | 否 | `{}` | 容器的 React 内联样式对象，尺寸、布局与 CSS 属性按 CSSProperties 传入。 |
| `children` | `React.ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `img · t0.className` | `string \| undefined` | 否 | `未指定` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `img · t0.src` | `string \| undefined` | 否 | `未指定` | 加载图像、视频或纹理的资源地址。 |
| `img · t0.alt` | `string \| undefined` | 否 | `未指定` | 图像无法显示及辅助技术读取时的替代文字。 |

**继承的原生属性：**

- `PropsWithChildren<GradualBlurProps>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**onAnimationComplete 的真实接入：**

```tsx
onAnimationComplete={() => {}}
```

**style 的真实接入：**

```tsx
style={{}}
```

**children 的真实接入：**

```tsx
children={"示例"}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.src` | `"@asset/restoration/nocturne-orbit.svg"` | resource | "@asset/restoration/chromatic-bloom.svg" / "@asset/restoration/mineral-tide.svg" / "@asset/restoration/nocturne-orbit.svg" / "@asset/restoration/prismatic-canopy.svg" / "@asset/restoration/solar-dunes.svg" / "@asset/restoration/vermilion-fold.svg" / "@media/scene-1.svg" / "@media/scene-2.svg" / "@media/scene-3.svg" / "@media/scene-4.svg" / "@media/scene-5.svg" / "@media/scene-6.svg" | 即时应用 |
| `t0.alt` | `"蓝紫色球体与亮黄色轨道构成的原创纹理图"` | text | 不限 ~ 不限 | 即时应用 |
| `t1.src` | `"@asset/restoration/mineral-tide.svg"` | resource | "@asset/restoration/chromatic-bloom.svg" / "@asset/restoration/mineral-tide.svg" / "@asset/restoration/nocturne-orbit.svg" / "@asset/restoration/prismatic-canopy.svg" / "@asset/restoration/solar-dunes.svg" / "@asset/restoration/vermilion-fold.svg" / "@media/scene-1.svg" / "@media/scene-2.svg" / "@media/scene-3.svg" / "@media/scene-4.svg" / "@media/scene-5.svg" / "@media/scene-6.svg" | 即时应用 |
| `t1.alt` | `"蓝、紫、粉红和青色组成的原创矿物潮汐纹理图"` | text | 不限 ~ 不限 | 即时应用 |
| `t2.target` | `"parent"` | select | "parent" / "page" | 即时应用 |
| `t2.position` | `"bottom"` | select | "top" / "bottom" / "left" / "right" | 即时应用 |
| `t2.height` | `"8rem"` | text | 不限 ~ 不限 | 即时应用 |
| `t2.strength` | `2` | number | 不限 ~ 不限 | 即时应用 |
| `t2.divCount` | `8` | range | 1 ~ 12 层 | 即时应用 |
| `t2.curve` | `"bezier"` | select | "linear" / "bezier" / "ease-in" / "ease-out" / "ease-in-out" | 即时应用 |
| `t2.exponential` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t2.opacity` | `1` | range | 0 ~ 1 比例 | 即时应用 |
| `t2.zIndex` | `2` | number | 不限 ~ 不限 | 即时应用 |
| `t2.animated` | `false` | json | 不限 ~ 不限 | 即时应用 |
| `t2.duration` | `"0.3s"` | text | 不限 ~ 不限 | 即时应用 |
| `t2.easing` | `"ease-out"` | text | 不限 ~ 不限 | 即时应用 |
| `t2.responsive` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t2.style` | `{}` | json | 不限 ~ 不限 | 即时应用 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Wan 皮肤

- 容器、状态色、边界与焦点使用 Agent Wan 规范；交互命中区不随视觉形变缩小。
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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [滚动与转场](../effects/categories/scroll.md)；否则直接完成当前组件。
