# Lanyard

媒体与轮播 · `lanyard` · 中文意图：挂绳卡片 / 工牌物理

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

卡牌与带子保留拖拽摆动和翻转。

功能要求：保持内容的语义和可访问名称；只有真实可交互元素可进入焦点顺序。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/media/lanyard.tsx](../../src/demos/media/lanyard.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Components/Lanyard/Lanyard.tsx](../../.upstream/src/ts-default/Components/Lanyard/Lanyard.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Components/Lanyard/Lanyard.css](../../.upstream/src/ts-default/Components/Lanyard/Lanyard.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/lanyard.json](../../src/parameters/definitions/lanyard.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component lanyard
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Lanyard 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Components/Lanyard/Lanyard';


// 真实3D挂绳和卡片物理模拟，可拖动与甩动；使用哑光自然色和本地正反面图片。
// 此演示需要可用WebGL上下文；不支持时应显示能力提示，不声称效果已运行。

export default function LanyardDemo() {

  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 460, position: 'relative', overflow: 'hidden' }}>
      <Component



   frontImage={import.meta.env.BASE_URL + "media/scene-2.svg"} backImage={import.meta.env.BASE_URL + "media/scene-5.svg"} imageFit={"cover"} cardColor={"#faf7f0"} orientation={"portrait"} finish={"matte"} cornerRadius={0.1} size={0.7} anchor={"center"} strapLength={0.55} strapColor={"#52604e"} strapWidth={0.8} metal={"graphite"} damping={0.65} elasticity={0.35} breeze={0.15} interactive={true} intro={true} gravity={1}  />
    </div>
  );
}

```

### 完整组件 API

| 参数 | 类型 | 必填 | 上游默认值 | 中文说明 |
|---|---|---|---|---|
| `frontImage` | `string` | 否 | `未指定` | 正面图像，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `backImage` | `string` | 否 | `未指定` | 背面显示的图像资源。 |
| `imageFit` | `ImageFit` | 否 | `'cover'` | 图像适配，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `cardColor` | `string` | 否 | `'#ffffff'` | 卡片颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `orientation` | `Orientation` | 否 | `'portrait'` | 方向，控制 lanyard 的对应渲染或交互参数。 |
| `finish` | `Finish` | 否 | `'glossy'` | 完成，控制 lanyard 的对应渲染或交互参数。 |
| `cornerRadius` | `number` | 否 | `0.3` | 角半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `size` | `number` | 否 | `0.6` | 尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `anchor` | `Anchor` | 否 | `'center'` | 定位锚点，控制 lanyard 的对应渲染或交互参数。 |
| `strapLength` | `number` | 否 | `0.5` | 挂带长度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `strapImage` | `string` | 否 | `未指定` | 挂带图像，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `strapColor` | `string` | 否 | `'#111111'` | 挂带颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `strapWidth` | `number` | 否 | `0.65` | 挂带宽度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `metal` | `Metal` | 否 | `'silver'` | 金属，控制 lanyard 的对应渲染或交互参数。 |
| `gravity` | `number` | 否 | `1` | 重力，控制 lanyard 的对应渲染或交互参数。 |
| `damping` | `number` | 否 | `0.5` | 阻尼，控制 lanyard 的对应渲染或交互参数。 |
| `elasticity` | `number` | 否 | `0.5` | 弹性，控制 lanyard 的对应渲染或交互参数。 |
| `breeze` | `number` | 否 | `0.5` | 微风，控制 lanyard 的对应渲染或交互参数。 |
| `interactive` | `boolean` | 否 | `true` | 是否交互，决定该分支的展示或交互行为。 |
| `intro` | `boolean` | 否 | `true` | 是否入场，决定该分支的展示或交互行为。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `style` | `CSSProperties` | 否 | `未指定` | 容器的 React 内联样式对象，尺寸、布局与 CSS 属性按 CSSProperties 传入。 |

**style 的真实接入：**

```tsx
style={{ width: "100%", minHeight: 240 }}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，不改写上游 API。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.frontImage` | `"@media/scene-2.svg"` | resource | 不限 ~ 不限 | 调节结束后重建 |
| `t0.backImage` | `"@media/scene-5.svg"` | resource | 不限 ~ 不限 | 调节结束后重建 |
| `t0.imageFit` | `"cover"` | select | "cover" / "contain" | 调节结束后重建 |
| `t0.cardColor` | `"#faf7f0"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.orientation` | `"portrait"` | select | "portrait" / "landscape" | 调节结束后重建 |
| `t0.finish` | `"matte"` | select | "glossy" / "matte" / "holographic" / "metallic" | 调节结束后重建 |
| `t0.cornerRadius` | `0.1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.size` | `0.7` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.anchor` | `"center"` | select | "left" / "center" / "right" | 调节结束后重建 |
| `t0.strapLength` | `0.55` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.strapColor` | `"#52604e"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.strapWidth` | `0.8` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.metal` | `"graphite"` | select | "graphite" / "silver" / "gold" | 调节结束后重建 |
| `t0.damping` | `0.65` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.elasticity` | `0.35` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.breeze` | `0.15` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.interactive` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.intro` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.gravity` | `1` | number | 不限 ~ 不限 | 调节结束后重建 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Wan 皮肤

- 容器、状态色、边界与焦点使用 Agent Wan 规范；交互命中区不随视觉形变缩小。
- 组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。

## 5. 加载、动效与降级

本例实际配置：设备访问与音频行为以本例真实 Props 和显式回调为准。capabilities 是源码扫描提示，不能据此声称已请求相机、录音或播放音频。

- 依赖清单：`react`、`three`。安装前复用目标项目的兼容版本，不重复加载。
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
