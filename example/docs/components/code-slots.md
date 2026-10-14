# Code Slots

表单与选择 · `code-slots` · 中文意图：验证码输入 / 一次性密码 / 数字输入槽

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-ric-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

数字槽输入支持粘贴与可用的自动填充。

功能要求：提供真实受控值、可访问标签、键盘输入、中文输入法和错误状态；权限与提交只在明确动作后执行。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/form/code-slots.tsx](../../src/demos/form/code-slots.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Micro/CodeSlots/CodeSlots.tsx](../../.upstream/src/ts-default/Micro/CodeSlots/CodeSlots.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Micro/CodeSlots/CodeSlots.css](../../.upstream/src/ts-default/Micro/CodeSlots/CodeSlots.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/code-slots.json](../../src/parameters/definitions/code-slots.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component code-slots
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Code Slots 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import { useState } from 'react';
import CodeSlots, { type CodeSlotsStatus } from '../../../.upstream/src/ts-default/Micro/CodeSlots/CodeSlots';
import { DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
const cn=(names:string)=>componentClasses(styles,names);

export default function CodeSlotsDemo() {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<CodeSlotsStatus>('idle');
  return <DemoPanel title="Code Slots · 验证码输入"><div className={cn("aw-micro-stack")}>
    <p className={cn("aw-micro-hint")}>输入演示码 246810 查看成功态，其他完整数字触发错误态。</p>
    <CodeSlots  value={value} status={status} onChange={code => { setValue(code); setStatus('idle'); }} onComplete={code => setStatus(code === '246810' ? 'success' : 'error')}           length={6} autoFocus={false} ariaLabel={"六位演示验证码"} accentColor={"#52604e"} inkColor={"#1f2d26"} slotColor={"rgb(250 247 240 / 0.82)"} digitColor={"#1f2d26"} dangerColor={"#9c6d56"} slotSize={44} gap={8} radius={10} mask={false} caret={true} disabled={false} bounce={0.2} settle={0.3} rise={8} cascade={20}  />
    <div className={cn("aw-micro-controls")}><button className={styles['aw-micro-action']}  onClick={() => { setValue(''); setStatus('idle'); }} type={"button"} >清空重试</button></div>
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">{status === 'success' ? '演示校验成功' : status === 'error' ? '演示码不匹配，请重试' : `已输入 ${value.length} / 6 位`}</p>
  </div></DemoPanel>;
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `length` | `number` | 否 | `6` | 长度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `value` | `string` | 否 | `defaultValue` | 当前受控值，由调用方维护并随交互回调更新。 |
| `defaultValue` | `string` | 否 | `''` | 非受控模式的初始值；挂载后更新通常通过内部状态或受控 value 完成。 |
| `onChange` | `(code: string) => void` | 否 | `未指定` | 用户改变值或条目顺序时通知调用方；回调参数类型就是应写回的值或原生事件。 |
| `onComplete` | `(code: string) => void` | 否 | `未指定` | 动作、输入或动画达到完成状态时通知调用方。 |
| `status` | `CodeSlotsStatus` | 否 | `'idle'` | 状态，控制 code slots 的对应渲染或交互参数。 |
| `mask` | `boolean` | 否 | `false` | 是否蒙版，决定该分支的展示或交互行为。 |
| `caret` | `boolean` | 否 | `true` | 是否插入光标，决定该分支的展示或交互行为。 |
| `disabled` | `boolean` | 否 | `false` | 是否禁用控件的用户交互。 |
| `autoFocus` | `boolean` | 否 | `false` | 是否自动焦点，决定该分支的展示或交互行为。 |
| `accentColor` | `string` | 否 | `'#f5f5f5'` | 强调颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `inkColor` | `string` | 否 | `'#f5f5f5'` | 墨色颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `slotColor` | `string` | 否 | `'#27272a'` | 槽位颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `digitColor` | `string` | 否 | `'#18181b'` | 数字字符颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `dangerColor` | `string` | 否 | `'#ff3b30'` | 危险操作颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `slotSize` | `number` | 否 | `44` | 槽位尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `gap` | `number` | 否 | `8` | 相邻单元、卡片或字符之间的间距；单位由组件实现定义。 |
| `radius` | `number` | 否 | `12` | 半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `bounce` | `number` | 否 | `0.2` | 回弹，控制 code slots 的对应渲染或交互参数。 |
| `settle` | `number` | 否 | `0.3` | 稳定，控制 code slots 的对应渲染或交互参数。 |
| `rise` | `number` | 否 | `8` | 上升，控制 code slots 的对应渲染或交互参数。 |
| `cascade` | `number` | 否 | `20` | 级联，控制 code slots 的对应渲染或交互参数。 |
| `ariaLabel` | `string` | 否 | `'One-time code'` | 无障碍标签，控制 code slots 的对应渲染或交互参数。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `button.className` | `string \| undefined` | 否 | `未指定` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `button.type` | `"button" \| "reset" \| "submit" \| undefined` | 否 | `未指定` | 原生输入或按钮的行为类型；按钮类型会影响表单提交。 |
| `button.onClick` | `MouseEventHandler<HTMLButtonElement> \| undefined` | 否 | `未指定` | 用户点击或通过键盘激活时触发的事件处理函数。 |
| `button.children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |

**继承的原生属性：**

- `DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**onChange 的真实接入：**

```tsx
onChange={code => { setValue(code); setStatus('idle'); }}
```

**onComplete 的真实接入：**

```tsx
onComplete={code => setStatus(code === '246810' ? 'success' : 'error')}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.length` | `6` | number | 不限 ~ 不限 | 即时应用 |
| `t0.autoFocus` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.ariaLabel` | `"六位演示验证码"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.accentColor` | `"#52604e"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.inkColor` | `"#1f2d26"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.slotColor` | `"rgb(250 247 240 / 0.82)"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.digitColor` | `"#1f2d26"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.dangerColor` | `"#9c6d56"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.slotSize` | `44` | number | 不限 ~ 不限 | 即时应用 |
| `t0.gap` | `8` | number | 不限 ~ 不限 | 即时应用 |
| `t0.radius` | `10` | number | 不限 ~ 不限 | 即时应用 |
| `t0.mask` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.caret` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.disabled` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.bounce` | `0.2` | number | 不限 ~ 不限 | 即时应用 |
| `t0.settle` | `0.3` | number | 不限 ~ 不限 | 即时应用 |
| `t0.rise` | `8` | number | 不限 ~ 不限 | 即时应用 |
| `t0.cascade` | `20` | number | 不限 ~ 不限 | 即时应用 |
| `t1.type` | `"button"` | select | "button" / "reset" / "submit" | 即时应用 |
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
