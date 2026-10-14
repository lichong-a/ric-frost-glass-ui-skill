# Spotlight Card

卡片与面板 · `spotlight-card` · 中文意图：聚光卡片 / 悬停聚光

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-ric-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

柔和光斑跟随指针并照亮边缘。

功能要求：保持内容的语义和可访问名称；只有真实可交互元素可进入焦点顺序。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/cards/spotlight-card.tsx](../../src/demos/cards/spotlight-card.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Components/SpotlightCard/SpotlightCard.tsx](../../.upstream/src/ts-default/Components/SpotlightCard/SpotlightCard.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Components/SpotlightCard/SpotlightCard.css](../../.upstream/src/ts-default/Components/SpotlightCard/SpotlightCard.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/spotlight-card.json](../../src/parameters/definitions/spotlight-card.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component spotlight-card
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Spotlight Card 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import { useState } from 'react';
import { ArrowUpRight, Layers } from 'lucide-react';
import Component from '../../../.upstream/src/ts-default/Components/SpotlightCard/SpotlightCard';
import styles from './spotlight-card.module.css';

export default function SpotlightCardDemo() {
  const [status, setStatus] = useState('移动指针，观察卡片表面与边缘的光。');
  return (
    <div className={styles.stage} data-visual-demo="spotlight-card">
      <Component


         theme={"dark"} spotlightColor={"#a4e6c8"} intensity={0.28} spotlightSize={280} softness={0.7} shape={"circle"} borderGlow={0.8} proximity={100} smoothing={0.3} grain={0.06} ambient={false} flare={true} style={{ "width": "min(100%, 380px)", "minHeight": 280, "padding": 32, "borderRadius": 24, "color": "#e7f2ec" }} >
        <span className={styles.icon}><Layers size={24} strokeWidth={1.5} /></span>
        <h3 className={styles.title}>知识检索工作流</h3>
        <p className={styles.description}>把分散的资料连接起来，构建可重复执行的知识检索流程。</p>
        <button  className={styles.action} onClick={() => setStatus('工作流运行按钮已点击。')} type={"button"} >
          运行示例 <ArrowUpRight size={16} aria-hidden="true" />
        </button>
      </Component>
      <p className={styles.hint} role="status" aria-live="polite">{status}</p>
    </div>
  );
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `className` | `string \| undefined` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `style` | `React.CSSProperties \| undefined` | 否 | `未指定` | 容器的 React 内联样式对象，尺寸、布局与 CSS 属性按 CSSProperties 传入。 |
| `children` | `React.ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `spotlightColor` | `string` | 否 | `palette.light` | 聚光颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `intensity` | `number` | 否 | `0.15` | 强度，控制 spotlight card 的对应渲染或交互参数。 |
| `spotlightSize` | `number` | 否 | `240` | 聚光尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `softness` | `number` | 否 | `0.7` | 柔和度，控制 spotlight card 的对应渲染或交互参数。 |
| `shape` | `SpotlightShape` | 否 | `'circle'` | 形状，控制 spotlight card 的对应渲染或交互参数。 |
| `borderGlow` | `number` | 否 | `0.6` | 边框辉光，控制 spotlight card 的对应渲染或交互参数。 |
| `proximity` | `number` | 否 | `80` | 邻近程度，控制 spotlight card 的对应渲染或交互参数。 |
| `smoothing` | `number` | 否 | `0.3` | 平滑，控制 spotlight card 的对应渲染或交互参数。 |
| `ambient` | `boolean` | 否 | `false` | 是否环境光，决定该分支的展示或交互行为。 |
| `flare` | `boolean` | 否 | `true` | 是否耀斑，决定该分支的展示或交互行为。 |
| `grain` | `number` | 否 | `0` | 颗粒，控制 spotlight card 的对应渲染或交互参数。 |
| `theme` | `'dark' \| 'light'` | 否 | `'dark'` | 主题，控制 spotlight card 的对应渲染或交互参数。 |
| `button.type` | `"button" \| "reset" \| "submit" \| undefined` | 否 | `未指定` | 原生输入或按钮的行为类型；按钮类型会影响表单提交。 |
| `button.className` | `string \| undefined` | 否 | `未指定` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `button.onClick` | `MouseEventHandler<HTMLButtonElement> \| undefined` | 否 | `未指定` | 用户点击或通过键盘激活时触发的事件处理函数。 |
| `button.children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |

**继承的原生属性：**

- `React.HTMLAttributes<HTMLDivElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**style 的真实接入：**

```tsx
style={{ width: 'min(100%, 380px)', minHeight: 280, padding: 32, borderRadius: 24, color: '#e7f2ec' }}
```

**children 的真实接入：**

```tsx
children={<><span className={styles.icon}><Layers size={24} strokeWidth={1.5} /></span><h3 className={styles.title}>知识检索工作流</h3><p className={styles.description}>把分散的资料连接起来，构建可重复执行的知识检索流程。</p><button type="button" className={styles.action} onClick={() => setStatus('工作流运行按钮已点击。')}>
          运行示例 <ArrowUpRight size={16} aria-hidden="true" />
        </button></>}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.theme` | `"dark"` | select | "dark" / "light" | 即时应用 |
| `t0.spotlightColor` | `"#a4e6c8"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.intensity` | `0.28` | number | 不限 ~ 不限 | 即时应用 |
| `t0.spotlightSize` | `280` | range | 80 ~ 480 px | 即时应用 |
| `t0.softness` | `0.7` | range | 0 ~ 1 比例 | 即时应用 |
| `t0.shape` | `"circle"` | select | "circle" / "beam" | 即时应用 |
| `t0.borderGlow` | `0.8` | number | 不限 ~ 不限 | 即时应用 |
| `t0.proximity` | `100` | range | 0 ~ 200 px | 即时应用 |
| `t0.smoothing` | `0.3` | number | 不限 ~ 不限 | 即时应用 |
| `t0.grain` | `0.06` | number | 不限 ~ 不限 | 即时应用 |
| `t0.ambient` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.flare` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.style` | `{"width":"min(100%, 380px)","minHeight":280,"padding":32,"borderRadius":24,"color":"#e7f2ec"}` | json | 不限 ~ 不限 | 即时应用 |
| `t1.type` | `"button"` | select | "button" / "reset" / "submit" | 即时应用 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Ric 皮肤

- 容器、状态色、边界与焦点使用 Agent Ric 规范；交互命中区不随视觉形变缩小。
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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [卡片与面板](../effects/categories/cards.md)；否则直接完成当前组件。
