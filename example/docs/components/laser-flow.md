# Laser Flow

背景与光效 · `laser-flow` · 中文意图：流光光束 / 边角流光

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

光束照射内容并沿转角流动。

功能要求：装饰层不拦截业务点击、不隐藏真实指针，不成为完成业务的唯一操作方式。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/background/laser-flow.tsx](../../src/demos/background/laser-flow.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Animations/LaserFlow/LaserFlow.tsx](../../.upstream/src/ts-default/Animations/LaserFlow/LaserFlow.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Animations/LaserFlow/LaserFlow.css](../../.upstream/src/ts-default/Animations/LaserFlow/LaserFlow.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/laser-flow.json](../../src/parameters/definitions/laser-flow.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component laser-flow
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Laser Flow 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import { useRef } from 'react';
import Component from '../../../.upstream/src/ts-default/Animations/LaserFlow/LaserFlow';
import styles from './laser-flow.module.css';

export default function LaserFlowDemo() {
  const surfaceRef = useRef<HTMLDivElement>(null);
  return (
    <div className={styles.stage} data-visual-demo="laser-flow">
      <div ref={surfaceRef} className={styles.surface}>
        <span className={styles.eyebrow}>LIGHT IN MOTION</span>
        <h3 className={styles.title}>光落在表面</h3>
        <p className={styles.description}>沿着边缘展开，向两侧流动。</p>
      </div>
      <div className={styles.light}>
        <Component surfaceRef={surfaceRef}

              color={"#91c9cc"} theme={"dark"} intensity={1.8} beamPosition={0.52} flare={1.5} spread={1.5} spill={1.1} fog={0.2} dust={1.1} speed={1.2} mouseInteraction={true} dpr={1.5} surfaceLevel={1} beamWidth={1.5} streaks={1.5} dots={1} pulse={1.5} seed={3} revealRadius={220} revealOpacity={0.6} intro={true} paused={false}  />
      </div>
      <p className={styles.hint}>移动指针，观察光束与卡片上边缘接触后的流动。</p>
    </div>
  );
}

```

### 完整组件 API

| 参数 | 类型 | 必填 | 上游默认值 | 中文说明 |
|---|---|---|---|---|
| `surfaceRef` | `RefObject<HTMLElement \| null>` | 否 | `未指定` | 连接弹出面板的 DOM ref，供调用方测量与管理焦点。 |
| `beamPosition` | `number` | 否 | `0.6` | 光束位置，控制 laser flow 的对应渲染或交互参数。 |
| `surfaceLevel` | `number` | 否 | `1` | 表面层级，控制 laser flow 的对应渲染或交互参数。 |
| `color` | `string` | 否 | `'#3847ff'` | 颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `intensity` | `number` | 否 | `1.8` | 强度，控制 laser flow 的对应渲染或交互参数。 |
| `beamWidth` | `number` | 否 | `1.5` | 光束宽度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `flare` | `number` | 否 | `1.5` | 耀斑，控制 laser flow 的对应渲染或交互参数。 |
| `spread` | `number` | 否 | `1.5` | 展开间距，控制 laser flow 的对应渲染或交互参数。 |
| `spill` | `number` | 否 | `1` | 溢出，控制 laser flow 的对应渲染或交互参数。 |
| `fog` | `number` | 否 | `0.2` | 雾，控制 laser flow 的对应渲染或交互参数。 |
| `dust` | `number` | 否 | `1.6` | 尘点，控制 laser flow 的对应渲染或交互参数。 |
| `streaks` | `number` | 否 | `1.5` | 拖尾组，控制 laser flow 的对应渲染或交互参数。 |
| `dots` | `number` | 否 | `1` | 圆点组，控制 laser flow 的对应渲染或交互参数。 |
| `pulse` | `number` | 否 | `1.5` | 脉冲，控制 laser flow 的对应渲染或交互参数。 |
| `speed` | `number` | 否 | `1.5` | 动画、流动或滚动的推进速度；不同效果使用各自的速度尺度。 |
| `seed` | `number` | 否 | `3` | 随机种子，控制 laser flow 的对应渲染或交互参数。 |
| `mouseInteraction` | `boolean` | 否 | `true` | 是否鼠标交互，决定该分支的展示或交互行为。 |
| `revealImage` | `string` | 否 | `未指定` | 显现图像，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `revealRadius` | `number` | 否 | `220` | 显现半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `revealOpacity` | `number` | 否 | `0.6` | 显现不透明度，控制 laser flow 的对应渲染或交互参数。 |
| `intro` | `boolean` | 否 | `true` | 是否入场，决定该分支的展示或交互行为。 |
| `theme` | `'dark' \| 'light'` | 否 | `'dark'` | 主题，控制 laser flow 的对应渲染或交互参数。 |
| `paused` | `boolean` | 否 | `false` | 是否暂停持续动画或模拟更新。 |
| `dpr` | `number` | 否 | `未指定` | 渲染像素比；影响 Canvas/WebGL 的清晰度与绘制成本。 |
| `children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |

**继承的原生属性：**

- `Omit<HTMLAttributes<HTMLDivElement>, 'color'>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**surfaceRef 的真实接入：**

```tsx
const elementRef = useRef<HTMLElement | null>(null);
// JSX: surfaceRef={elementRef}
```

**children 的真实接入：**

```tsx
children={"示例"}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，不改写上游 API。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.color` | `"#91c9cc"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.theme` | `"dark"` | select | "dark" / "light" | 调节结束后重建 |
| `t0.intensity` | `1.8` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.beamPosition` | `0.52` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.flare` | `1.5` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.spread` | `1.5` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.spill` | `1.1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.fog` | `0.2` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.dust` | `1.1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.speed` | `1.2` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.mouseInteraction` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.dpr` | `1.5` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.surfaceLevel` | `1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.beamWidth` | `1.5` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.streaks` | `1.5` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.dots` | `1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.pulse` | `1.5` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.seed` | `3` | range | 0 ~ 100 | 调节结束后重建 |
| `t0.revealRadius` | `220` | range | 40 ~ 500 px | 调节结束后重建 |
| `t0.revealOpacity` | `0.6` | range | 0 ~ 1 比例 | 调节结束后重建 |
| `t0.intro` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.paused` | `false` | switch | 不限 ~ 不限 | 调节结束后重建 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Wan 皮肤

- 容器、状态色、边界与焦点使用 Agent Wan 规范；交互命中区不随视觉形变缩小。
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
