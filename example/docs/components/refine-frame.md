# Refine Frame

媒体与轮播 · `refine-frame` · 中文意图：生成过程图片 / 图像阶段 / 生成预览

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-ric-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

媒体框按生成阶段更新图像且尺寸稳定。

功能要求：状态、计时和公开步骤摘要来自任务数据。示例明确标注为模拟；不伪造隐藏推理或完成结果。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/media/refine-frame.tsx](../../src/demos/media/refine-frame.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Micro/RefineFrame/RefineFrame.tsx](../../.upstream/src/ts-default/Micro/RefineFrame/RefineFrame.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Micro/RefineFrame/RefineFrame.css](../../.upstream/src/ts-default/Micro/RefineFrame/RefineFrame.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/refine-frame.json](../../src/parameters/definitions/refine-frame.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component refine-frame
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Refine Frame 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：640px（宿主设置，不是组件 Props）。
import { useState } from 'react';
import RefineFrame, { type RefineFrameStatus } from '../../../.upstream/src/ts-default/Micro/RefineFrame/RefineFrame';
import { DemoPanel } from '../../shared/demo-support';
import { microPaperArtwork } from '../../shared/micro-assets';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
const cn=(names:string)=>componentClasses(styles,names);

const labels: Record<RefineFrameStatus, string> = { queued: '等待中', generating: '正在生成', refining: '正在精修', complete: '完成', error: '生成失败' };
const states: RefineFrameStatus[] = ['queued', 'generating', 'refining', 'complete', 'error'];
export default function RefineFrameDemo() {
  const [status, setStatus] = useState<RefineFrameStatus>('generating');
  return <DemoPanel title="Refine Frame · 渐进生成框"><div className={cn("aw-micro-stack")}>
    <RefineFrame status={status}        onRetry={() => setStatus('generating')} aspectRatio={"4/3"} width={380} radius={20} background={"rgb(250 247 240 / 0.82)"} color={"#1f2d26"} labels={{ "queued": "等待中", "generating": "正在生成", "refining": "正在精修", "complete": "完成", "error": "生成失败" }} retryLabel={"重试示例"} stageDuration={400} sweep={true} showStatus={true} hideAfter={1200} ><img src={microPaperArtwork}  className={cn("aw-micro-image")} alt={"本地自然色示例图"}  /></RefineFrame>
    <div className={cn("aw-micro-controls")}>{states.map(value => <button className={styles['aw-micro-action']} key={value}  aria-pressed={status === value} onClick={() => setStatus(value)} type={"button"} >{labels[value]}</button>)}</div>
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">当前仅模拟生成阶段：{labels[status]}</p>
  </div></DemoPanel>;
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `status` | `RefineFrameStatus` | 否 | `'generating'` | 状态，控制 refine frame 的对应渲染或交互参数。 |
| `children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `aspectRatio` | `string` | 否 | `'4 / 3'` | 宽高比例，控制 refine frame 的对应渲染或交互参数。 |
| `width` | `number` | 否 | `320` | 容器或效果的宽度，CSS 字符串与数值的支持以类型为准。 |
| `radius` | `number` | 否 | `16` | 半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `background` | `string` | 否 | `'#27272a'` | 背景，控制 refine frame 的对应渲染或交互参数。 |
| `color` | `string` | 否 | `'#f5f5f5'` | 颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `stageDuration` | `number` | 否 | `400` | 阶段时长，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `sweep` | `boolean` | 否 | `true` | 是否扫掠，决定该分支的展示或交互行为。 |
| `showStatus` | `boolean` | 否 | `true` | 是否显示状态，决定该分支的展示或交互行为。 |
| `hideAfter` | `number` | 否 | `1200` | 是否隐藏之后，决定该分支的展示或交互行为。 |
| `labels` | `Partial<Record<RefineFrameStatus, string>>` | 否 | `DEFAULT_LABELS` | 标签的结构化配置；对象字段按完整类型传入并由组件读取。 |
| `retryLabel` | `string` | 否 | `'Retry'` | 重试标签，控制 refine frame 的对应渲染或交互参数。 |
| `onRetry` | `() => void` | 否 | `未指定` | 用户请求重试失败操作时通知调用方。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `img.src` | `string \| undefined` | 否 | `未指定` | 加载图像、视频或纹理的资源地址。 |
| `img.alt` | `string \| undefined` | 否 | `未指定` | 图像无法显示及辅助技术读取时的替代文字。 |
| `img.className` | `string \| undefined` | 否 | `未指定` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `button.className` | `string \| undefined` | 否 | `未指定` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `button.key` | `Key \| null \| undefined` | 否 | `未指定` | React 列表项身份，用于更新时保持对应节点。 |
| `button.type` | `"button" \| "reset" \| "submit" \| undefined` | 否 | `未指定` | 原生输入或按钮的行为类型；按钮类型会影响表单提交。 |
| `button.aria-pressed` | `boolean \| "true" \| "false" \| "mixed" \| undefined` | 否 | `未指定` | 辅助技术的 pressed 状态或说明；值须与控件当前可观察行为一致。 |
| `button.onClick` | `MouseEventHandler<HTMLButtonElement> \| undefined` | 否 | `未指定` | 用户点击或通过键盘激活时触发的事件处理函数。 |
| `button.children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |

**继承的原生属性：**

- `DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**status 的真实接入：**

```tsx
status={status}
```

**children 的真实接入：**

```tsx
children={<><img src={microPaperArtwork} alt="本地自然色示例图" className={cn("aw-micro-image")} /></>}
```

**labels 的真实接入：**

```tsx
labels={labels}
```

**onRetry 的真实接入：**

```tsx
onRetry={() => setStatus('generating')}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.aspectRatio` | `"4/3"` | text | 不限 ~ 不限 | 调节结束后重建 |
| `t0.width` | `380` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.radius` | `20` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.background` | `"rgb(250 247 240 / 0.82)"` | text | 不限 ~ 不限 | 调节结束后重建 |
| `t0.color` | `"#1f2d26"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.labels` | `{"queued":"等待中","generating":"正在生成","refining":"正在精修","complete":"完成","error":"生成失败"}` | json | 不限 ~ 不限 | 调节结束后重建 |
| `t0.retryLabel` | `"重试示例"` | text | 不限 ~ 不限 | 调节结束后重建 |
| `t0.stageDuration` | `400` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.sweep` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.showStatus` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.hideAfter` | `1200` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t1.alt` | `"本地自然色示例图"` | text | 不限 ~ 不限 | 调节结束后重建 |
| `t2.type` | `"button"` | select | "button" / "reset" / "submit" | 调节结束后重建 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `640`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Ric 皮肤

- 容器、状态色、边界与焦点使用 Agent Ric 规范；交互命中区不随视觉形变缩小。
- 组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。

## 5. 加载、动效与降级

本例实际配置：设备访问与音频行为以本例真实 Props 和显式回调为准。capabilities 是源码扫描提示，不能据此声称已请求相机、录音或播放音频。

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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [媒体与轮播](../effects/categories/media.md)；否则直接完成当前组件。
