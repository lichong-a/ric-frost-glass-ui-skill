# Depth Carousel

媒体与轮播 · `depth-carousel` · 中文意图：景深轮播 / 纵深卡片

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

卡片沿深度轨道切换并支持操作。

功能要求：图片说明与次序可理解；提供触屏和键盘可达的浏览路径，自动播放可暂停，资源失败时保留稳定布局。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/media/depth-carousel.tsx](../../src/demos/media/depth-carousel.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Components/DepthCarousel/DepthCarousel.tsx](../../.upstream/src/ts-default/Components/DepthCarousel/DepthCarousel.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Components/DepthCarousel/DepthCarousel.css](../../.upstream/src/ts-default/Components/DepthCarousel/DepthCarousel.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/depth-carousel.json](../../src/parameters/definitions/depth-carousel.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component depth-carousel
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Depth Carousel 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Components/DepthCarousel/DepthCarousel';
import { LABELS, palette } from '../../shared/demo-support';
import { useState } from "react";
// 前后景深轨道保留，当前图片变化有文字反馈。

export default function DepthCarouselDemo() {
  const [status, setStatus] = useState("使用按钮、拖动或方向键切换");

  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 400, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <div style={{ width: '100%', height: '100%' }}><div style={{ position: 'relative', height: 330, minHeight: 0, width: '100%' }}><Component



onChange={index => setStatus('当前图片：' + LABELS[index % LABELS.length])} items={[{ "image": import.meta.env.BASE_URL + "media/scene-1.svg", "alt": "山雾" }, { "image": import.meta.env.BASE_URL + "media/scene-2.svg", "alt": "茶庭" }, { "image": import.meta.env.BASE_URL + "media/scene-3.svg", "alt": "沙洲" }, { "image": import.meta.env.BASE_URL + "media/scene-4.svg", "alt": "静水" }, { "image": import.meta.env.BASE_URL + "media/scene-5.svg", "alt": "林间" }, { "image": import.meta.env.BASE_URL + "media/scene-6.svg", "alt": "岩纹" }]} cardWidth={240} cardHeight={210} radius={20} tint={"#e8e4d7"} depth={160} spread={60} tilt={12} perspective={1400} visibleCards={4} falloff={0.18} blur={3} autoplay={false} loop={true} showControls={true} showIndicators={true} tiltDirection={"right"} duration={700} ease={"power3.out"} autoplayDelay={3200}  /></div><p role="status" aria-live="polite" style={{ margin: '12px 20px', fontSize: 14, color: palette.muted }}>{status}</p></div>
    </div>
  );
}

```

### 完整组件 API

| 参数 | 类型 | 必填 | 上游默认值 | 中文说明 |
|---|---|---|---|---|
| `items` | `DepthCarouselItem[]` | 否 | `DEFAULT_ITEMS` | 参与渲染或交互的条目列表，每项字段和可选内容按完整类型传入。 |
| `cardWidth` | `number` | 否 | `300` | 卡片宽度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `cardHeight` | `number` | 否 | `380` | 卡片高度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `radius` | `number` | 否 | `18` | 半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `tint` | `string` | 否 | `'#05060a'` | 色调，控制 depth carousel 的对应渲染或交互参数。 |
| `depth` | `number` | 否 | `220` | 深度，控制 depth carousel 的对应渲染或交互参数。 |
| `spread` | `number` | 否 | `90` | 展开间距，控制 depth carousel 的对应渲染或交互参数。 |
| `tilt` | `number` | 否 | `22` | 倾斜，控制 depth carousel 的对应渲染或交互参数。 |
| `tiltDirection` | `TiltDirection` | 否 | `'right'` | 倾斜方向，控制 depth carousel 的对应渲染或交互参数。 |
| `perspective` | `number` | 否 | `1400` | 透视，控制 depth carousel 的对应渲染或交互参数。 |
| `visibleCards` | `number` | 否 | `4` | 可见卡片，控制 depth carousel 的对应渲染或交互参数。 |
| `falloff` | `number` | 否 | `0.2` | 衰减，控制 depth carousel 的对应渲染或交互参数。 |
| `blur` | `number` | 否 | `6` | 模糊，控制 depth carousel 的对应渲染或交互参数。 |
| `duration` | `number` | 否 | `700` | 一次动画或过渡的持续时长，时间单位以组件实现和示例为准。 |
| `ease` | `string` | 否 | `'power3.out'` | 动画缓动名称或配置，按所用动画库的类型传入。 |
| `autoplay` | `boolean` | 否 | `false` | 是否自动播放，决定该分支的展示或交互行为。 |
| `autoplayDelay` | `number` | 否 | `3200` | 是否自动播放延迟，决定该分支的展示或交互行为。 |
| `loop` | `boolean` | 否 | `true` | 是否循环，决定该分支的展示或交互行为。 |
| `showControls` | `boolean` | 否 | `true` | 是否显示控制，决定该分支的展示或交互行为。 |
| `showIndicators` | `boolean` | 否 | `true` | 是否显示指示器，决定该分支的展示或交互行为。 |
| `onChange` | `(index: number, item: { image: string; alt?: string }) => void` | 否 | `未指定` | 用户改变值或条目顺序时通知调用方；回调参数类型就是应写回的值或原生事件。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |

**items 的真实接入：**

```tsx
items={MEDIA.map((image, index) => ({ image, alt: LABELS[index] }))}
```

**onChange 的真实接入：**

```tsx
onChange={index => setStatus('当前图片：' + LABELS[index % LABELS.length])}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，不改写上游 API。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.items` | `[{"image":"@media/scene-1.svg","alt":"山雾"},{"image":"@media/scene-2.svg","alt":"茶庭"},{"image":"@media/scene-3.svg","alt":"沙洲"},{"image":"@media/scene-4.svg","alt":"静水"},{"image":"@media/scene-5.svg","alt":"林间"},{"image":"@media/scene-6.svg","alt":"岩纹"}]` | json | 不限 ~ 不限 | 即时应用 |
| `t0.cardWidth` | `240` | number | 不限 ~ 不限 | 即时应用 |
| `t0.cardHeight` | `210` | number | 不限 ~ 不限 | 即时应用 |
| `t0.radius` | `20` | number | 不限 ~ 不限 | 即时应用 |
| `t0.tint` | `"#e8e4d7"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.depth` | `160` | number | 不限 ~ 不限 | 即时应用 |
| `t0.spread` | `60` | number | 不限 ~ 不限 | 即时应用 |
| `t0.tilt` | `12` | number | 不限 ~ 不限 | 即时应用 |
| `t0.perspective` | `1400` | number | 不限 ~ 不限 | 即时应用 |
| `t0.visibleCards` | `4` | number | 不限 ~ 不限 | 即时应用 |
| `t0.falloff` | `0.18` | number | 不限 ~ 不限 | 即时应用 |
| `t0.blur` | `3` | number | 不限 ~ 不限 | 即时应用 |
| `t0.autoplay` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.loop` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.showControls` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.showIndicators` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.tiltDirection` | `"right"` | select | "left" / "right" | 即时应用 |
| `t0.duration` | `700` | number | 不限 ~ 不限 | 即时应用 |
| `t0.ease` | `"power3.out"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.autoplayDelay` | `3200` | number | 不限 ~ 不限 | 即时应用 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Wan 皮肤

- 容器、状态色、边界与焦点使用 Agent Wan 规范；交互命中区不随视觉形变缩小。
- 组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。

## 5. 加载、动效与降级

本例实际配置：设备访问与音频行为以本例真实 Props 和显式回调为准。capabilities 是源码扫描提示，不能据此声称已请求相机、录音或播放音频。

- 依赖清单：`gsap`、`react`。安装前复用目标项目的兼容版本，不重复加载。
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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [媒体与轮播](../categories/media.md)；否则直接完成当前组件。
