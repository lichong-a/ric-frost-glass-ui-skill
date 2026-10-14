# Light Tunnel

背景与光效 · `light-tunnel` · 中文意图：光隧道 / 径向光纤

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-ric-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

径向光线朝空间深处推进。

功能要求：装饰层不拦截业务点击、不隐藏真实指针，不成为完成业务的唯一操作方式。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/background/light-tunnel.tsx](../../src/demos/background/light-tunnel.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Backgrounds/LightTunnel/LightTunnel.tsx](../../.upstream/src/ts-default/Backgrounds/LightTunnel/LightTunnel.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Backgrounds/LightTunnel/LightTunnel.css](../../.upstream/src/ts-default/Backgrounds/LightTunnel/LightTunnel.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/light-tunnel.json](../../src/parameters/definitions/light-tunnel.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component light-tunnel
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Light Tunnel 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import Component from '../../../.upstream/src/ts-default/Backgrounds/LightTunnel/LightTunnel';


/** Agent Ric natural-tone preset for the real Light Tunnel component. */
export default function LightTunnelDemo() {
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component











           cableColor={"#a6b39a"} pulseColor={"#faf7f0"} tunnelColor={"#52604e"} tunnelOpacity={0.12} speed={0.06} pulseSpeed={0.8} cableCount={20} glow={0.6} thickness={0.35} colorVariance={false} grainIntensity={0.02} mouseInteraction={true} flowDirection={"outward"} pulseLength={0.28} pulseBlend={1} pulseWidth={1} rimWidth={0.15} waviness={0.3} sway={0.5} size={1} centerX={0} centerY={0} fadeNear={0.5} fadeFar={2} brightness={1} grain={true} opacity={1} mouseStrength={0.1} lightMode={false}
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
| `cableColor` | `string` | 否 | `'#A855F7'` | 电缆颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `pulseColor` | `string` | 否 | `'#A855F7'` | 脉冲颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `tunnelColor` | `string` | 否 | `'#5227FF'` | 隧道颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `tunnelOpacity` | `number` | 否 | `0` | 隧道不透明度，控制 light tunnel 的对应渲染或交互参数。 |
| `speed` | `number` | 否 | `0.1` | 动画、流动或滚动的推进速度；不同效果使用各自的速度尺度。 |
| `flowDirection` | `FlowDirection` | 否 | `'outward'` | 流动方向，控制 light tunnel 的对应渲染或交互参数。 |
| `pulseSpeed` | `number` | 否 | `2` | 脉冲速度，控制 light tunnel 的对应渲染或交互参数。 |
| `pulseLength` | `number` | 否 | `0.28` | 脉冲长度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `pulseBlend` | `number` | 否 | `1` | 脉冲混合，控制 light tunnel 的对应渲染或交互参数。 |
| `pulseWidth` | `number` | 否 | `1` | 脉冲宽度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `cableCount` | `number` | 否 | `20` | 电缆数量，控制 light tunnel 的对应渲染或交互参数。 |
| `thickness` | `number` | 否 | `0.35` | 厚度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `rimWidth` | `number` | 否 | `0.15` | 轮缘宽度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `waviness` | `number` | 否 | `0.3` | 波动程度，控制 light tunnel 的对应渲染或交互参数。 |
| `sway` | `number` | 否 | `0.5` | 摇摆，控制 light tunnel 的对应渲染或交互参数。 |
| `size` | `number` | 否 | `1.0` | 尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `centerX` | `number` | 否 | `0.0` | 中心X轴，控制 light tunnel 的对应渲染或交互参数。 |
| `centerY` | `number` | 否 | `0.0` | 中心Y轴，控制 light tunnel 的对应渲染或交互参数。 |
| `glow` | `number` | 否 | `1.0` | 辉光，控制 light tunnel 的对应渲染或交互参数。 |
| `fadeNear` | `number` | 否 | `0.5` | 淡出近端，控制 light tunnel 的对应渲染或交互参数。 |
| `fadeFar` | `number` | 否 | `2` | 淡出远端，控制 light tunnel 的对应渲染或交互参数。 |
| `brightness` | `number` | 否 | `1.0` | 亮度，控制 light tunnel 的对应渲染或交互参数。 |
| `colorVariance` | `boolean` | 否 | `true` | 是否颜色差异，决定该分支的展示或交互行为。 |
| `grain` | `boolean` | 否 | `true` | 是否颗粒，决定该分支的展示或交互行为。 |
| `grainIntensity` | `number` | 否 | `0.05` | 颗粒强度，控制 light tunnel 的对应渲染或交互参数。 |
| `opacity` | `number` | 否 | `1.0` | 不透明度，控制 light tunnel 的对应渲染或交互参数。 |
| `mouseInteraction` | `boolean` | 否 | `true` | 是否鼠标交互，决定该分支的展示或交互行为。 |
| `mouseStrength` | `number` | 否 | `0.1` | 鼠标强度，控制 light tunnel 的对应渲染或交互参数。 |
| `lightMode` | `boolean` | 否 | `false` | 是否光照模式，决定该分支的展示或交互行为。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.cableColor` | `"#a6b39a"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.pulseColor` | `"#faf7f0"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.tunnelColor` | `"#52604e"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.tunnelOpacity` | `0.12` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.speed` | `0.06` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.pulseSpeed` | `0.8` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.cableCount` | `20` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.glow` | `0.6` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.thickness` | `0.35` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.colorVariance` | `false` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.grainIntensity` | `0.02` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.mouseInteraction` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.flowDirection` | `"outward"` | select | "inward" / "outward" | 调节结束后重建 |
| `t0.pulseLength` | `0.28` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.pulseBlend` | `1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.pulseWidth` | `1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.rimWidth` | `0.15` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.waviness` | `0.3` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.sway` | `0.5` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.size` | `1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.centerX` | `0` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.centerY` | `0` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.fadeNear` | `0.5` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.fadeFar` | `2` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.brightness` | `1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.grain` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.opacity` | `1` | range | 0 ~ 1 比例 | 调节结束后重建 |
| `t0.mouseStrength` | `0.1` | number | 不限 ~ 不限 | 调节结束后重建 |
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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [背景与光效](../effects/categories/background.md)；否则直接完成当前组件。
