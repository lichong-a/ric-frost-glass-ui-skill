# Bell Toggle

按钮与操作 · `bell-toggle` · 中文意图：铃铛开关 / 通知开关

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

按下后铃铛动画与标签状态同步变化。

功能要求：由真实 value / state 与回调驱动；操作可用键盘完成，不能只在动画内部保存业务状态。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/actions/bell-toggle.tsx](../../src/demos/actions/bell-toggle.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Micro/BellToggle/BellToggle.tsx](../../.upstream/src/ts-default/Micro/BellToggle/BellToggle.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Micro/BellToggle/BellToggle.css](../../.upstream/src/ts-default/Micro/BellToggle/BellToggle.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/bell-toggle.json](../../src/parameters/definitions/bell-toggle.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component bell-toggle
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Bell Toggle 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import { useState } from 'react';
import BellToggle from '../../../.upstream/src/ts-default/Micro/BellToggle/BellToggle';
import { palette, DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
const cn=(names:string)=>componentClasses(styles,names);

export default function BellToggleDemo() {
  const [pressed, setPressed] = useState(false);
  return <DemoPanel title="Bell Toggle · 通知开关"><div className={cn("aw-micro-stack")}>
    <BellToggle pressed={pressed} onChange={setPressed}  onLabel="通知已开启"   onColor={palette.ivory} onBackground={palette.primary}      offLabel={"开启通知"} color={"#1f2d26"} background={"rgb(250 247 240 / 0.82)"} badge={true} count={3} badgeColor={"#9c6d56"} badgeTextColor={"#faf7f0"} radius={12} size={"md"} ringAmplitude={17} ringPasses={5} ringDecay={1} ringDuration={820} ringPivot={16} crossfadeMs={200} revealBounce={0} waves={true} clapper={false} disabled={false}  />
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">演示通知：{pressed ? '已开启' : '已关闭'}</p>
  </div></DemoPanel>;
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `offLabel` | `string` | 否 | `'Notify me'` | 关闭时标签，控制 bell toggle 的对应渲染或交互参数。 |
| `onLabel` | `string` | 否 | `"You'll be notified"` | 标签时执行的回调；按签名接收事件或结果，调用方在函数中同步业务状态。 |
| `icon` | `ReactNode` | 否 | `<HugeiconsIcon icon={Notification03Icon} size={iconSize} strokeWidth={2} />` | 图标，控制 bell toggle 的对应渲染或交互参数。 |
| `label` | `string` | 否 | `offLabel` | 向用户或辅助技术说明控件的名称。 |
| `color` | `string` | 否 | `'#f5f5f5'` | 颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `background` | `string` | 否 | `'#27272a'` | 背景，控制 bell toggle 的对应渲染或交互参数。 |
| `onColor` | `string` | 否 | `'#18181b'` | 用户选择颜色时通知调用方，参数为新颜色。 |
| `onBackground` | `string` | 否 | `'#f5f5f5'` | 用户选择背景设置时通知调用方。 |
| `size` | `BellToggleSize` | 否 | `'md'` | 尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `radius` | `number` | 否 | `22` | 半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `ringAmplitude` | `number` | 否 | `17` | 圆环振幅，控制 bell toggle 的对应渲染或交互参数。 |
| `ringPasses` | `number` | 否 | `5` | 圆环扫描次数，控制 bell toggle 的对应渲染或交互参数。 |
| `ringDecay` | `number` | 否 | `1` | 圆环衰减，控制 bell toggle 的对应渲染或交互参数。 |
| `ringDuration` | `number` | 否 | `820` | 圆环时长，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `ringPivot` | `number` | 否 | `16` | 圆环支点，控制 bell toggle 的对应渲染或交互参数。 |
| `crossfadeMs` | `number` | 否 | `200` | 交叉淡变毫秒，控制 bell toggle 的对应渲染或交互参数。 |
| `revealBounce` | `number` | 否 | `0` | 显现回弹，控制 bell toggle 的对应渲染或交互参数。 |
| `count` | `number` | 否 | `0` | 数量，控制 bell toggle 的对应渲染或交互参数。 |
| `badge` | `boolean` | 否 | `true` | 是否标记，决定该分支的展示或交互行为。 |
| `badgeColor` | `string` | 否 | `'#ef4444'` | 标记颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `badgeTextColor` | `string` | 否 | `'#ffffff'` | 标记文字颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `waves` | `boolean` | 否 | `true` | 是否波组，决定该分支的展示或交互行为。 |
| `clapper` | `boolean` | 否 | `false` | 是否显示铃铛内部的钟锤及其摆动。 |
| `pressed` | `boolean` | 否 | `inner` | 按钮的当前切换选中状态。 |
| `defaultPressed` | `boolean` | 否 | `false` | 是否非受控初始按下选中状态，决定该分支的展示或交互行为。 |
| `onChange` | `(pressed: boolean) => void` | 否 | `未指定` | 用户改变值或条目顺序时通知调用方；回调参数类型就是应写回的值或原生事件。 |
| `disabled` | `boolean` | 否 | `false` | 是否禁用控件的用户交互。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |

**icon 的真实接入：**

```tsx
icon={"示例"}
```

**onChange 的真实接入：**

```tsx
onChange={setPressed}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.offLabel` | `"开启通知"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.color` | `"#1f2d26"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.background` | `"rgb(250 247 240 / 0.82)"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.badge` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.count` | `3` | range | 0 ~ 128 | 即时应用 |
| `t0.badgeColor` | `"#9c6d56"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.badgeTextColor` | `"#faf7f0"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.radius` | `12` | number | 不限 ~ 不限 | 即时应用 |
| `t0.size` | `"md"` | select | "sm" / "md" / "lg" | 即时应用 |
| `t0.ringAmplitude` | `17` | number | 不限 ~ 不限 | 即时应用 |
| `t0.ringPasses` | `5` | number | 不限 ~ 不限 | 即时应用 |
| `t0.ringDecay` | `1` | number | 不限 ~ 不限 | 即时应用 |
| `t0.ringDuration` | `820` | number | 不限 ~ 不限 | 即时应用 |
| `t0.ringPivot` | `16` | number | 不限 ~ 不限 | 即时应用 |
| `t0.crossfadeMs` | `200` | number | 不限 ~ 不限 | 即时应用 |
| `t0.revealBounce` | `0` | number | 不限 ~ 不限 | 即时应用 |
| `t0.waves` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.clapper` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.disabled` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `state.pressed` | `false` | switch | 不限 ~ 不限 | 即时应用；原组件回调同步受控值 |

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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [按钮与操作](../effects/categories/actions.md)；否则直接完成当前组件。
