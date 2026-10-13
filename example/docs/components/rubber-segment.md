# Rubber Segment

表单与选择 · `rubber-segment` · 中文意图：橡胶分段 / 弹性分段控件

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

分段选中底块在切换时拉伸并归位。

功能要求：由真实 value / state 与回调驱动；操作可用键盘完成，不能只在动画内部保存业务状态。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/form/rubber-segment.tsx](../../src/demos/form/rubber-segment.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Micro/RubberSegment/RubberSegment.tsx](../../.upstream/src/ts-default/Micro/RubberSegment/RubberSegment.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Micro/RubberSegment/RubberSegment.css](../../.upstream/src/ts-default/Micro/RubberSegment/RubberSegment.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/rubber-segment.json](../../src/parameters/definitions/rubber-segment.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component rubber-segment
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Rubber Segment 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import { useState } from 'react';
import RubberSegment from '../../../.upstream/src/ts-default/Micro/RubberSegment/RubberSegment';
import { DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
const cn=(names:string)=>componentClasses(styles,names);

const items = [{ value: 'overview', label: '概览' }, { value: 'activity', label: '活动' }, { value: 'settings', label: '设置' }];
export default function RubberSegmentDemo() {
  const [value, setValue] = useState("overview");
  return <DemoPanel title="Rubber Segment · 弹性分段"><div className={cn("aw-micro-stack")}>
    <RubberSegment  value={value} onChange={setValue}         items={[{ "value": "overview", "label": "概览" }, { "value": "activity", "label": "活动" }, { "value": "settings", "label": "设置" }]} trackColor={"rgb(250 247 240 / 0.82)"} thumbColor={"#52604e"} textColor={"#1f2d26"} activeTextColor={"#faf7f0"} radius={10} equalSlots={true} draggable={true} aria-label={"切换演示信息分组"} size={"md"} inset={3} stretch={100} squash={3} speed={1} glide={75} disabled={false}  />
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">当前分组：{items.find(item => item.value === value)?.label}</p>
  </div></DemoPanel>;
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `items` | `RubberSegmentItem[]` | 是 | `未指定` | 参与渲染或交互的条目列表，每项字段和可选内容按完整类型传入。 |
| `value` | `string` | 否 | `未指定` | 当前受控值，由调用方维护并随交互回调更新。 |
| `defaultValue` | `string` | 否 | `list[0]?.value` | 非受控模式的初始值；挂载后更新通常通过内部状态或受控 value 完成。 |
| `onChange` | `(value: string, index: number) => void` | 否 | `未指定` | 用户改变值或条目顺序时通知调用方；回调参数类型就是应写回的值或原生事件。 |
| `trackColor` | `string` | 否 | `'#27272a'` | 轨道颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `thumbColor` | `string` | 否 | `'#fafafa'` | 滑块颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `textColor` | `string` | 否 | `'#fafafa'` | 文字颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `activeTextColor` | `string` | 否 | `'#18181b'` | 激活文字颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `size` | `RubberSegmentSize` | 否 | `'md'` | 尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `radius` | `number` | 否 | `10` | 半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `inset` | `number` | 否 | `3` | 内缩，控制 rubber segment 的对应渲染或交互参数。 |
| `equalSlots` | `boolean` | 否 | `true` | 是否让分段选项占用相同宽度。 |
| `stretch` | `number` | 否 | `100` | 拉伸，控制 rubber segment 的对应渲染或交互参数。 |
| `squash` | `number` | 否 | `3` | 挤压，控制 rubber segment 的对应渲染或交互参数。 |
| `speed` | `number` | 否 | `1` | 动画、流动或滚动的推进速度；不同效果使用各自的速度尺度。 |
| `glide` | `number` | 否 | `75` | 滑移，控制 rubber segment 的对应渲染或交互参数。 |
| `draggable` | `boolean` | 否 | `true` | 是否可拖动，决定该分支的展示或交互行为。 |
| `disabled` | `boolean` | 否 | `false` | 是否禁用控件的用户交互。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `aria-label` | `string` | 否 | `'Segmented control'` | 辅助技术的 label 状态或说明；值须与控件当前可观察行为一致。 |

**items 的真实接入：**

```tsx
items={items}
```

**onChange 的真实接入：**

```tsx
onChange={setValue}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.items` | `[{"value":"overview","label":"概览"},{"value":"activity","label":"活动"},{"value":"settings","label":"设置"}]` | json | 不限 ~ 不限 | 即时应用 |
| `t0.trackColor` | `"rgb(250 247 240 / 0.82)"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.thumbColor` | `"#52604e"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.textColor` | `"#1f2d26"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.activeTextColor` | `"#faf7f0"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.radius` | `10` | number | 不限 ~ 不限 | 即时应用 |
| `t0.equalSlots` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.draggable` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.aria-label` | `"切换演示信息分组"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.size` | `"md"` | select | "sm" / "md" / "lg" | 即时应用 |
| `t0.inset` | `3` | number | 不限 ~ 不限 | 即时应用 |
| `t0.stretch` | `100` | number | 不限 ~ 不限 | 即时应用 |
| `t0.squash` | `3` | number | 不限 ~ 不限 | 即时应用 |
| `t0.speed` | `1` | number | 不限 ~ 不限 | 即时应用 |
| `t0.glide` | `75` | number | 不限 ~ 不限 | 即时应用 |
| `t0.disabled` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `state.value` | `"overview"` | select | "overview" / "activity" / "settings" | 即时应用；原组件回调同步受控值 |

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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [表单与选择](../effects/categories/form.md)；否则直接完成当前组件。
