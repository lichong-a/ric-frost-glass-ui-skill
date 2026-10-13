# Hold Button

按钮与操作 · `hold-button` · 中文意图：长按确认 / 按住完成

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

按住填充进度，提前放开则回退。

功能要求：将视觉触发与真实动作回调分开；禁用/加载阻止重复提交，提供普通点击或键盘的等价操作，危险动作按确认契约处理。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/actions/hold-button.tsx](../../src/demos/actions/hold-button.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Micro/HoldButton/HoldButton.tsx](../../.upstream/src/ts-default/Micro/HoldButton/HoldButton.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Micro/HoldButton/HoldButton.css](../../.upstream/src/ts-default/Micro/HoldButton/HoldButton.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/hold-button.json](../../src/parameters/definitions/hold-button.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component hold-button
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Hold Button 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import { useState } from 'react';
import HoldButton from '../../../.upstream/src/ts-default/Micro/HoldButton/HoldButton';
import { DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
const cn=(names:string)=>componentClasses(styles,names);

export default function HoldButtonDemo() {
  const [message, setMessage] = useState('按住按钮约 1 秒完成本地模拟操作。');
  return <DemoPanel title="Hold Button · 长按确认"><div className={cn("aw-micro-stack")}>
    <HoldButton doneLabel="确认完成"          onHold={() => setMessage('本地模拟操作已确认。')} onTap={() => setMessage('按下时间不足，请继续按住。')} backgroundColor={"rgb(250 247 240 / 0.82)"} fillColor={"#52604e"} textColor={"#1f2d26"} fillTextColor={"#faf7f0"} holdTime={1000} radius={10} wave={true} glow={false} resetAfter={1800} size={"md"} fillDirection={"right"} releaseTime={200} pressScale={0.97} waveAmplitude={6} disabled={false} >按住确认</HoldButton>
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">{message}</p>
  </div></DemoPanel>;
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `children` | `ReactNode` | 否 | `'Hold to delete'` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `doneLabel` | `ReactNode` | 否 | `'Deleted'` | 完成标签，控制 hold button 的对应渲染或交互参数。 |
| `icon` | `ReactNode` | 否 | `null` | 图标，控制 hold button 的对应渲染或交互参数。 |
| `doneIcon` | `ReactNode` | 否 | `null` | 完成图标，控制 hold button 的对应渲染或交互参数。 |
| `backgroundColor` | `string` | 否 | `'#27272a'` | 背景颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `fillColor` | `string` | 否 | `'#5227FF'` | 填充颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `textColor` | `string` | 否 | `'#f5f5f5'` | 文字颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `fillTextColor` | `string` | 否 | `'#ffffff'` | 填充文字颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `size` | `HoldButtonSize` | 否 | `'md'` | 尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `radius` | `number` | 否 | `14` | 半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `fillDirection` | `HoldButtonDirection` | 否 | `'right'` | 填充方向，控制 hold button 的对应渲染或交互参数。 |
| `holdTime` | `number` | 否 | `2000` | 按住时间，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `releaseTime` | `number` | 否 | `200` | 释放时间，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `pressScale` | `number` | 否 | `0.97` | 按压缩放，控制 hold button 的对应渲染或交互参数。 |
| `wave` | `boolean` | 否 | `true` | 是否波形，决定该分支的展示或交互行为。 |
| `waveAmplitude` | `number` | 否 | `6` | 波形振幅，控制 hold button 的对应渲染或交互参数。 |
| `glow` | `boolean` | 否 | `true` | 是否辉光，决定该分支的展示或交互行为。 |
| `resetAfter` | `number` | 否 | `1200` | 重置之后，控制 hold button 的对应渲染或交互参数。 |
| `disabled` | `boolean` | 否 | `false` | 是否禁用控件的用户交互。 |
| `onHold` | `() => void` | 否 | `未指定` | 按住时执行的回调；按签名接收事件或结果，调用方在函数中同步业务状态。 |
| `onTap` | `() => void` | 否 | `未指定` | 点按时执行的回调；按签名接收事件或结果，调用方在函数中同步业务状态。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |

**children 的真实接入：**

```tsx
children={<>按住确认</>}
```

**doneLabel 的真实接入：**

```tsx
doneLabel="确认完成"
```

**icon 的真实接入：**

```tsx
icon={null}
```

**doneIcon 的真实接入：**

```tsx
doneIcon={null}
```

**onHold 的真实接入：**

```tsx
onHold={() => setMessage('本地模拟操作已确认。')}
```

**onTap 的真实接入：**

```tsx
onTap={() => setMessage('按下时间不足，请继续按住。')}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.backgroundColor` | `"rgb(250 247 240 / 0.82)"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.fillColor` | `"#52604e"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.textColor` | `"#1f2d26"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.fillTextColor` | `"#faf7f0"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.holdTime` | `1000` | number | 不限 ~ 不限 | 即时应用 |
| `t0.radius` | `10` | number | 不限 ~ 不限 | 即时应用 |
| `t0.wave` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.glow` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.resetAfter` | `1800` | number | 不限 ~ 不限 | 即时应用 |
| `t0.size` | `"md"` | select | "sm" / "md" / "lg" | 即时应用 |
| `t0.fillDirection` | `"right"` | select | "right" / "up" | 即时应用 |
| `t0.releaseTime` | `200` | number | 不限 ~ 不限 | 即时应用 |
| `t0.pressScale` | `0.97` | number | 不限 ~ 不限 | 即时应用 |
| `t0.waveAmplitude` | `6` | number | 不限 ~ 不限 | 即时应用 |
| `t0.disabled` | `false` | switch | 不限 ~ 不限 | 即时应用 |

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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [按钮与操作](../effects/categories/actions.md)；否则直接完成当前组件。
