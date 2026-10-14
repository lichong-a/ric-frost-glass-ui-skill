# Infinite Spiral

媒体与轮播 · `infinite-spiral` · 中文意图：无限螺旋 / 螺旋相册

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-ric-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

图片沿三维螺旋连续循环。

功能要求：图片说明与次序可理解；提供触屏和键盘可达的浏览路径，自动播放可暂停，资源失败时保留稳定布局。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/media/infinite-spiral.tsx](../../src/demos/media/infinite-spiral.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Components/InfiniteSpiral/InfiniteSpiral.tsx](../../.upstream/src/ts-default/Components/InfiniteSpiral/InfiniteSpiral.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Components/InfiniteSpiral/InfiniteSpiral.css](../../.upstream/src/ts-default/Components/InfiniteSpiral/InfiniteSpiral.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/infinite-spiral.json](../../src/parameters/definitions/infinite-spiral.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component infinite-spiral
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Infinite Spiral 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Components/InfiniteSpiral/InfiniteSpiral';


// 图片在真实3D螺旋上循环，可拖动或滚动改变进度。

export default function InfiniteSpiralDemo() {

  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 440, position: 'relative', overflow: 'hidden' }}>
      <Component


     items={[{ "src": import.meta.env.BASE_URL + "media/scene-1.svg", "alt": "山雾", "label": "山雾" }, { "src": import.meta.env.BASE_URL + "media/scene-2.svg", "alt": "茶庭", "label": "茶庭" }, { "src": import.meta.env.BASE_URL + "media/scene-3.svg", "alt": "沙洲", "label": "沙洲" }, { "src": import.meta.env.BASE_URL + "media/scene-4.svg", "alt": "静水", "label": "静水" }, { "src": import.meta.env.BASE_URL + "media/scene-5.svg", "alt": "林间", "label": "林间" }, { "src": import.meta.env.BASE_URL + "media/scene-6.svg", "alt": "岩纹", "label": "岩纹" }]} animationMode={"all"} speed={0.3} radius={140} cardWidth={100} cardHeight={84} verticalSpacing={60} perspective={1000} cardsPerTurn={7} cardRadius={12} centerScale={1.05} edgeFade={0.25} edgeBlur={2} pauseOnHover={true} grayscale={0.1} direction={"up"} rotation={0} cardTilt={0} imageFit={"cover"}  />
    </div>
  );
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `items` | `Array<string \| InfiniteSpiralItem>` | 否 | `[]` | 参与渲染或交互的条目列表，每项字段和可选内容按完整类型传入。 |
| `speed` | `number` | 否 | `0.55` | 动画、流动或滚动的推进速度；不同效果使用各自的速度尺度。 |
| `direction` | `'up' \| 'down'` | 否 | `'up'` | 方向，控制 infinite spiral 的对应渲染或交互参数。 |
| `animationMode` | `'auto' \| 'drag' \| 'scroll' \| 'all'` | 否 | `'auto'` | 动画模式，控制 infinite spiral 的对应渲染或交互参数。 |
| `radius` | `number` | 否 | `170` | 半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `cardWidth` | `number` | 否 | `100` | 卡片宽度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `cardHeight` | `number` | 否 | `100` | 卡片高度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `verticalSpacing` | `number` | 否 | `60` | 垂直间距，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `perspective` | `number` | 否 | `1000` | 透视，控制 infinite spiral 的对应渲染或交互参数。 |
| `cardsPerTurn` | `number` | 否 | `7` | 卡片每个转动，控制 infinite spiral 的对应渲染或交互参数。 |
| `rotation` | `number` | 否 | `0` | 旋转角度，控制 infinite spiral 的对应渲染或交互参数。 |
| `cardTilt` | `number` | 否 | `0` | 卡片倾斜，控制 infinite spiral 的对应渲染或交互参数。 |
| `cardRadius` | `number` | 否 | `10` | 卡片半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `centerScale` | `number` | 否 | `1.2` | 中心缩放，控制 infinite spiral 的对应渲染或交互参数。 |
| `edgeFade` | `number` | 否 | `0.3` | 边缘淡出，控制 infinite spiral 的对应渲染或交互参数。 |
| `edgeBlur` | `number` | 否 | `6` | 边缘模糊，控制 infinite spiral 的对应渲染或交互参数。 |
| `pauseOnHover` | `boolean` | 否 | `true` | 是否暂停悬停，决定该分支的展示或交互行为。 |
| `imageFit` | `CSSProperties['objectFit']` | 否 | `'cover'` | 图像适配的结构化配置；对象字段按完整类型传入并由组件读取。 |
| `grayscale` | `number` | 否 | `0` | 灰度，控制 infinite spiral 的对应渲染或交互参数。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |

**imageFit 的真实接入：**

```tsx
imageFit={"cover"}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.items` | `[{"src":"@media/scene-1.svg","alt":"山雾","label":"山雾"},{"src":"@media/scene-2.svg","alt":"茶庭","label":"茶庭"},{"src":"@media/scene-3.svg","alt":"沙洲","label":"沙洲"},{"src":"@media/scene-4.svg","alt":"静水","label":"静水"},{"src":"@media/scene-5.svg","alt":"林间","label":"林间"},{"src":"@media/scene-6.svg","alt":"岩纹","label":"岩纹"}]` | json | 不限 ~ 不限 | 即时应用 |
| `t0.animationMode` | `"all"` | select | "auto" / "drag" / "scroll" / "all" | 即时应用 |
| `t0.speed` | `0.3` | number | 不限 ~ 不限 | 即时应用 |
| `t0.radius` | `140` | number | 不限 ~ 不限 | 即时应用 |
| `t0.cardWidth` | `100` | number | 不限 ~ 不限 | 即时应用 |
| `t0.cardHeight` | `84` | number | 不限 ~ 不限 | 即时应用 |
| `t0.verticalSpacing` | `60` | number | 不限 ~ 不限 | 即时应用 |
| `t0.perspective` | `1000` | number | 不限 ~ 不限 | 即时应用 |
| `t0.cardsPerTurn` | `7` | number | 不限 ~ 不限 | 即时应用 |
| `t0.cardRadius` | `12` | number | 不限 ~ 不限 | 即时应用 |
| `t0.centerScale` | `1.05` | number | 不限 ~ 不限 | 即时应用 |
| `t0.edgeFade` | `0.25` | number | 不限 ~ 不限 | 即时应用 |
| `t0.edgeBlur` | `2` | number | 不限 ~ 不限 | 即时应用 |
| `t0.pauseOnHover` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.grayscale` | `0.1` | number | 不限 ~ 不限 | 即时应用 |
| `t0.direction` | `"up"` | select | "up" / "down" | 即时应用 |
| `t0.rotation` | `0` | number | 不限 ~ 不限 | 即时应用 |
| `t0.cardTilt` | `0` | number | 不限 ~ 不限 | 即时应用 |
| `t0.imageFit` | `"cover"` | select | "fill" / "-moz-initial" / "inherit" / "initial" / "revert" / "revert-layer" / "unset" / "none" / "contain" / "cover" / "scale-down" | 即时应用 |

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
