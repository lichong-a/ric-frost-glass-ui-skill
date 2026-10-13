# Circular Carousel

媒体与轮播 · `circular-carousel` · 中文意图：环形轮播 / 三维环形相册

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

图片围绕三维环排列并支持拖动吸附。

功能要求：图片说明与次序可理解；提供触屏和键盘可达的浏览路径，自动播放可暂停，资源失败时保留稳定布局。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/media/circular-carousel.tsx](../../src/demos/media/circular-carousel.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Components/CircularCarousel/CircularCarousel.tsx](../../.upstream/src/ts-default/Components/CircularCarousel/CircularCarousel.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Components/CircularCarousel/CircularCarousel.css](../../.upstream/src/ts-default/Components/CircularCarousel/CircularCarousel.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/circular-carousel.json](../../src/parameters/definitions/circular-carousel.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component circular-carousel
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Circular Carousel 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Components/CircularCarousel/CircularCarousel';
import { LABELS, palette } from '../../shared/demo-support';
import { useState } from "react";
// 真实3D圆柱轮播，提供拖动、聚焦和当前项反馈。

export default function CircularCarouselDemo() {
  const [status, setStatus] = useState("拖动环形轮播，点击某张图片聚焦");

  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 400, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <div style={{ width: '100%', height: '100%' }}><div style={{ position: 'relative', height: 330, minHeight: 0, width: '100%' }}><Component



onChange={index => setStatus('当前图片：' + LABELS[index % LABELS.length])}
onItemClick={(_item, index) => setStatus('点击图片：' + LABELS[index % LABELS.length])} items={[{ "src": import.meta.env.BASE_URL + "media/scene-1.svg", "alt": "山雾", "title": "山雾", "subtitle": "自然色素材" }, { "src": import.meta.env.BASE_URL + "media/scene-2.svg", "alt": "茶庭", "title": "茶庭", "subtitle": "自然色素材" }, { "src": import.meta.env.BASE_URL + "media/scene-3.svg", "alt": "沙洲", "title": "沙洲", "subtitle": "自然色素材" }, { "src": import.meta.env.BASE_URL + "media/scene-4.svg", "alt": "静水", "title": "静水", "subtitle": "自然色素材" }, { "src": import.meta.env.BASE_URL + "media/scene-5.svg", "alt": "林间", "title": "林间", "subtitle": "自然色素材" }, { "src": import.meta.env.BASE_URL + "media/scene-6.svg", "alt": "岩纹", "title": "岩纹", "subtitle": "自然色素材" }]} preset={"cylinder"} intro={"rise"} cardWidth={160} aspectRatio={1.25} gap={18} speed={6} autoplay={"off"} draggable={true} snap={true} pauseOnHover={true} captions={true} fadeColor={"#e8e4d7"} cornerRadius={20} interval={3} direction={"left"} momentum={0.6} focusOnClick={true} parallax={0.3} stretch={0.5} depthFade={0.55} innerShade={0.6}  /></div><p role="status" aria-live="polite" style={{ margin: '12px 20px', fontSize: 14, color: palette.muted }}>{status}</p></div>
    </div>
  );
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `items` | `CircularCarouselItem[]` | 否 | `DEFAULT_ITEMS` | 参与渲染或交互的条目列表，每项字段和可选内容按完整类型传入。 |
| `preset` | `CircularCarouselPreset` | 否 | `'cylinder'` | 预设，控制 circular carousel 的对应渲染或交互参数。 |
| `intro` | `CircularCarouselIntro` | 否 | `'rise'` | 入场，控制 circular carousel 的对应渲染或交互参数。 |
| `cardWidth` | `number` | 否 | `220` | 卡片宽度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `aspectRatio` | `number` | 否 | `1` | 宽高比例，控制 circular carousel 的对应渲染或交互参数。 |
| `gap` | `number` | 否 | `25` | 相邻单元、卡片或字符之间的间距；单位由组件实现定义。 |
| `curve` | `number` | 否 | `layout.curve` | 曲线，控制 circular carousel 的对应渲染或交互参数。 |
| `tilt` | `number` | 否 | `layout.tilt` | 倾斜，控制 circular carousel 的对应渲染或交互参数。 |
| `perspective` | `number` | 否 | `layout.perspective` | 透视，控制 circular carousel 的对应渲染或交互参数。 |
| `autoplay` | `CircularCarouselAutoplay` | 否 | `'drift'` | 是否自动播放，决定该分支的展示或交互行为。 |
| `speed` | `number` | 否 | `14` | 动画、流动或滚动的推进速度；不同效果使用各自的速度尺度。 |
| `interval` | `number` | 否 | `3` | 间隔，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `direction` | `'left' \| 'right'` | 否 | `'left'` | 方向，控制 circular carousel 的对应渲染或交互参数。 |
| `draggable` | `boolean` | 否 | `true` | 是否可拖动，决定该分支的展示或交互行为。 |
| `momentum` | `number` | 否 | `0.6` | 动量，控制 circular carousel 的对应渲染或交互参数。 |
| `snap` | `boolean` | 否 | `true` | 是否吸附，决定该分支的展示或交互行为。 |
| `pauseOnHover` | `boolean` | 否 | `true` | 是否暂停悬停，决定该分支的展示或交互行为。 |
| `focusOnClick` | `boolean` | 否 | `true` | 是否焦点点击，决定该分支的展示或交互行为。 |
| `parallax` | `number` | 否 | `0.3` | 视差，控制 circular carousel 的对应渲染或交互参数。 |
| `stretch` | `number` | 否 | `0.5` | 拉伸，控制 circular carousel 的对应渲染或交互参数。 |
| `depthFade` | `number` | 否 | `0.55` | 深度淡出，控制 circular carousel 的对应渲染或交互参数。 |
| `fadeColor` | `string` | 否 | `'#000000'` | 淡出颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `innerShade` | `number` | 否 | `0.6` | 内侧暗部，控制 circular carousel 的对应渲染或交互参数。 |
| `cornerRadius` | `number` | 否 | `12` | 角半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `captions` | `boolean` | 否 | `false` | 是否图注，决定该分支的展示或交互行为。 |
| `onChange` | `(index: number) => void` | 否 | `未指定` | 用户改变值或条目顺序时通知调用方；回调参数类型就是应写回的值或原生事件。 |
| `onItemClick` | `(item: CircularCarouselItem, index: number) => void` | 否 | `未指定` | 用户点击列表或菜单项时通知调用方，参数为条目及索引。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `style` | `React.CSSProperties` | 否 | `未指定` | 容器的 React 内联样式对象，尺寸、布局与 CSS 属性按 CSSProperties 传入。 |

**items 的真实接入：**

```tsx
items={MEDIA.map((src, index) => ({ src, alt: LABELS[index], title: LABELS[index], subtitle: '自然色素材' }))}
```

**onChange 的真实接入：**

```tsx
onChange={index => setStatus('当前图片：' + LABELS[index % LABELS.length])}
```

**onItemClick 的真实接入：**

```tsx
onItemClick={(_item, index) => setStatus('点击图片：' + LABELS[index % LABELS.length])}
```

**style 的真实接入：**

```tsx
style={{ width: "100%", minHeight: 240 }}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.items` | `[{"src":"@media/scene-1.svg","alt":"山雾","title":"山雾","subtitle":"自然色素材"},{"src":"@media/scene-2.svg","alt":"茶庭","title":"茶庭","subtitle":"自然色素材"},{"src":"@media/scene-3.svg","alt":"沙洲","title":"沙洲","subtitle":"自然色素材"},{"src":"@media/scene-4.svg","alt":"静水","title":"静水","subtitle":"自然色素材"},{"src":"@media/scene-5.svg","alt":"林间","title":"林间","subtitle":"自然色素材"},{"src":"@media/scene-6.svg","alt":"岩纹","title":"岩纹","subtitle":"自然色素材"}]` | json | 不限 ~ 不限 | 即时应用 |
| `t0.preset` | `"cylinder"` | select | "cylinder" / "orbit" / "wheel" / "panorama" | 即时应用 |
| `t0.intro` | `"rise"` | select | "assemble" / "rise" / "spin" / "none" | 即时应用 |
| `t0.cardWidth` | `160` | number | 不限 ~ 不限 | 即时应用 |
| `t0.aspectRatio` | `1.25` | number | 不限 ~ 不限 | 即时应用 |
| `t0.gap` | `18` | number | 不限 ~ 不限 | 即时应用 |
| `t0.speed` | `6` | number | 不限 ~ 不限 | 即时应用 |
| `t0.autoplay` | `"off"` | select | "drift" / "step" / "off" | 即时应用 |
| `t0.draggable` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.snap` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.pauseOnHover` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.captions` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.fadeColor` | `"#e8e4d7"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.cornerRadius` | `20` | number | 不限 ~ 不限 | 即时应用 |
| `t0.interval` | `3` | number | 不限 ~ 不限 | 即时应用 |
| `t0.direction` | `"left"` | select | "left" / "right" | 即时应用 |
| `t0.momentum` | `0.6` | number | 不限 ~ 不限 | 即时应用 |
| `t0.focusOnClick` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.parallax` | `0.3` | number | 不限 ~ 不限 | 即时应用 |
| `t0.stretch` | `0.5` | number | 不限 ~ 不限 | 即时应用 |
| `t0.depthFade` | `0.55` | number | 不限 ~ 不限 | 即时应用 |
| `t0.innerShade` | `0.6` | number | 不限 ~ 不限 | 即时应用 |

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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [媒体与轮播](../effects/categories/media.md)；否则直接完成当前组件。
