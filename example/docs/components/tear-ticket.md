# Tear Ticket

卡片与面板 · `tear-ticket` · 中文意图：撕票 / 票根撕开

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

票根沿虚线逐步撕开并脱落。

功能要求：保持内容的语义和可访问名称；只有真实可交互元素可进入焦点顺序。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/cards/tear-ticket.tsx](../../src/demos/cards/tear-ticket.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Micro/TearTicket/TearTicket.tsx](../../.upstream/src/ts-default/Micro/TearTicket/TearTicket.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Micro/TearTicket/TearTicket.css](../../.upstream/src/ts-default/Micro/TearTicket/TearTicket.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/tear-ticket.json](../../src/parameters/definitions/tear-ticket.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component tear-ticket
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Tear Ticket 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import { useState } from 'react';
import TearTicket from '../../../.upstream/src/ts-default/Micro/TearTicket/TearTicket';
import { DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
const cn=(names:string)=>componentClasses(styles,names);

export default function TearTicketDemo() {
  const [torn, setTorn] = useState(false);
  return <DemoPanel title="Tear Ticket · 撕取票据"><div className={cn("aw-micro-stack")}>
    <TearTicket torn={torn} onTear={() => setTorn(true)}           stub={<div className={cn("aw-micro-card")} style={{ padding: 14 }}><strong>DEMO</strong><span>撕取</span></div>} width={320} height={210} stubSize={86} radius={20} background={"rgb(250 247 240 / 0.82)"} color={"#1f2d26"} stubBackground={"#a6b39a"} border={true} borderColor={"rgba(82,96,78,.22)"} ariaLabel={"拖动撕取演示票据"} image={""} imageAlt={""} scrim={true} imageRadius={8} orientation={"horizontal"} holes={12} holeSize={6} notch={3} roughness={0} tearAngle={30} stretch={30} resistance={0.45} rotate={4} tilt={true} tiltMax={9} tiltReach={260} parallax={6} perspective={1000} borderWidth={1} recenter={true} disabled={false} ><div className={cn("aw-micro-card")}><span>AGENT WAN</span><h3 style={{ fontSize: 23 }}>工作坊通行证</h3><p>本地交互示例<br />拖动右侧票根</p></div></TearTicket>
    <div className={cn("aw-micro-controls")}><button className={styles['aw-micro-action']}  onClick={() => setTorn(false)} type={"button"} >恢复票据</button></div>
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">票根：{torn ? '已撕取' : '完整'}</p>
  </div></DemoPanel>;
}

```

### 完整组件 API

| 参数 | 类型 | 必填 | 上游默认值 | 中文说明 |
|---|---|---|---|---|
| `children` | `ReactNode` | 否 | `null` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `stub` | `ReactNode` | 否 | `null` | 票根，控制 tear ticket 的对应渲染或交互参数。 |
| `image` | `string` | 否 | `''` | 主图资源或图像配置，结构以类型为准。 |
| `imageAlt` | `string` | 否 | `''` | 图像替代文字，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `scrim` | `boolean` | 否 | `true` | 是否遮罩，决定该分支的展示或交互行为。 |
| `imageRadius` | `number` | 否 | `8` | 图像半径，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `orientation` | `TearTicketOrientation` | 否 | `'horizontal'` | 方向，控制 tear ticket 的对应渲染或交互参数。 |
| `torn` | `boolean` | 否 | `未指定` | 是否撕裂状态，决定该分支的展示或交互行为。 |
| `defaultTorn` | `boolean` | 否 | `false` | 是否非受控初始撕裂状态，决定该分支的展示或交互行为。 |
| `onTear` | `() => void` | 否 | `未指定` | 拖动动作完成撕裂票据时通知调用方。 |
| `width` | `number` | 否 | `460` | 容器或效果的宽度，CSS 字符串与数值的支持以类型为准。 |
| `height` | `number` | 否 | `250` | 容器或效果的高度，CSS 字符串与数值的支持以类型为准。 |
| `stubSize` | `number` | 否 | `150` | 票根尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `radius` | `number` | 否 | `16` | 半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `holes` | `number` | 否 | `12` | 孔洞组，控制 tear ticket 的对应渲染或交互参数。 |
| `holeSize` | `number` | 否 | `6` | 孔洞尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `notch` | `number` | 否 | `3` | 缺口，控制 tear ticket 的对应渲染或交互参数。 |
| `roughness` | `number` | 否 | `0` | 粗糙度，控制 tear ticket 的对应渲染或交互参数。 |
| `tearAngle` | `number` | 否 | `30` | 撕裂角度，控制 tear ticket 的对应渲染或交互参数。 |
| `stretch` | `number` | 否 | `30` | 拉伸，控制 tear ticket 的对应渲染或交互参数。 |
| `resistance` | `number` | 否 | `0.45` | 阻力，控制 tear ticket 的对应渲染或交互参数。 |
| `rotate` | `number` | 否 | `4` | 旋转，控制 tear ticket 的对应渲染或交互参数。 |
| `tilt` | `boolean` | 否 | `true` | 是否倾斜，决定该分支的展示或交互行为。 |
| `tiltMax` | `number` | 否 | `9` | 倾斜最大，控制 tear ticket 的对应渲染或交互参数。 |
| `tiltReach` | `number` | 否 | `260` | 倾斜作用距离，控制 tear ticket 的对应渲染或交互参数。 |
| `parallax` | `number` | 否 | `6` | 视差，控制 tear ticket 的对应渲染或交互参数。 |
| `perspective` | `number` | 否 | `1000` | 透视，控制 tear ticket 的对应渲染或交互参数。 |
| `background` | `string` | 否 | `'#27272a'` | 背景，控制 tear ticket 的对应渲染或交互参数。 |
| `color` | `string` | 否 | `'#f5f5f5'` | 颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `border` | `boolean` | 否 | `true` | 是否边框，决定该分支的展示或交互行为。 |
| `borderColor` | `string` | 否 | `''` | 边框颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `borderWidth` | `number` | 否 | `1` | 边框宽度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `stubBackground` | `string` | 否 | `''` | 票根背景，控制 tear ticket 的对应渲染或交互参数。 |
| `recenter` | `boolean` | 否 | `true` | 是否回到中心，决定该分支的展示或交互行为。 |
| `disabled` | `boolean` | 否 | `false` | 是否禁用控件的用户交互。 |
| `ariaLabel` | `string` | 否 | `'Tear off the stub'` | 无障碍标签，控制 tear ticket 的对应渲染或交互参数。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `button.className` | `string \| undefined` | 否 | `未指定` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `button.type` | `"button" \| "reset" \| "submit" \| undefined` | 否 | `未指定` | 原生输入或按钮的行为类型；按钮类型会影响表单提交。 |
| `button.onClick` | `MouseEventHandler<HTMLButtonElement> \| undefined` | 否 | `未指定` | 用户点击或通过键盘激活时触发的事件处理函数。 |
| `button.children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |

**继承的原生属性：**

- `DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**children 的真实接入：**

```tsx
children={<><div className={cn("aw-micro-card")}><span>AGENT WAN</span><h3 style={{ fontSize: 23 }}>工作坊通行证</h3><p>本地交互示例<br />拖动右侧票根</p></div></>}
```

**stub 的真实接入：**

```tsx
stub={<div className={cn("aw-micro-card")} style={{ padding: 14 }}><strong>DEMO</strong><span>撕取</span></div>}
```

**onTear 的真实接入：**

```tsx
onTear={() => setTorn(true)}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，不改写上游 API。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.width` | `320` | number | 不限 ~ 不限 | 即时应用 |
| `t0.height` | `210` | number | 不限 ~ 不限 | 即时应用 |
| `t0.stubSize` | `86` | number | 不限 ~ 不限 | 即时应用 |
| `t0.radius` | `20` | number | 不限 ~ 不限 | 即时应用 |
| `t0.background` | `"rgb(250 247 240 / 0.82)"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.color` | `"#1f2d26"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.stubBackground` | `"#a6b39a"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.border` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.borderColor` | `"rgba(82,96,78,.22)"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.ariaLabel` | `"拖动撕取演示票据"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.image` | `""` | resource | "" / "@asset/restoration/chromatic-bloom.svg" / "@asset/restoration/mineral-tide.svg" / "@asset/restoration/nocturne-orbit.svg" / "@asset/restoration/prismatic-canopy.svg" / "@asset/restoration/solar-dunes.svg" / "@asset/restoration/vermilion-fold.svg" / "@media/scene-1.svg" / "@media/scene-2.svg" / "@media/scene-3.svg" / "@media/scene-4.svg" / "@media/scene-5.svg" / "@media/scene-6.svg" | 即时应用 |
| `t0.imageAlt` | `""` | text | 不限 ~ 不限 | 即时应用 |
| `t0.scrim` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.imageRadius` | `8` | number | 不限 ~ 不限 | 即时应用 |
| `t0.orientation` | `"horizontal"` | select | "horizontal" / "vertical" | 即时应用 |
| `t0.holes` | `12` | number | 不限 ~ 不限 | 即时应用 |
| `t0.holeSize` | `6` | number | 不限 ~ 不限 | 即时应用 |
| `t0.notch` | `3` | number | 不限 ~ 不限 | 即时应用 |
| `t0.roughness` | `0` | number | 不限 ~ 不限 | 即时应用 |
| `t0.tearAngle` | `30` | number | 不限 ~ 不限 | 即时应用 |
| `t0.stretch` | `30` | number | 不限 ~ 不限 | 即时应用 |
| `t0.resistance` | `0.45` | number | 不限 ~ 不限 | 即时应用 |
| `t0.rotate` | `4` | number | 不限 ~ 不限 | 即时应用 |
| `t0.tilt` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.tiltMax` | `9` | number | 不限 ~ 不限 | 即时应用 |
| `t0.tiltReach` | `260` | number | 不限 ~ 不限 | 即时应用 |
| `t0.parallax` | `6` | number | 不限 ~ 不限 | 即时应用 |
| `t0.perspective` | `1000` | number | 不限 ~ 不限 | 即时应用 |
| `t0.borderWidth` | `1` | number | 不限 ~ 不限 | 即时应用 |
| `t0.recenter` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.disabled` | `false` | switch | 不限 ~ 不限 | 即时应用 |
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

- 依赖清单：`motion`、`react`。安装前复用目标项目的兼容版本，不重复加载。
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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [卡片与面板](../categories/cards.md)；否则直接完成当前组件。
