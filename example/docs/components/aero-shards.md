# Aero Shards

背景与光效 · `aero-shards` · 中文意图：风中碎片 / 箔片背景

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-ric-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

折叠碎片形成受指针影响的风场。

功能要求：装饰层不拦截业务点击、不隐藏真实指针，不成为完成业务的唯一操作方式。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/background/aero-shards.tsx](../../src/demos/background/aero-shards.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Backgrounds/AeroShards/AeroShards.tsx](../../.upstream/src/ts-default/Backgrounds/AeroShards/AeroShards.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Backgrounds/AeroShards/AeroShards.css](../../.upstream/src/ts-default/Backgrounds/AeroShards/AeroShards.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/aero-shards.json](../../src/parameters/definitions/aero-shards.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component aero-shards
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Aero Shards 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import type { ComponentProps } from 'react';
import Component from '../../../.upstream/src/ts-default/Backgrounds/AeroShards/AeroShards';

import { useWebGPUCompatibility } from '../../effects/webgpu-compatibility/useWebGPUCompatibility';
import { createAeroShardsCanvas } from '../../effects/webgpu-compatibility/aero-canvas';
import styles from './aero-shards.module.css';

export default function AeroShardsDemo() {
  const effect = useWebGPUCompatibility<ComponentProps<typeof Component>>(
        <Component













           backgroundColor={"#1f2d26"} shardColor={"#a6b39a"} accentColor={"#c3ae88"} material={"pearl"} detail={"balanced"} flow={"stream"} density={1.1} speed={0.5} spin={0.6} glow={0.4} bloom={0.12} grain={0.025} chromaticAberration={0} interaction={"repel"} placement={"full"} rippleIntensity={1} holdToGather={true} effect={"none"} scale={1} spread={1} depth={1} shardSize={1.1} stretch={1} turbulence={1} edgeSoftness={2} transitionDuration={1} interactionRadius={1.5} interactionStrength={0.5} paused={false}
        />,
    createAeroShardsCanvas,
    { componentName: 'Aero Shards' },
  );
  return <div className={styles.stage} data-visual-demo="aero-shards">{effect}<p className={styles.hint}>移动指针拨动碎片 · 按住聚拢 · 点击扩散</p></div>;
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `backgroundColor` | `string` | 否 | `'#120F17'` | 背景颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `shardColor` | `string` | 否 | `'#896ABD'` | 碎片颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `accentColor` | `string` | 否 | `'#A855F7'` | 强调颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `placement` | `Placement` | 否 | `'full'` | 布局位置，控制 aero shards 的对应渲染或交互参数。 |
| `flow` | `keyof typeof FLOWS` | 否 | `'stream'` | 流动，控制 aero shards 的对应渲染或交互参数。 |
| `rippleIntensity` | `number` | 否 | `1` | 波纹强度，控制 aero shards 的对应渲染或交互参数。 |
| `holdToGather` | `boolean` | 否 | `true` | 是否按住目标聚合，决定该分支的展示或交互行为。 |
| `material` | `Material` | 否 | `'pearl'` | 材质，控制 aero shards 的对应渲染或交互参数。 |
| `detail` | `Detail` | 否 | `'balanced'` | 细节，控制 aero shards 的对应渲染或交互参数。 |
| `effect` | `keyof typeof EFFECTS` | 否 | `'none'` | 效果，控制 aero shards 的对应渲染或交互参数。 |
| `scale` | `number` | 否 | `1` | 缩放，控制 aero shards 的对应渲染或交互参数。 |
| `spread` | `number` | 否 | `1` | 展开间距，控制 aero shards 的对应渲染或交互参数。 |
| `depth` | `number` | 否 | `1` | 深度，控制 aero shards 的对应渲染或交互参数。 |
| `speed` | `number` | 否 | `1` | 动画、流动或滚动的推进速度；不同效果使用各自的速度尺度。 |
| `spin` | `number` | 否 | `1` | 自转，控制 aero shards 的对应渲染或交互参数。 |
| `interaction` | `Interaction` | 否 | `'repel'` | 交互，控制 aero shards 的对应渲染或交互参数。 |
| `density` | `number` | 否 | `1.5` | 密度，控制 aero shards 的对应渲染或交互参数。 |
| `shardSize` | `number` | 否 | `1.1` | 碎片尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `stretch` | `number` | 否 | `1` | 拉伸，控制 aero shards 的对应渲染或交互参数。 |
| `turbulence` | `number` | 否 | `1` | 湍流，控制 aero shards 的对应渲染或交互参数。 |
| `glow` | `number` | 否 | `1` | 辉光，控制 aero shards 的对应渲染或交互参数。 |
| `edgeSoftness` | `number` | 否 | `2` | 边缘柔和度，控制 aero shards 的对应渲染或交互参数。 |
| `bloom` | `number` | 否 | `0.5` | 泛光，控制 aero shards 的对应渲染或交互参数。 |
| `grain` | `number` | 否 | `0.05` | 颗粒，控制 aero shards 的对应渲染或交互参数。 |
| `chromaticAberration` | `number` | 否 | `0.0075` | 色散色散，控制 aero shards 的对应渲染或交互参数。 |
| `transitionDuration` | `number` | 否 | `1` | 过渡时长，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `interactionRadius` | `number` | 否 | `1.5` | 交互半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `interactionStrength` | `number` | 否 | `0.5` | 交互强度，控制 aero shards 的对应渲染或交互参数。 |
| `paused` | `boolean` | 否 | `false` | 是否暂停持续动画或模拟更新。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `onError` | `(error: Error) => void` | 否 | `未指定` | 错误时执行的回调；按签名接收事件或结果，调用方在函数中同步业务状态。 |

**onError 的真实接入：**

```tsx
onError={(error) => {}}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.backgroundColor` | `"#1f2d26"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.shardColor` | `"#a6b39a"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.accentColor` | `"#c3ae88"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.material` | `"pearl"` | select | "chrome" / "pearl" / "satin" | 调节结束后重建 |
| `t0.detail` | `"balanced"` | select | "bold" / "balanced" / "fine" | 调节结束后重建 |
| `t0.flow` | `"stream"` | select | "ribbon" / "vortex" / "stream" | 调节结束后重建 |
| `t0.density` | `1.1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.speed` | `0.5` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.spin` | `0.6` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.glow` | `0.4` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.bloom` | `0.12` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.grain` | `0.025` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.chromaticAberration` | `0` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.interaction` | `"repel"` | select | "none" / "repel" / "attract" | 调节结束后重建 |
| `t0.placement` | `"full"` | select | "center" / "left" / "right" / "full" | 调节结束后重建 |
| `t0.rippleIntensity` | `1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.holdToGather` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.effect` | `"none"` | select | "none" / "dither" / "ascii" | 调节结束后重建 |
| `t0.scale` | `1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.spread` | `1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.depth` | `1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.shardSize` | `1.1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.stretch` | `1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.turbulence` | `1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.edgeSoftness` | `2` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.transitionDuration` | `1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.interactionRadius` | `1.5` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.interactionStrength` | `0.5` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.paused` | `false` | switch | 不限 ~ 不限 | 调节结束后重建 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Ric 皮肤

- 画布优先保留 React Bits 的原版配色与可观察强度，背景有独立边界并为光晕预留空间；业务正文使用稳定阅读面。
- 组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。

## 5. 加载、动效与降级

本例实际配置：原版使用 WebGPU。本例给适配器检查设置 1.5 秒超时，支持时运行锁定原版；挂载后等待 data-ready 首帧标记，15 秒内没有首帧则停止本次启动。缺少适配器、检查失败、启动超时或原版渲染失效时，显示原因、“重新检查”和“打开兼容演示”。用户点击“打开兼容演示”后才挂载 Canvas 2D 碎片风场，明确标为“Canvas 兼容演示”，并可通过“重试原版”恢复原版检查。兼容创建或绘制失败也返回状态卡，释放动画帧、观察器、事件与指针捕获。兼容路径保留移动、点击波纹和按住聚拢，降低碎片数量；材质、后处理和路径细节与 WebGPU 原版存在差异。

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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [背景与光效](../effects/categories/background.md)；否则直接完成当前组件。
