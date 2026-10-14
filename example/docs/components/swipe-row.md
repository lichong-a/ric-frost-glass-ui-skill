# Swipe Row

数据与文件 · `swipe-row` · 中文意图：侧滑行 / 侧滑删除 / 行操作

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-ric-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

行侧滑显露操作并按规则提交动作。

功能要求：将视觉触发与真实动作回调分开；禁用/加载阻止重复提交，提供普通点击或键盘的等价操作，危险动作按确认契约处理。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/data/swipe-row.tsx](../../src/demos/data/swipe-row.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Micro/SwipeRow/SwipeRow.tsx](../../.upstream/src/ts-default/Micro/SwipeRow/SwipeRow.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Micro/SwipeRow/SwipeRow.css](../../.upstream/src/ts-default/Micro/SwipeRow/SwipeRow.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/swipe-row.json](../../src/parameters/definitions/swipe-row.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component swipe-row
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Swipe Row 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import { useState } from 'react';
import SwipeRow from '../../../.upstream/src/ts-default/Micro/SwipeRow/SwipeRow';
import { DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
const cn=(names:string)=>componentClasses(styles,names);


export default function SwipeRowDemo() {
  const [message, setMessage] = useState('向左滑动条目，展开操作。');
  const [open, setOpen] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [revision, setRevision] = useState(0);
  return <DemoPanel title="Swipe Row · 行滑动操作"><div className={cn("aw-micro-stack")}>
    <div className={cn("aw-micro-wide")}>{removed ? <p className={cn("aw-micro-hint")}>本地演示行已移除。</p> : <SwipeRow key={revision}  open={open} onOpenChange={setOpen}        onAction={action => { setMessage(`已选择：${action.label}`); if (action.dismiss) setRemoved(true); }} onCommit={action => { setRemoved(true); setMessage(`滑动已确认：${action.label}`); }} actions={[{ "id": "archive", "label": "归档", "color": "#52604e" }, { "id": "remove", "label": "移除", "color": "#9c6d56", "dismiss": true }]} rowColor={"rgb(250 247 240 / 0.82)"} textColor={"#1f2d26"} drawerColor={"#a6b39a"} height={72} radius={16} label={"演示技能草稿"} haptic={false} actionColor={"#e5484d"} actionWidth={80} direction={"left"} snapBounce={0.2} resistance={0.55} collapseMs={200} commitAt={0.6} fullSwipe={true} disabled={false} closeOnAction={true} ><div style={{ padding: '16px 20px' }}><strong>技能配置草稿</strong><p style={{ margin: '4px 0 0', fontSize: 13 }}>仅在本地示例中归档或移除</p></div></SwipeRow>}</div>
    <div className={cn("aw-micro-controls")}><button className={styles['aw-micro-action']}  onClick={() => setOpen(value => !value)} disabled={removed} type={"button"} >{open ? '关闭行操作' : '展开行操作'}</button><button className={styles['aw-micro-action']}  onClick={() => { setOpen(false); setRemoved(false); setRevision(value => value + 1); setMessage('示例行已恢复。'); }} type={"button"} >恢复示例行</button></div>
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">{message}</p>
  </div></DemoPanel>;
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `actions` | `SwipeAction[]` | 否 | `DEFAULT_ACTIONS` | 操作项的有序数据集合；每一项按数组元素类型配置。 |
| `actionColor` | `string` | 否 | `'#e5484d'` | 操作颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `drawerColor` | `string` | 否 | `'#3f3f46'` | 抽屉颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `rowColor` | `string` | 否 | `'#27272a'` | 行颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `textColor` | `string` | 否 | `'#f5f5f5'` | 文字颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `height` | `number` | 否 | `64` | 容器或效果的高度，CSS 字符串与数值的支持以类型为准。 |
| `radius` | `number` | 否 | `16` | 半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `actionWidth` | `number` | 否 | `80` | 操作宽度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `direction` | `'left' \| 'right'` | 否 | `'left'` | 方向，控制 swipe row 的对应渲染或交互参数。 |
| `snapBounce` | `number` | 否 | `0.2` | 吸附回弹，控制 swipe row 的对应渲染或交互参数。 |
| `resistance` | `number` | 否 | `0.55` | 阻力，控制 swipe row 的对应渲染或交互参数。 |
| `collapseMs` | `number` | 否 | `200` | 收起毫秒，控制 swipe row 的对应渲染或交互参数。 |
| `commitAt` | `number` | 否 | `0.6` | 提交阈值，控制 swipe row 的对应渲染或交互参数。 |
| `fullSwipe` | `boolean` | 否 | `true` | 是否完整滑动，决定该分支的展示或交互行为。 |
| `disabled` | `boolean` | 否 | `false` | 是否禁用控件的用户交互。 |
| `open` | `boolean` | 否 | `openState` | 是否展开或显示内容，由调用方控制。 |
| `onOpenChange` | `(open: boolean) => void` | 否 | `未指定` | 展开状态改变时通知调用方，参数为新的布尔状态。 |
| `onAction` | `(action: SwipeAction) => void` | 否 | `未指定` | 用户激活操作项时通知调用方，按签名接收该动作的身份或数据。 |
| `onCommit` | `(action: SwipeAction) => void` | 否 | `未指定` | 交互达到提交阈值并确认时通知调用方。 |
| `closeOnAction` | `boolean` | 否 | `true` | 是否关闭操作，决定该分支的展示或交互行为。 |
| `haptic` | `boolean` | 否 | `true` | 是否触感回弹，决定该分支的展示或交互行为。 |
| `label` | `string` | 否 | `'List item'` | 向用户或辅助技术说明控件的名称。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `style` | `CSSProperties` | 否 | `未指定` | 容器的 React 内联样式对象，尺寸、布局与 CSS 属性按 CSSProperties 传入。 |
| `button · t1.className` | `string \| undefined` | 否 | `未指定` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `button · t1.type` | `"button" \| "reset" \| "submit" \| undefined` | 否 | `未指定` | 原生输入或按钮的行为类型；按钮类型会影响表单提交。 |
| `button · t1.onClick` | `MouseEventHandler<HTMLButtonElement> \| undefined` | 否 | `未指定` | 用户点击或通过键盘激活时触发的事件处理函数。 |
| `button · t1.disabled` | `boolean \| undefined` | 否 | `未指定` | 是否禁用控件的用户交互。 |
| `button · t1.children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |

**继承的原生属性：**

- `DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**children 的真实接入：**

```tsx
children={<><div style={{ padding: '16px 20px' }}><strong>技能配置草稿</strong><p style={{ margin: '4px 0 0', fontSize: 13 }}>仅在本地示例中归档或移除</p></div></>}
```

**actions 的真实接入：**

```tsx
actions={actions}
```

**onOpenChange 的真实接入：**

```tsx
onOpenChange={setOpen}
```

**onAction 的真实接入：**

```tsx
onAction={action => { setMessage(`已选择：${action.label}`); if (action.dismiss) setRemoved(true); }}
```

**onCommit 的真实接入：**

```tsx
onCommit={action => { setRemoved(true); setMessage(`滑动已确认：${action.label}`); }}
```

**style 的真实接入：**

```tsx
style={{ width: "100%", minHeight: 240 }}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.actions` | `[{"id":"archive","label":"归档","color":"#52604e"},{"id":"remove","label":"移除","color":"#9c6d56","dismiss":true}]` | json | 不限 ~ 不限 | 即时应用 |
| `t0.rowColor` | `"rgb(250 247 240 / 0.82)"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.textColor` | `"#1f2d26"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.drawerColor` | `"#a6b39a"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.height` | `72` | number | 不限 ~ 不限 | 即时应用 |
| `t0.radius` | `16` | number | 不限 ~ 不限 | 即时应用 |
| `t0.label` | `"演示技能草稿"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.haptic` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.actionColor` | `"#e5484d"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.actionWidth` | `80` | number | 不限 ~ 不限 | 即时应用 |
| `t0.direction` | `"left"` | select | "left" / "right" | 即时应用 |
| `t0.snapBounce` | `0.2` | number | 不限 ~ 不限 | 即时应用 |
| `t0.resistance` | `0.55` | number | 不限 ~ 不限 | 即时应用 |
| `t0.collapseMs` | `200` | number | 不限 ~ 不限 | 即时应用 |
| `t0.commitAt` | `0.6` | number | 不限 ~ 不限 | 即时应用 |
| `t0.fullSwipe` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.disabled` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.closeOnAction` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t1.type` | `"button"` | select | "button" / "reset" / "submit" | 即时应用 |
| `t2.type` | `"button"` | select | "button" / "reset" / "submit" | 即时应用 |
| `state.open` | `false` | switch | 不限 ~ 不限 | 即时应用；原组件回调同步受控值 |

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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [数据与文件](../effects/categories/data.md)；否则直接完成当前组件。
