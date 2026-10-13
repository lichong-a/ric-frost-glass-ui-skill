# Scanner

背景与光效 · `scanner` · 中文意图：扫描波 / 示波器纹理

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

干涉条带持续平缓扫描。

功能要求：装饰层不拦截业务点击、不隐藏真实指针，不成为完成业务的唯一操作方式。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/background/scanner.tsx](../../src/demos/background/scanner.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Backgrounds/Scanner/Scanner.tsx](../../.upstream/src/ts-default/Backgrounds/Scanner/Scanner.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Backgrounds/Scanner/Scanner.css](../../.upstream/src/ts-default/Backgrounds/Scanner/Scanner.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/scanner.json](../../src/parameters/definitions/scanner.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component scanner
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Scanner 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import Component from '../../../.upstream/src/ts-default/Backgrounds/Scanner/Scanner';


/** Agent Wan natural-tone preset for the real Scanner component. */
export default function ScannerDemo() {
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component










           color1={"#a6b39a"} color2={"#c3ae88"} color3={"#faf7f0"} speed={0.25} sweepSpeed={0.18} scanDirection={"vertical"} brightness={0.95} glow={0.15} grainIntensity={0.02} mouseInteraction={true} mouseStrength={0.25} sweepWidth={1.6} sweepFalloff={6} scale={1.5} frequency={2} ripple={0.22} bandDensity={11} lineSharpness={5.5} colorSpread={0.7} contrast={1.15} softness={1.4} vignette={0.45} scanline={true} grain={true} opacity={1} mouseRadius={0.5}
        />
      </div>
    </div>
  );
}

```

### 完整组件 API

| 参数 | 类型 | 必填 | 上游默认值 | 中文说明 |
|---|---|---|---|---|
| `color1` | `string` | 否 | `'#5227FF'` | 第一颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `color2` | `string` | 否 | `'#FF9FFC'` | 第二颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `color3` | `string` | 否 | `'#FFFFFF'` | 第三颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `speed` | `number` | 否 | `0.5` | 动画、流动或滚动的推进速度；不同效果使用各自的速度尺度。 |
| `sweepSpeed` | `number` | 否 | `0.25` | 扫掠速度，控制 scanner 的对应渲染或交互参数。 |
| `sweepWidth` | `number` | 否 | `1.6` | 扫掠宽度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `sweepFalloff` | `number` | 否 | `6` | 扫掠衰减，控制 scanner 的对应渲染或交互参数。 |
| `scale` | `number` | 否 | `1.5` | 缩放，控制 scanner 的对应渲染或交互参数。 |
| `frequency` | `number` | 否 | `2` | 频率，控制 scanner 的对应渲染或交互参数。 |
| `ripple` | `number` | 否 | `0.22` | 波纹，控制 scanner 的对应渲染或交互参数。 |
| `bandDensity` | `number` | 否 | `11` | 条带密度，控制 scanner 的对应渲染或交互参数。 |
| `lineSharpness` | `number` | 否 | `5.5` | 线条锐度，控制 scanner 的对应渲染或交互参数。 |
| `glow` | `number` | 否 | `0.22` | 辉光，控制 scanner 的对应渲染或交互参数。 |
| `scanDirection` | `ScanDirection` | 否 | `'vertical'` | 扫描方向，控制 scanner 的对应渲染或交互参数。 |
| `colorSpread` | `number` | 否 | `0.7` | 颜色展开间距，传入组件支持的 CSS 或着色器颜色格式。 |
| `brightness` | `number` | 否 | `1.0` | 亮度，控制 scanner 的对应渲染或交互参数。 |
| `contrast` | `number` | 否 | `1.15` | 对比度，控制 scanner 的对应渲染或交互参数。 |
| `softness` | `number` | 否 | `1.4` | 柔和度，控制 scanner 的对应渲染或交互参数。 |
| `vignette` | `number` | 否 | `0.45` | 暗角，控制 scanner 的对应渲染或交互参数。 |
| `scanline` | `boolean` | 否 | `true` | 是否扫描线，决定该分支的展示或交互行为。 |
| `grain` | `boolean` | 否 | `true` | 是否颗粒，决定该分支的展示或交互行为。 |
| `grainIntensity` | `number` | 否 | `0.05` | 颗粒强度，控制 scanner 的对应渲染或交互参数。 |
| `opacity` | `number` | 否 | `1.0` | 不透明度，控制 scanner 的对应渲染或交互参数。 |
| `mouseInteraction` | `boolean` | 否 | `true` | 是否鼠标交互，决定该分支的展示或交互行为。 |
| `mouseRadius` | `number` | 否 | `0.5` | 鼠标半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `mouseStrength` | `number` | 否 | `0.5` | 鼠标强度，控制 scanner 的对应渲染或交互参数。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，不改写上游 API。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.color1` | `"#a6b39a"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.color2` | `"#c3ae88"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.color3` | `"#faf7f0"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.speed` | `0.25` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.sweepSpeed` | `0.18` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.scanDirection` | `"vertical"` | select | "vertical" / "horizontal" / "diagonal" | 调节结束后重建 |
| `t0.brightness` | `0.95` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.glow` | `0.15` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.grainIntensity` | `0.02` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.mouseInteraction` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.mouseStrength` | `0.25` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.sweepWidth` | `1.6` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.sweepFalloff` | `6` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.scale` | `1.5` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.frequency` | `2` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.ripple` | `0.22` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.bandDensity` | `11` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.lineSharpness` | `5.5` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.colorSpread` | `0.7` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.contrast` | `1.15` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.softness` | `1.4` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.vignette` | `0.45` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.scanline` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.grain` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.opacity` | `1` | range | 0 ~ 1 比例 | 调节结束后重建 |
| `t0.mouseRadius` | `0.5` | number | 不限 ~ 不限 | 调节结束后重建 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Wan 皮肤

- 画布优先保留 React Bits 的原版配色与可观察强度，背景有独立边界并为光晕预留空间；业务正文使用稳定阅读面。
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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [背景与光效](../categories/background.md)；否则直接完成当前组件。
