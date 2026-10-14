# Stepper

布局与流程 · `stepper` · 中文意图：步骤器 / 多步流程 / 步骤导航

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-ric-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

步骤状态与内容切换保持同步并可回退。

功能要求：由真实 value / state 与回调驱动；操作可用键盘完成，不能只在动画内部保存业务状态。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/layout/stepper.tsx](../../src/demos/layout/stepper.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Components/Stepper/Stepper.tsx](../../.upstream/src/ts-default/Components/Stepper/Stepper.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Components/Stepper/Stepper.css](../../.upstream/src/ts-default/Components/Stepper/Stepper.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/stepper.json](../../src/parameters/definitions/stepper.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component stepper
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Stepper 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
// Authored integration demo; implementation is installed from the pinned official source.
import Component, { Step } from '../../../.upstream/src/ts-default/Components/Stepper/Stepper';
import { palette } from '../../shared/demo-support';
import { useState } from "react";
// 使用真实Step具名子组件，输入、下一步、返回与完成状态均可操作。

export default function StepperDemo() {
  const [status, setStatus] = useState("当前步骤：1");
const [name, setName] = useState("资料整理");
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 440, position: 'relative', overflow: 'auto' }}>
      <div style={{ width: '100%', height: '100%' }}><div style={{ minHeight: 350, width: 'min(100%, 560px)', margin: '0 auto', padding: 18 }}><Component


onStepChange={step => setStatus('当前步骤：' + step)}
onFinalStepCompleted={() => setStatus('已完成示例配置')}
completedContent={<div style={{ padding: 24 }}><h3>准备完成</h3><p>这是示例流程，没有写入后台数据。</p></div>} initialStep={1} backButtonText={"上一步"} nextButtonText={"继续"} completeButtonText={"完成"} theme={"light"} accentColor={"#52604e"} frame={true} radius={20} width={"100%"} transition={"slide"} linear={true} indicator={"numbers"} orientation={"horizontal"} disableStepIndicators={false} showFooter={true} backButtonProps={{  }} nextButtonProps={{  }} stepCircleContainerClassName={""} stepContainerClassName={""} contentClassName={""} footerClassName={""} ><Step title="选择目标" description="定义任务"><h3>创建工作流</h3><p>本示例将演示三步配置与完成状态。</p></Step><Step title="填写名称" description="方便识别"><label>工作流名称<input className="aw-input" value={name} onChange={event => setName(event.target.value)}  placeholder={"例如：资料整理"}  /></label></Step><Step title="确认" description="检查内容"><h3>{name || '未命名工作流'}</h3><p>点击完成结束本地演示。</p></Step></Component></div><p role="status" aria-live="polite" style={{ margin: '12px 20px', fontSize: 14, color: palette.muted }}>{status}</p></div>
    </div>
  );
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `step` | `number` | 否 | `未指定` | 每次调整的步进间隔或当前步骤，具体含义取决于组件。 |
| `initialStep` | `number` | 否 | `1` | 初始步进，控制 stepper 的对应渲染或交互参数。 |
| `onStepChange` | `(step: number) => void` | 否 | `() => {}` | 当前步骤改变时通知调用方，参数为新的步骤编号。 |
| `onFinalStepCompleted` | `() => void` | 否 | `() => {}` | 最后一步确认完成时通知调用方。 |
| `indicator` | `'numbers' \| 'dots' \| 'bars'` | 否 | `'numbers'` | 指示器，控制 stepper 的对应渲染或交互参数。 |
| `orientation` | `'horizontal' \| 'vertical'` | 否 | `'horizontal'` | 方向，控制 stepper 的对应渲染或交互参数。 |
| `transition` | `'slide' \| 'fade' \| 'none'` | 否 | `'slide'` | 动画的过渡配置对象，如 spring 的 stiffness、damping 或 duration。 |
| `linear` | `boolean` | 否 | `false` | 是否线性，决定该分支的展示或交互行为。 |
| `disableStepIndicators` | `boolean` | 否 | `false` | 是否禁用步进指示器，决定该分支的展示或交互行为。 |
| `renderStepIndicator` | `(props: StepIndicatorProps) => ReactNode` | 否 | `未指定` | 自定义步骤指示器的渲染函数，接收当前步骤、状态与点击接口。 |
| `showFooter` | `boolean` | 否 | `true` | 是否显示底部栏，决定该分支的展示或交互行为。 |
| `backButtonText` | `string` | 否 | `'Back'` | 背面按钮文字，控制 stepper 的对应渲染或交互参数。 |
| `nextButtonText` | `string` | 否 | `'Continue'` | 下一步按钮文字，控制 stepper 的对应渲染或交互参数。 |
| `completeButtonText` | `string` | 否 | `'Complete'` | 完成按钮文字，控制 stepper 的对应渲染或交互参数。 |
| `backButtonProps` | `ButtonHTMLAttributes<HTMLButtonElement>` | 否 | `{}` | 背面按钮属性配置的结构化配置；对象字段按完整类型传入并由组件读取。 |
| `nextButtonProps` | `ButtonHTMLAttributes<HTMLButtonElement>` | 否 | `{}` | 下一步按钮属性配置的结构化配置；对象字段按完整类型传入并由组件读取。 |
| `completedContent` | `ReactNode` | 否 | `null` | 完成后内容，控制 stepper 的对应渲染或交互参数。 |
| `theme` | `'dark' \| 'light'` | 否 | `'dark'` | 主题，控制 stepper 的对应渲染或交互参数。 |
| `accentColor` | `string` | 否 | `未指定` | 强调颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `frame` | `boolean` | 否 | `true` | 是否外框，决定该分支的展示或交互行为。 |
| `radius` | `number` | 否 | `24` | 半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `width` | `number \| string` | 否 | `440` | 容器或效果的宽度，CSS 字符串与数值的支持以类型为准。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `stepCircleContainerClassName` | `string` | 否 | `''` | 步进圆形容器类名名称，控制 stepper 的对应渲染或交互参数。 |
| `stepContainerClassName` | `string` | 否 | `''` | 步进容器类名名称，控制 stepper 的对应渲染或交互参数。 |
| `contentClassName` | `string` | 否 | `''` | 内容类名名称，控制 stepper 的对应渲染或交互参数。 |
| `footerClassName` | `string` | 否 | `''` | 底部栏类名名称，控制 stepper 的对应渲染或交互参数。 |
| `style` | `CSSProperties` | 否 | `未指定` | 容器的 React 内联样式对象，尺寸、布局与 CSS 属性按 CSSProperties 传入。 |
| `Step · t1.children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `Step · t1.title` | `ReactNode` | 否 | `未指定` | 组件标题或原生元素提示文字。 |
| `Step · t1.description` | `ReactNode` | 否 | `未指定` | 补充组件用途或当前展示内容的说明。 |
| `Step · t1.icon` | `ReactNode` | 否 | `未指定` | 图标，控制 stepper 的对应渲染或交互参数。 |
| `input.className` | `string \| undefined` | 否 | `未指定` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `input.value` | `string \| number \| readonly string[] \| undefined` | 否 | `未指定` | 当前受控值，由调用方维护并随交互回调更新。 |
| `input.onChange` | `ChangeEventHandler<HTMLInputElement> \| undefined` | 否 | `未指定` | 用户改变值或条目顺序时通知调用方；回调参数类型就是应写回的值或原生事件。 |
| `input.placeholder` | `string \| undefined` | 否 | `未指定` | 尚未填写或选择时显示的提示文字。 |

**继承的原生属性：**

- `Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'className' | 'style'>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**children 的真实接入：**

```tsx
children={<><Step title="选择目标" description="定义任务"><h3>创建工作流</h3><p>本示例将演示三步配置与完成状态。</p></Step><Step title="填写名称" description="方便识别"><label>工作流名称<input className="aw-input" value={name} onChange={event => setName(event.target.value)} placeholder="例如：资料整理" /></label></Step><Step title="确认" description="检查内容"><h3>{name || '未命名工作流'}</h3><p>点击完成结束本地演示。</p></Step></>}
```

**onStepChange 的真实接入：**

```tsx
onStepChange={step => setStatus('当前步骤：' + step)}
```

**onFinalStepCompleted 的真实接入：**

```tsx
onFinalStepCompleted={() => setStatus('已完成示例配置')}
```

**renderStepIndicator 的真实接入：**

```tsx
renderStepIndicator={(props) => ("示例")}
```

**completedContent 的真实接入：**

```tsx
completedContent={<div style={{ padding: 24 }}><h3>准备完成</h3><p>这是示例流程，没有写入后台数据。</p></div>}
```

**style 的真实接入：**

```tsx
style={{ width: "100%", minHeight: 240 }}
```

**children 的真实接入：**

```tsx
children={<><h3>创建工作流</h3><p>本示例将演示三步配置与完成状态。</p></>}
```

**title 的真实接入：**

```tsx
title="选择目标"
```

**description 的真实接入：**

```tsx
description="定义任务"
```

**icon 的真实接入：**

```tsx
icon={"示例"}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.initialStep` | `1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.backButtonText` | `"上一步"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.nextButtonText` | `"继续"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.completeButtonText` | `"完成"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.theme` | `"light"` | select | "dark" / "light" | 即时应用 |
| `t0.accentColor` | `"#52604e"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.frame` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.radius` | `20` | number | 不限 ~ 不限 | 即时应用 |
| `t0.width` | `"100%"` | json | 不限 ~ 不限 | 即时应用 |
| `t0.transition` | `"slide"` | select | "slide" / "fade" / "none" | 即时应用 |
| `t0.linear` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.indicator` | `"numbers"` | select | "numbers" / "dots" / "bars" | 即时应用 |
| `t0.orientation` | `"horizontal"` | select | "horizontal" / "vertical" | 即时应用 |
| `t0.disableStepIndicators` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.showFooter` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.backButtonProps` | `{}` | json | 不限 ~ 不限 | 即时应用 |
| `t0.nextButtonProps` | `{}` | json | 不限 ~ 不限 | 即时应用 |
| `t0.stepCircleContainerClassName` | `""` | text | 不限 ~ 不限 | 即时应用 |
| `t0.stepContainerClassName` | `""` | text | 不限 ~ 不限 | 即时应用 |
| `t0.contentClassName` | `""` | text | 不限 ~ 不限 | 即时应用 |
| `t0.footerClassName` | `""` | text | 不限 ~ 不限 | 即时应用 |
| `t3.placeholder` | `"例如：资料整理"` | text | 不限 ~ 不限 | 即时应用 |
| `state.name` | `"资料整理"` | text | 不限 ~ 不限 | 即时应用；原组件回调同步受控值 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Ric 皮肤

- 容器、状态色、边界与焦点使用 Agent Ric 规范；交互命中区不随视觉形变缩小。
- 组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。

## 5. 加载、动效与降级

本例实际配置：设备访问与音频行为以本例真实 Props 和显式回调为准。capabilities 是源码扫描提示，不能据此声称已请求相机、录音或播放音频。

- 依赖清单：`@hugeicons/core-free-icons`、`@hugeicons/react`、`react`。安装前复用目标项目的兼容版本，不重复加载。
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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [布局与流程](../effects/categories/layout.md)；否则直接完成当前组件。
