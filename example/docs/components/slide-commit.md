# Slide Commit

按钮与操作 · `slide-commit` · 中文意图：滑动确认 / 滑块提交

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-ric-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

滑至目标后提交并展示真实等待与结果。

功能要求：将视觉触发与真实动作回调分开；禁用/加载阻止重复提交，提供普通点击或键盘的等价操作，危险动作按确认契约处理。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/actions/slide-commit.tsx](../../src/demos/actions/slide-commit.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Micro/SlideCommit/SlideCommit.tsx](../../.upstream/src/ts-default/Micro/SlideCommit/SlideCommit.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Micro/SlideCommit/SlideCommit.css](../../.upstream/src/ts-default/Micro/SlideCommit/SlideCommit.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/slide-commit.json](../../src/parameters/definitions/slide-commit.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component slide-commit
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Slide Commit 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import { useState } from 'react';
import SlideCommit from '../../../.upstream/src/ts-default/Micro/SlideCommit/SlideCommit';
import { SpringCheckbox } from '../../business/components/SpringCheckbox';
import { DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
const cn=(names:string)=>componentClasses(styles,names);

export default function SlideCommitDemo() {
  const [simulateError, setSimulateError] = useState(false);
  const [message, setMessage] = useState('拖动滑块至右侧，提交本地模拟操作。');
  const [revision, setRevision] = useState(0);
  return <DemoPanel title="Slide Commit · 滑动确认"><div className={cn("aw-micro-stack")}>
    <SlideCommit key={revision} label="滑动确认" doneLabel="模拟已确认" errorLabel="模拟失败，重试"        onConfirm={async () => { if (simulateError) throw new Error('本次示例设置为模拟失败。'); }} onDone={() => setMessage('本地模拟操作成功。')} onError={() => setMessage('已进入错误态，可重试或重置。')} trackColor={"rgb(250 247 240 / 0.82)"} handleColor={"#52604e"} successColor={"#52604e"} dangerColor={"#9c6d56"} width={300} height={56} radius={14} speed={50} returnBounce={0.38} landingDip={0.026} holdMs={1500} disabled={false}  />
    <div className={cn("aw-micro-controls")}><label className={styles['aw-micro-option']}><SpringCheckbox aria-label="模拟失败" checked={simulateError} onChange={event => { const checked = event.target.checked; setSimulateError(checked); setRevision(value => value + 1); setMessage(checked ? '已开启模拟失败，拖动滑块可查看错误态。' : '已关闭模拟失败，拖动滑块可完成操作。'); }} />模拟失败</label><button className={styles['aw-micro-action']}  onClick={() => { setRevision(value => value + 1); setMessage('滑块已重置。'); }} type={"button"} >重置</button></div>
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">{message}</p>
  </div></DemoPanel>;
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `label` | `ReactNode` | 否 | `'Slide to pay'` | 向用户或辅助技术说明控件的名称。 |
| `doneLabel` | `ReactNode` | 否 | `'Paid'` | 完成标签，控制 slide commit 的对应渲染或交互参数。 |
| `errorLabel` | `ReactNode` | 否 | `'Payment failed'` | 错误标签，控制 slide commit 的对应渲染或交互参数。 |
| `onConfirm` | `() => void \| Promise<unknown>` | 否 | `未指定` | 用户确认当前动作或选择时通知调用方。 |
| `onDone` | `() => void` | 否 | `未指定` | 完成时执行的回调；按签名接收事件或结果，调用方在函数中同步业务状态。 |
| `onError` | `(reason: unknown) => void` | 否 | `未指定` | 错误时执行的回调；按签名接收事件或结果，调用方在函数中同步业务状态。 |
| `trackColor` | `string` | 否 | `'#262626'` | 轨道颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `handleColor` | `string` | 否 | `'#f5f5f5'` | 拖动把手颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `successColor` | `string` | 否 | `'#22c55e'` | 成功颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `dangerColor` | `string` | 否 | `'#e5484d'` | 危险操作颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `width` | `number` | 否 | `280` | 容器或效果的宽度，CSS 字符串与数值的支持以类型为准。 |
| `height` | `number` | 否 | `56` | 容器或效果的高度，CSS 字符串与数值的支持以类型为准。 |
| `radius` | `number` | 否 | `28` | 半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `speed` | `number` | 否 | `50` | 动画、流动或滚动的推进速度；不同效果使用各自的速度尺度。 |
| `returnBounce` | `number` | 否 | `0.38` | 返回回弹，控制 slide commit 的对应渲染或交互参数。 |
| `landingDip` | `number` | 否 | `0.026` | 落地下沉，控制 slide commit 的对应渲染或交互参数。 |
| `holdMs` | `number` | 否 | `1500` | 按住毫秒，控制 slide commit 的对应渲染或交互参数。 |
| `disabled` | `boolean` | 否 | `false` | 是否禁用控件的用户交互。 |
| `icon` | `ReactNode` | 否 | `<HugeiconsIcon icon={ArrowRight02Icon} size={iconSize} strokeWidth={2} />` | 图标，控制 slide commit 的对应渲染或交互参数。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `SpringCheckbox.checked` | `boolean \| undefined` | 否 | `inner` | 当前受控勾选状态，调用方在变更回调中写回。 |
| `SpringCheckbox.onChange` | `ChangeEventHandler<HTMLInputElement> \| undefined` | 否 | `未指定` | 用户改变值或条目顺序时通知调用方；回调参数类型就是应写回的值或原生事件。 |
| `SpringCheckbox.defaultChecked` | `boolean \| undefined` | 否 | `false` | 非受控模式首次挂载时的勾选状态。 |
| `SpringCheckbox.className` | `string \| undefined` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `SpringCheckbox.children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `button.className` | `string \| undefined` | 否 | `未指定` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `button.type` | `"button" \| "reset" \| "submit" \| undefined` | 否 | `未指定` | 原生输入或按钮的行为类型；按钮类型会影响表单提交。 |
| `button.onClick` | `MouseEventHandler<HTMLButtonElement> \| undefined` | 否 | `未指定` | 用户点击或通过键盘激活时触发的事件处理函数。 |
| `button.children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |

**继承的原生属性：**

- `InputHTMLAttributes<HTMLInputElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**label 的真实接入：**

```tsx
label="滑动确认"
```

**doneLabel 的真实接入：**

```tsx
doneLabel="模拟已确认"
```

**errorLabel 的真实接入：**

```tsx
errorLabel="模拟失败，重试"
```

**onConfirm 的真实接入：**

```tsx
onConfirm={async () => { if (simulateError) throw new Error('本次示例设置为模拟失败。'); }}
```

**onDone 的真实接入：**

```tsx
onDone={() => setMessage('本地模拟操作成功。')}
```

**onError 的真实接入：**

```tsx
onError={() => setMessage('已进入错误态，可重试或重置。')}
```

**icon 的真实接入：**

```tsx
icon={"示例"}
```

**onChange 的真实接入：**

```tsx
onChange={event => { const checked = event.target.checked; setSimulateError(checked); setRevision(value => value + 1); setMessage(checked ? '已开启模拟失败，拖动滑块可查看错误态。' : '已关闭模拟失败，拖动滑块可完成操作。'); }}
```

**children 的真实接入：**

```tsx
children={"示例"}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.trackColor` | `"rgb(250 247 240 / 0.82)"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.handleColor` | `"#52604e"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.successColor` | `"#52604e"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.dangerColor` | `"#9c6d56"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.width` | `300` | number | 不限 ~ 不限 | 即时应用 |
| `t0.height` | `56` | number | 不限 ~ 不限 | 即时应用 |
| `t0.radius` | `14` | number | 不限 ~ 不限 | 即时应用 |
| `t0.speed` | `50` | number | 不限 ~ 不限 | 即时应用 |
| `t0.returnBounce` | `0.38` | number | 不限 ~ 不限 | 即时应用 |
| `t0.landingDip` | `0.026` | number | 不限 ~ 不限 | 即时应用 |
| `t0.holdMs` | `1500` | number | 不限 ~ 不限 | 即时应用 |
| `t0.disabled` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t2.type` | `"button"` | select | "button" / "reset" / "submit" | 即时应用 |
| `state.simulateError` | `false` | switch | 不限 ~ 不限 | 即时应用；原组件回调同步受控值 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Ric 皮肤

- 容器、状态色、边界与焦点使用 Agent Ric 规范；交互命中区不随视觉形变缩小。
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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [按钮与操作](../effects/categories/actions.md)；否则直接完成当前组件。
