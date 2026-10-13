# Spring Check

表单与选择 · `spring-check` · 中文意图：弹簧复选 / 完成勾选 / 待办勾选

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

复选状态驱动填色勾线与文本样式。

功能要求：由真实 value / state 与回调驱动；操作可用键盘完成，不能只在动画内部保存业务状态。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/form/spring-check.tsx](../../src/demos/form/spring-check.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Micro/SpringCheck/SpringCheck.tsx](../../.upstream/src/ts-default/Micro/SpringCheck/SpringCheck.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Micro/SpringCheck/SpringCheck.css](../../.upstream/src/ts-default/Micro/SpringCheck/SpringCheck.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/spring-check.json](../../src/parameters/definitions/spring-check.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component spring-check
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Spring Check 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import { useState } from 'react';
import SpringCheck from '../../../.upstream/src/ts-default/Micro/SpringCheck/SpringCheck';
import { DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
const cn=(names:string)=>componentClasses(styles,names);

export default function SpringCheckDemo() {
  const [checked, setChecked] = useState(false);
  return <DemoPanel title="Spring Check · 弹性复选"><div className={cn("aw-micro-stack")}>
    <SpringCheck label="已检查组件交互与响应式" checked={checked} onChange={setChecked}        color={"#1f2d26"} fillColor={"#52604e"} checkColor={"#faf7f0"} boxSize={24} boxRadius={7} fontSize={14} ariaLabel={"标记演示检查项完成"} disabled={false} bounce={0.2} strikeLag={0.12} doneOpacity={0.42} strike={"left"}  />
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">本地演示检查项：{checked ? '已完成' : '未完成'}</p>
  </div></DemoPanel>;
}

```

### 完整组件 API

| 参数 | 类型 | 必填 | 上游默认值 | 中文说明 |
|---|---|---|---|---|
| `label` | `ReactNode` | 否 | `'Ship the build'` | 向用户或辅助技术说明控件的名称。 |
| `checked` | `boolean` | 否 | `未指定` | 当前受控勾选状态，调用方在变更回调中写回。 |
| `defaultChecked` | `boolean` | 否 | `false` | 非受控模式首次挂载时的勾选状态。 |
| `onChange` | `(checked: boolean) => void` | 否 | `未指定` | 用户改变值或条目顺序时通知调用方；回调参数类型就是应写回的值或原生事件。 |
| `disabled` | `boolean` | 否 | `false` | 是否禁用控件的用户交互。 |
| `color` | `string` | 否 | `'#ffffff'` | 颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `fillColor` | `string` | 否 | `'#ffffff'` | 填充颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `checkColor` | `string` | 否 | `'#0b0b0f'` | 勾选颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `boxSize` | `number` | 否 | `28` | 方块尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `boxRadius` | `number` | 否 | `9` | 方块半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `fontSize` | `number` | 否 | `18` | 字体尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `bounce` | `number` | 否 | `0.2` | 回弹，控制 spring check 的对应渲染或交互参数。 |
| `strikeLag` | `number` | 否 | `0.12` | 击打滞后，控制 spring check 的对应渲染或交互参数。 |
| `doneOpacity` | `number` | 否 | `0.42` | 完成不透明度，控制 spring check 的对应渲染或交互参数。 |
| `strike` | `StrikeSide` | 否 | `'left'` | 击打，控制 spring check 的对应渲染或交互参数。 |
| `ariaLabel` | `string` | 否 | `未指定` | 无障碍标签，控制 spring check 的对应渲染或交互参数。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |

**label 的真实接入：**

```tsx
label="已检查组件交互与响应式"
```

**onChange 的真实接入：**

```tsx
onChange={setChecked}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，不改写上游 API。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.color` | `"#1f2d26"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.fillColor` | `"#52604e"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.checkColor` | `"#faf7f0"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.boxSize` | `24` | number | 不限 ~ 不限 | 即时应用 |
| `t0.boxRadius` | `7` | number | 不限 ~ 不限 | 即时应用 |
| `t0.fontSize` | `14` | number | 不限 ~ 不限 | 即时应用 |
| `t0.ariaLabel` | `"标记演示检查项完成"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.disabled` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.bounce` | `0.2` | number | 不限 ~ 不限 | 即时应用 |
| `t0.strikeLag` | `0.12` | number | 不限 ~ 不限 | 即时应用 |
| `t0.doneOpacity` | `0.42` | number | 不限 ~ 不限 | 即时应用 |
| `t0.strike` | `"left"` | select | "left" / "center" / "right" / "none" | 即时应用 |
| `state.checked` | `false` | switch | 不限 ~ 不限 | 即时应用；原组件回调同步受控值 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Wan 皮肤

- 容器、状态色、边界与焦点使用 Agent Wan 规范；交互命中区不随视觉形变缩小。
- 组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。

## 5. 加载、动效与降级

本例实际配置：设备访问与音频行为以本例真实 Props 和显式回调为准。capabilities 是源码扫描提示，不能据此声称已请求相机、录音或播放音频。

- 依赖清单：`@hugeicons/core-free-icons`、`motion`、`react`。安装前复用目标项目的兼容版本，不重复加载。
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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [表单与选择](../categories/form.md)；否则直接完成当前组件。
