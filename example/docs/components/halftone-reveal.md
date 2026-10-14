# Halftone Reveal

滚动与转场 · `halftone-reveal` · 中文意图：网点图片 / 半调揭示

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-ric-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

图片网点在指针附近扩张并显露图像。

功能要求：装饰层不拦截业务点击、不隐藏真实指针，不成为完成业务的唯一操作方式。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/scroll/halftone-reveal.tsx](../../src/demos/scroll/halftone-reveal.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Animations/HalftoneReveal/HalftoneReveal.tsx](../../.upstream/src/ts-default/Animations/HalftoneReveal/HalftoneReveal.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Animations/HalftoneReveal/HalftoneReveal.css](../../.upstream/src/ts-default/Animations/HalftoneReveal/HalftoneReveal.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/halftone-reveal.json](../../src/parameters/definitions/halftone-reveal.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component halftone-reveal
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Halftone Reveal 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import { useState } from 'react';
import Component from '../../../.upstream/src/ts-default/Animations/HalftoneReveal/HalftoneReveal';

import styles from './halftone-reveal.module.css';

export default function HalftoneRevealDemo() {
  const [imageState, setImageState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [attempt, setAttempt] = useState(0);
  return (
    <div className={styles.stage} data-visual-demo="halftone-reveal">
      <img key={attempt} className={styles.probe} src={new URL("../../assets/restoration/prismatic-canopy.svg", import.meta.url).href}  aria-hidden="true"
        onLoad={() => setImageState('ready')} onError={() => setImageState('error')} alt={""}  />
      {imageState === 'ready' ? <Component

              src={new URL("../../assets/restoration/prismatic-canopy.svg", import.meta.url).href} fit={"cover"} mode={"mono"} shape={"dot"} cellSize={6} angle={45} inkColor={"#172a24"} accentColor={"#d47950"} paperColor={"#f6f3eb"} contrast={1.15} revealRadius={175} softness={0.6} linger={1.2} clickBurst={true} intro={true} dotScale={1} brightness={0} invert={false} roughness={0} misregistration={0} reverse={false} wander={false}  /> :
        <div className={styles.fallback} role="status" aria-live="polite">
          <p>{imageState === 'error' ? '纹理图加载失败，请重试。' : '正在加载纹理图…'}</p>
          {imageState === 'error' && <button className={styles.retry}  onClick={() => { setImageState('loading'); setAttempt(value => value + 1); }} type={"button"} >重新加载图片</button>}
        </div>}
      <p className={styles.hint}>移动指针让印刷网点展开为彩色纹理</p>
    </div>
  );
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `src` | `string` | 否 | `DEFAULT_SRC` | 加载图像、视频或纹理的资源地址。 |
| `fit` | `'contain' \| 'cover'` | 否 | `'cover'` | 适配，控制 halftone reveal 的对应渲染或交互参数。 |
| `mode` | `HalftoneRevealMode` | 否 | `'mono'` | 选择组件的渲染或交互工作模式。 |
| `shape` | `HalftoneRevealShape` | 否 | `'dot'` | 形状，控制 halftone reveal 的对应渲染或交互参数。 |
| `cellSize` | `number` | 否 | `6` | 单元尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `angle` | `number` | 否 | `45` | 角度，控制 halftone reveal 的对应渲染或交互参数。 |
| `dotScale` | `number` | 否 | `1` | 圆点缩放，控制 halftone reveal 的对应渲染或交互参数。 |
| `inkColor` | `string` | 否 | `'#120f17'` | 墨色颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `accentColor` | `string` | 否 | `'#ff4f2a'` | 强调颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `paperColor` | `string` | 否 | `'#ffffff'` | 纸张颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `contrast` | `number` | 否 | `1.1` | 对比度，控制 halftone reveal 的对应渲染或交互参数。 |
| `brightness` | `number` | 否 | `0` | 亮度，控制 halftone reveal 的对应渲染或交互参数。 |
| `invert` | `boolean` | 否 | `false` | 是否反转，决定该分支的展示或交互行为。 |
| `roughness` | `number` | 否 | `0` | 粗糙度，控制 halftone reveal 的对应渲染或交互参数。 |
| `misregistration` | `number` | 否 | `0` | 半色调印刷各颜色网点层之间的套色偏移强度。 |
| `revealRadius` | `number` | 否 | `160` | 显现半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `softness` | `number` | 否 | `0.6` | 柔和度，控制 halftone reveal 的对应渲染或交互参数。 |
| `linger` | `number` | 否 | `1.2` | 停留，控制 halftone reveal 的对应渲染或交互参数。 |
| `reverse` | `boolean` | 否 | `false` | 是否反向，决定该分支的展示或交互行为。 |
| `wander` | `boolean` | 否 | `false` | 是否游走，决定该分支的展示或交互行为。 |
| `clickBurst` | `boolean` | 否 | `true` | 是否点击爆发，决定该分支的展示或交互行为。 |
| `intro` | `boolean` | 否 | `true` | 是否入场，决定该分支的展示或交互行为。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `style` | `CSSProperties` | 否 | `未指定` | 容器的 React 内联样式对象，尺寸、布局与 CSS 属性按 CSSProperties 传入。 |
| `img.key` | `Key \| null \| undefined` | 否 | `未指定` | React 列表项身份，用于更新时保持对应节点。 |
| `img.className` | `string \| undefined` | 否 | `未指定` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `img.src` | `string \| undefined` | 否 | `未指定` | 加载图像、视频或纹理的资源地址。 |
| `img.alt` | `string \| undefined` | 否 | `未指定` | 图像无法显示及辅助技术读取时的替代文字。 |
| `img.aria-hidden` | `Booleanish \| undefined` | 否 | `未指定` | 辅助技术的 hidden 状态或说明；值须与控件当前可观察行为一致。 |
| `img.onLoad` | `ReactEventHandler<HTMLImageElement> \| undefined` | 否 | `未指定` | 加载时执行的回调；按签名接收事件或结果，调用方在函数中同步业务状态。 |
| `img.onError` | `ReactEventHandler<HTMLImageElement> \| undefined` | 否 | `未指定` | 错误时执行的回调；按签名接收事件或结果，调用方在函数中同步业务状态。 |
| `button.className` | `string \| undefined` | 否 | `未指定` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `button.type` | `"button" \| "reset" \| "submit" \| undefined` | 否 | `未指定` | 原生输入或按钮的行为类型；按钮类型会影响表单提交。 |
| `button.onClick` | `MouseEventHandler<HTMLButtonElement> \| undefined` | 否 | `未指定` | 用户点击或通过键盘激活时触发的事件处理函数。 |
| `button.children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |

**继承的原生属性：**

- `DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**style 的真实接入：**

```tsx
style={{ width: "100%", minHeight: 240 }}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.alt` | `""` | text | 不限 ~ 不限 | 调节结束后重建 |
| `t1.src` | `"@asset/restoration/prismatic-canopy.svg"` | resource | "@asset/restoration/chromatic-bloom.svg" / "@asset/restoration/mineral-tide.svg" / "@asset/restoration/nocturne-orbit.svg" / "@asset/restoration/prismatic-canopy.svg" / "@asset/restoration/solar-dunes.svg" / "@asset/restoration/vermilion-fold.svg" / "@media/scene-1.svg" / "@media/scene-2.svg" / "@media/scene-3.svg" / "@media/scene-4.svg" / "@media/scene-5.svg" / "@media/scene-6.svg" | 调节结束后重建 |
| `t1.fit` | `"cover"` | select | "contain" / "cover" | 调节结束后重建 |
| `t1.mode` | `"mono"` | select | "mono" / "duotone" / "color" | 调节结束后重建 |
| `t1.shape` | `"dot"` | select | "dot" / "ellipse" / "square" / "diamond" / "line" / "cross" | 调节结束后重建 |
| `t1.cellSize` | `6` | range | 2 ~ 40 px | 调节结束后重建 |
| `t1.angle` | `45` | range | 0 ~ 180 ° | 调节结束后重建 |
| `t1.inkColor` | `"#172a24"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t1.accentColor` | `"#d47950"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t1.paperColor` | `"#f6f3eb"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t1.contrast` | `1.15` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t1.revealRadius` | `175` | range | 40 ~ 360 px | 调节结束后重建 |
| `t1.softness` | `0.6` | range | 0 ~ 1 比例 | 调节结束后重建 |
| `t1.linger` | `1.2` | range | 0 ~ 3 s | 调节结束后重建 |
| `t1.clickBurst` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t1.intro` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t1.dotScale` | `1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t1.brightness` | `0` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t1.invert` | `false` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t1.roughness` | `0` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t1.misregistration` | `0` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t1.reverse` | `false` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t1.wander` | `false` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t2.type` | `"button"` | select | "button" / "reset" / "submit" | 调节结束后重建 |

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
- 运行类型：本例预览入口声明需 WebGL；这是当前示例的运行配置，不是仅凭源码关键词推断。此说明不等于浏览器运行证明。
- 动效策略：按需启用的持续 / 高运动效果。
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
