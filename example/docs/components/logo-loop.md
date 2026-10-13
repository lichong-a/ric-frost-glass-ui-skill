# Logo Loop

媒体与轮播 · `logo-loop` · 中文意图：Logo循环 / 品牌跑马灯

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

标志无缝重复滚动并可暂停。

功能要求：装饰层不拦截业务点击、不隐藏真实指针，不成为完成业务的唯一操作方式。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/media/logo-loop.tsx](../../src/demos/media/logo-loop.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Animations/LogoLoop/LogoLoop.tsx](../../.upstream/src/ts-default/Animations/LogoLoop/LogoLoop.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Animations/LogoLoop/LogoLoop.css](../../.upstream/src/ts-default/Animations/LogoLoop/LogoLoop.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/logo-loop.json](../../src/parameters/definitions/logo-loop.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component logo-loop
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Logo Loop 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import { SiReact, SiTypescript, SiVite, SiGithub, SiFigma, SiTailwindcss } from 'react-icons/si';
import Component from '../../../.upstream/src/ts-default/Animations/LogoLoop/LogoLoop';
import styles from './logo-loop.module.css';

const logos = [
  { node: <SiReact aria-hidden="true" />, title: 'React', ariaLabel: 'React' },
  { node: <SiTypescript aria-hidden="true" />, title: 'TypeScript', ariaLabel: 'TypeScript' },
  { node: <SiVite aria-hidden="true" />, title: 'Vite', ariaLabel: 'Vite' },
  { node: <SiGithub aria-hidden="true" />, title: 'GitHub', ariaLabel: 'GitHub' },
  { node: <SiFigma aria-hidden="true" />, title: 'Figma', ariaLabel: 'Figma' },
  { node: <SiTailwindcss aria-hidden="true" />, title: 'Tailwind CSS', ariaLabel: 'Tailwind CSS' },
];

export default function LogoLoopDemo() {
  return (
    <section className={styles.stage} data-visual-demo="logo-loop">
      <span className={styles.eyebrow}>CREATIVE TOOLBOX</span>
      <h2 className={styles.title}>构建灵感的工具</h2>
      <div className={styles.loop}>
        <Component logos={logos}

             speed={100} direction={"left"} width={"100%"} logoHeight={56} gap={64} hoverSpeed={0} scaleOnHover={true} fadeOut={true} fadeOutColor={"#faf7f0"} ariaLabel={"React、TypeScript、Vite、GitHub、Figma 和 Tailwind CSS 图标循环展示"}  />
      </div>
      <p className={styles.hint}>悬停暂停，移开继续无缝循环。</p>
    </section>
  );
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `logos` | `LogoItem[]` | 是 | `未指定` | 标志列表的有序数据集合；每一项按数组元素类型配置。 |
| `speed` | `number` | 否 | `120` | 动画、流动或滚动的推进速度；不同效果使用各自的速度尺度。 |
| `direction` | `'left' \| 'right' \| 'up' \| 'down'` | 否 | `'left'` | 方向，控制 logo loop 的对应渲染或交互参数。 |
| `width` | `number \| string` | 否 | `'100%'` | 容器或效果的宽度，CSS 字符串与数值的支持以类型为准。 |
| `logoHeight` | `number` | 否 | `28` | 标志高度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `gap` | `number` | 否 | `32` | 相邻单元、卡片或字符之间的间距；单位由组件实现定义。 |
| `pauseOnHover` | `boolean` | 否 | `未指定` | 是否暂停悬停，决定该分支的展示或交互行为。 |
| `hoverSpeed` | `number` | 否 | `未指定` | 悬停速度，控制 logo loop 的对应渲染或交互参数。 |
| `fadeOut` | `boolean` | 否 | `false` | 是否淡出退出，决定该分支的展示或交互行为。 |
| `fadeOutColor` | `string` | 否 | `未指定` | 淡出退出颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `scaleOnHover` | `boolean` | 否 | `false` | 是否缩放悬停，决定该分支的展示或交互行为。 |
| `renderItem` | `(item: LogoItem, key: React.Key) => React.ReactNode` | 否 | `未指定` | 自定义每一项内容的渲染函数，接收条目及索引等参数并返回 ReactNode。 |
| `ariaLabel` | `string` | 否 | `'Partner logos'` | 无障碍标签，控制 logo loop 的对应渲染或交互参数。 |
| `className` | `string` | 否 | `未指定` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `style` | `React.CSSProperties` | 否 | `未指定` | 容器的 React 内联样式对象，尺寸、布局与 CSS 属性按 CSSProperties 传入。 |

**logos 的真实接入：**

```tsx
logos={logos}
```

**renderItem 的真实接入：**

```tsx
renderItem={(item, key) => ("示例")}
```

**style 的真实接入：**

```tsx
style={{ width: "100%", minHeight: 240 }}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.speed` | `100` | range | -240 ~ 240 px/s | 即时应用 |
| `t0.direction` | `"left"` | select | "left" / "right" / "up" / "down" | 即时应用 |
| `t0.width` | `"100%"` | json | 不限 ~ 不限 | 即时应用 |
| `t0.logoHeight` | `56` | range | 16 ~ 80 px | 即时应用 |
| `t0.gap` | `64` | range | 0 ~ 100 px | 即时应用 |
| `t0.hoverSpeed` | `0` | number | 不限 ~ 不限 | 即时应用 |
| `t0.scaleOnHover` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.fadeOut` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.fadeOutColor` | `"#faf7f0"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.ariaLabel` | `"React、TypeScript、Vite、GitHub、Figma 和 Tailwind CSS 图标循环展示"` | text | 不限 ~ 不限 | 即时应用 |

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
- 运行类型：本例预览入口不要求预先通过图形接口检查；实际组件内部的可选渲染分支由源码和本例 Props 决定。此说明不等于浏览器运行证明。
- 动效策略：遵从系统减少动效偏好，功能交互保持可用。
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
