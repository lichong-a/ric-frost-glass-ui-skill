# Particles

背景与光效 · `particles` · 中文意图：粒子背景 / 星点场

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

粒子空间保留漂移与配置的连线互动。

功能要求：装饰层不拦截业务点击、不隐藏真实指针，不成为完成业务的唯一操作方式。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/background/particles.tsx](../../src/demos/background/particles.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Backgrounds/Particles/Particles.tsx](../../.upstream/src/ts-default/Backgrounds/Particles/Particles.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Backgrounds/Particles/Particles.css](../../.upstream/src/ts-default/Backgrounds/Particles/Particles.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/particles.json](../../src/parameters/definitions/particles.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component particles
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Particles 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import Component from '../../../.upstream/src/ts-default/Backgrounds/Particles/Particles';


/** Agent Wan natural-tone preset for the real Particles component. */
export default function ParticlesDemo() {
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component











           particleCount={140} particleColors={["#faf7f0", "#a6b39a", "#c3ae88"]} particleSpread={10} speed={0.07} particleBaseSize={80} shape={"circle"} glow={0.25} twinkle={0.15} moveParticlesOnHover={true} particleHoverFactor={0.6} clickBurst={true} alphaParticles={true} sizeRandomness={1} cameraDistance={20} disableRotation={false} depthOfField={0} connections={false} connectionDistance={110} hoverEffect={"parallax"} hoverRadius={140} drift={"none"} driftSpeed={1} variation={0} intro={true} opacity={1} lightMode={false} paused={false}
        />
      </div>
    </div>
  );
}

```

### 完整组件 API

| 参数 | 类型 | 必填 | 上游默认值 | 中文说明 |
|---|---|---|---|---|
| `particleCount` | `number` | 否 | `200` | 粒子数量，控制 particles 的对应渲染或交互参数。 |
| `particleSpread` | `number` | 否 | `10` | 粒子展开间距，控制 particles 的对应渲染或交互参数。 |
| `speed` | `number` | 否 | `0.1` | 动画、流动或滚动的推进速度；不同效果使用各自的速度尺度。 |
| `particleColors` | `string[]` | 否 | `['#ffffff']` | 粒子颜色组的有序数据集合；每一项按数组元素类型配置。 |
| `moveParticlesOnHover` | `boolean` | 否 | `true` | 是否移动粒子组悬停，决定该分支的展示或交互行为。 |
| `particleHoverFactor` | `number` | 否 | `1` | 粒子悬停系数，控制 particles 的对应渲染或交互参数。 |
| `alphaParticles` | `boolean` | 否 | `false` | 是否透明度粒子组，决定该分支的展示或交互行为。 |
| `particleBaseSize` | `number` | 否 | `100` | 粒子基础尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `sizeRandomness` | `number` | 否 | `1` | 尺寸随机差异，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `cameraDistance` | `number` | 否 | `20` | 相机距离，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `disableRotation` | `boolean` | 否 | `false` | 是否禁用旋转角度，决定该分支的展示或交互行为。 |
| `pixelRatio` | `number` | 否 | `未指定` | 像素比例，控制 particles 的对应渲染或交互参数。 |
| `shape` | `ParticlesShape` | 否 | `'circle'` | 形状，控制 particles 的对应渲染或交互参数。 |
| `glow` | `number` | 否 | `0.5` | 辉光，控制 particles 的对应渲染或交互参数。 |
| `twinkle` | `number` | 否 | `0.3` | 闪烁，控制 particles 的对应渲染或交互参数。 |
| `depthOfField` | `number` | 否 | `0` | 深度的场，控制 particles 的对应渲染或交互参数。 |
| `connections` | `boolean` | 否 | `false` | 是否连接线，决定该分支的展示或交互行为。 |
| `connectionDistance` | `number` | 否 | `110` | 连接距离，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `hoverEffect` | `ParticlesHoverEffect` | 否 | `'parallax'` | 悬停效果，控制 particles 的对应渲染或交互参数。 |
| `hoverRadius` | `number` | 否 | `140` | 悬停半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `clickBurst` | `boolean` | 否 | `true` | 是否点击爆发，决定该分支的展示或交互行为。 |
| `drift` | `ParticlesDrift` | 否 | `'none'` | 漂移，控制 particles 的对应渲染或交互参数。 |
| `driftSpeed` | `number` | 否 | `1` | 漂移速度，控制 particles 的对应渲染或交互参数。 |
| `variation` | `number` | 否 | `0` | 变体，控制 particles 的对应渲染或交互参数。 |
| `intro` | `boolean` | 否 | `true` | 是否入场，决定该分支的展示或交互行为。 |
| `opacity` | `number` | 否 | `1` | 不透明度，控制 particles 的对应渲染或交互参数。 |
| `lightMode` | `boolean` | 否 | `false` | 是否光照模式，决定该分支的展示或交互行为。 |
| `paused` | `boolean` | 否 | `false` | 是否暂停持续动画或模拟更新。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `style` | `CSSProperties` | 否 | `未指定` | 容器的 React 内联样式对象，尺寸、布局与 CSS 属性按 CSSProperties 传入。 |

**particleColors 的真实接入：**

```tsx
particleColors={[palette.ivory, palette.sage, palette.sand]}
```

**style 的真实接入：**

```tsx
style={{ width: "100%", minHeight: 240 }}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，不改写上游 API。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.particleCount` | `140` | range | 1 ~ 200 | 调节结束后重建 |
| `t0.particleColors` | `["#faf7f0","#a6b39a","#c3ae88"]` | json | 不限 ~ 不限 | 调节结束后重建 |
| `t0.particleSpread` | `10` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.speed` | `0.07` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.particleBaseSize` | `80` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.shape` | `"circle"` | select | "circle" / "square" / "ring" / "sparkle" | 调节结束后重建 |
| `t0.glow` | `0.25` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.twinkle` | `0.15` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.moveParticlesOnHover` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.particleHoverFactor` | `0.6` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.clickBurst` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.alphaParticles` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.sizeRandomness` | `1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.cameraDistance` | `20` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.disableRotation` | `false` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.depthOfField` | `0` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.connections` | `false` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.connectionDistance` | `110` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.hoverEffect` | `"parallax"` | select | "parallax" / "repel" / "attract" | 调节结束后重建 |
| `t0.hoverRadius` | `140` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.drift` | `"none"` | select | "none" / "up" / "down" / "forward" | 调节结束后重建 |
| `t0.driftSpeed` | `1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.variation` | `0` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.intro` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.opacity` | `1` | range | 0 ~ 1 比例 | 调节结束后重建 |
| `t0.lightMode` | `false` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.paused` | `false` | switch | 不限 ~ 不限 | 调节结束后重建 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Wan 皮肤

- 画布优先保留 React Bits 的原版配色与可观察强度，背景有独立边界并为光晕预留空间；业务正文使用稳定阅读面。
- 组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。

## 5. 加载、动效与降级

本例实际配置：设备访问与音频行为以本例真实 Props 和显式回调为准。capabilities 是源码扫描提示，不能据此声称已请求相机、录音或播放音频。

- 依赖清单：`react`。安装前复用目标项目的兼容版本，不重复加载。
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
