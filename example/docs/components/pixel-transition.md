# Pixel Transition

滚动与转场 · `pixel-transition` · 中文意图：像素转场 / 像素溶解

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-ric-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

卡片由像素遮盖完成内容切换再显露。

功能要求：装饰层不拦截业务点击、不隐藏真实指针，不成为完成业务的唯一操作方式。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/scroll/pixel-transition.tsx](../../src/demos/scroll/pixel-transition.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Animations/PixelTransition/PixelTransition.tsx](../../.upstream/src/ts-default/Animations/PixelTransition/PixelTransition.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Animations/PixelTransition/PixelTransition.css](../../.upstream/src/ts-default/Animations/PixelTransition/PixelTransition.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/pixel-transition.json](../../src/parameters/definitions/pixel-transition.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component pixel-transition
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Pixel Transition 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Animations/PixelTransition/PixelTransition';
import { palette } from '../../shared/demo-support';

// 悬停通过网格遮罩完成图像替换；与Pixel Swap的碎片交换分别实现。
// 此演示使用Canvas；确保容器拥有非零宽高。

export default function PixelTransitionDemo() {

  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component firstContent={<img    src={import.meta.env.BASE_URL + "media/scene-2.svg"} alt={"切换前的示意图"} style={{ "width": "100%", "height": "100%", "objectFit": "cover" }}  />}
secondContent={<img    src={import.meta.env.BASE_URL + "media/scene-5.svg"} alt={"切换后的示意图"} style={{ "width": "100%", "height": "100%", "objectFit": "cover" }}  />}


   pixelColor={"#a6b39a"} gridSize={12} pixelShape={"square"} gap={1} pattern={"random"} pixelAnimation={"pop"} randomness={0.25} animationStepDuration={0.35} trigger={"hover"} aspectRatio={"62.5%"} mosaic={0} fps={0} once={false}  />
    </div>
  );
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `firstContent` | `React.ReactNode` | 是 | `未指定` | 第一内容，控制 pixel transition 的对应渲染或交互参数。 |
| `secondContent` | `React.ReactNode` | 是 | `未指定` | 第二内容，控制 pixel transition 的对应渲染或交互参数。 |
| `gridSize` | `number` | 否 | `10` | 网格每边的单元数量或单元尺寸，按该组件的数值契约设置。 |
| `pixelColor` | `string` | 否 | `'#ffffff'` | 像素颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `mosaic` | `number` | 否 | `0` | 马赛克，控制 pixel transition 的对应渲染或交互参数。 |
| `animationStepDuration` | `number` | 否 | `0.4` | 动画步进时长，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `pattern` | `PixelTransitionPattern` | 否 | `'random'` | 原生表单验证使用的正则模式。 |
| `randomness` | `number` | 否 | `0.3` | 随机差异，控制 pixel transition 的对应渲染或交互参数。 |
| `pixelAnimation` | `PixelTransitionAnimation` | 否 | `'pop'` | 像素动画，控制 pixel transition 的对应渲染或交互参数。 |
| `pixelShape` | `PixelTransitionShape` | 否 | `'square'` | 像素形状，控制 pixel transition 的对应渲染或交互参数。 |
| `gap` | `number` | 否 | `0` | 相邻单元、卡片或字符之间的间距；单位由组件实现定义。 |
| `fps` | `number` | 否 | `0` | 每秒帧数，控制 pixel transition 的对应渲染或交互参数。 |
| `trigger` | `'hover' \| 'click'` | 否 | `'hover'` | 触发方式，控制 pixel transition 的对应渲染或交互参数。 |
| `active` | `boolean` | 否 | `未指定` | 是否启用当前交互或焦点约束。 |
| `once` | `boolean` | 否 | `false` | 仅一次时执行的回调；按签名接收事件或结果，调用方在函数中同步业务状态。 |
| `onActiveChange` | `(active: boolean) => void` | 否 | `未指定` | 激活改变时执行的回调；按签名接收事件或结果，调用方在函数中同步业务状态。 |
| `aspectRatio` | `string` | 否 | `'100%'` | 宽高比例，控制 pixel transition 的对应渲染或交互参数。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `style` | `React.CSSProperties` | 否 | `未指定` | 容器的 React 内联样式对象，尺寸、布局与 CSS 属性按 CSSProperties 传入。 |
| `img · t1.src` | `string \| undefined` | 否 | `未指定` | 加载图像、视频或纹理的资源地址。 |
| `img · t1.alt` | `string \| undefined` | 否 | `未指定` | 图像无法显示及辅助技术读取时的替代文字。 |
| `img · t1.style` | `CSSProperties \| undefined` | 否 | `未指定` | 容器的 React 内联样式对象，尺寸、布局与 CSS 属性按 CSSProperties 传入。 |

**继承的原生属性：**

- `DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**firstContent 的真实接入：**

```tsx
firstContent={<img src={MEDIA[1]} alt="切换前的示意图" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
```

**secondContent 的真实接入：**

```tsx
secondContent={<img src={MEDIA[4]} alt="切换后的示意图" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
```

**onActiveChange 的真实接入：**

```tsx
onActiveChange={(active) => {}}
```

**style 的真实接入：**

```tsx
style={{ width: "100%", minHeight: 240 }}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.pixelColor` | `"#a6b39a"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.gridSize` | `12` | range | 1 ~ 128 | 调节结束后重建 |
| `t0.pixelShape` | `"square"` | select | "square" / "rounded" / "circle" | 调节结束后重建 |
| `t0.gap` | `1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.pattern` | `"random"` | select | "random" / "dither" / "ripple" / "wipe" | 调节结束后重建 |
| `t0.pixelAnimation` | `"pop"` | select | "pop" / "grow" / "fade" | 调节结束后重建 |
| `t0.randomness` | `0.25` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.animationStepDuration` | `0.35` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.trigger` | `"hover"` | select | "hover" / "click" | 调节结束后重建 |
| `t0.aspectRatio` | `"62.5%"` | text | 不限 ~ 不限 | 调节结束后重建 |
| `t0.mosaic` | `0` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.fps` | `0` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.once` | `false` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t1.src` | `"@media/scene-2.svg"` | resource | "@asset/restoration/chromatic-bloom.svg" / "@asset/restoration/mineral-tide.svg" / "@asset/restoration/nocturne-orbit.svg" / "@asset/restoration/prismatic-canopy.svg" / "@asset/restoration/solar-dunes.svg" / "@asset/restoration/vermilion-fold.svg" / "@media/scene-1.svg" / "@media/scene-2.svg" / "@media/scene-3.svg" / "@media/scene-4.svg" / "@media/scene-5.svg" / "@media/scene-6.svg" | 调节结束后重建 |
| `t1.alt` | `"切换前的示意图"` | text | 不限 ~ 不限 | 调节结束后重建 |
| `t1.style` | `{"width":"100%","height":"100%","objectFit":"cover"}` | json | 不限 ~ 不限 | 调节结束后重建 |
| `t2.src` | `"@media/scene-5.svg"` | resource | "@asset/restoration/chromatic-bloom.svg" / "@asset/restoration/mineral-tide.svg" / "@asset/restoration/nocturne-orbit.svg" / "@asset/restoration/prismatic-canopy.svg" / "@asset/restoration/solar-dunes.svg" / "@asset/restoration/vermilion-fold.svg" / "@media/scene-1.svg" / "@media/scene-2.svg" / "@media/scene-3.svg" / "@media/scene-4.svg" / "@media/scene-5.svg" / "@media/scene-6.svg" | 调节结束后重建 |
| `t2.alt` | `"切换后的示意图"` | text | 不限 ~ 不限 | 调节结束后重建 |
| `t2.style` | `{"width":"100%","height":"100%","objectFit":"cover"}` | json | 不限 ~ 不限 | 调节结束后重建 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Ric 皮肤

- 容器、状态色、边界与焦点使用 Agent Ric 规范；交互命中区不随视觉形变缩小。
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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [滚动与转场](../effects/categories/scroll.md)；否则直接完成当前组件。
