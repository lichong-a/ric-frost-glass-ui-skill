# Warm Tooltip

弹层与辅助 · `warm-tooltip` · 中文意图：连续提示 / 暖启动提示 / 工具提示

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

第一项延迟提示后相邻项更快出现。

功能要求：保持内容的语义和可访问名称；只有真实可交互元素可进入焦点顺序。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/overlay/warm-tooltip.tsx](../../src/demos/overlay/warm-tooltip.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Micro/WarmTooltip/WarmTooltip.tsx](../../.upstream/src/ts-default/Micro/WarmTooltip/WarmTooltip.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Micro/WarmTooltip/WarmTooltip.css](../../.upstream/src/ts-default/Micro/WarmTooltip/WarmTooltip.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/warm-tooltip.json](../../src/parameters/definitions/warm-tooltip.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component warm-tooltip
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Warm Tooltip 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import { useState } from 'react';
import WarmTooltip, { WarmTooltipGroup } from '../../../.upstream/src/ts-default/Micro/WarmTooltip/WarmTooltip';
import { DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
const cn=(names:string)=>componentClasses(styles,names);

const actions = [{ label: '复制', content: '复制当前组件配置', shortcut: '⌘ C' }, { label: '收藏', content: '加入本地演示收藏', shortcut: '⌘ D' }, { label: '检查', content: '查看组件验收要求', shortcut: '⌘ I' }];
export default function WarmTooltipDemo() {
  const [message, setMessage] = useState('悬停或聚焦一个操作，然后移到相邻操作。');
  const [warm, setWarm] = useState(false);
  return <DemoPanel title="Warm Tooltip · 连续提示"><div className={cn("aw-micro-stack")}>
    <WarmTooltipGroup   onWarmChange={setWarm} delay={600} warmWindow={1200} travel={320} lean={0} ><div className={cn("aw-micro-row")}>{actions.map(item => <WarmTooltip key={item.label} content={item.content} shortcut={item.shortcut}     surfaceColor={"#52604e"} inkColor={"#faf7f0"} radius={10} side={"top"} size={"md"} gap={8} arrow={true} popDuration={160} popScale={0.94} popBlur={4} showFuse={false} longPress={500} disabled={false} ><button  className={cn("aw-micro-action")} onClick={() => setMessage(`已触发本地演示操作：${item.label}`)} type={"button"} >{item.label}</button></WarmTooltip>)}</div></WarmTooltipGroup>
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">{message} 提示组：{warm ? '连续浏览中' : '等待首次提示'}</p>
  </div></DemoPanel>;
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `content` | `ReactNode` | 是 | `未指定` | 内容，控制 warm tooltip 的对应渲染或交互参数。 |
| `shortcut` | `ReactNode` | 否 | `未指定` | 快捷键，控制 warm tooltip 的对应渲染或交互参数。 |
| `children` | `ReactElement<Record<string, unknown>>` | 是 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `side` | `WarmTooltipSide` | 否 | `'top'` | 抽屉或浮层从哪个边缘出现。 |
| `delay` | `number` | 否 | `未指定` | 开始动画或执行回调之前的等待时长。 |
| `warmWindow` | `number` | 否 | `未指定` | 预热窗口，控制 warm tooltip 的对应渲染或交互参数。 |
| `surfaceColor` | `string` | 否 | `'#f5f5f5'` | 表面颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `inkColor` | `string` | 否 | `'#18181b'` | 墨色颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `size` | `WarmTooltipSize` | 否 | `'md'` | 尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `radius` | `number` | 否 | `8` | 半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `gap` | `number` | 否 | `8` | 相邻单元、卡片或字符之间的间距；单位由组件实现定义。 |
| `arrow` | `boolean` | 否 | `true` | 是否箭头，决定该分支的展示或交互行为。 |
| `popDuration` | `number` | 否 | `160` | 弹出时长，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `popScale` | `number` | 否 | `0.94` | 弹出缩放，控制 warm tooltip 的对应渲染或交互参数。 |
| `popBlur` | `number` | 否 | `4` | 弹出模糊，控制 warm tooltip 的对应渲染或交互参数。 |
| `showFuse` | `boolean` | 否 | `false` | 是否显示导火线，决定该分支的展示或交互行为。 |
| `longPress` | `number` | 否 | `500` | 长按按压，控制 warm tooltip 的对应渲染或交互参数。 |
| `disabled` | `boolean` | 否 | `false` | 是否禁用控件的用户交互。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `WarmTooltipGroup.delay` | `number` | 否 | `400` | 开始动画或执行回调之前的等待时长。 |
| `WarmTooltipGroup.warmWindow` | `number` | 否 | `300` | 预热窗口，控制 warm tooltip 的对应渲染或交互参数。 |
| `WarmTooltipGroup.travel` | `number` | 否 | `320` | 移动距离，控制 warm tooltip 的对应渲染或交互参数。 |
| `WarmTooltipGroup.lean` | `number` | 否 | `0` | 倾斜，控制 warm tooltip 的对应渲染或交互参数。 |
| `WarmTooltipGroup.onWarmChange` | `(warm: boolean) => void` | 否 | `未指定` | 预热改变时执行的回调；按签名接收事件或结果，调用方在函数中同步业务状态。 |
| `WarmTooltipGroup.children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `WarmTooltipGroup.ref` | `React.Ref<WarmTooltipGroupHandle> \| undefined` | 否 | `未指定` | 连接实际 DOM 元素或组件命令句柄，支持类型声明中的 ref 形式。 |
| `button.type` | `"button" \| "reset" \| "submit" \| undefined` | 否 | `未指定` | 原生输入或按钮的行为类型；按钮类型会影响表单提交。 |
| `button.className` | `string \| undefined` | 否 | `未指定` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `button.onClick` | `MouseEventHandler<HTMLButtonElement> \| undefined` | 否 | `未指定` | 用户点击或通过键盘激活时触发的事件处理函数。 |
| `button.children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |

**继承的原生属性：**

- `Ref<WarmTooltipGroupHandle> | undefined`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**content 的真实接入：**

```tsx
content={item.content}
```

**shortcut 的真实接入：**

```tsx
shortcut={item.shortcut}
```

**children 的真实接入：**

```tsx
children={<><button type="button" className={cn("aw-micro-action")} onClick={() => setMessage(`已触发本地演示操作：${item.label}`)}>{item.label}</button></>}
```

**onWarmChange 的真实接入：**

```tsx
onWarmChange={setWarm}
```

**children 的真实接入：**

```tsx
children={<><div className={cn("aw-micro-row")}>{actions.map(item => <WarmTooltip key={item.label} content={item.content} shortcut={item.shortcut} surfaceColor={palette.primary} inkColor={palette.ivory} radius={10} side="top"><button type="button" className={cn("aw-micro-action")} onClick={() => setMessage(`已触发本地演示操作：${item.label}`)}>{item.label}</button></WarmTooltip>)}</div></>}
```

**ref 的真实接入：**

```tsx
const elementRef = useRef<WarmTooltipGroupHandle | null>(null);
// JSX: ref={elementRef}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.delay` | `600` | number | 不限 ~ 不限 | 即时应用 |
| `t0.warmWindow` | `1200` | number | 不限 ~ 不限 | 即时应用 |
| `t0.travel` | `320` | number | 不限 ~ 不限 | 即时应用 |
| `t0.lean` | `0` | number | 不限 ~ 不限 | 即时应用 |
| `t1.surfaceColor` | `"#52604e"` | color | 不限 ~ 不限 | 即时应用 |
| `t1.inkColor` | `"#faf7f0"` | color | 不限 ~ 不限 | 即时应用 |
| `t1.radius` | `10` | number | 不限 ~ 不限 | 即时应用 |
| `t1.side` | `"top"` | select | "top" / "bottom" / "left" / "right" | 即时应用 |
| `t1.size` | `"md"` | select | "sm" / "md" / "lg" | 即时应用 |
| `t1.gap` | `8` | number | 不限 ~ 不限 | 即时应用 |
| `t1.arrow` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t1.popDuration` | `160` | number | 不限 ~ 不限 | 即时应用 |
| `t1.popScale` | `0.94` | number | 不限 ~ 不限 | 即时应用 |
| `t1.popBlur` | `4` | number | 不限 ~ 不限 | 即时应用 |
| `t1.showFuse` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t1.longPress` | `500` | number | 不限 ~ 不限 | 即时应用 |
| `t1.disabled` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t2.type` | `"button"` | select | "button" / "reset" / "submit" | 即时应用 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Wan 皮肤

- 容器、状态色、边界与焦点使用 Agent Wan 规范；交互命中区不随视觉形变缩小。
- 组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。

## 5. 加载、动效与降级

本例实际配置：设备访问与音频行为以本例真实 Props 和显式回调为准。capabilities 是源码扫描提示，不能据此声称已请求相机、录音或播放音频。

- 依赖清单：`motion`、`react`、`react-dom`。安装前复用目标项目的兼容版本，不重复加载。
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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [弹层与辅助](../effects/categories/overlay.md)；否则直接完成当前组件。
