# Sling Button

按钮与操作 · `sling-button` · 中文意图：弹弓按钮 / 拖拽发送

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

拖拽蓄力并释放触发发送动作。

功能要求：将视觉触发与真实动作回调分开；禁用/加载阻止重复提交，提供普通点击或键盘的等价操作，危险动作按确认契约处理。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/actions/sling-button.tsx](../../src/demos/actions/sling-button.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Micro/SlingButton/SlingButton.tsx](../../.upstream/src/ts-default/Micro/SlingButton/SlingButton.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Micro/SlingButton/SlingButton.css](../../.upstream/src/ts-default/Micro/SlingButton/SlingButton.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/sling-button.json](../../src/parameters/definitions/sling-button.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component sling-button
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Sling Button 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import { useState } from 'react';
import SlingButton from '../../../.upstream/src/ts-default/Micro/SlingButton/SlingButton';
import { DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
const cn=(names:string)=>componentClasses(styles,names);

export default function SlingButtonDemo() {
  const [count, setCount] = useState(0);
  return <DemoPanel title="Sling Button · 弹射发送"><div className={cn("aw-micro-stack")}>
    <div style={{ padding: 70 }}><SlingButton onSend={() => setCount(value => value + 1)}         padColor={"#52604e"} iconColor={"#faf7f0"} accentColor={"#c3ae88"} wellColor={"rgb(250 247 240 / 0.82)"} bandColor={"#a6b39a"} size={60} tapSends={true} ariaLabel={"发送一条本地演示消息"} strokeWidth={3} armAt={48} maxPull={160} launchSpeed={2600} recoil={0.2} flight={120} particles={14} spread={60} axis={"any"} disabled={false}  /></div>
    <p className={cn("aw-micro-hint")}>拖拽拉伸后松手，或直接点击按钮。</p>
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">已触发 {count} 次本地发送回调。</p>
  </div></DemoPanel>;
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `children` | `ReactNode` | 否 | `<HugeiconsIcon icon={ArrowUp02Icon} size={Math.round(size * 0.4)} strokeWidth={2.2} />` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `onSend` | `() => void` | 否 | `未指定` | 用户提交文本或消息时通知调用方。 |
| `padColor` | `string` | 否 | `'#f5f5f5'` | 留白颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `iconColor` | `string` | 否 | `'#18181b'` | 图标颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `accentColor` | `string` | 否 | `'#f5f5f5'` | 强调颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `wellColor` | `string` | 否 | `'#27272a'` | 凹槽颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `bandColor` | `string` | 否 | `'#52525b'` | 条带颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `size` | `number` | 否 | `56` | 尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `strokeWidth` | `number` | 否 | `3` | 描边宽度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `armAt` | `number` | 否 | `48` | 就绪阈值阈值，控制 sling button 的对应渲染或交互参数。 |
| `maxPull` | `number` | 否 | `160` | 最大拉动，控制 sling button 的对应渲染或交互参数。 |
| `launchSpeed` | `number` | 否 | `2600` | 发射速度，控制 sling button 的对应渲染或交互参数。 |
| `recoil` | `number` | 否 | `0.2` | 后坐回弹，控制 sling button 的对应渲染或交互参数。 |
| `flight` | `number` | 否 | `120` | 飞行，控制 sling button 的对应渲染或交互参数。 |
| `particles` | `number` | 否 | `14` | 粒子组，控制 sling button 的对应渲染或交互参数。 |
| `spread` | `number` | 否 | `60` | 展开间距，控制 sling button 的对应渲染或交互参数。 |
| `axis` | `SlingAxis` | 否 | `'any'` | 坐标轴，控制 sling button 的对应渲染或交互参数。 |
| `tapSends` | `boolean` | 否 | `true` | 是否点按发送，决定该分支的展示或交互行为。 |
| `disabled` | `boolean` | 否 | `false` | 是否禁用控件的用户交互。 |
| `ariaLabel` | `string` | 否 | `'Send'` | 无障碍标签，控制 sling button 的对应渲染或交互参数。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |

**children 的真实接入：**

```tsx
children={"示例"}
```

**onSend 的真实接入：**

```tsx
onSend={() => setCount(value => value + 1)}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.padColor` | `"#52604e"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.iconColor` | `"#faf7f0"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.accentColor` | `"#c3ae88"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.wellColor` | `"rgb(250 247 240 / 0.82)"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.bandColor` | `"#a6b39a"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.size` | `60` | number | 不限 ~ 不限 | 即时应用 |
| `t0.tapSends` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.ariaLabel` | `"发送一条本地演示消息"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.strokeWidth` | `3` | number | 不限 ~ 不限 | 即时应用 |
| `t0.armAt` | `48` | number | 不限 ~ 不限 | 即时应用 |
| `t0.maxPull` | `160` | number | 不限 ~ 不限 | 即时应用 |
| `t0.launchSpeed` | `2600` | number | 不限 ~ 不限 | 即时应用 |
| `t0.recoil` | `0.2` | number | 不限 ~ 不限 | 即时应用 |
| `t0.flight` | `120` | number | 不限 ~ 不限 | 即时应用 |
| `t0.particles` | `14` | number | 不限 ~ 不限 | 即时应用 |
| `t0.spread` | `60` | number | 不限 ~ 不限 | 即时应用 |
| `t0.axis` | `"any"` | select | "any" / "horizontal" / "vertical" | 即时应用 |
| `t0.disabled` | `false` | switch | 不限 ~ 不限 | 即时应用 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Wan 皮肤

- 容器、状态色、边界与焦点使用 Agent Wan 规范；交互命中区不随视觉形变缩小。
- 组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。

## 5. 加载、动效与降级

本例实际配置：设备访问与音频行为以本例真实 Props 和显式回调为准。capabilities 是源码扫描提示，不能据此声称已请求相机、录音或播放音频。

- 依赖清单：`@hugeicons/core-free-icons`、`@hugeicons/react`、`motion`、`react`。安装前复用目标项目的兼容版本，不重复加载。
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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [按钮与操作](../effects/categories/actions.md)；否则直接完成当前组件。
