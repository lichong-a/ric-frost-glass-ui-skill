# Pulse Heart

按钮与操作 · `pulse-heart` · 中文意图：点赞 / 心形按钮

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-ric-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

点赞状态与计数同步并有短促形变。

功能要求：由真实 value / state 与回调驱动；操作可用键盘完成，不能只在动画内部保存业务状态。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/actions/pulse-heart.tsx](../../src/demos/actions/pulse-heart.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Micro/PulseHeart/PulseHeart.tsx](../../.upstream/src/ts-default/Micro/PulseHeart/PulseHeart.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Micro/PulseHeart/PulseHeart.css](../../.upstream/src/ts-default/Micro/PulseHeart/PulseHeart.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/pulse-heart.json](../../src/parameters/definitions/pulse-heart.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component pulse-heart
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Pulse Heart 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import { useState } from 'react';
import PulseHeart from '../../../.upstream/src/ts-default/Micro/PulseHeart/PulseHeart';
import { palette, DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
const cn=(names:string)=>componentClasses(styles,names);

export default function PulseHeartDemo() {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(24);
  return <DemoPanel title="Pulse Heart · 喜欢反馈"><div className={cn("aw-micro-stack")}>
    <PulseHeart liked={liked} count={count} onChange={(next, total) => { setLiked(next); setCount(total); }}  idleColor={palette.primary}      likedColor={"#9c6d56"} pillColor={"rgb(250 247 240 / 0.82)"} textColor={"#1f2d26"} size={28} label={"喜欢这个示例"} showCount={true} corner={32} duration={560} dotSize={0.3} overshoot={1.7} beat={3} rollDuration={350} disabled={false}  />
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">{liked ? '已喜欢' : '未喜欢'} · 本地示例计数 {count}</p>
  </div></DemoPanel>;
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `liked` | `boolean` | 否 | `未指定` | 是否点赞状态，决定该分支的展示或交互行为。 |
| `defaultLiked` | `boolean` | 否 | `false` | 是否非受控初始点赞状态，决定该分支的展示或交互行为。 |
| `count` | `number` | 否 | `0` | 数量，控制 pulse heart 的对应渲染或交互参数。 |
| `onChange` | `(liked: boolean, count: number) => void` | 否 | `未指定` | 用户改变值或条目顺序时通知调用方；回调参数类型就是应写回的值或原生事件。 |
| `showCount` | `boolean` | 否 | `true` | 是否显示数量，决定该分支的展示或交互行为。 |
| `icon` | `PulseHeartIcon \| ReactNode` | 否 | `'heart'` | 图标，控制 pulse heart 的对应渲染或交互参数。 |
| `idleOutline` | `boolean` | 否 | `true` | 是否静止轮廓，决定该分支的展示或交互行为。 |
| `size` | `number` | 否 | `40` | 尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `corner` | `number` | 否 | `32` | 角，控制 pulse heart 的对应渲染或交互参数。 |
| `likedColor` | `string` | 否 | `'#ff4d6d'` | 点赞状态颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `idleColor` | `string` | 否 | `'#8b8b93'` | 静止颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `pillColor` | `string` | 否 | `'#232326'` | 胶囊颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `textColor` | `string` | 否 | `'#f5f5f5'` | 文字颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `duration` | `number` | 否 | `560` | 一次动画或过渡的持续时长，时间单位以组件实现和示例为准。 |
| `dotSize` | `number` | 否 | `0.3` | 圆点尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `overshoot` | `number` | 否 | `1.7` | 过冲，控制 pulse heart 的对应渲染或交互参数。 |
| `beat` | `number` | 否 | `3` | 拍动，控制 pulse heart 的对应渲染或交互参数。 |
| `rollDuration` | `number` | 否 | `350` | 滚动翻转时长，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `disabled` | `boolean` | 否 | `false` | 是否禁用控件的用户交互。 |
| `label` | `string` | 否 | `'Like'` | 向用户或辅助技术说明控件的名称。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |

**onChange 的真实接入：**

```tsx
onChange={(next, total) => { setLiked(next); setCount(total); }}
```

**icon 的真实接入：**

```tsx
icon={"heart"}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.likedColor` | `"#9c6d56"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.pillColor` | `"rgb(250 247 240 / 0.82)"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.textColor` | `"#1f2d26"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.size` | `28` | number | 不限 ~ 不限 | 即时应用 |
| `t0.label` | `"喜欢这个示例"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.showCount` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.corner` | `32` | number | 不限 ~ 不限 | 即时应用 |
| `t0.duration` | `560` | number | 不限 ~ 不限 | 即时应用 |
| `t0.dotSize` | `0.3` | number | 不限 ~ 不限 | 即时应用 |
| `t0.overshoot` | `1.7` | number | 不限 ~ 不限 | 即时应用 |
| `t0.beat` | `3` | number | 不限 ~ 不限 | 即时应用 |
| `t0.rollDuration` | `350` | number | 不限 ~ 不限 | 即时应用 |
| `t0.disabled` | `false` | switch | 不限 ~ 不限 | 即时应用 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Ric 皮肤

- 容器、状态色、边界与焦点使用 Agent Ric 规范；交互命中区不随视觉形变缩小。
- 组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。

## 5. 加载、动效与降级

本例实际配置：设备访问与音频行为以本例真实 Props 和显式回调为准。capabilities 是源码扫描提示，不能据此声称已请求相机、录音或播放音频。

- 依赖清单：`@hugeicons/core-free-icons`、`react`。安装前复用目标项目的兼容版本，不重复加载。
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
