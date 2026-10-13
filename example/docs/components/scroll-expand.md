# Scroll Expand

滚动与转场 · `scroll-expand` · 中文意图：滚动放大媒体 / 全幅图片展开

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

圆角媒体框随滚动扩展到全幅。

功能要求：装饰层不拦截业务点击、不隐藏真实指针，不成为完成业务的唯一操作方式。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/scroll/scroll-expand.tsx](../../src/demos/scroll/scroll-expand.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Animations/ScrollExpand/ScrollExpand.tsx](../../.upstream/src/ts-default/Animations/ScrollExpand/ScrollExpand.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Animations/ScrollExpand/ScrollExpand.css](../../.upstream/src/ts-default/Animations/ScrollExpand/ScrollExpand.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/scroll-expand.json](../../src/parameters/definitions/scroll-expand.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component scroll-expand
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Scroll Expand 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Animations/ScrollExpand/ScrollExpand';
import { palette } from '../../shared/demo-support';

// 组件自带局部滚动模式，预览不占用整个示例站的页面滚动。

export default function ScrollExpandDemo() {

  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 460, position: 'relative', overflow: 'hidden' }}>
      <Component

     src={import.meta.env.BASE_URL + "media/scene-3.svg"} alt={"自然色山形示意图"} title={"空间随内容展开"} scrollHint={"在此区域向下滚动"} useWindowScroll={false} startWidth={65} startRadius={24} endRadius={4} mediaZoom={1.15} smoothing={0.12} overlayScrim={0.15} mediaType={"image"} poster={""} startHeight={58} scrollDistance={1.2} holdDistance={0.35} enabled={true} ><div style={{ color: palette.ink }}><h3>Every idea needs space.</h3><p>继续滚动，观察媒体框与圆角变化。</p></div></Component>
    </div>
  );
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `src` | `string` | 否 | `''` | 加载图像、视频或纹理的资源地址。 |
| `mediaType` | `'image' \| 'video'` | 否 | `'image'` | 媒体类型，控制 scroll expand 的对应渲染或交互参数。 |
| `poster` | `string` | 否 | `''` | 海报，控制 scroll expand 的对应渲染或交互参数。 |
| `alt` | `string` | 否 | `''` | 图像无法显示及辅助技术读取时的替代文字。 |
| `title` | `string` | 否 | `''` | 组件标题或原生元素提示文字。 |
| `scrollHint` | `string` | 否 | `''` | 滚动提示，控制 scroll expand 的对应渲染或交互参数。 |
| `startWidth` | `number` | 否 | `42` | 开始宽度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `startHeight` | `number` | 否 | `58` | 开始高度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `startRadius` | `number` | 否 | `24` | 开始半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `endRadius` | `number` | 否 | `0` | 结束半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `mediaZoom` | `number` | 否 | `1.35` | 媒体缩放，控制 scroll expand 的对应渲染或交互参数。 |
| `scrollDistance` | `number` | 否 | `1.2` | 滚动距离，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `holdDistance` | `number` | 否 | `0.35` | 按住距离，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `smoothing` | `number` | 否 | `0.1` | 平滑，控制 scroll expand 的对应渲染或交互参数。 |
| `overlayScrim` | `number` | 否 | `0.45` | 覆盖层遮罩，控制 scroll expand 的对应渲染或交互参数。 |
| `useWindowScroll` | `boolean` | 否 | `false` | 是否使用窗口滚动，决定该分支的展示或交互行为。 |
| `enabled` | `boolean` | 否 | `true` | 是否启用，决定该分支的展示或交互行为。 |
| `children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `style` | `CSSProperties` | 否 | `未指定` | 容器的 React 内联样式对象，尺寸、布局与 CSS 属性按 CSSProperties 传入。 |

**开放属性签名：**

- `[key: string]: unknown`；额外字段按锁定实现转发，当前用法展示了本例采用的配置。

**children 的真实接入：**

```tsx
children={<><div style={{ color: palette.ink }}><h3>Every idea needs space.</h3><p>继续滚动，观察媒体框与圆角变化。</p></div></>}
```

**style 的真实接入：**

```tsx
style={{ width: "100%", minHeight: 240 }}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.src` | `"@media/scene-3.svg"` | resource | "@asset/restoration/chromatic-bloom.svg" / "@asset/restoration/mineral-tide.svg" / "@asset/restoration/nocturne-orbit.svg" / "@asset/restoration/prismatic-canopy.svg" / "@asset/restoration/solar-dunes.svg" / "@asset/restoration/vermilion-fold.svg" / "@media/scene-1.svg" / "@media/scene-2.svg" / "@media/scene-3.svg" / "@media/scene-4.svg" / "@media/scene-5.svg" / "@media/scene-6.svg" | 即时应用 |
| `t0.alt` | `"自然色山形示意图"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.title` | `"空间随内容展开"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.scrollHint` | `"在此区域向下滚动"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.useWindowScroll` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.startWidth` | `65` | number | 不限 ~ 不限 | 即时应用 |
| `t0.startRadius` | `24` | number | 不限 ~ 不限 | 即时应用 |
| `t0.endRadius` | `4` | number | 不限 ~ 不限 | 即时应用 |
| `t0.mediaZoom` | `1.15` | number | 不限 ~ 不限 | 即时应用 |
| `t0.smoothing` | `0.12` | number | 不限 ~ 不限 | 即时应用 |
| `t0.overlayScrim` | `0.15` | number | 不限 ~ 不限 | 即时应用 |
| `t0.mediaType` | `"image"` | select | "image" / "video" | 即时应用 |
| `t0.poster` | `""` | resource | "" / "@asset/restoration/chromatic-bloom.svg" / "@asset/restoration/mineral-tide.svg" / "@asset/restoration/nocturne-orbit.svg" / "@asset/restoration/prismatic-canopy.svg" / "@asset/restoration/solar-dunes.svg" / "@asset/restoration/vermilion-fold.svg" / "@media/scene-1.svg" / "@media/scene-2.svg" / "@media/scene-3.svg" / "@media/scene-4.svg" / "@media/scene-5.svg" / "@media/scene-6.svg" | 即时应用 |
| `t0.startHeight` | `58` | number | 不限 ~ 不限 | 即时应用 |
| `t0.scrollDistance` | `1.2` | number | 不限 ~ 不限 | 即时应用 |
| `t0.holdDistance` | `0.35` | number | 不限 ~ 不限 | 即时应用 |
| `t0.enabled` | `true` | switch | 不限 ~ 不限 | 即时应用 |

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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [滚动与转场](../effects/categories/scroll.md)；否则直接完成当前组件。
