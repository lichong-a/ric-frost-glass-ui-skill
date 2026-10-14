# Card Swap

卡片与面板 · `card-swap` · 中文意图：卡片交换 / 自动卡片堆

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-ric-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

前卡片按计时或甩动操作移到后方。

功能要求：图片说明与次序可理解；提供触屏和键盘可达的浏览路径，自动播放可暂停，资源失败时保留稳定布局。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/cards/card-swap.tsx](../../src/demos/cards/card-swap.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Components/CardSwap/CardSwap.tsx](../../.upstream/src/ts-default/Components/CardSwap/CardSwap.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Components/CardSwap/CardSwap.css](../../.upstream/src/ts-default/Components/CardSwap/CardSwap.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/card-swap.json](../../src/parameters/definitions/card-swap.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component card-swap
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Card Swap 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：640px（宿主设置，不是组件 Props）。
// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Components/CardSwap/CardSwap';
import { LABELS, palette } from '../../shared/demo-support';
import { useState } from "react";
// 独立实现Card Swap的深度堆栈切换，与Stack分别保留真实行为。

export default function CardSwapDemo() {
  const [status, setStatus] = useState("拖动或甩动前方卡片，将其放到后面");

  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 400, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <div style={{ width: '100%', height: '100%' }}><div style={{ position: 'relative', height: 330, minHeight: 0, width: '100%' }}><Component




onCardClick={index => setStatus('点击卡片：' + LABELS[index % LABELS.length])}
onChange={index => setStatus('当前卡片：' + LABELS[index % LABELS.length])} items={[{ "image": import.meta.env.BASE_URL + "media/scene-1.svg", "alt": "山雾", "title": "山雾" }, { "image": import.meta.env.BASE_URL + "media/scene-2.svg", "alt": "茶庭", "title": "茶庭" }, { "image": import.meta.env.BASE_URL + "media/scene-3.svg", "alt": "沙洲", "title": "沙洲" }, { "image": import.meta.env.BASE_URL + "media/scene-4.svg", "alt": "静水", "title": "静水" }, { "image": import.meta.env.BASE_URL + "media/scene-5.svg", "alt": "林间", "title": "林间" }, { "image": import.meta.env.BASE_URL + "media/scene-6.svg", "alt": "岩纹", "title": "岩纹" }]} width={320} height={225} cardDistance={42} verticalDistance={30} depth={45} skewAmount={3} visibleCards={3} delay={4000} autoplay={false} pauseOnHover={true} draggable={true} bounce={0.35} parallax={0.15} hoverSpread={0.2} dim={0.12} cardRadius={20} theme={"light"} speed={1} intro={true}  /></div><p role="status" aria-live="polite" style={{ margin: '12px 20px', fontSize: 14, color: palette.muted }}>{status}</p></div>
    </div>
  );
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `items` | `CardSwapItem[]` | 否 | `未指定` | 参与渲染或交互的条目列表，每项字段和可选内容按完整类型传入。 |
| `width` | `number` | 否 | `460` | 容器或效果的宽度，CSS 字符串与数值的支持以类型为准。 |
| `height` | `number` | 否 | `340` | 容器或效果的高度，CSS 字符串与数值的支持以类型为准。 |
| `cardDistance` | `number` | 否 | `60` | 卡片距离，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `verticalDistance` | `number` | 否 | `70` | 垂直距离，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `depth` | `number` | 否 | `90` | 深度，控制 card swap 的对应渲染或交互参数。 |
| `skewAmount` | `number` | 否 | `6` | 斜切幅度，控制 card swap 的对应渲染或交互参数。 |
| `visibleCards` | `number` | 否 | `4` | 可见卡片，控制 card swap 的对应渲染或交互参数。 |
| `delay` | `number` | 否 | `4000` | 开始动画或执行回调之前的等待时长。 |
| `autoplay` | `boolean` | 否 | `true` | 是否自动播放，决定该分支的展示或交互行为。 |
| `pauseOnHover` | `boolean` | 否 | `true` | 是否暂停悬停，决定该分支的展示或交互行为。 |
| `draggable` | `boolean` | 否 | `true` | 是否可拖动，决定该分支的展示或交互行为。 |
| `speed` | `number` | 否 | `1` | 动画、流动或滚动的推进速度；不同效果使用各自的速度尺度。 |
| `bounce` | `number` | 否 | `0.35` | 回弹，控制 card swap 的对应渲染或交互参数。 |
| `parallax` | `number` | 否 | `0.5` | 视差，控制 card swap 的对应渲染或交互参数。 |
| `hoverSpread` | `number` | 否 | `0.12` | 悬停展开间距，控制 card swap 的对应渲染或交互参数。 |
| `dim` | `number` | 否 | `0.5` | 暗化，控制 card swap 的对应渲染或交互参数。 |
| `cardRadius` | `number` | 否 | `18` | 卡片半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `intro` | `boolean` | 否 | `true` | 是否入场，决定该分支的展示或交互行为。 |
| `theme` | `'dark' \| 'light'` | 否 | `'dark'` | 主题，控制 card swap 的对应渲染或交互参数。 |
| `onCardClick` | `(index: number) => void` | 否 | `未指定` | 卡片点击时执行的回调；按签名接收事件或结果，调用方在函数中同步业务状态。 |
| `onChange` | `(index: number) => void` | 否 | `未指定` | 用户改变值或条目顺序时通知调用方；回调参数类型就是应写回的值或原生事件。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `ref` | `Ref<CardSwapHandle> \| undefined` | 否 | `未指定` | 连接实际 DOM 元素或组件命令句柄，支持类型声明中的 ref 形式。 |

**继承的原生属性：**

- `Ref<CardSwapHandle> | undefined`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**items 的真实接入：**

```tsx
items={MEDIA.map((image, index) => ({ image, alt: LABELS[index], title: LABELS[index] }))}
```

**onCardClick 的真实接入：**

```tsx
onCardClick={index => setStatus('点击卡片：' + LABELS[index % LABELS.length])}
```

**onChange 的真实接入：**

```tsx
onChange={index => setStatus('当前卡片：' + LABELS[index % LABELS.length])}
```

**children 的真实接入：**

```tsx
children={"示例"}
```

**ref 的真实接入：**

```tsx
const elementRef = useRef<CardSwapHandle | null>(null);
// JSX: ref={elementRef}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.items` | `[{"image":"@media/scene-1.svg","alt":"山雾","title":"山雾"},{"image":"@media/scene-2.svg","alt":"茶庭","title":"茶庭"},{"image":"@media/scene-3.svg","alt":"沙洲","title":"沙洲"},{"image":"@media/scene-4.svg","alt":"静水","title":"静水"},{"image":"@media/scene-5.svg","alt":"林间","title":"林间"},{"image":"@media/scene-6.svg","alt":"岩纹","title":"岩纹"}]` | json | 不限 ~ 不限 | 即时应用 |
| `t0.width` | `320` | number | 不限 ~ 不限 | 即时应用 |
| `t0.height` | `225` | number | 不限 ~ 不限 | 即时应用 |
| `t0.cardDistance` | `42` | number | 不限 ~ 不限 | 即时应用 |
| `t0.verticalDistance` | `30` | number | 不限 ~ 不限 | 即时应用 |
| `t0.depth` | `45` | number | 不限 ~ 不限 | 即时应用 |
| `t0.skewAmount` | `3` | number | 不限 ~ 不限 | 即时应用 |
| `t0.visibleCards` | `3` | number | 不限 ~ 不限 | 即时应用 |
| `t0.delay` | `4000` | number | 不限 ~ 不限 | 即时应用 |
| `t0.autoplay` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.pauseOnHover` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.draggable` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.bounce` | `0.35` | number | 不限 ~ 不限 | 即时应用 |
| `t0.parallax` | `0.15` | number | 不限 ~ 不限 | 即时应用 |
| `t0.hoverSpread` | `0.2` | number | 不限 ~ 不限 | 即时应用 |
| `t0.dim` | `0.12` | number | 不限 ~ 不限 | 即时应用 |
| `t0.cardRadius` | `20` | number | 不限 ~ 不限 | 即时应用 |
| `t0.theme` | `"light"` | select | "dark" / "light" | 即时应用 |
| `t0.speed` | `1` | number | 不限 ~ 不限 | 即时应用 |
| `t0.intro` | `true` | switch | 不限 ~ 不限 | 即时应用 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `640`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Ric 皮肤

- 容器、状态色、边界与焦点使用 Agent Ric 规范；交互命中区不随视觉形变缩小。
- 组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。

## 5. 加载、动效与降级

本例实际配置：设备访问与音频行为以本例真实 Props 和显式回调为准。capabilities 是源码扫描提示，不能据此声称已请求相机、录音或播放音频。

- 依赖清单：`@hugeicons/core-free-icons`、`@hugeicons/react`、`react`。安装前复用目标项目的兼容版本，不重复加载。
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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [卡片与面板](../effects/categories/cards.md)；否则直接完成当前组件。
