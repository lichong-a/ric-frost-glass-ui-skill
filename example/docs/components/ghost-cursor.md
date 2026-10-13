# Ghost Cursor

指针与轨迹 · `ghost-cursor` · 中文意图：幽灵光标 / 延迟指针

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

半透明装饰指针平滑滞后跟随。

功能要求：装饰层不拦截业务点击、不隐藏真实指针，不成为完成业务的唯一操作方式。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/pointer/ghost-cursor.tsx](../../src/demos/pointer/ghost-cursor.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Animations/GhostCursor/GhostCursor.tsx](../../.upstream/src/ts-default/Animations/GhostCursor/GhostCursor.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Animations/GhostCursor/GhostCursor.css](../../.upstream/src/ts-default/Animations/GhostCursor/GhostCursor.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/ghost-cursor.json](../../src/parameters/definitions/ghost-cursor.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component ghost-cursor
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Ghost Cursor 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import Component from '../../../.upstream/src/ts-default/Animations/GhostCursor/GhostCursor';
import styles from './ghost-cursor.module.css';

export default function GhostCursorDemo() {
  return (
    <div className={styles.stage} data-visual-demo="ghost-cursor">
      <div className={styles.content}><span className={styles.eyebrow}>GHOST CURSOR</span><h2 className={styles.title}>如烟，如影</h2><p className={styles.description}>移动指针，留下柔和的发光烟雾。</p></div>
      <Component


            color={"#b8e3c5"} brightness={1.15} edgeIntensity={0.15} trailLength={50} inertia={0.5} grainIntensity={0.04} bloomStrength={0.22} bloomRadius={1} bloomThreshold={0.025} fadeDelayMs={700} fadeDurationMs={1400} mixBlendMode={"screen"} maxDevicePixelRatio={1.5} targetPixels={500000} zIndex={2}  />
      <p className={styles.hint}>快速划过或缓慢游走，观察拖影逐渐散开。</p>
    </div>
  );
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `style` | `React.CSSProperties` | 否 | `未指定` | 容器的 React 内联样式对象，尺寸、布局与 CSS 属性按 CSSProperties 传入。 |
| `trailLength` | `number` | 否 | `50` | 轨迹长度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `inertia` | `number` | 否 | `0.5` | 惯性，控制 ghost cursor 的对应渲染或交互参数。 |
| `grainIntensity` | `number` | 否 | `0.05` | 颗粒强度，控制 ghost cursor 的对应渲染或交互参数。 |
| `bloomStrength` | `number` | 否 | `0.1` | 泛光强度，控制 ghost cursor 的对应渲染或交互参数。 |
| `bloomRadius` | `number` | 否 | `1.0` | 泛光半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `bloomThreshold` | `number` | 否 | `0.025` | 泛光阈值，控制 ghost cursor 的对应渲染或交互参数。 |
| `brightness` | `number` | 否 | `1` | 亮度，控制 ghost cursor 的对应渲染或交互参数。 |
| `color` | `string` | 否 | `'#B497CF'` | 颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `mixBlendMode` | `React.CSSProperties['mixBlendMode']` | 否 | `'screen'` | 效果图层与后方背景叠加时的 CSS 混合模式。 |
| `edgeIntensity` | `number` | 否 | `0` | 边缘强度，控制 ghost cursor 的对应渲染或交互参数。 |
| `maxDevicePixelRatio` | `number` | 否 | `0.5` | 最大设备像素比例，控制 ghost cursor 的对应渲染或交互参数。 |
| `targetPixels` | `number` | 否 | `(isTouch ? 0.9e6 : 1.3e6)` | 目标像素，控制 ghost cursor 的对应渲染或交互参数。 |
| `fadeDelayMs` | `number` | 否 | `(isTouch ? 500 : 1000)` | 淡出延迟毫秒，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `fadeDurationMs` | `number` | 否 | `(isTouch ? 1000 : 1500)` | 淡出时长毫秒，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `zIndex` | `number` | 否 | `10` | Z轴索引，控制 ghost cursor 的对应渲染或交互参数。 |

**style 的真实接入：**

```tsx
style={{ width: "100%", minHeight: 240 }}
```

**mixBlendMode 的真实接入：**

```tsx
mixBlendMode="screen"
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.color` | `"#b8e3c5"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.brightness` | `1.15` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.edgeIntensity` | `0.15` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.trailLength` | `50` | range | 10 ~ 100 点 | 调节结束后重建 |
| `t0.inertia` | `0.5` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.grainIntensity` | `0.04` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.bloomStrength` | `0.22` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.bloomRadius` | `1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.bloomThreshold` | `0.025` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.fadeDelayMs` | `700` | range | 0 ~ 2000 ms | 调节结束后重建 |
| `t0.fadeDurationMs` | `1400` | range | 50 ~ 2000 ms | 调节结束后重建 |
| `t0.mixBlendMode` | `"screen"` | select | "color" / "-moz-initial" / "inherit" / "initial" / "revert" / "revert-layer" / "unset" / "overlay" / "normal" / "saturation" / "multiply" / "color-burn" / "color-dodge" / "darken" / "difference" / "exclusion" / "hard-light" / "hue" / "lighten" / "luminosity" / "screen" / "soft-light" / "plus-darker" / "plus-lighter" | 调节结束后重建 |
| `t0.maxDevicePixelRatio` | `1.5` | range | 0.25 ~ 2 倍率 | 调节结束后重建 |
| `t0.targetPixels` | `500000` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.zIndex` | `2` | number | 不限 ~ 不限 | 调节结束后重建 |

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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [指针与轨迹](../effects/categories/pointer.md)；否则直接完成当前组件。
