# Magic Rings

背景与光效 · `magic-rings` · 中文意图：魔法环 / 交互光环

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

多个可配置圆环保留互动变化。

功能要求：装饰层不拦截业务点击、不隐藏真实指针，不成为完成业务的唯一操作方式。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/background/magic-rings.tsx](../../src/demos/background/magic-rings.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Animations/MagicRings/MagicRings.tsx](../../.upstream/src/ts-default/Animations/MagicRings/MagicRings.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Animations/MagicRings/MagicRings.css](../../.upstream/src/ts-default/Animations/MagicRings/MagicRings.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/magic-rings.json](../../src/parameters/definitions/magic-rings.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component magic-rings
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Magic Rings 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import Component from '../../../.upstream/src/ts-default/Animations/MagicRings/MagicRings';
import styles from './magic-rings.module.css';

export default function MagicRingsDemo() {
  return (
    <div className={styles.stage} data-visual-demo="magic-rings">
      <Component


             color={"#cbe3a5"} colorTwo={"#92dce5"} ringCount={6} speed={1} attenuation={10} lineThickness={2} baseRadius={0.3} radiusStep={0.1} scaleRate={0.1} opacity={1} noiseAmount={0.08} ringGap={1.5} followMouse={true} mouseInfluence={0.18} hoverScale={1.15} parallax={0.04} clickBurst={true} blur={0} rotation={0} fadeIn={0.7} fadeOut={0.5} alphaMode={"luminance"}  />
      <p className={styles.hint}>移动指针牵引光环 · 点击触发脉冲</p>
    </div>
  );
}

```

### 完整组件 API

| 参数 | 类型 | 必填 | 上游默认值 | 中文说明 |
|---|---|---|---|---|
| `color` | `string` | 否 | `'#fc42ff'` | 颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `colorTwo` | `string` | 否 | `'#42fcff'` | 颜色第二，传入组件支持的 CSS 或着色器颜色格式。 |
| `speed` | `number` | 否 | `1` | 动画、流动或滚动的推进速度；不同效果使用各自的速度尺度。 |
| `ringCount` | `number` | 否 | `6` | 圆环数量，控制 magic rings 的对应渲染或交互参数。 |
| `attenuation` | `number` | 否 | `10` | 衰减，控制 magic rings 的对应渲染或交互参数。 |
| `lineThickness` | `number` | 否 | `2` | 线条厚度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `baseRadius` | `number` | 否 | `0.35` | 基础半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `radiusStep` | `number` | 否 | `0.1` | 半径步进，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `scaleRate` | `number` | 否 | `0.1` | 缩放速率，控制 magic rings 的对应渲染或交互参数。 |
| `opacity` | `number` | 否 | `1` | 不透明度，控制 magic rings 的对应渲染或交互参数。 |
| `blur` | `number` | 否 | `0` | 模糊，控制 magic rings 的对应渲染或交互参数。 |
| `noiseAmount` | `number` | 否 | `0.1` | 噪声幅度，控制 magic rings 的对应渲染或交互参数。 |
| `rotation` | `number` | 否 | `0` | 旋转角度，控制 magic rings 的对应渲染或交互参数。 |
| `ringGap` | `number` | 否 | `1.5` | 圆环间距，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `fadeIn` | `number` | 否 | `0.7` | 淡出进入，控制 magic rings 的对应渲染或交互参数。 |
| `fadeOut` | `number` | 否 | `0.5` | 淡出退出，控制 magic rings 的对应渲染或交互参数。 |
| `followMouse` | `boolean` | 否 | `false` | 是否跟随鼠标，决定该分支的展示或交互行为。 |
| `mouseInfluence` | `number` | 否 | `0.2` | 鼠标影响系数，控制 magic rings 的对应渲染或交互参数。 |
| `hoverScale` | `number` | 否 | `1.2` | 悬停缩放，控制 magic rings 的对应渲染或交互参数。 |
| `parallax` | `number` | 否 | `0.05` | 视差，控制 magic rings 的对应渲染或交互参数。 |
| `clickBurst` | `boolean` | 否 | `false` | 是否点击爆发，决定该分支的展示或交互行为。 |
| `alphaMode` | `'luminance' \| 'coverage'` | 否 | `'luminance'` | 透明度模式，控制 magic rings 的对应渲染或交互参数。 |

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，不改写上游 API。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.color` | `"#cbe3a5"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.colorTwo` | `"#92dce5"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.ringCount` | `6` | range | 1 ~ 16 个 | 调节结束后重建 |
| `t0.speed` | `1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.attenuation` | `10` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.lineThickness` | `2` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.baseRadius` | `0.3` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.radiusStep` | `0.1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.scaleRate` | `0.1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.opacity` | `1` | range | 0 ~ 1 比例 | 调节结束后重建 |
| `t0.noiseAmount` | `0.08` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.ringGap` | `1.5` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.followMouse` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.mouseInfluence` | `0.18` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.hoverScale` | `1.15` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.parallax` | `0.04` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.clickBurst` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.blur` | `0` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.rotation` | `0` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.fadeIn` | `0.7` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.fadeOut` | `0.5` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.alphaMode` | `"luminance"` | select | "luminance" / "coverage" | 调节结束后重建 |

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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [背景与光效](../categories/background.md)；否则直接完成当前组件。
