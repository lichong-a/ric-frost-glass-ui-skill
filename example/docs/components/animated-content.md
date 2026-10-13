# Animated Content

滚动与转场 · `animated-content` · 中文意图：内容入场 / 滚动入场 / 容器入场

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

内容在挂载或进入视口时按方向入场。

功能要求：装饰层不拦截业务点击、不隐藏真实指针，不成为完成业务的唯一操作方式。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/scroll/animated-content.tsx](../../src/demos/scroll/animated-content.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Animations/AnimatedContent/AnimatedContent.tsx](../../.upstream/src/ts-default/Animations/AnimatedContent/AnimatedContent.tsx) |
| 单独 Props 记录 | [example/src/parameters/definitions/animated-content.json](../../src/parameters/definitions/animated-content.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component animated-content
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Animated Content 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Animations/AnimatedContent/AnimatedContent';
import { DemoPanel, palette } from '../../shared/demo-support';
import { useState } from "react";
// 完整内容块执行真实入场动画，重播可再次查看。
// 数字明确标记为示例数据，查看工作流按钮切换本地说明并通过aria-live播报。

export default function AnimatedContentDemo() {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 300, display: 'grid', placeItems: 'center', color: palette.ink, fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 650, padding: 24 }}>
      <Component
     distance={36} direction={"vertical"} duration={0.6} ease={"power3.out"} initialOpacity={0} animateOpacity={true} scale={0.98} threshold={0.1} delay={0.1} reverse={false} disappearAfter={0} disappearDuration={0.5} disappearEase={"power3.in"} ><DemoPanel title="技能执行示例" style={{ width: 'min(100%, 400px)', fontSize: 16, fontWeight: 400 }}><p>示例数据：12 个工具，3 个 Agent。</p><button  className="aw-button" data-variant="primary" aria-expanded={showDetails} aria-controls="animated-content-details" onClick={() => setShowDetails(value => !value)} type={"button"} >{showDetails ? '收起工作流' : '查看工作流'}</button><div id="animated-content-details" role="status" aria-live="polite">{showDetails ? <p>此示例展示：输入任务 → 选择技能 → 生成结果。</p> : null}</div></DemoPanel></Component>
    </div>
  );
}

```

### 完整组件 API

| 参数 | 类型 | 必填 | 上游默认值 | 中文说明 |
|---|---|---|---|---|
| `children` | `React.ReactNode` | 是 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `container` | `Element \| string \| null` | 否 | `document.getElementById('snap-main-container')` | 容器，控制 animated content 的对应渲染或交互参数。 |
| `distance` | `number` | 否 | `100` | 距离，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `direction` | `'vertical' \| 'horizontal'` | 否 | `'vertical'` | 方向，控制 animated content 的对应渲染或交互参数。 |
| `reverse` | `boolean` | 否 | `false` | 是否反向，决定该分支的展示或交互行为。 |
| `duration` | `number` | 否 | `0.8` | 一次动画或过渡的持续时长，时间单位以组件实现和示例为准。 |
| `ease` | `string` | 否 | `'power3.out'` | 动画缓动名称或配置，按所用动画库的类型传入。 |
| `initialOpacity` | `number` | 否 | `0` | 初始不透明度，控制 animated content 的对应渲染或交互参数。 |
| `animateOpacity` | `boolean` | 否 | `true` | 是否动画不透明度，决定该分支的展示或交互行为。 |
| `scale` | `number` | 否 | `1` | 缩放，控制 animated content 的对应渲染或交互参数。 |
| `threshold` | `number` | 否 | `0.1` | 阈值，控制 animated content 的对应渲染或交互参数。 |
| `delay` | `number` | 否 | `0` | 开始动画或执行回调之前的等待时长。 |
| `disappearAfter` | `number` | 否 | `0` | 消失之后，控制 animated content 的对应渲染或交互参数。 |
| `disappearDuration` | `number` | 否 | `0.5` | 消失时长，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `disappearEase` | `string` | 否 | `'power3.in'` | 消失缓动，控制 animated content 的对应渲染或交互参数。 |
| `onComplete` | `() => void` | 否 | `未指定` | 动作、输入或动画达到完成状态时通知调用方。 |
| `onDisappearanceComplete` | `() => void` | 否 | `未指定` | 退出或消失动画完成时通知调用方。 |
| `className` | `string \| undefined` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `style` | `React.CSSProperties \| undefined` | 否 | `未指定` | 容器的 React 内联样式对象，尺寸、布局与 CSS 属性按 CSSProperties 传入。 |
| `button.type` | `"button" \| "reset" \| "submit" \| undefined` | 否 | `未指定` | 原生输入或按钮的行为类型；按钮类型会影响表单提交。 |
| `button.className` | `string \| undefined` | 否 | `未指定` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `button.data-variant` | `any` | 否 | `未指定` | 示例在 DOM 上使用的 variant 数据标记，供局部样式或状态定位读取。 |
| `button.aria-expanded` | `Booleanish \| undefined` | 否 | `未指定` | 辅助技术的 expanded 状态或说明；值须与控件当前可观察行为一致。 |
| `button.aria-controls` | `string \| undefined` | 否 | `未指定` | 辅助技术的 controls 状态或说明；值须与控件当前可观察行为一致。 |
| `button.onClick` | `MouseEventHandler<HTMLButtonElement> \| undefined` | 否 | `未指定` | 用户点击或通过键盘激活时触发的事件处理函数。 |
| `button.children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |

**继承的原生属性：**

- `React.HTMLAttributes<HTMLDivElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**children 的真实接入：**

```tsx
children={<><DemoPanel title="技能执行示例" style={{ width: 'min(100%, 400px)', fontSize: 16, fontWeight: 400 }}><p>示例数据：12 个工具，3 个 Agent。</p><button type="button" className="aw-button" data-variant="primary" aria-expanded={showDetails} aria-controls="animated-content-details" onClick={() => setShowDetails(value => !value)}>{showDetails ? '收起工作流' : '查看工作流'}</button><div id="animated-content-details" role="status" aria-live="polite">{showDetails ? <p>此示例展示：输入任务 → 选择技能 → 生成结果。</p> : null}</div></DemoPanel></>}
```

**onComplete 的真实接入：**

```tsx
onComplete={() => {}}
```

**onDisappearanceComplete 的真实接入：**

```tsx
onDisappearanceComplete={() => {}}
```

**style 的真实接入：**

```tsx
style={{ width: "100%", minHeight: 240 }}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，不改写上游 API。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.distance` | `36` | number | 不限 ~ 不限 | 即时应用 |
| `t0.direction` | `"vertical"` | select | "vertical" / "horizontal" | 即时应用 |
| `t0.duration` | `0.6` | number | 不限 ~ 不限 | 即时应用 |
| `t0.ease` | `"power3.out"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.initialOpacity` | `0` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.animateOpacity` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.scale` | `0.98` | number | 不限 ~ 不限 | 即时应用 |
| `t0.threshold` | `0.1` | number | 不限 ~ 不限 | 即时应用 |
| `t0.delay` | `0.1` | number | 不限 ~ 不限 | 即时应用 |
| `t0.reverse` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.disappearAfter` | `0` | number | 不限 ~ 不限 | 即时应用 |
| `t0.disappearDuration` | `0.5` | number | 不限 ~ 不限 | 即时应用 |
| `t0.disappearEase` | `"power3.in"` | text | 不限 ~ 不限 | 即时应用 |
| `t1.type` | `"button"` | select | "button" / "reset" / "submit" | 即时应用 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Wan 皮肤

- 容器、状态色、边界与焦点使用 Agent Wan 规范；交互命中区不随视觉形变缩小。
- 组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。

## 5. 加载、动效与降级

本例实际配置：设备访问与音频行为以本例真实 Props 和显式回调为准。capabilities 是源码扫描提示，不能据此声称已请求相机、录音或播放音频。

- 依赖清单：`gsap`、`react`。安装前复用目标项目的兼容版本，不重复加载。
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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [滚动与转场](../categories/scroll.md)；否则直接完成当前组件。
