# Prompt Bar

表单与选择 · `prompt-bar` · 中文意图：聊天输入 / 提示词输入 / 模型选择 / 附件输入

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-ric-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

消息输入整合来源命令模型与附件入口。

功能要求：提供真实受控值、可访问标签、键盘输入、中文输入法和错误状态；权限与提交只在明确动作后执行。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/form/prompt-bar.tsx](../../src/demos/form/prompt-bar.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Micro/PromptBar/PromptBar.tsx](../../.upstream/src/ts-default/Micro/PromptBar/PromptBar.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Micro/PromptBar/PromptBar.css](../../.upstream/src/ts-default/Micro/PromptBar/PromptBar.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/prompt-bar.json](../../src/parameters/definitions/prompt-bar.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component prompt-bar
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Prompt Bar 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：640px（宿主设置，不是组件 Props）。
import { useState } from 'react';
import PromptBar from '../../../.upstream/src/ts-default/Micro/PromptBar/PromptBar';
import { DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
const cn=(names:string)=>componentClasses(styles,names);




export default function PromptBarDemo() {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('输入内容，使用 @ 或 / 选择上下文与命令。');
  return <DemoPanel title="Prompt Bar · Agent 输入栏"><div className={cn("aw-micro-stack")}>
    <div className={cn("aw-micro-wide")}><PromptBar              busy={busy} onSend={(text, detail) => { setBusy(true); setMessage(`已接收本地模拟请求：${text}；${detail.model?.name ?? '默认演示模型'}，附带 ${detail.attachments.length} 项。`); }} onStop={() => { setBusy(false); setMessage('本地模拟任务已停止。'); }} onAttach={() => { setMessage('已添加模拟文件名，没有读取本机文件。'); return 'design-notes-demo.md'; }} onDictate={() => { setMessage('已填入模拟语音文本，没有请求麦克风。'); return '根据霜玻璃规范创建一个技能管理页面'; }} onEffortChange={effort => setMessage(`演示推理强度：${effort}`)} placeholder={"描述想要构建的页面…"} sources={[{ "key": "design", "name": "设计规范", "description": "本地演示上下文" }, { "key": "files", "name": "附加示例文件", "description": "只添加模拟文件名", "attach": true }]} commands={[{ "key": "summarize", "name": "/总结", "description": "生成本地演示摘要" }, { "key": "compare", "name": "/比较", "description": "比较两个方案" }]} models={[{ "key": "quick", "name": "示例 · 快速", "tag": "本地" }, { "key": "deep", "name": "示例 · 深入", "tag": "本地" }]} defaultModel={"quick"} efforts={["低", "中", "高"]} defaultEffort={"中"} width={500} background={"rgb(250 247 240 / 0.82)"} color={"#1f2d26"} menuBackground={"#faf7f0"} sparkColor={"#a6b39a"} radius={20} sparkBoost={1} maxRows={5} morphDuration={240} squash={0.12} tilt={8} pressScale={0.96}  /></div>
    {busy ? <div className={cn("aw-micro-controls")}><button className={styles['aw-micro-action']}  onClick={() => { setBusy(false); setMessage('本地模拟任务已完成。'); }} type={"button"} >完成模拟任务</button></div> : null}
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">{message}</p>
    <p className={cn("aw-micro-hint")}>此示例展示输入、附件、命令、发送与停止状态，未连接模型或录音设备。</p>
  </div></DemoPanel>;
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `placeholder` | `string` | 否 | `'Ask anything'` | 尚未填写或选择时显示的提示文字。 |
| `sources` | `PromptBarSource[]` | 否 | `DEFAULT_SOURCES` | 按顺序展示的媒体资源地址列表。 |
| `commands` | `PromptBarCommand[]` | 否 | `DEFAULT_COMMANDS` | 命令列表的有序数据集合；每一项按数组元素类型配置。 |
| `models` | `PromptBarModel[]` | 否 | `DEFAULT_MODELS` | 模型的有序数据集合；每一项按数组元素类型配置。 |
| `defaultModel` | `string` | 否 | `''` | 非受控初始模型，控制 prompt bar 的对应渲染或交互参数。 |
| `efforts` | `string[]` | 否 | `DEFAULT_EFFORTS` | 思考力度候选的有序数据集合；每一项按数组元素类型配置。 |
| `defaultEffort` | `string` | 否 | `''` | 非受控初始思考力度，控制 prompt bar 的对应渲染或交互参数。 |
| `onEffortChange` | `(effort: string) => void` | 否 | `未指定` | 用户切换思考力度或工作模式时通知调用方。 |
| `busy` | `boolean` | 否 | `false` | 是否忙碌，决定该分支的展示或交互行为。 |
| `onSend` | `(text: string, detail: PromptBarSendDetail) => void` | 否 | `未指定` | 用户提交文本或消息时通知调用方。 |
| `onStop` | `() => void` | 否 | `未指定` | 停止时执行的回调；按签名接收事件或结果，调用方在函数中同步业务状态。 |
| `onAttach` | `() => string \| string[] \| void \| Promise<string \| string[] \| void>` | 否 | `未指定` | 用户请求添加附件时通知调用方。 |
| `onDictate` | `() => string \| void \| Promise<string \| void>` | 否 | `未指定` | 用户激活听写入口时通知调用方。 |
| `background` | `string` | 否 | `'#27272a'` | 背景，控制 prompt bar 的对应渲染或交互参数。 |
| `color` | `string` | 否 | `'#f5f5f5'` | 颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `menuBackground` | `string` | 否 | `'#323236'` | 菜单背景，控制 prompt bar 的对应渲染或交互参数。 |
| `sparkColor` | `string` | 否 | `'#b39dff'` | 火花颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `sparkBoost` | `number` | 否 | `1` | 火花加速，控制 prompt bar 的对应渲染或交互参数。 |
| `width` | `number` | 否 | `400` | 容器或效果的宽度，CSS 字符串与数值的支持以类型为准。 |
| `radius` | `number` | 否 | `16` | 半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `maxRows` | `number` | 否 | `5` | 最大行数，控制 prompt bar 的对应渲染或交互参数。 |
| `morphDuration` | `number` | 否 | `240` | 形态变换时长，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `squash` | `number` | 否 | `0.12` | 挤压，控制 prompt bar 的对应渲染或交互参数。 |
| `tilt` | `number` | 否 | `8` | 倾斜，控制 prompt bar 的对应渲染或交互参数。 |
| `pressScale` | `number` | 否 | `0.96` | 按压缩放，控制 prompt bar 的对应渲染或交互参数。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `button.className` | `string \| undefined` | 否 | `未指定` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `button.type` | `"button" \| "reset" \| "submit" \| undefined` | 否 | `未指定` | 原生输入或按钮的行为类型；按钮类型会影响表单提交。 |
| `button.onClick` | `MouseEventHandler<HTMLButtonElement> \| undefined` | 否 | `未指定` | 用户点击或通过键盘激活时触发的事件处理函数。 |
| `button.children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |

**继承的原生属性：**

- `DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**sources 的真实接入：**

```tsx
sources={sources}
```

**commands 的真实接入：**

```tsx
commands={commands}
```

**models 的真实接入：**

```tsx
models={models}
```

**efforts 的真实接入：**

```tsx
efforts={['低', '中', '高']}
```

**onEffortChange 的真实接入：**

```tsx
onEffortChange={effort => setMessage(`演示推理强度：${effort}`)}
```

**onSend 的真实接入：**

```tsx
onSend={(text, detail) => { setBusy(true); setMessage(`已接收本地模拟请求：${text}；${detail.model?.name ?? '默认演示模型'}，附带 ${detail.attachments.length} 项。`); }}
```

**onStop 的真实接入：**

```tsx
onStop={() => { setBusy(false); setMessage('本地模拟任务已停止。'); }}
```

**onAttach 的真实接入：**

```tsx
onAttach={() => { setMessage('已添加模拟文件名，没有读取本机文件。'); return 'design-notes-demo.md'; }}
```

**onDictate 的真实接入：**

```tsx
onDictate={() => { setMessage('已填入模拟语音文本，没有请求麦克风。'); return '根据霜玻璃规范创建一个技能管理页面'; }}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.placeholder` | `"描述想要构建的页面…"` | text | 不限 ~ 不限 | 调节结束后重建 |
| `t0.sources` | `[{"key":"design","name":"设计规范","description":"本地演示上下文"},{"key":"files","name":"附加示例文件","description":"只添加模拟文件名","attach":true}]` | json | 不限 ~ 不限 | 调节结束后重建 |
| `t0.commands` | `[{"key":"summarize","name":"/总结","description":"生成本地演示摘要"},{"key":"compare","name":"/比较","description":"比较两个方案"}]` | json | 不限 ~ 不限 | 调节结束后重建 |
| `t0.models` | `[{"key":"quick","name":"示例 · 快速","tag":"本地"},{"key":"deep","name":"示例 · 深入","tag":"本地"}]` | json | 不限 ~ 不限 | 调节结束后重建 |
| `t0.defaultModel` | `"quick"` | text | 不限 ~ 不限 | 调节结束后重建 |
| `t0.efforts` | `["低","中","高"]` | json | 不限 ~ 不限 | 调节结束后重建 |
| `t0.defaultEffort` | `"中"` | text | 不限 ~ 不限 | 调节结束后重建 |
| `t0.width` | `500` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.background` | `"rgb(250 247 240 / 0.82)"` | text | 不限 ~ 不限 | 调节结束后重建 |
| `t0.color` | `"#1f2d26"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.menuBackground` | `"#faf7f0"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.sparkColor` | `"#a6b39a"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.radius` | `20` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.sparkBoost` | `1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.maxRows` | `5` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.morphDuration` | `240` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.squash` | `0.12` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.tilt` | `8` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.pressScale` | `0.96` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t1.type` | `"button"` | select | "button" / "reset" / "submit" | 调节结束后重建 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `640`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Ric 皮肤

- 容器、状态色、边界与焦点使用 Agent Ric 规范；交互命中区不随视觉形变缩小。
- 组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。

## 5. 加载、动效与降级

本例实际配置：本例 onDictate 返回模拟文本、onAttach 返回模拟文件名；不会读取本机文件或录音。发送和停止均为本地演示状态，真实模型与附件服务需由业务层接入。

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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [表单与选择](../effects/categories/form.md)；否则直接完成当前组件。
