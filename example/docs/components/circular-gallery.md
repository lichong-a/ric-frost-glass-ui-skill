# Circular Gallery

媒体与轮播 · `circular-gallery` · 中文意图：环形画廊 / 旋转图片

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

图片沿圆弧或环形空间旋转浏览。

功能要求：图片说明与次序可理解；提供触屏和键盘可达的浏览路径，自动播放可暂停，资源失败时保留稳定布局。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/media/circular-gallery.tsx](../../src/demos/media/circular-gallery.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Components/CircularGallery/CircularGallery.tsx](../../.upstream/src/ts-default/Components/CircularGallery/CircularGallery.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Components/CircularGallery/CircularGallery.css](../../.upstream/src/ts-default/Components/CircularGallery/CircularGallery.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/circular-gallery.json](../../src/parameters/definitions/circular-gallery.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component circular-gallery
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Circular Gallery 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Components/CircularGallery/CircularGallery';
import { palette } from '../../shared/demo-support';

// 拖动或滚动浏览真实WebGL弧面画廊，标签使用本地系统字体。
// 此演示需要可用WebGL上下文；不支持时应显示能力提示，不声称效果已运行。

export default function CircularGalleryDemo() {

  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 400, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component

  items={[{ "image": import.meta.env.BASE_URL + "media/scene-1.svg", "text": "山雾" }, { "image": import.meta.env.BASE_URL + "media/scene-2.svg", "text": "茶庭" }, { "image": import.meta.env.BASE_URL + "media/scene-3.svg", "text": "沙洲" }, { "image": import.meta.env.BASE_URL + "media/scene-4.svg", "text": "静水" }, { "image": import.meta.env.BASE_URL + "media/scene-5.svg", "text": "林间" }, { "image": import.meta.env.BASE_URL + "media/scene-6.svg", "text": "岩纹" }]} bend={1.4} textColor={"#1f2d26"} borderRadius={0.06} font={"600 24px sans-serif"} scrollSpeed={1.1} scrollEase={0.04}  />
    </div>
  );
}

```

### 完整组件 API

| 参数 | 类型 | 必填 | 上游默认值 | 中文说明 |
|---|---|---|---|---|
| `items` | `{ image: string; text: string }[]` | 否 | `未指定` | 参与渲染或交互的条目列表，每项字段和可选内容按完整类型传入。 |
| `bend` | `number` | 否 | `3` | 弯曲，控制 circular gallery 的对应渲染或交互参数。 |
| `textColor` | `string` | 否 | `'#ffffff'` | 文字颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `borderRadius` | `number` | 否 | `0.05` | 边框半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `font` | `string` | 否 | `'bold 30px Figtree'` | 字体，控制 circular gallery 的对应渲染或交互参数。 |
| `fontUrl` | `string` | 否 | `未指定` | 字体地址，控制 circular gallery 的对应渲染或交互参数。 |
| `scrollSpeed` | `number` | 否 | `2` | 滚动速度，控制 circular gallery 的对应渲染或交互参数。 |
| `scrollEase` | `number` | 否 | `0.05` | 滚动缓动，控制 circular gallery 的对应渲染或交互参数。 |

**items 的真实接入：**

```tsx
items={MEDIA.map((image, index) => ({ image, text: LABELS[index] }))}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，不改写上游 API。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.items` | `[{"image":"@media/scene-1.svg","text":"山雾"},{"image":"@media/scene-2.svg","text":"茶庭"},{"image":"@media/scene-3.svg","text":"沙洲"},{"image":"@media/scene-4.svg","text":"静水"},{"image":"@media/scene-5.svg","text":"林间"},{"image":"@media/scene-6.svg","text":"岩纹"}]` | json | 不限 ~ 不限 | 调节结束后重建 |
| `t0.bend` | `1.4` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.textColor` | `"#1f2d26"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.borderRadius` | `0.06` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.font` | `"600 24px sans-serif"` | text | 不限 ~ 不限 | 调节结束后重建 |
| `t0.scrollSpeed` | `1.1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.scrollEase` | `0.04` | number | 不限 ~ 不限 | 调节结束后重建 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Wan 皮肤

- 容器、状态色、边界与焦点使用 Agent Wan 规范；交互命中区不随视觉形变缩小。
- 组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。

## 5. 加载、动效与降级

本例实际配置：设备访问与音频行为以本例真实 Props 和显式回调为准。capabilities 是源码扫描提示，不能据此声称已请求相机、录音或播放音频。

- 依赖清单：`ogl`、`react`。安装前复用目标项目的兼容版本，不重复加载。
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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [媒体与轮播](../categories/media.md)；否则直接完成当前组件。
