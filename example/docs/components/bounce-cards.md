# Bounce Cards

卡片与面板 · `bounce-cards` · 中文意图：弹入照片 / 扇形卡片

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

照片扇面弹入且聚焦卡片展开扶正。

功能要求：保持内容的语义和可访问名称；只有真实可交互元素可进入焦点顺序。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/cards/bounce-cards.tsx](../../src/demos/cards/bounce-cards.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Components/BounceCards/BounceCards.tsx](../../.upstream/src/ts-default/Components/BounceCards/BounceCards.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Components/BounceCards/BounceCards.css](../../.upstream/src/ts-default/Components/BounceCards/BounceCards.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/bounce-cards.json](../../src/parameters/definitions/bounce-cards.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component bounce-cards
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Bounce Cards 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Components/BounceCards/BounceCards';
import { LABELS, palette } from '../../shared/demo-support';
import { useState } from "react";
// 真实扇形卡片弹入、悬停分离和点击回调。

export default function BounceCardsDemo() {
  const [status, setStatus] = useState("悬停让卡片分开，点击选择");

  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 400, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <div style={{ width: '100%', height: '100%' }}><div style={{ minHeight: 310, width: '100%', display: 'grid', placeItems: 'center' }}><Component




onCardClick={index => setStatus('点击卡片：' + LABELS[index % LABELS.length])} images={[{ "src": import.meta.env.BASE_URL + "media/scene-1.svg", "alt": "山雾" }, { "src": import.meta.env.BASE_URL + "media/scene-2.svg", "alt": "茶庭" }, { "src": import.meta.env.BASE_URL + "media/scene-3.svg", "alt": "沙洲" }, { "src": import.meta.env.BASE_URL + "media/scene-4.svg", "alt": "静水" }, { "src": import.meta.env.BASE_URL + "media/scene-5.svg", "alt": "林间" }]} containerWidth={520} containerHeight={280} cardSize={150} spread={70} rotation={6} arc={8} animationDelay={0.2} animationStagger={0.07} bounciness={0.4} enableHover={true} pushDistance={80} hoverScale={1.03} borderWidth={4} borderColor={"#faf7f0"} radius={20} shadow={true}  /></div><p role="status" aria-live="polite" style={{ margin: '12px 20px', fontSize: 14, color: palette.muted }}>{status}</p></div>
    </div>
  );
}

```

### 完整组件 API

| 参数 | 类型 | 必填 | 上游默认值 | 中文说明 |
|---|---|---|---|---|
| `images` | `BounceCardImage[]` | 否 | `[]` | 参与画廊、轮播或效果的图像列表。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `style` | `React.CSSProperties` | 否 | `未指定` | 容器的 React 内联样式对象，尺寸、布局与 CSS 属性按 CSSProperties 传入。 |
| `containerWidth` | `number` | 否 | `400` | 容器宽度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `containerHeight` | `number` | 否 | `400` | 容器高度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `cardSize` | `number` | 否 | `200` | 卡片尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `spread` | `number` | 否 | `85` | 展开间距，控制 bounce cards 的对应渲染或交互参数。 |
| `rotation` | `number` | 否 | `10` | 旋转角度，控制 bounce cards 的对应渲染或交互参数。 |
| `arc` | `number` | 否 | `0` | 弧线，控制 bounce cards 的对应渲染或交互参数。 |
| `animationDelay` | `number` | 否 | `0.5` | 动画延迟，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `animationStagger` | `number` | 否 | `0.06` | 动画错开，控制 bounce cards 的对应渲染或交互参数。 |
| `bounciness` | `number` | 否 | `0.6` | 弹性，控制 bounce cards 的对应渲染或交互参数。 |
| `enableHover` | `boolean` | 否 | `true` | 是否启用悬停，决定该分支的展示或交互行为。 |
| `pushDistance` | `number` | 否 | `160` | 推移距离，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `hoverScale` | `number` | 否 | `1.06` | 悬停缩放，控制 bounce cards 的对应渲染或交互参数。 |
| `borderWidth` | `number` | 否 | `5` | 边框宽度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `borderColor` | `string` | 否 | `'#ffffff'` | 边框颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `radius` | `number` | 否 | `25` | 半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `shadow` | `boolean` | 否 | `true` | 是否阴影，决定该分支的展示或交互行为。 |
| `transformStyles` | `string[]` | 否 | `未指定` | 变换样式列表的有序数据集合；每一项按数组元素类型配置。 |
| `onCardClick` | `(index: number) => void` | 否 | `未指定` | 卡片点击时执行的回调；按签名接收事件或结果，调用方在函数中同步业务状态。 |

**images 的真实接入：**

```tsx
images={MEDIA.slice(0, 5).map((src, index) => ({ src, alt: LABELS[index] }))}
```

**style 的真实接入：**

```tsx
style={{ width: "100%", minHeight: 240 }}
```

**transformStyles 的真实接入：**

```tsx
transformStyles={["示例"]}
```

**onCardClick 的真实接入：**

```tsx
onCardClick={index => setStatus('点击卡片：' + LABELS[index % LABELS.length])}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，不改写上游 API。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.images` | `[{"src":"@media/scene-1.svg","alt":"山雾"},{"src":"@media/scene-2.svg","alt":"茶庭"},{"src":"@media/scene-3.svg","alt":"沙洲"},{"src":"@media/scene-4.svg","alt":"静水"},{"src":"@media/scene-5.svg","alt":"林间"}]` | json | 不限 ~ 不限 | 即时应用 |
| `t0.containerWidth` | `520` | number | 不限 ~ 不限 | 即时应用 |
| `t0.containerHeight` | `280` | number | 不限 ~ 不限 | 即时应用 |
| `t0.cardSize` | `150` | number | 不限 ~ 不限 | 即时应用 |
| `t0.spread` | `70` | number | 不限 ~ 不限 | 即时应用 |
| `t0.rotation` | `6` | number | 不限 ~ 不限 | 即时应用 |
| `t0.arc` | `8` | number | 不限 ~ 不限 | 即时应用 |
| `t0.animationDelay` | `0.2` | number | 不限 ~ 不限 | 即时应用 |
| `t0.animationStagger` | `0.07` | number | 不限 ~ 不限 | 即时应用 |
| `t0.bounciness` | `0.4` | number | 不限 ~ 不限 | 即时应用 |
| `t0.enableHover` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.pushDistance` | `80` | number | 不限 ~ 不限 | 即时应用 |
| `t0.hoverScale` | `1.03` | number | 不限 ~ 不限 | 即时应用 |
| `t0.borderWidth` | `4` | number | 不限 ~ 不限 | 即时应用 |
| `t0.borderColor` | `"#faf7f0"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.radius` | `20` | number | 不限 ~ 不限 | 即时应用 |
| `t0.shadow` | `true` | switch | 不限 ~ 不限 | 即时应用 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Wan 皮肤

- 容器、状态色、边界与焦点使用 Agent Wan 规范；交互命中区不随视觉形变缩小。
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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [卡片与面板](../categories/cards.md)；否则直接完成当前组件。
