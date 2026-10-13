# Voice Pill

按钮与操作 · `voice-pill` · 中文意图：语音按钮 / 录音胶囊 / 音量条

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

按钮在录音状态展开为波形和计时胶囊。

功能要求：提供真实受控值、可访问标签、键盘输入、中文输入法和错误状态；权限与提交只在明确动作后执行。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/actions/voice-pill.tsx](../../src/demos/actions/voice-pill.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Micro/VoicePill/VoicePill.tsx](../../.upstream/src/ts-default/Micro/VoicePill/VoicePill.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Micro/VoicePill/VoicePill.css](../../.upstream/src/ts-default/Micro/VoicePill/VoicePill.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/voice-pill.json](../../src/parameters/definitions/voice-pill.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component voice-pill
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Voice Pill 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import { useState } from 'react';
import VoicePill from '../../../.upstream/src/ts-default/Micro/VoicePill/VoicePill';
import { DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
const cn=(names:string)=>componentClasses(styles,names);

export default function VoicePillDemo() {
  const [message, setMessage] = useState('点击开始模拟，再次点击结束。');
  return <DemoPanel title="Voice Pill · 语音胶囊"><div className={cn("aw-micro-stack")}>
    <VoicePill          onStart={() => setMessage('正在播放模拟语音波形。')} onStop={detail => setMessage(`模拟结束，用时 ${(detail.duration / 1000).toFixed(1)} 秒；原因：${detail.reason}。`)} reactive={"simulated"} mode={"toggle"} waveform={true} showTime={true} size={40} background={"rgb(250 247 240 / 0.82)"} accentColor={"#52604e"} iconColor={"#1f2d26"} ariaLabel={"开始或停止模拟语音波形"} shape={"pill"} reach={8} slideToCancel={true} cancelDistance={64} attack={40} release={240} sensitivity={1} floor={0.1} openDuration={200} pressScale={0.95} holdAfter={300} disabled={false}  />
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">{message}</p>
    <p className={cn("aw-micro-hint")}>仅模拟波形与计时，不请求麦克风，不录音。</p>
  </div></DemoPanel>;
}

```

### 完整组件 API

| 参数 | 类型 | 必填 | 上游默认值 | 中文说明 |
|---|---|---|---|---|
| `accentColor` | `string` | 否 | `'#f5f5f5'` | 强调颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `iconColor` | `string` | 否 | `'#a1a1aa'` | 图标颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `background` | `string` | 否 | `'#27272a'` | 背景，控制 voice pill 的对应渲染或交互参数。 |
| `size` | `number` | 否 | `28` | 尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `shape` | `VoicePillShape` | 否 | `'pill'` | 形状，控制 voice pill 的对应渲染或交互参数。 |
| `reach` | `number` | 否 | `8` | 作用距离，控制 voice pill 的对应渲染或交互参数。 |
| `showTime` | `boolean` | 否 | `true` | 是否显示时间，决定该分支的展示或交互行为。 |
| `waveform` | `boolean` | 否 | `true` | 是否波形信号，决定该分支的展示或交互行为。 |
| `slideToCancel` | `boolean` | 否 | `true` | 是否滑动目标取消，决定该分支的展示或交互行为。 |
| `cancelDistance` | `number` | 否 | `64` | 取消距离，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `attack` | `number` | 否 | `40` | 起始响应，控制 voice pill 的对应渲染或交互参数。 |
| `release` | `number` | 否 | `240` | 释放，控制 voice pill 的对应渲染或交互参数。 |
| `sensitivity` | `number` | 否 | `1` | 灵敏度，控制 voice pill 的对应渲染或交互参数。 |
| `floor` | `number` | 否 | `0.1` | 底部，控制 voice pill 的对应渲染或交互参数。 |
| `openDuration` | `number` | 否 | `200` | 打开时长，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `pressScale` | `number` | 否 | `0.95` | 按压缩放，控制 voice pill 的对应渲染或交互参数。 |
| `mode` | `VoicePillMode` | 否 | `'auto'` | 选择组件的渲染或交互工作模式。 |
| `holdAfter` | `number` | 否 | `300` | 按住之后，控制 voice pill 的对应渲染或交互参数。 |
| `reactive` | `VoicePillSource` | 否 | `'simulated'` | 交互响应，控制 voice pill 的对应渲染或交互参数。 |
| `disabled` | `boolean` | 否 | `false` | 是否禁用控件的用户交互。 |
| `ariaLabel` | `string` | 否 | `'Dictate'` | 无障碍标签，控制 voice pill 的对应渲染或交互参数。 |
| `onStart` | `(info: { source: VoicePillSource }) => void` | 否 | `未指定` | 动作或动画开始时通知调用方。 |
| `onStop` | `(info: { reason: VoicePillStopReason; duration: number }) => void` | 否 | `未指定` | 停止时执行的回调；按签名接收事件或结果，调用方在函数中同步业务状态。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |

**onStart 的真实接入：**

```tsx
onStart={() => setMessage('正在播放模拟语音波形。')}
```

**onStop 的真实接入：**

```tsx
onStop={detail => setMessage(`模拟结束，用时 ${(detail.duration / 1000).toFixed(1)} 秒；原因：${detail.reason}。`)}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，不改写上游 API。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.reactive` | `"simulated"` | select | "simulated" / "mic" | 调节结束后重建 |
| `t0.mode` | `"toggle"` | select | "auto" / "hold" / "toggle" | 调节结束后重建 |
| `t0.waveform` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.showTime` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.size` | `40` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.background` | `"rgb(250 247 240 / 0.82)"` | text | 不限 ~ 不限 | 调节结束后重建 |
| `t0.accentColor` | `"#52604e"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.iconColor` | `"#1f2d26"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.ariaLabel` | `"开始或停止模拟语音波形"` | text | 不限 ~ 不限 | 调节结束后重建 |
| `t0.shape` | `"pill"` | select | "pill" / "rounded" | 调节结束后重建 |
| `t0.reach` | `8` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.slideToCancel` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.cancelDistance` | `64` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.attack` | `40` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.release` | `240` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.sensitivity` | `1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.floor` | `0.1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.openDuration` | `200` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.pressScale` | `0.95` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.holdAfter` | `300` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.disabled` | `false` | switch | 不限 ~ 不限 | 调节结束后重建 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Wan 皮肤

- 容器、状态色、边界与焦点使用 Agent Wan 规范；交互命中区不随视觉形变缩小。
- 组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。

## 5. 加载、动效与降级

本例实际配置：本例显式设置 reactive="simulated"，只演示波形、切换和计时，不请求麦克风、不录音。若产品需要真实音频模式，按实际 API 在用户主动操作后接入。

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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [按钮与操作](../categories/actions.md)；否则直接完成当前组件。
