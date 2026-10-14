# Scrub Field

表单与选择 · `scrub-field` · 中文意图：拖拽数字 / 数值调节 / 数值输入

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-ric-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

数字可横向拖动调整或点击输入。

功能要求：提供真实受控值、可访问标签、键盘输入、中文输入法和错误状态；权限与提交只在明确动作后执行。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/form/scrub-field.tsx](../../src/demos/form/scrub-field.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Micro/ScrubField/ScrubField.tsx](../../.upstream/src/ts-default/Micro/ScrubField/ScrubField.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Micro/ScrubField/ScrubField.css](../../.upstream/src/ts-default/Micro/ScrubField/ScrubField.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/scrub-field.json](../../src/parameters/definitions/scrub-field.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component scrub-field
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Scrub Field 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import { useState } from 'react';
import ScrubField from '../../../.upstream/src/ts-default/Micro/ScrubField/ScrubField';
import { DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
const cn=(names:string)=>componentClasses(styles,names);

export default function ScrubFieldDemo() {
  const [value, setValue] = useState(24);
  const [committed, setCommitted] = useState(24);
  return <DemoPanel title="Scrub Field · 拖动数值"><div className={cn("aw-micro-stack")}>
    <ScrubField   value={value}    onChange={setValue} onCommit={setCommitted}     label={"模糊"} suffix={"px"} min={0} max={48} step={1} accent={"#52604e"} chipColor={"rgb(250 247 240 / 0.82)"} showDelta={true} showFill={true} size={"md"} sensitivity={2} rubberReach={8} returnDuration={300} coarseMultiplier={10} fineMultiplier={0.1} showDirty={false} disabled={false}  />
    <p className={cn("aw-micro-hint")}>拖动字段调节，或直接编辑数值；使用键盘完成精细调整。</p>
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">当前 {value}px，最近确认 {committed}px。</p>
  </div></DemoPanel>;
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `label` | `string` | 否 | `'Radius'` | 向用户或辅助技术说明控件的名称。 |
| `suffix` | `string` | 否 | `'px'` | 后缀，控制 scrub field 的对应渲染或交互参数。 |
| `value` | `number` | 否 | `未指定` | 当前受控值，由调用方维护并随交互回调更新。 |
| `defaultValue` | `number` | 否 | `24` | 非受控模式的初始值；挂载后更新通常通过内部状态或受控 value 完成。 |
| `min` | `number` | 否 | `0` | 允许输入、拖动或选择的下限。 |
| `max` | `number` | 否 | `100` | 允许输入、拖动或选择的上限。 |
| `step` | `number` | 否 | `1` | 每次调整的步进间隔或当前步骤，具体含义取决于组件。 |
| `size` | `ScrubFieldSize` | 否 | `'md'` | 尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `sensitivity` | `number` | 否 | `2` | 灵敏度，控制 scrub field 的对应渲染或交互参数。 |
| `rubberReach` | `number` | 否 | `8` | 橡胶作用距离，控制 scrub field 的对应渲染或交互参数。 |
| `returnDuration` | `number` | 否 | `300` | 返回时长，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `coarseMultiplier` | `number` | 否 | `10` | 粗粒度倍率，控制 scrub field 的对应渲染或交互参数。 |
| `fineMultiplier` | `number` | 否 | `0.1` | 细粒度倍率，控制 scrub field 的对应渲染或交互参数。 |
| `showDelta` | `boolean` | 否 | `true` | 是否显示变化量，决定该分支的展示或交互行为。 |
| `showDirty` | `boolean` | 否 | `false` | 是否显示已修改，决定该分支的展示或交互行为。 |
| `showFill` | `boolean` | 否 | `true` | 是否显示填充，决定该分支的展示或交互行为。 |
| `accent` | `string` | 否 | `'#f5f5f5'` | 强调，控制 scrub field 的对应渲染或交互参数。 |
| `chipColor` | `string` | 否 | `'#27272a'` | 标签片颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `disabled` | `boolean` | 否 | `false` | 是否禁用控件的用户交互。 |
| `onChange` | `(value: number) => void` | 否 | `未指定` | 用户改变值或条目顺序时通知调用方；回调参数类型就是应写回的值或原生事件。 |
| `onCommit` | `(value: number) => void` | 否 | `未指定` | 交互达到提交阈值并确认时通知调用方。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |

**onChange 的真实接入：**

```tsx
onChange={setValue}
```

**onCommit 的真实接入：**

```tsx
onCommit={setCommitted}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.label` | `"模糊"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.suffix` | `"px"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.min` | `0` | number | 不限 ~ 不限 | 即时应用 |
| `t0.max` | `48` | number | 不限 ~ 不限 | 即时应用 |
| `t0.step` | `1` | number | 不限 ~ 不限 | 即时应用 |
| `t0.accent` | `"#52604e"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.chipColor` | `"rgb(250 247 240 / 0.82)"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.showDelta` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.showFill` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.size` | `"md"` | select | "sm" / "md" / "lg" | 即时应用 |
| `t0.sensitivity` | `2` | number | 不限 ~ 不限 | 即时应用 |
| `t0.rubberReach` | `8` | number | 不限 ~ 不限 | 即时应用 |
| `t0.returnDuration` | `300` | number | 不限 ~ 不限 | 即时应用 |
| `t0.coarseMultiplier` | `10` | number | 不限 ~ 不限 | 即时应用 |
| `t0.fineMultiplier` | `0.1` | number | 不限 ~ 不限 | 即时应用 |
| `t0.showDirty` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.disabled` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `state.value` | `24` | number | 0 ~ 48 | 即时应用；原组件回调同步受控值 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Ric 皮肤

- 容器、状态色、边界与焦点使用 Agent Ric 规范；交互命中区不随视觉形变缩小。
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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [表单与选择](../effects/categories/form.md)；否则直接完成当前组件。
