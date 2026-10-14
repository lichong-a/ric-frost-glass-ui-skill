# Curved Input

表单与选择 · `curved-input` · 中文意图：弧形输入 / 弯曲输入框

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-ric-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

输入文本、光标和提交入口沿弧线布局。

功能要求：提供真实受控值、可访问标签、键盘输入、中文输入法和错误状态；权限与提交只在明确动作后执行。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/form/curved-input.tsx](../../src/demos/form/curved-input.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Components/CurvedInput/CurvedInput.tsx](../../.upstream/src/ts-default/Components/CurvedInput/CurvedInput.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Components/CurvedInput/CurvedInput.css](../../.upstream/src/ts-default/Components/CurvedInput/CurvedInput.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/curved-input.json](../../src/parameters/definitions/curved-input.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component curved-input
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Curved Input 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Components/CurvedInput/CurvedInput';
import { palette } from '../../shared/demo-support';
import { useState } from "react";
// 真实受控输入与提交回调，提供中文标签和结果反馈。

export default function CurvedInputDemo() {
  const [status, setStatus] = useState("弧形输入内容并提交，示例不会创建后台数据");
const [value, setValue] = useState("");
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 400, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <div style={{ width: '100%', height: '100%' }}><div style={{ minHeight: 300, display: 'grid', placeItems: 'center', padding: 28 }}><Component value={value} onChange={setValue}
onSubmit={submitted => setStatus(submitted.trim() ? '已提交示例：' + submitted : '请先填写内容')}




   placeholder={"输入你的工作流名称"} buttonText={"创建"} ariaLabel={"工作流名称"} theme={"light"} bend={14} height={56} width={"100%"} cornerRadius={14} backgroundColor={"#faf7f0"} textColor={"#1f2d26"} placeholderColor={"#64695f"} borderColor={"#a6b39a"} buttonColor={"#52604e"} buttonTextColor={"#faf7f0"} iconColor={"#52604e"} shadowSize={"sm"} shadowColor={"#a6b39a"} type={"email"} borderWidth={1.5} fontSize={16} showButton={true} showIcon={true}  /></div><p role="status" aria-live="polite" style={{ margin: '12px 20px', fontSize: 14, color: palette.muted }}>{status}</p></div>
    </div>
  );
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `value` | `string` | 否 | `未指定` | 当前受控值，由调用方维护并随交互回调更新。 |
| `defaultValue` | `string` | 否 | `''` | 非受控模式的初始值；挂载后更新通常通过内部状态或受控 value 完成。 |
| `onChange` | `(value: string) => void` | 否 | `未指定` | 用户改变值或条目顺序时通知调用方；回调参数类型就是应写回的值或原生事件。 |
| `onSubmit` | `(value: string) => void` | 否 | `未指定` | 提交时执行的回调；按签名接收事件或结果，调用方在函数中同步业务状态。 |
| `placeholder` | `string` | 否 | `'Enter your email'` | 尚未填写或选择时显示的提示文字。 |
| `buttonText` | `string` | 否 | `'Get Started'` | 按钮文字，控制 curved input 的对应渲染或交互参数。 |
| `type` | `string` | 否 | `'email'` | 原生输入或按钮的行为类型；按钮类型会影响表单提交。 |
| `name` | `string` | 否 | `未指定` | 原生表单字段名称，用于表单提交与分组。 |
| `ariaLabel` | `string` | 否 | `placeholder` | 无障碍标签，控制 curved input 的对应渲染或交互参数。 |
| `theme` | `Theme` | 否 | `'dark'` | 主题，控制 curved input 的对应渲染或交互参数。 |
| `width` | `number \| string` | 否 | `450` | 容器或效果的宽度，CSS 字符串与数值的支持以类型为准。 |
| `bend` | `number` | 否 | `28` | 弯曲，控制 curved input 的对应渲染或交互参数。 |
| `height` | `number` | 否 | `64` | 容器或效果的高度，CSS 字符串与数值的支持以类型为准。 |
| `cornerRadius` | `number` | 否 | `18` | 角半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `borderWidth` | `number` | 否 | `1.5` | 边框宽度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `fontSize` | `number` | 否 | `16` | 字体尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `backgroundColor` | `string` | 否 | `palette.backgroundColor` | 背景颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `textColor` | `string` | 否 | `palette.textColor` | 文字颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `placeholderColor` | `string` | 否 | `palette.placeholderColor` | 占位提示颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `borderColor` | `string` | 否 | `palette.borderColor` | 边框颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `buttonColor` | `string` | 否 | `palette.buttonColor` | 按钮颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `buttonTextColor` | `string` | 否 | `palette.buttonTextColor` | 按钮文字颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `iconColor` | `string` | 否 | `accentColor` | 图标颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `shadowSize` | `ShadowSize` | 否 | `'md'` | 阴影尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `shadowColor` | `string` | 否 | `palette.shadowColor` | 阴影颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `showButton` | `boolean` | 否 | `true` | 是否显示按钮，决定该分支的展示或交互行为。 |
| `showIcon` | `boolean` | 否 | `true` | 是否显示图标，决定该分支的展示或交互行为。 |
| `icon` | `ReactNode` | 否 | `(<br>              <><br>                <rect x={-chipW / 2} y={-chipH / 2} width={chipW} height={chipH} rx={chipH * 0.27} fill={chipFill} /><br>                <rect<br>                  x={-ew / 2}<br>                  y={-eh / 2}<br>                  width={ew}<br>                  height={eh}<br>                  rx={1.4}<br>                  fill="none"<br>                  stroke="#ffffff"<br>                  strokeWidth={sw}<br>                  strokeLinejoin="round"<br>                /><br>                <path<br>                  d={`M ${round2(-ew / 2)} ${round2(-eh / 2 + sw * 0.4)} L 0 ${round2(eh * 0.14)} L ${round2(ew / 2)} ${round2(-eh / 2 + sw * 0.4)}`}<br>                  fill="none"<br>                  stroke="#ffffff"<br>                  strokeWidth={sw}<br>                  strokeLinejoin="round"<br>                  strokeLinecap="round"<br>                /><br>              </><br>            )` | 图标，控制 curved input 的对应渲染或交互参数。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `style` | `CSSProperties` | 否 | `未指定` | 容器的 React 内联样式对象，尺寸、布局与 CSS 属性按 CSSProperties 传入。 |

**onChange 的真实接入：**

```tsx
onChange={setValue}
```

**onSubmit 的真实接入：**

```tsx
onSubmit={submitted => setStatus(submitted.trim() ? '已提交示例：' + submitted : '请先填写内容')}
```

**icon 的真实接入：**

```tsx
icon={"示例"}
```

**style 的真实接入：**

```tsx
style={{ width: "100%", minHeight: 240 }}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.placeholder` | `"输入你的工作流名称"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.buttonText` | `"创建"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.ariaLabel` | `"工作流名称"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.theme` | `"light"` | select | "dark" / "light" | 即时应用 |
| `t0.bend` | `14` | number | 不限 ~ 不限 | 即时应用 |
| `t0.height` | `56` | number | 不限 ~ 不限 | 即时应用 |
| `t0.width` | `"100%"` | json | 不限 ~ 不限 | 即时应用 |
| `t0.cornerRadius` | `14` | number | 不限 ~ 不限 | 即时应用 |
| `t0.backgroundColor` | `"#faf7f0"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.textColor` | `"#1f2d26"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.placeholderColor` | `"#64695f"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.borderColor` | `"#a6b39a"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.buttonColor` | `"#52604e"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.buttonTextColor` | `"#faf7f0"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.iconColor` | `"#52604e"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.shadowSize` | `"sm"` | select | "sm" / "md" / "lg" | 即时应用 |
| `t0.shadowColor` | `"#a6b39a"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.type` | `"email"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.borderWidth` | `1.5` | number | 不限 ~ 不限 | 即时应用 |
| `t0.fontSize` | `16` | number | 不限 ~ 不限 | 即时应用 |
| `t0.showButton` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.showIcon` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `state.value` | `""` | text | 不限 ~ 不限 | 即时应用；原组件回调同步受控值 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Ric 皮肤

- 容器、状态色、边界与焦点使用 Agent Ric 规范；交互命中区不随视觉形变缩小。
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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [表单与选择](../effects/categories/form.md)；否则直接完成当前组件。
