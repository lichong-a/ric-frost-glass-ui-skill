# Holo Card

卡片与面板 · `holo-card` · 中文意图：全息卡片 / 收藏卡

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

卡片倾斜时保留全息膜与细闪光变化。

功能要求：保持内容的语义和可访问名称；只有真实可交互元素可进入焦点顺序。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/cards/holo-card.tsx](../../src/demos/cards/holo-card.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Components/HoloCard/HoloCard.tsx](../../.upstream/src/ts-default/Components/HoloCard/HoloCard.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Components/HoloCard/HoloCard.css](../../.upstream/src/ts-default/Components/HoloCard/HoloCard.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/holo-card.json](../../src/parameters/definitions/holo-card.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component holo-card
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Holo Card 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Components/HoloCard/HoloCard';
import { palette } from '../../shared/demo-support';

// 移动指针观察真实全息材质，点击翻到背面。降低箔膜强度与高光，保留自然色素材。
// 此演示需要可用WebGL上下文；不支持时应显示能力提示，不声称效果已运行。

export default function HoloCardDemo() {

  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 340, position: 'relative', display: 'grid', placeItems: 'center', padding: 24, color: palette.ink }}>
      <Component


idle={false}  image={import.meta.env.BASE_URL + "media/scene-1.svg"} backImage={import.meta.env.BASE_URL + "media/scene-4.svg"} alt={"Agent Wan自然色收藏卡"} preset={"gold"} intensity={0.3} edgeSparkle={0.2} frame={2} glare={0.2} foilColor={"#c3ae88"} width={250} radius={20} tiltMax={8} hoverScale={1.025} shadow={true} scale={1}  />
    </div>
  );
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `image` | `string` | 否 | `未指定` | 主图资源或图像配置，结构以类型为准。 |
| `backImage` | `string` | 否 | `未指定` | 背面显示的图像资源。 |
| `alt` | `string` | 否 | `''` | 图像无法显示及辅助技术读取时的替代文字。 |
| `preset` | `HoloPreset` | 否 | `'bursts'` | 预设，控制 holo card 的对应渲染或交互参数。 |
| `intensity` | `number` | 否 | `0.85` | 强度，控制 holo card 的对应渲染或交互参数。 |
| `scale` | `number` | 否 | `1` | 缩放，控制 holo card 的对应渲染或交互参数。 |
| `edgeSparkle` | `number` | 否 | `0.8` | 边缘星屑闪烁，控制 holo card 的对应渲染或交互参数。 |
| `frame` | `number` | 否 | `4` | 外框，控制 holo card 的对应渲染或交互参数。 |
| `glare` | `number` | 否 | `0.5` | 眩光，控制 holo card 的对应渲染或交互参数。 |
| `foilColor` | `string` | 否 | `'#e2e6ec'` | 箔面颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `width` | `number` | 否 | `320` | 容器或效果的宽度，CSS 字符串与数值的支持以类型为准。 |
| `radius` | `number` | 否 | `14` | 半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `tiltMax` | `number` | 否 | `14` | 倾斜最大，控制 holo card 的对应渲染或交互参数。 |
| `hoverScale` | `number` | 否 | `1.04` | 悬停缩放，控制 holo card 的对应渲染或交互参数。 |
| `idle` | `boolean` | 否 | `true` | 是否静止，决定该分支的展示或交互行为。 |
| `shadow` | `boolean` | 否 | `true` | 是否阴影，决定该分支的展示或交互行为。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `style` | `CSSProperties` | 否 | `未指定` | 容器的 React 内联样式对象，尺寸、布局与 CSS 属性按 CSSProperties 传入。 |

**style 的真实接入：**

```tsx
style={{ width: "100%", minHeight: 240 }}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.image` | `"@media/scene-1.svg"` | resource | "@asset/restoration/chromatic-bloom.svg" / "@asset/restoration/mineral-tide.svg" / "@asset/restoration/nocturne-orbit.svg" / "@asset/restoration/prismatic-canopy.svg" / "@asset/restoration/solar-dunes.svg" / "@asset/restoration/vermilion-fold.svg" / "@media/scene-1.svg" / "@media/scene-2.svg" / "@media/scene-3.svg" / "@media/scene-4.svg" / "@media/scene-5.svg" / "@media/scene-6.svg" | 调节结束后重建 |
| `t0.backImage` | `"@media/scene-4.svg"` | resource | 不限 ~ 不限 | 调节结束后重建 |
| `t0.alt` | `"Agent Wan自然色收藏卡"` | text | 不限 ~ 不限 | 调节结束后重建 |
| `t0.preset` | `"gold"` | select | "bursts" / "stars" / "shards" / "cosmos" / "rainbow" / "swirl" / "glitter" / "gold" | 调节结束后重建 |
| `t0.intensity` | `0.3` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.edgeSparkle` | `0.2` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.frame` | `2` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.glare` | `0.2` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.foilColor` | `"#c3ae88"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.width` | `250` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.radius` | `20` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.tiltMax` | `8` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.hoverScale` | `1.025` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.shadow` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.scale` | `1` | number | 不限 ~ 不限 | 调节结束后重建 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Wan 皮肤

- 容器、状态色、边界与焦点使用 Agent Wan 规范；交互命中区不随视觉形变缩小。
- 组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。
- 保留折射、光晕或反光的可观察变化；本例允许深色画布和原版高光强度，阅读文字应保持清晰。

## 5. 加载、动效与降级

本例实际配置：设备访问与音频行为以本例真实 Props 和显式回调为准。capabilities 是源码扫描提示，不能据此声称已请求相机、录音或播放音频。

- 依赖清单：`react`。安装前复用目标项目的兼容版本，不重复加载。
- 运行类型：本例预览入口声明需 WebGL；这是当前示例的运行配置，不是仅凭源码关键词推断。此说明不等于浏览器运行证明。
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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [卡片与面板](../effects/categories/cards.md)；否则直接完成当前组件。
