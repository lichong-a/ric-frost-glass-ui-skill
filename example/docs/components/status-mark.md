# Status Mark

状态与反馈 · `status-mark` · 中文意图：任务状态 / 智能体状态 / 状态图标

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

图形在空闲进度和结果状态间变形。

功能要求：状态、计时和公开步骤摘要来自任务数据。示例明确标注为模拟；不伪造隐藏推理或完成结果。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/feedback/status-mark.tsx](../../src/demos/feedback/status-mark.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Micro/StatusMark/StatusMark.tsx](../../.upstream/src/ts-default/Micro/StatusMark/StatusMark.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Micro/StatusMark/StatusMark.css](../../.upstream/src/ts-default/Micro/StatusMark/StatusMark.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/status-mark.json](../../src/parameters/definitions/status-mark.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component status-mark
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Status Mark 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import { useState } from 'react';
import StatusMark, { type StatusMarkStatus } from '../../../.upstream/src/ts-default/Micro/StatusMark/StatusMark';
import { DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
const cn=(names:string)=>componentClasses(styles,names);

const labels: Record<StatusMarkStatus, string> = { pending: '等待中', running: '执行中', done: '已完成', failed: '失败', cancelled: '已取消' };
const states: StatusMarkStatus[] = ['pending', 'running', 'done', 'failed', 'cancelled'];
export default function StatusMarkDemo() {
  const [status, setStatus] = useState<StatusMarkStatus>('running');
  const [progress, setProgress] = useState(0.45);
  const [determinate, setDeterminate] = useState(false);
  return <DemoPanel title="Status Mark · 状态图标"><div className={cn("aw-micro-stack")}>
    <StatusMark status={status} progress={determinate ? progress : undefined} label={labels[status]}      color={"#52604e"} doneColor={"#52604e"} errorColor={"#9c6d56"} size={24} fontSize={14} strokeWidth={2} dashes={8} spinDuration={1100} arcLength={0.68} drawDuration={240} fillOpacity={0.06} strike={true} strikeDelay={60}  />
    <div className={cn("aw-micro-controls")}>{states.map(value => <button className={styles['aw-micro-action']} key={value}  aria-pressed={status === value} onClick={() => setStatus(value)} type={"button"} >{labels[value]}</button>)}</div>
    <label className={cn("aw-micro-field")}>模拟进度 {Math.round(progress * 100)}%<input    value={Math.round(progress * 100)} onChange={event => { setDeterminate(true); setProgress(Number(event.target.value) / 100); setStatus('running'); }} type={"range"} min={"0"} max={"100"}  /></label>
    <div className={cn("aw-micro-controls")}><button className={styles['aw-micro-action']}  aria-pressed={!determinate} onClick={() => { setDeterminate(value => !value); setStatus('running'); }} type={"button"} >{determinate ? '切换不定进度' : '切换明确进度'}</button></div>
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">本地任务状态：{labels[status]}</p>
  </div></DemoPanel>;
}

```

### 完整组件 API

| 参数 | 类型 | 必填 | 上游默认值 | 中文说明 |
|---|---|---|---|---|
| `status` | `StatusMarkStatus` | 否 | `'pending'` | 状态，控制 status mark 的对应渲染或交互参数。 |
| `progress` | `number` | 否 | `未指定` | 进度，控制 status mark 的对应渲染或交互参数。 |
| `label` | `ReactNode` | 否 | `未指定` | 向用户或辅助技术说明控件的名称。 |
| `color` | `string` | 否 | `'currentColor'` | 颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `doneColor` | `string` | 否 | `'#22c55e'` | 完成颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `errorColor` | `string` | 否 | `'#ef4444'` | 错误颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `size` | `number` | 否 | `20` | 尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `strokeWidth` | `number` | 否 | `2` | 描边宽度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `dashes` | `number` | 否 | `8` | 虚线段，控制 status mark 的对应渲染或交互参数。 |
| `fontSize` | `number` | 否 | `14` | 字体尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `spinDuration` | `number` | 否 | `1100` | 自转时长，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `arcLength` | `number` | 否 | `0.68` | 弧线长度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `drawDuration` | `number` | 否 | `240` | 绘制时长，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `fillOpacity` | `number` | 否 | `0.06` | 填充不透明度，控制 status mark 的对应渲染或交互参数。 |
| `strike` | `boolean` | 否 | `true` | 是否击打，决定该分支的展示或交互行为。 |
| `strikeDelay` | `number` | 否 | `60` | 击打延迟，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `style` | `CSSProperties` | 否 | `未指定` | 容器的 React 内联样式对象，尺寸、布局与 CSS 属性按 CSSProperties 传入。 |
| `button · t1.className` | `string \| undefined` | 否 | `未指定` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `button · t1.key` | `Key \| null \| undefined` | 否 | `未指定` | React 列表项身份，用于更新时保持对应节点。 |
| `button · t1.type` | `"button" \| "reset" \| "submit" \| undefined` | 否 | `未指定` | 原生输入或按钮的行为类型；按钮类型会影响表单提交。 |
| `button · t1.aria-pressed` | `boolean \| "true" \| "false" \| "mixed" \| undefined` | 否 | `未指定` | 辅助技术的 pressed 状态或说明；值须与控件当前可观察行为一致。 |
| `button · t1.onClick` | `MouseEventHandler<HTMLButtonElement> \| undefined` | 否 | `未指定` | 用户点击或通过键盘激活时触发的事件处理函数。 |
| `button · t1.children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `input.type` | `HTMLInputTypeAttribute \| undefined` | 否 | `未指定` | 原生输入或按钮的行为类型；按钮类型会影响表单提交。 |
| `input.min` | `string \| number \| undefined` | 否 | `未指定` | 允许输入、拖动或选择的下限。 |
| `input.max` | `string \| number \| undefined` | 否 | `未指定` | 允许输入、拖动或选择的上限。 |
| `input.value` | `string \| number \| readonly string[] \| undefined` | 否 | `未指定` | 当前受控值，由调用方维护并随交互回调更新。 |
| `input.onChange` | `ChangeEventHandler<HTMLInputElement> \| undefined` | 否 | `未指定` | 用户改变值或条目顺序时通知调用方；回调参数类型就是应写回的值或原生事件。 |

**继承的原生属性：**

- `DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**label 的真实接入：**

```tsx
label={labels[status]}
```

**style 的真实接入：**

```tsx
style={{ width: "100%", minHeight: 240 }}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，不改写上游 API。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.color` | `"#52604e"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.doneColor` | `"#52604e"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.errorColor` | `"#9c6d56"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.size` | `24` | number | 不限 ~ 不限 | 即时应用 |
| `t0.fontSize` | `14` | number | 不限 ~ 不限 | 即时应用 |
| `t0.strokeWidth` | `2` | number | 不限 ~ 不限 | 即时应用 |
| `t0.dashes` | `8` | number | 不限 ~ 不限 | 即时应用 |
| `t0.spinDuration` | `1100` | number | 不限 ~ 不限 | 即时应用 |
| `t0.arcLength` | `0.68` | number | 不限 ~ 不限 | 即时应用 |
| `t0.drawDuration` | `240` | number | 不限 ~ 不限 | 即时应用 |
| `t0.fillOpacity` | `0.06` | number | 不限 ~ 不限 | 即时应用 |
| `t0.strike` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.strikeDelay` | `60` | number | 不限 ~ 不限 | 即时应用 |
| `t1.type` | `"button"` | select | "button" / "reset" / "submit" | 即时应用 |
| `t2.type` | `"range"` | text | 不限 ~ 不限 | 即时应用 |
| `t2.min` | `"0"` | json | 不限 ~ 不限 | 即时应用 |
| `t2.max` | `"100"` | json | 不限 ~ 不限 | 即时应用 |
| `t3.type` | `"button"` | select | "button" / "reset" / "submit" | 即时应用 |
| `state.progress` | `0.45` | number | 不限 ~ 不限 | 即时应用；原组件回调同步受控值 |
| `state.determinate` | `false` | switch | 不限 ~ 不限 | 即时应用；原组件回调同步受控值 |

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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [状态与反馈](../categories/feedback.md)；否则直接完成当前组件。
