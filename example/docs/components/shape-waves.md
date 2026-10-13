# Shape Waves

背景与光效 · `shape-waves` · 中文意图：图形波浪 / 几何波场

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

几何图形沿波面改变亮度与大小。

功能要求：装饰层不拦截业务点击、不隐藏真实指针，不成为完成业务的唯一操作方式。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/background/shape-waves.tsx](../../src/demos/background/shape-waves.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Backgrounds/ShapeWaves/ShapeWaves.tsx](../../.upstream/src/ts-default/Backgrounds/ShapeWaves/ShapeWaves.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Backgrounds/ShapeWaves/ShapeWaves.css](../../.upstream/src/ts-default/Backgrounds/ShapeWaves/ShapeWaves.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/shape-waves.json](../../src/parameters/definitions/shape-waves.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component shape-waves
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Shape Waves 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import type { ComponentProps } from 'react';
import Component from '../../../.upstream/src/ts-default/Backgrounds/ShapeWaves/ShapeWaves';

import { useWebGPUCompatibility } from '../../effects/webgpu-compatibility/useWebGPUCompatibility';
import { createShapeWavesCanvas } from '../../effects/webgpu-compatibility/shape-canvas';
import styles from './shape-waves.module.css';

export default function ShapeWavesDemo() {
  const effect = useWebGPUCompatibility<ComponentProps<typeof Component>>(
        <Component












           text={"AGENT WAN"} fontFamily={"system-ui, sans-serif"} fontWeight={600} textSize={0.5} shapes={"mixed"} cellSize={11} color={"#a6b39a"} hoverColor={"#faf7f0"} backgroundColor={"#1f2d26"} speed={0.55} glow={0.16} contrast={1.1} interactive={true} dotSize={0.75} scale={1} brightness={0.4} flow={0} direction={0} fade={0.25} splashRadius={40} splashStrength={0.4} intro={true} introDuration={1.6} introKey={0} paused={false}
        />,
    createShapeWavesCanvas,
  );
  return <div className={styles.stage} data-visual-demo="shape-waves">{effect}<p className={styles.hint}>移动指针点亮图形 · 点击释放波纹</p></div>;
}

```

### 完整组件 API

| 参数 | 类型 | 必填 | 上游默认值 | 中文说明 |
|---|---|---|---|---|
| `text` | `string` | 否 | `''` | 显示或生成效果的文字内容。 |
| `fontFamily` | `string` | 否 | `'Geist, "Geist Sans", system-ui, sans-serif'` | 字体字族，控制 shape waves 的对应渲染或交互参数。 |
| `fontWeight` | `string \| number` | 否 | `500` | 字体字重，控制 shape waves 的对应渲染或交互参数。 |
| `textSize` | `number` | 否 | `0.6` | 文字尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `shapes` | `ShapeWavesShapes` | 否 | `'mixed'` | 形状列表，控制 shape waves 的对应渲染或交互参数。 |
| `cellSize` | `number` | 否 | `10` | 单元尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `dotSize` | `number` | 否 | `0.75` | 圆点尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `color` | `string` | 否 | `'#929292'` | 颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `hoverColor` | `string` | 否 | `'#ffffff'` | 悬停颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `backgroundColor` | `string` | 否 | `'#000000'` | 背景颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `speed` | `number` | 否 | `1` | 动画、流动或滚动的推进速度；不同效果使用各自的速度尺度。 |
| `scale` | `number` | 否 | `1` | 缩放，控制 shape waves 的对应渲染或交互参数。 |
| `contrast` | `number` | 否 | `1` | 对比度，控制 shape waves 的对应渲染或交互参数。 |
| `brightness` | `number` | 否 | `0.4` | 亮度，控制 shape waves 的对应渲染或交互参数。 |
| `flow` | `number` | 否 | `0` | 流动，控制 shape waves 的对应渲染或交互参数。 |
| `direction` | `number` | 否 | `0` | 方向，控制 shape waves 的对应渲染或交互参数。 |
| `fade` | `number` | 否 | `0.25` | 淡出，控制 shape waves 的对应渲染或交互参数。 |
| `interactive` | `boolean` | 否 | `true` | 是否交互，决定该分支的展示或交互行为。 |
| `splashRadius` | `number` | 否 | `40` | 飞溅半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `splashStrength` | `number` | 否 | `0.4` | 飞溅强度，控制 shape waves 的对应渲染或交互参数。 |
| `glow` | `number` | 否 | `0.35` | 辉光，控制 shape waves 的对应渲染或交互参数。 |
| `intro` | `boolean` | 否 | `true` | 是否入场，决定该分支的展示或交互行为。 |
| `introDuration` | `number` | 否 | `1.6` | 入场时长，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `introKey` | `string \| number` | 否 | `0` | 入场身份标识，控制 shape waves 的对应渲染或交互参数。 |
| `paused` | `boolean` | 否 | `false` | 是否暂停持续动画或模拟更新。 |
| `onError` | `(error: Error) => void` | 否 | `未指定` | 错误时执行的回调；按签名接收事件或结果，调用方在函数中同步业务状态。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |

**onError 的真实接入：**

```tsx
onError={(error) => {}}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，不改写上游 API。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.text` | `"AGENT WAN"` | text | 不限 ~ 不限 | 调节结束后重建 |
| `t0.fontFamily` | `"system-ui, sans-serif"` | text | 不限 ~ 不限 | 调节结束后重建 |
| `t0.fontWeight` | `600` | json | 不限 ~ 不限 | 调节结束后重建 |
| `t0.textSize` | `0.5` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.shapes` | `"mixed"` | select | "mixed" / "squares" / "circles" / "triangles" | 调节结束后重建 |
| `t0.cellSize` | `11` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.color` | `"#a6b39a"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.hoverColor` | `"#faf7f0"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.backgroundColor` | `"#1f2d26"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.speed` | `0.55` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.glow` | `0.16` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.contrast` | `1.1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.interactive` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.dotSize` | `0.75` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.scale` | `1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.brightness` | `0.4` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.flow` | `0` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.direction` | `0` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.fade` | `0.25` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.splashRadius` | `40` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.splashStrength` | `0.4` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.intro` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.introDuration` | `1.6` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.introKey` | `0` | json | 不限 ~ 不限 | 调节结束后重建 |
| `t0.paused` | `false` | switch | 不限 ~ 不限 | 调节结束后重建 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Wan 皮肤

- 画布优先保留 React Bits 的原版配色与可观察强度，背景有独立边界并为光晕预留空间；业务正文使用稳定阅读面。
- 组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。

## 5. 加载、动效与降级

本例实际配置：原版使用 WebGPU。本例先检查适配器，支持时运行锁定原版；缺少适配器或原版初始化失败时自动使用带有“兼容预览”标记的 Canvas 2D 图形波场。兼容路径保留三种图形、文字遮罩、滚动波面与指针/点击响应，噪声和光晕与 WebGPU 原版存在差异。

- 依赖清单：`react`、`vgpu`。安装前复用目标项目的兼容版本，不重复加载。
- 运行类型：本例预览入口不要求预先通过图形接口检查；实际组件内部的可选渲染分支由源码和本例 Props 决定。此说明不等于浏览器运行证明。
- 动效策略：按需启用的持续 / 高运动效果。
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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [背景与光效](../categories/background.md)；否则直接完成当前组件。
