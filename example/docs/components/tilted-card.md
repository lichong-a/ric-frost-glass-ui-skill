# Tilted Card

卡片与面板 · `tilted-card` · 中文意图：倾斜卡片 / 指针视差卡

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-ric-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

卡片随指针改变三维倾角。

功能要求：保持内容的语义和可访问名称；只有真实可交互元素可进入焦点顺序。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/cards/tilted-card.tsx](../../src/demos/cards/tilted-card.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Components/TiltedCard/TiltedCard.tsx](../../.upstream/src/ts-default/Components/TiltedCard/TiltedCard.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Components/TiltedCard/TiltedCard.css](../../.upstream/src/ts-default/Components/TiltedCard/TiltedCard.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/tilted-card.json](../../src/parameters/definitions/tilted-card.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component tilted-card
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Tilted Card 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Components/TiltedCard/TiltedCard';
import { palette } from '../../shared/demo-support';

// 真实图片视差倾斜和跟随标题，倾角按规范保持克制。

export default function TiltedCardDemo() {

  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 340, position: 'relative', display: 'grid', placeItems: 'center', padding: 24, color: palette.ink }}>
      <Component


 overlayContent={<p style={{ background: palette.ivory, color: palette.ink, padding: '8px 12px', borderRadius: 10, margin: 16 }}>自然有序</p>} imageSrc={import.meta.env.BASE_URL + "media/scene-3.svg"} altText={"自然色山形示意卡片"} captionText={"Agent Ric · 山雾"} containerHeight={"300px"} containerWidth={"300px"} imageHeight={"280px"} imageWidth={"280px"} rotateAmplitude={7} scaleOnHover={1.04} showMobileWarning={false} showTooltip={true} displayOverlayContent={true}  />
    </div>
  );
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `imageSrc` | `React.ComponentProps<'img'>['src']` | 是 | `未指定` | 用作主图或纹理的图像资源地址。 |
| `altText` | `string` | 否 | `'Tilted card image'` | 主图的替代文字。 |
| `captionText` | `string` | 否 | `''` | 主图旁显示的说明文字。 |
| `containerHeight` | `React.CSSProperties['height']` | 否 | `'300px'` | 容器高度的结构化配置；对象字段按完整类型传入并由组件读取。 |
| `containerWidth` | `React.CSSProperties['width']` | 否 | `'100%'` | 容器宽度的结构化配置；对象字段按完整类型传入并由组件读取。 |
| `imageHeight` | `React.CSSProperties['height']` | 否 | `'300px'` | 图像高度的结构化配置；对象字段按完整类型传入并由组件读取。 |
| `imageWidth` | `React.CSSProperties['width']` | 否 | `'300px'` | 图像宽度的结构化配置；对象字段按完整类型传入并由组件读取。 |
| `scaleOnHover` | `number` | 否 | `1.1` | 缩放悬停，控制 tilted card 的对应渲染或交互参数。 |
| `rotateAmplitude` | `number` | 否 | `14` | 旋转振幅，控制 tilted card 的对应渲染或交互参数。 |
| `showMobileWarning` | `boolean` | 否 | `true` | 是否显示移动端提示，决定该分支的展示或交互行为。 |
| `showTooltip` | `boolean` | 否 | `true` | 是否显示提示浮层，决定该分支的展示或交互行为。 |
| `overlayContent` | `React.ReactNode` | 否 | `null` | 覆盖层内容，控制 tilted card 的对应渲染或交互参数。 |
| `displayOverlayContent` | `boolean` | 否 | `false` | 是否显示覆盖层内容，决定该分支的展示或交互行为。 |

**imageSrc 的真实接入：**

```tsx
imageSrc={MEDIA[2]}
```

**containerHeight 的真实接入：**

```tsx
containerHeight="300px"
```

**containerWidth 的真实接入：**

```tsx
containerWidth="300px"
```

**imageHeight 的真实接入：**

```tsx
imageHeight="280px"
```

**imageWidth 的真实接入：**

```tsx
imageWidth="280px"
```

**overlayContent 的真实接入：**

```tsx
overlayContent={<p style={{ background: palette.ivory, color: palette.ink, padding: '8px 12px', borderRadius: 10, margin: 16 }}>自然有序</p>}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.imageSrc` | `"@media/scene-3.svg"` | resource | "@asset/restoration/chromatic-bloom.svg" / "@asset/restoration/mineral-tide.svg" / "@asset/restoration/nocturne-orbit.svg" / "@asset/restoration/prismatic-canopy.svg" / "@asset/restoration/solar-dunes.svg" / "@asset/restoration/vermilion-fold.svg" / "@media/scene-1.svg" / "@media/scene-2.svg" / "@media/scene-3.svg" / "@media/scene-4.svg" / "@media/scene-5.svg" / "@media/scene-6.svg" | 即时应用 |
| `t0.altText` | `"自然色山形示意卡片"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.captionText` | `"Agent Ric · 山雾"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.containerHeight` | `"300px"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.containerWidth` | `"300px"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.imageHeight` | `"280px"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.imageWidth` | `"280px"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.rotateAmplitude` | `7` | number | 不限 ~ 不限 | 即时应用 |
| `t0.scaleOnHover` | `1.04` | number | 不限 ~ 不限 | 即时应用 |
| `t0.showMobileWarning` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.showTooltip` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.displayOverlayContent` | `true` | switch | 不限 ~ 不限 | 即时应用 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Ric 皮肤

- 容器、状态色、边界与焦点使用 Agent Ric 规范；交互命中区不随视觉形变缩小。
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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [卡片与面板](../effects/categories/cards.md)；否则直接完成当前组件。
