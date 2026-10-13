# Cubes

背景与光效 · `cubes` · 中文意图：交互方块 / 三维方块阵列

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

方块朝向指针转动并响应扫过和点击。

功能要求：装饰层不拦截业务点击、不隐藏真实指针，不成为完成业务的唯一操作方式。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/background/cubes.tsx](../../src/demos/background/cubes.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Animations/Cubes/Cubes.tsx](../../.upstream/src/ts-default/Animations/Cubes/Cubes.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Animations/Cubes/Cubes.css](../../.upstream/src/ts-default/Animations/Cubes/Cubes.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/cubes.json](../../src/parameters/definitions/cubes.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component cubes
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Cubes 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import Component from '../../../.upstream/src/ts-default/Animations/Cubes/Cubes';
import styles from './cubes.module.css';

export default function CubesDemo() {
  return (
    <div className={styles.stage} data-visual-demo="cubes">
      <div className={styles.field}>
        <Component


            gridSize={8} gap={0.18} faceColor={"#10171a"} edgeColor={"#e2f1eb"} edgeWidth={1} faceOpacity={1} shading={0.6} maxAngle={45} radius={3} speed={1} bounce={0.4} autoAnimate={true} rippleOnClick={true} rippleColor={"#90e7c6"} dpr={1.5} edgeStyle={"solid"} brush={1} perspective={0} rippleSpeed={1} intro={true} paused={false}  />
      </div>
      <p className={styles.hint}>移动指针翻转立方体 · 点击扩散涟漪</p>
    </div>
  );
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `gridSize` | `number` | 否 | `10` | 每边立方体的数量，组成方形网格。 |
| `gap` | `number` | 否 | `0.18` | 每个网格单元中保留为空隙的比例；立方体面宽为 1 - gap，源码限制在 0 至 0.9。 |
| `faceColor` | `string` | 否 | `'#120F17'` | 立方体各面的基础颜色。 |
| `edgeColor` | `string` | 否 | `'#ffffff'` | 立方体边线的颜色。 |
| `edgeWidth` | `number` | 否 | `1` | 边线绘制的宽度。 |
| `edgeStyle` | `CubesEdgeStyle` | 否 | `'solid'` | 边线采用实线、虚线、点线或隐藏的样式。 |
| `faceOpacity` | `number` | 否 | `1` | 立方体面的不透明度，边线单独绘制。 |
| `shading` | `number` | 否 | `0.6` | 侧面和正面之间的明暗变化强度。 |
| `maxAngle` | `number` | 否 | `45` | 立方体响应指针时允许旋转的最大角度。 |
| `radius` | `number` | 否 | `3` | 指针影响周边立方体的半径，以网格坐标计算。 |
| `speed` | `number` | 否 | `1` | 立方体旋转响应的速度系数，通过弹簧刚度影响趋近目标的快慢。 |
| `bounce` | `number` | 否 | `0.4` | 立方体旋转的回弹程度，源码限制在 0 至 1。 |
| `brush` | `number` | 否 | `1` | 指针笔刷作用的强度。 |
| `perspective` | `number` | 否 | `0` | 观察立方体阵列的透视参数。 |
| `autoAnimate` | `boolean` | 否 | `true` | 是否在没有用户指针输入时自动更新动画目标。 |
| `rippleOnClick` | `boolean` | 否 | `true` | 点击时是否从点击位置发出波纹。 |
| `rippleColor` | `string` | 否 | `'#ffffff'` | 点击波纹经过立方体时的颜色。 |
| `rippleSpeed` | `number` | 否 | `1` | 点击波纹沿网格传播的速度。 |
| `intro` | `boolean` | 否 | `true` | 首次挂载时是否播放立方体阵列的入场动画。 |
| `paused` | `boolean` | 否 | `false` | 是否暂停立方体模拟与绘制循环。 |
| `dpr` | `number` | 否 | `未指定` | WebGL 绘图缓冲使用的像素比；未传入时由设备像素比决定。 |
| `className` | `string \| undefined` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |

**继承的原生属性：**

- `HTMLAttributes<HTMLDivElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**children 的真实接入：**

```tsx
children={"示例"}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.gridSize` | `8` | range | 1 ~ 40 个/边 | 调节结束后重建 |
| `t0.gap` | `0.18` | range | 0 ~ 0.9 单元比例 | 调节结束后重建 |
| `t0.faceColor` | `"#10171a"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.edgeColor` | `"#e2f1eb"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.edgeWidth` | `1` | range | 0.25 ~ 4 px | 调节结束后重建 |
| `t0.faceOpacity` | `1` | range | 0 ~ 1 比例 | 调节结束后重建 |
| `t0.shading` | `0.6` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.maxAngle` | `45` | range | 0 ~ 75 ° | 调节结束后重建 |
| `t0.radius` | `3` | range | 0.5 ~ 10 网格单元 | 调节结束后重建 |
| `t0.speed` | `1` | range | 0.05 ~ 4 倍率 | 调节结束后重建 |
| `t0.bounce` | `0.4` | range | 0 ~ 1 比例 | 调节结束后重建 |
| `t0.autoAnimate` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.rippleOnClick` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.rippleColor` | `"#90e7c6"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.dpr` | `1.5` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.edgeStyle` | `"solid"` | select | "solid" / "dashed" / "dotted" / "none" | 调节结束后重建 |
| `t0.brush` | `1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.perspective` | `0` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.rippleSpeed` | `1` | number | 不限 ~ 不限 | 调节结束后重建 |
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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [背景与光效](../effects/categories/background.md)；否则直接完成当前组件。
