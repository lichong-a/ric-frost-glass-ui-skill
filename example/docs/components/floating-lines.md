# Floating Lines

背景与光效 · `floating-lines` · 中文意图：漂浮线条 / 三维线条

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-ric-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

线条在空间漂浮并响应指针。

功能要求：装饰层不拦截业务点击、不隐藏真实指针，不成为完成业务的唯一操作方式。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/background/floating-lines.tsx](../../src/demos/background/floating-lines.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Backgrounds/FloatingLines/FloatingLines.tsx](../../.upstream/src/ts-default/Backgrounds/FloatingLines/FloatingLines.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Backgrounds/FloatingLines/FloatingLines.css](../../.upstream/src/ts-default/Backgrounds/FloatingLines/FloatingLines.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/floating-lines.json](../../src/parameters/definitions/floating-lines.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component floating-lines
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Floating Lines 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import Component from '../../../.upstream/src/ts-default/Backgrounds/FloatingLines/FloatingLines';


/** Agent Ric natural-tone preset for the real Floating Lines component. */
export default function FloatingLinesDemo() {
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component








           linesGradient={["#a6b39a", "#c3ae88", "#faf7f0"]} backgroundColor={"#1f2d26"} lineCount={[5, 5, 5]} lineDistance={[5, 5, 5]} animationSpeed={0.5} bendStrength={-0.35} parallaxStrength={0.12} mixBlendMode={"normal"} interactive={true} enabledWaves={["top", "middle", "bottom"]} bottomWavePosition={{ "x": 2, "y": -0.7, "rotate": -1 }} bendRadius={5} mouseDamping={0.05} parallax={true} lightMode={false}
        />
      </div>
    </div>
  );
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `linesGradient` | `string[]` | 否 | `未指定` | 线条渐变的有序数据集合；每一项按数组元素类型配置。 |
| `enabledWaves` | `Array<'top' \| 'middle' \| 'bottom'>` | 否 | `['top', 'middle', 'bottom']` | 启用波组的有序数据集合；每一项按数组元素类型配置。 |
| `lineCount` | `number \| number[]` | 否 | `[6]` | 线条数量的有序数据集合；每一项按数组元素类型配置。 |
| `lineDistance` | `number \| number[]` | 否 | `[5]` | 线条距离的有序数据集合；每一项按数组元素类型配置。 |
| `topWavePosition` | `WavePosition` | 否 | `未指定` | 顶部波形位置的结构化配置；对象字段按完整类型传入并由组件读取。 |
| `middleWavePosition` | `WavePosition` | 否 | `未指定` | 中层波形位置的结构化配置；对象字段按完整类型传入并由组件读取。 |
| `bottomWavePosition` | `WavePosition` | 否 | `{ x: 2.0, y: -0.7, rotate: -1 }` | 底部波形位置的结构化配置；对象字段按完整类型传入并由组件读取。 |
| `animationSpeed` | `number` | 否 | `1` | 动画速度，控制 floating lines 的对应渲染或交互参数。 |
| `interactive` | `boolean` | 否 | `true` | 是否交互，决定该分支的展示或交互行为。 |
| `bendRadius` | `number` | 否 | `5.0` | 弯曲半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `bendStrength` | `number` | 否 | `-0.5` | 弯曲强度，控制 floating lines 的对应渲染或交互参数。 |
| `mouseDamping` | `number` | 否 | `0.05` | 鼠标阻尼，控制 floating lines 的对应渲染或交互参数。 |
| `parallax` | `boolean` | 否 | `true` | 是否视差，决定该分支的展示或交互行为。 |
| `parallaxStrength` | `number` | 否 | `0.2` | 视差强度，控制 floating lines 的对应渲染或交互参数。 |
| `mixBlendMode` | `React.CSSProperties['mixBlendMode']` | 否 | `'screen'` | 效果图层与后方背景叠加时的 CSS 混合模式。 |
| `backgroundColor` | `string` | 否 | `'#000000'` | 背景颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `lightMode` | `boolean` | 否 | `false` | 是否光照模式，决定该分支的展示或交互行为。 |

**linesGradient 的真实接入：**

```tsx
linesGradient={[palette.sage, palette.sand, palette.ivory]}
```

**lineCount 的真实接入：**

```tsx
lineCount={[5, 5, 5]}
```

**lineDistance 的真实接入：**

```tsx
lineDistance={[5, 5, 5]}
```

**mixBlendMode 的真实接入：**

```tsx
mixBlendMode="normal"
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.linesGradient` | `["#a6b39a","#c3ae88","#faf7f0"]` | json | 不限 ~ 不限 | 调节结束后重建 |
| `t0.backgroundColor` | `"#1f2d26"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.lineCount` | `[5,5,5]` | json | 不限 ~ 不限 | 调节结束后重建 |
| `t0.lineDistance` | `[5,5,5]` | json | 不限 ~ 不限 | 调节结束后重建 |
| `t0.animationSpeed` | `0.5` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.bendStrength` | `-0.35` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.parallaxStrength` | `0.12` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.mixBlendMode` | `"normal"` | select | "color" / "-moz-initial" / "inherit" / "initial" / "revert" / "revert-layer" / "unset" / "overlay" / "normal" / "saturation" / "multiply" / "color-burn" / "color-dodge" / "darken" / "difference" / "exclusion" / "hard-light" / "hue" / "lighten" / "luminosity" / "screen" / "soft-light" / "plus-darker" / "plus-lighter" | 调节结束后重建 |
| `t0.interactive` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.enabledWaves` | `["top","middle","bottom"]` | json | 不限 ~ 不限 | 调节结束后重建 |
| `t0.bottomWavePosition` | `{"x":2,"y":-0.7,"rotate":-1}` | json | 不限 ~ 不限 | 调节结束后重建 |
| `t0.bendRadius` | `5` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.mouseDamping` | `0.05` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.parallax` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.lightMode` | `false` | switch | 不限 ~ 不限 | 调节结束后重建 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Ric 皮肤

- 画布优先保留 React Bits 的原版配色与可观察强度，背景有独立边界并为光晕预留空间；业务正文使用稳定阅读面。
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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [背景与光效](../effects/categories/background.md)；否则直接完成当前组件。
