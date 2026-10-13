# Slosh Gauge

状态与反馈 · `slosh-gauge` · 中文意图：液体进度 / 水位进度 / 仪表

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

液体高度跟随数值并在变化时晃动。

功能要求：由真实 value / state 与回调驱动；操作可用键盘完成，不能只在动画内部保存业务状态。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/feedback/slosh-gauge.tsx](../../src/demos/feedback/slosh-gauge.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Micro/SloshGauge/SloshGauge.tsx](../../.upstream/src/ts-default/Micro/SloshGauge/SloshGauge.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Micro/SloshGauge/SloshGauge.css](../../.upstream/src/ts-default/Micro/SloshGauge/SloshGauge.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/slosh-gauge.json](../../src/parameters/definitions/slosh-gauge.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component slosh-gauge
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Slosh Gauge 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import { useState } from 'react';
import SloshGauge from '../../../.upstream/src/ts-default/Micro/SloshGauge/SloshGauge';
import { DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
const cn=(names:string)=>componentClasses(styles,names);

export default function SloshGaugeDemo() {
  const [value, setValue] = useState(62);
  return <DemoPanel title="Slosh Gauge · 液体刻度"><div className={cn("aw-micro-stack")}>
    <SloshGauge value={value} onChange={setValue}          interactive={true} showValue={true} liquidColor={"#52604e"} glassColor={"rgb(250 247 240 / 0.82)"} width={110} height={220} radius={20} unit={"%"} ariaLabel={"调节示例容量"} disabled={false} ticks={4} viscosity={0.15} tilt={0.45} splash={0.42}  />
    <label className={cn("aw-micro-field")}>示例容量 {Math.round(value)}%<input     value={value} onChange={event => setValue(Number(event.target.value))} type={"range"} min={"0"} max={"100"} step={"1"}  /></label>
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">当前容量：{Math.round(value)}%</p>
  </div></DemoPanel>;
}

```

### 完整组件 API

| 参数 | 类型 | 必填 | 上游默认值 | 中文说明 |
|---|---|---|---|---|
| `value` | `number` | 否 | `defaultValue` | 当前受控值，由调用方维护并随交互回调更新。 |
| `defaultValue` | `number` | 否 | `60` | 非受控模式的初始值；挂载后更新通常通过内部状态或受控 value 完成。 |
| `onChange` | `(value: number) => void` | 否 | `未指定` | 用户改变值或条目顺序时通知调用方；回调参数类型就是应写回的值或原生事件。 |
| `interactive` | `boolean` | 否 | `false` | 是否交互，决定该分支的展示或交互行为。 |
| `showValue` | `boolean` | 否 | `true` | 是否显示值，决定该分支的展示或交互行为。 |
| `disabled` | `boolean` | 否 | `false` | 是否禁用控件的用户交互。 |
| `liquidColor` | `string` | 否 | `'#f5f5f5'` | 液体颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `glassColor` | `string` | 否 | `'#27272a'` | 玻璃颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `width` | `number` | 否 | `88` | 容器或效果的宽度，CSS 字符串与数值的支持以类型为准。 |
| `height` | `number` | 否 | `180` | 容器或效果的高度，CSS 字符串与数值的支持以类型为准。 |
| `radius` | `number` | 否 | `20` | 半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `ticks` | `number` | 否 | `4` | 刻度组，控制 slosh gauge 的对应渲染或交互参数。 |
| `viscosity` | `number` | 否 | `0.15` | 粘性，控制 slosh gauge 的对应渲染或交互参数。 |
| `tilt` | `number` | 否 | `0.45` | 倾斜，控制 slosh gauge 的对应渲染或交互参数。 |
| `splash` | `number` | 否 | `0.42` | 飞溅，控制 slosh gauge 的对应渲染或交互参数。 |
| `unit` | `string` | 否 | `'%'` | 单位，控制 slosh gauge 的对应渲染或交互参数。 |
| `ariaLabel` | `string` | 否 | `'Level'` | 无障碍标签，控制 slosh gauge 的对应渲染或交互参数。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `input.type` | `HTMLInputTypeAttribute \| undefined` | 否 | `未指定` | 原生输入或按钮的行为类型；按钮类型会影响表单提交。 |
| `input.min` | `string \| number \| undefined` | 否 | `未指定` | 允许输入、拖动或选择的下限。 |
| `input.max` | `string \| number \| undefined` | 否 | `未指定` | 允许输入、拖动或选择的上限。 |
| `input.step` | `string \| number \| undefined` | 否 | `未指定` | 每次调整的步进间隔或当前步骤，具体含义取决于组件。 |
| `input.value` | `string \| number \| readonly string[] \| undefined` | 否 | `未指定` | 当前受控值，由调用方维护并随交互回调更新。 |
| `input.onChange` | `ChangeEventHandler<HTMLInputElement> \| undefined` | 否 | `未指定` | 用户改变值或条目顺序时通知调用方；回调参数类型就是应写回的值或原生事件。 |

**继承的原生属性：**

- `DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**onChange 的真实接入：**

```tsx
onChange={setValue}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，不改写上游 API。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.interactive` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.showValue` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.liquidColor` | `"#52604e"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.glassColor` | `"rgb(250 247 240 / 0.82)"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.width` | `110` | number | 不限 ~ 不限 | 即时应用 |
| `t0.height` | `220` | number | 不限 ~ 不限 | 即时应用 |
| `t0.radius` | `20` | number | 不限 ~ 不限 | 即时应用 |
| `t0.unit` | `"%"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.ariaLabel` | `"调节示例容量"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.disabled` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.ticks` | `4` | number | 不限 ~ 不限 | 即时应用 |
| `t0.viscosity` | `0.15` | number | 不限 ~ 不限 | 即时应用 |
| `t0.tilt` | `0.45` | number | 不限 ~ 不限 | 即时应用 |
| `t0.splash` | `0.42` | number | 不限 ~ 不限 | 即时应用 |
| `t1.type` | `"range"` | text | 不限 ~ 不限 | 即时应用 |
| `t1.min` | `"0"` | json | 不限 ~ 不限 | 即时应用 |
| `t1.max` | `"100"` | json | 不限 ~ 不限 | 即时应用 |
| `t1.step` | `"1"` | json | 不限 ~ 不限 | 即时应用 |
| `state.value` | `62` | range | 0 ~ 100 | 即时应用；原组件回调同步受控值 |

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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [状态与反馈](../categories/feedback.md)；否则直接完成当前组件。
