# Swipe Toast

状态与反馈 · `swipe-toast` · 中文意图：滑动通知 / 可拖拽提示

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

通知支持滑动关闭并显示剩余时间。

功能要求：保持内容的语义和可访问名称；只有真实可交互元素可进入焦点顺序。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/feedback/swipe-toast.tsx](../../src/demos/feedback/swipe-toast.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Micro/SwipeToast/SwipeToast.tsx](../../.upstream/src/ts-default/Micro/SwipeToast/SwipeToast.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Micro/SwipeToast/SwipeToast.css](../../.upstream/src/ts-default/Micro/SwipeToast/SwipeToast.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/swipe-toast.json](../../src/parameters/definitions/swipe-toast.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component swipe-toast
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Swipe Toast 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import { useState } from 'react';
import SwipeToast from '../../../.upstream/src/ts-default/Micro/SwipeToast/SwipeToast';
import { DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
const cn=(names:string)=>componentClasses(styles,names);

export default function SwipeToastDemo() {
  const [open, setOpen] = useState(true);
  const [revision, setRevision] = useState(0);
  const [message, setMessage] = useState('通知已显示，可滑动、关闭或撤销。');
  return <DemoPanel title="Swipe Toast · 可滑动通知"><div className={cn("aw-micro-stack")}>
    <div style={{ minHeight: 150, display: 'flex', alignItems: 'center', maxWidth: '100%' }}><SwipeToast key={revision} title="演示配置已保存" description="这是本地模拟通知。" actionLabel="撤销" open={open} onClose={reason => { setOpen(false); setMessage(`通知已关闭：${reason}`); }} onAction={() => { setMessage('已撤销本地演示操作。'); setOpen(false); }}         background={"rgb(250 247 240 / 0.82)"} color={"#1f2d26"} fuseColor={"#52604e"} width={320} radius={16} duration={7000} closeButton={true} inline={true} slideMs={400} settleBounce={0.2} swipeDistance={40} fuse={"bottom"} pauseOnHover={true} dismissible={true}  /></div>
    <div className={cn("aw-micro-controls")}><button className={styles['aw-micro-action']}  onClick={() => { setRevision(value => value + 1); setOpen(true); setMessage('通知已重新显示。'); }} type={"button"} >显示通知</button></div>
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">{message}</p>
  </div></DemoPanel>;
}

```

### 完整组件 API

| 参数 | 类型 | 必填 | 上游默认值 | 中文说明 |
|---|---|---|---|---|
| `title` | `ReactNode` | 否 | `'File archived'` | 组件标题或原生元素提示文字。 |
| `description` | `ReactNode` | 否 | `''` | 补充组件用途或当前展示内容的说明。 |
| `icon` | `ReactNode` | 否 | `未指定` | 图标，控制 swipe toast 的对应渲染或交互参数。 |
| `actionLabel` | `ReactNode` | 否 | `''` | 操作标签，控制 swipe toast 的对应渲染或交互参数。 |
| `onAction` | `() => void` | 否 | `未指定` | 用户激活操作项时通知调用方，按签名接收该动作的身份或数据。 |
| `open` | `boolean` | 否 | `true` | 是否展开或显示内容，由调用方控制。 |
| `onClose` | `(reason: SwipeToastCloseReason) => void` | 否 | `未指定` | 请求关闭弹层、对话框或提示时调用，调用方同步更新 open 状态。 |
| `background` | `string` | 否 | `'#27272a'` | 背景，控制 swipe toast 的对应渲染或交互参数。 |
| `color` | `string` | 否 | `'#f5f5f5'` | 颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `fuseColor` | `string` | 否 | `'#f5a524'` | 导火线颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `width` | `number` | 否 | `356` | 容器或效果的宽度，CSS 字符串与数值的支持以类型为准。 |
| `radius` | `number` | 否 | `12` | 半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `slideMs` | `number` | 否 | `400` | 滑动毫秒，控制 swipe toast 的对应渲染或交互参数。 |
| `settleBounce` | `number` | 否 | `0.2` | 稳定回弹，控制 swipe toast 的对应渲染或交互参数。 |
| `swipeDistance` | `number` | 否 | `40` | 滑动距离，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `duration` | `number` | 否 | `4000` | 一次动画或过渡的持续时长，时间单位以组件实现和示例为准。 |
| `fuse` | `SwipeToastFuse` | 否 | `'bottom'` | 导火线，控制 swipe toast 的对应渲染或交互参数。 |
| `pauseOnHover` | `boolean` | 否 | `true` | 是否暂停悬停，决定该分支的展示或交互行为。 |
| `closeButton` | `boolean` | 否 | `false` | 是否关闭按钮，决定该分支的展示或交互行为。 |
| `inline` | `boolean` | 否 | `false` | 是否行内，决定该分支的展示或交互行为。 |
| `dismissible` | `boolean` | 否 | `true` | 是否可关闭，决定该分支的展示或交互行为。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `button.className` | `string \| undefined` | 否 | `未指定` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `button.type` | `"button" \| "reset" \| "submit" \| undefined` | 否 | `未指定` | 原生输入或按钮的行为类型；按钮类型会影响表单提交。 |
| `button.onClick` | `MouseEventHandler<HTMLButtonElement> \| undefined` | 否 | `未指定` | 用户点击或通过键盘激活时触发的事件处理函数。 |
| `button.children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |

**继承的原生属性：**

- `DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**title 的真实接入：**

```tsx
title="演示配置已保存"
```

**description 的真实接入：**

```tsx
description="这是本地模拟通知。"
```

**icon 的真实接入：**

```tsx
icon={"示例"}
```

**actionLabel 的真实接入：**

```tsx
actionLabel="撤销"
```

**onAction 的真实接入：**

```tsx
onAction={() => { setMessage('已撤销本地演示操作。'); setOpen(false); }}
```

**onClose 的真实接入：**

```tsx
onClose={reason => { setOpen(false); setMessage(`通知已关闭：${reason}`); }}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，不改写上游 API。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.background` | `"rgb(250 247 240 / 0.82)"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.color` | `"#1f2d26"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.fuseColor` | `"#52604e"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.width` | `320` | number | 不限 ~ 不限 | 即时应用 |
| `t0.radius` | `16` | number | 不限 ~ 不限 | 即时应用 |
| `t0.duration` | `7000` | number | 不限 ~ 不限 | 即时应用 |
| `t0.closeButton` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.inline` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.slideMs` | `400` | number | 不限 ~ 不限 | 即时应用 |
| `t0.settleBounce` | `0.2` | number | 不限 ~ 不限 | 即时应用 |
| `t0.swipeDistance` | `40` | number | 不限 ~ 不限 | 即时应用 |
| `t0.fuse` | `"bottom"` | select | "bottom" / "top" / "none" | 即时应用 |
| `t0.pauseOnHover` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.dismissible` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t1.type` | `"button"` | select | "button" / "reset" / "submit" | 即时应用 |
| `state.open` | `true` | switch | 不限 ~ 不限 | 即时应用；原组件回调同步受控值 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Wan 皮肤

- 容器、状态色、边界与焦点使用 Agent Wan 规范；交互命中区不随视觉形变缩小。
- 组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。

## 5. 加载、动效与降级

本例实际配置：设备访问与音频行为以本例真实 Props 和显式回调为准。capabilities 是源码扫描提示，不能据此声称已请求相机、录音或播放音频。

- 依赖清单：`@hugeicons/core-free-icons`、`@hugeicons/react`、`motion`、`react`。安装前复用目标项目的兼容版本，不重复加载。
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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [状态与反馈](../categories/feedback.md)；否则直接完成当前组件。
