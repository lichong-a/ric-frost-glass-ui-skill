# Morph Slider

媒体与轮播 · `morph-slider` · 中文意图：变形轮播 / 图像融合转场

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-ric-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

相邻图片通过位移形变完成切换。

功能要求：由真实 value / state 与回调驱动；操作可用键盘完成，不能只在动画内部保存业务状态。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/media/morph-slider.tsx](../../src/demos/media/morph-slider.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Components/MorphSlider/MorphSlider.tsx](../../.upstream/src/ts-default/Components/MorphSlider/MorphSlider.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Components/MorphSlider/MorphSlider.css](../../.upstream/src/ts-default/Components/MorphSlider/MorphSlider.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/morph-slider.json](../../src/parameters/definitions/morph-slider.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component morph-slider
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Morph Slider 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Components/MorphSlider/MorphSlider';
import { palette } from '../../shared/demo-support';

// 使用内置上一张、下一张和指示器，展示真实WebGL图片位移过渡。
// 此演示需要可用WebGL上下文；不支持时应显示能力提示，不声称效果已运行。

export default function MorphSliderDemo() {

  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 400, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component


   items={[{ "image": import.meta.env.BASE_URL + "media/scene-1.svg", "caption": "山雾" }, { "image": import.meta.env.BASE_URL + "media/scene-2.svg", "caption": "茶庭" }, { "image": import.meta.env.BASE_URL + "media/scene-3.svg", "caption": "沙洲" }, { "image": import.meta.env.BASE_URL + "media/scene-4.svg", "caption": "静水" }, { "image": import.meta.env.BASE_URL + "media/scene-5.svg", "caption": "林间" }, { "image": import.meta.env.BASE_URL + "media/scene-6.svg", "caption": "岩纹" }]} transition={"melt"} duration={0.8} intensity={0.3} aberration={0.04} drift={0.12} autoplay={false} loop={true} radius={20} overlayColor={"#52604e"} showCaptions={true} showControls={true} showIndicators={true} startIndex={0} ease={"power2.inOut"} scale={2.4} autoplayDelay={4}  />
    </div>
  );
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `items` | `MorphItem[]` | 否 | `DEFAULT_ITEMS` | 参与渲染或交互的条目列表，每项字段和可选内容按完整类型传入。 |
| `startIndex` | `number` | 否 | `0` | 开始索引，控制 morph slider 的对应渲染或交互参数。 |
| `transition` | `MorphTransition` | 否 | `'melt'` | 动画的过渡配置对象，如 spring 的 stiffness、damping 或 duration。 |
| `duration` | `number` | 否 | `1.1` | 一次动画或过渡的持续时长，时间单位以组件实现和示例为准。 |
| `ease` | `string` | 否 | `'power2.inOut'` | 动画缓动名称或配置，按所用动画库的类型传入。 |
| `intensity` | `number` | 否 | `0.55` | 强度，控制 morph slider 的对应渲染或交互参数。 |
| `scale` | `number` | 否 | `2.4` | 缩放，控制 morph slider 的对应渲染或交互参数。 |
| `aberration` | `number` | 否 | `0.35` | 色散，控制 morph slider 的对应渲染或交互参数。 |
| `drift` | `number` | 否 | `0.4` | 漂移，控制 morph slider 的对应渲染或交互参数。 |
| `autoplay` | `boolean` | 否 | `false` | 是否自动播放，决定该分支的展示或交互行为。 |
| `autoplayDelay` | `number` | 否 | `4` | 是否自动播放延迟，决定该分支的展示或交互行为。 |
| `loop` | `boolean` | 否 | `true` | 是否循环，决定该分支的展示或交互行为。 |
| `radius` | `number` | 否 | `16` | 半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `overlayColor` | `string` | 否 | `'#000000'` | 覆盖层颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `showCaptions` | `boolean` | 否 | `true` | 是否显示图注，决定该分支的展示或交互行为。 |
| `showControls` | `boolean` | 否 | `true` | 是否显示控制，决定该分支的展示或交互行为。 |
| `showIndicators` | `boolean` | 否 | `true` | 是否显示指示器，决定该分支的展示或交互行为。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |

**开放属性签名：**

- `[key: string]: unknown`；额外字段按锁定实现转发，当前用法展示了本例采用的配置。

**items 的真实接入：**

```tsx
items={MEDIA.map((image, index) => ({ image, caption: LABELS[index] }))}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.items` | `[{"image":"@media/scene-1.svg","caption":"山雾"},{"image":"@media/scene-2.svg","caption":"茶庭"},{"image":"@media/scene-3.svg","caption":"沙洲"},{"image":"@media/scene-4.svg","caption":"静水"},{"image":"@media/scene-5.svg","caption":"林间"},{"image":"@media/scene-6.svg","caption":"岩纹"}]` | json | 不限 ~ 不限 | 调节结束后重建 |
| `t0.transition` | `"melt"` | select | "melt" / "ripple" / "shear" / "swirl" | 调节结束后重建 |
| `t0.duration` | `0.8` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.intensity` | `0.3` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.aberration` | `0.04` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.drift` | `0.12` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.autoplay` | `false` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.loop` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.radius` | `20` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.overlayColor` | `"#52604e"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.showCaptions` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.showControls` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.showIndicators` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.startIndex` | `0` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.ease` | `"power2.inOut"` | text | 不限 ~ 不限 | 调节结束后重建 |
| `t0.scale` | `2.4` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.autoplayDelay` | `4` | number | 不限 ~ 不限 | 调节结束后重建 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Ric 皮肤

- 容器、状态色、边界与焦点使用 Agent Ric 规范；交互命中区不随视觉形变缩小。
- 组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。

## 5. 加载、动效与降级

本例实际配置：设备访问与音频行为以本例真实 Props 和显式回调为准。capabilities 是源码扫描提示，不能据此声称已请求相机、录音或播放音频。

- 依赖清单：`gsap`、`ogl`、`react`。安装前复用目标项目的兼容版本，不重复加载。
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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [媒体与轮播](../effects/categories/media.md)；否则直接完成当前组件。
