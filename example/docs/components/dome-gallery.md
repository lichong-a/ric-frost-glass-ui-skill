# Dome Gallery

媒体与轮播 · `dome-gallery` · 中文意图：穹顶画廊 / 半球相册

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

图像映射到半球空间并可浏览。

功能要求：图片说明与次序可理解；提供触屏和键盘可达的浏览路径，自动播放可暂停，资源失败时保留稳定布局。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/media/dome-gallery.tsx](../../src/demos/media/dome-gallery.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Components/DomeGallery/DomeGallery.tsx](../../.upstream/src/ts-default/Components/DomeGallery/DomeGallery.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Components/DomeGallery/DomeGallery.css](../../.upstream/src/ts-default/Components/DomeGallery/DomeGallery.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/dome-gallery.json](../../src/parameters/definitions/dome-gallery.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component dome-gallery
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Dome Gallery 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Components/DomeGallery/DomeGallery';


// 拖动真实半球投影画廊，点击图片可放大；背景遮罩使用规范底色。

export default function DomeGalleryDemo() {

  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 480, position: 'relative', overflow: 'hidden' }}>
      <Component




   images={[{ "src": import.meta.env.BASE_URL + "media/scene-1.svg", "alt": "山雾" }, { "src": import.meta.env.BASE_URL + "media/scene-2.svg", "alt": "茶庭" }, { "src": import.meta.env.BASE_URL + "media/scene-3.svg", "alt": "沙洲" }, { "src": import.meta.env.BASE_URL + "media/scene-4.svg", "alt": "静水" }, { "src": import.meta.env.BASE_URL + "media/scene-5.svg", "alt": "林间" }, { "src": import.meta.env.BASE_URL + "media/scene-6.svg", "alt": "岩纹" }]} fit={0.55} minRadius={340} maxRadius={700} padFactor={0.15} overlayBlurColor={"#e8e4d7"} segments={24} maxVerticalRotationDeg={12} dragSensitivity={16} dragDampening={2} enlargeTransitionMs={280} openedImageWidth={"min(80vw, 440px)"} openedImageHeight={"280px"} imageBorderRadius={"16px"} openedImageBorderRadius={"20px"} grayscale={false} fitBasis={"auto"}  />
    </div>
  );
}

```

### 完整组件 API

| 参数 | 类型 | 必填 | 上游默认值 | 中文说明 |
|---|---|---|---|---|
| `images` | `ImageItem[]` | 否 | `DEFAULT_IMAGES` | 参与画廊、轮播或效果的图像列表。 |
| `fit` | `number` | 否 | `0.5` | 适配，控制 dome gallery 的对应渲染或交互参数。 |
| `fitBasis` | `'auto' \| 'min' \| 'max' \| 'width' \| 'height'` | 否 | `'auto'` | 适配计算基准，控制 dome gallery 的对应渲染或交互参数。 |
| `minRadius` | `number` | 否 | `600` | 最小半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `maxRadius` | `number` | 否 | `Infinity` | 最大半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `padFactor` | `number` | 否 | `0.25` | 留白系数，控制 dome gallery 的对应渲染或交互参数。 |
| `overlayBlurColor` | `string` | 否 | `'#120F17'` | 覆盖层模糊颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `maxVerticalRotationDeg` | `number` | 否 | `DEFAULTS.maxVerticalRotationDeg` | 最大垂直旋转角度角度，控制 dome gallery 的对应渲染或交互参数。 |
| `dragSensitivity` | `number` | 否 | `DEFAULTS.dragSensitivity` | 拖动灵敏度，控制 dome gallery 的对应渲染或交互参数。 |
| `enlargeTransitionMs` | `number` | 否 | `DEFAULTS.enlargeTransitionMs` | 放大过渡毫秒，控制 dome gallery 的对应渲染或交互参数。 |
| `segments` | `number` | 否 | `DEFAULTS.segments` | 分段，控制 dome gallery 的对应渲染或交互参数。 |
| `dragDampening` | `number` | 否 | `2` | 拖动阻尼，控制 dome gallery 的对应渲染或交互参数。 |
| `openedImageWidth` | `string` | 否 | `'400px'` | 打开后图像宽度，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `openedImageHeight` | `string` | 否 | `'400px'` | 打开后图像高度，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `imageBorderRadius` | `string` | 否 | `'30px'` | 图像边框半径，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `openedImageBorderRadius` | `string` | 否 | `'30px'` | 打开后图像边框半径，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `grayscale` | `boolean` | 否 | `true` | 是否灰度，决定该分支的展示或交互行为。 |

**images 的真实接入：**

```tsx
images={MEDIA.map((src, index) => ({ src, alt: LABELS[index] }))}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，不改写上游 API。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.images` | `[{"src":"@media/scene-1.svg","alt":"山雾"},{"src":"@media/scene-2.svg","alt":"茶庭"},{"src":"@media/scene-3.svg","alt":"沙洲"},{"src":"@media/scene-4.svg","alt":"静水"},{"src":"@media/scene-5.svg","alt":"林间"},{"src":"@media/scene-6.svg","alt":"岩纹"}]` | json | 不限 ~ 不限 | 即时应用 |
| `t0.fit` | `0.55` | number | 不限 ~ 不限 | 即时应用 |
| `t0.minRadius` | `340` | number | 不限 ~ 不限 | 即时应用 |
| `t0.maxRadius` | `700` | number | 不限 ~ 不限 | 即时应用 |
| `t0.padFactor` | `0.15` | number | 不限 ~ 不限 | 即时应用 |
| `t0.overlayBlurColor` | `"#e8e4d7"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.segments` | `24` | number | 不限 ~ 不限 | 即时应用 |
| `t0.maxVerticalRotationDeg` | `12` | number | 不限 ~ 不限 | 即时应用 |
| `t0.dragSensitivity` | `16` | number | 不限 ~ 不限 | 即时应用 |
| `t0.dragDampening` | `2` | number | 不限 ~ 不限 | 即时应用 |
| `t0.enlargeTransitionMs` | `280` | number | 不限 ~ 不限 | 即时应用 |
| `t0.openedImageWidth` | `"min(80vw, 440px)"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.openedImageHeight` | `"280px"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.imageBorderRadius` | `"16px"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.openedImageBorderRadius` | `"20px"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.grayscale` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.fitBasis` | `"auto"` | select | "auto" / "min" / "max" / "width" / "height" | 即时应用 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Wan 皮肤

- 容器、状态色、边界与焦点使用 Agent Wan 规范；交互命中区不随视觉形变缩小。
- 组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。

## 5. 加载、动效与降级

本例实际配置：设备访问与音频行为以本例真实 Props 和显式回调为准。capabilities 是源码扫描提示，不能据此声称已请求相机、录音或播放音频。

- 依赖清单：`@use-gesture/react`、`react`。安装前复用目标项目的兼容版本，不重复加载。
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
