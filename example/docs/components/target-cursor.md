# Target Cursor

指针与轨迹 · `target-cursor` · 中文意图：目标光标 / 括号光标 / 锁定指针

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

指针装饰框贴合可交互目标边缘。

功能要求：装饰层不拦截业务点击、不隐藏真实指针，不成为完成业务的唯一操作方式。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/pointer/target-cursor.tsx](../../src/demos/pointer/target-cursor.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Animations/TargetCursor/TargetCursor.tsx](../../.upstream/src/ts-default/Animations/TargetCursor/TargetCursor.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Animations/TargetCursor/TargetCursor.css](../../.upstream/src/ts-default/Animations/TargetCursor/TargetCursor.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/target-cursor.json](../../src/parameters/definitions/target-cursor.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component target-cursor
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Target Cursor 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Animations/TargetCursor/TargetCursor';
import { palette } from '../../shared/demo-support';
import { useRef, useState } from "react";
// 光标括号只追踪本预览内的目标；按钮是真实可点击计数。

export default function TargetCursorDemo() {
  const scopeRef = useRef<HTMLDivElement>(null!); const [count, setCount] = useState(0);
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <div ref={scopeRef} style={{ position: 'relative', minHeight: 320, display: 'grid', placeItems: 'center', gap: 20, padding: 24 }}><Component container={scopeRef}          targetSelector={".aw-cursor-target"} cursorColor={"#52604e"} cursorColorOnTarget={"#1f2d26"} hideDefaultCursor={false} blendMode={"normal"} spinDuration={3} size={26} padding={8} showLabel={true} hoverDuration={0.2} parallaxOn={true} cornerSize={12} thickness={3} matchRadius={true} dotSize={4} clickEffect={true}  /><button className="aw-button aw-cursor-target" data-variant="primary"  data-cursor-label="运行" onClick={() => setCount(value => value + 1)} type={"button"} >运行 {count} 次</button><div className="aw-cursor-target" data-cursor-label="查看" style={{ padding: 24, borderRadius: 20, background: palette.sage, color: palette.ink }}>将指针移入此目标</div></div>
    </div>
  );
}

```

### 完整组件 API

| 参数 | 类型 | 必填 | 上游默认值 | 中文说明 |
|---|---|---|---|---|
| `targetSelector` | `string` | 否 | `'.cursor-target'` | 目标选择器，控制 target cursor 的对应渲染或交互参数。 |
| `cursorColor` | `string` | 否 | `'#ffffff'` | 指针颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `cursorColorOnTarget` | `string` | 否 | `未指定` | 指针颜色目标，传入组件支持的 CSS 或着色器颜色格式。 |
| `spinDuration` | `number` | 否 | `2` | 自转时长，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `hoverDuration` | `number` | 否 | `0.2` | 悬停时长，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `parallaxOn` | `boolean` | 否 | `true` | 是否视差，决定该分支的展示或交互行为。 |
| `hideDefaultCursor` | `boolean` | 否 | `true` | 是否隐藏非受控初始指针，决定该分支的展示或交互行为。 |
| `size` | `number` | 否 | `36` | 尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `cornerSize` | `number` | 否 | `12` | 角尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `thickness` | `number` | 否 | `3` | 厚度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `padding` | `number` | 否 | `6` | 内边距，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `matchRadius` | `boolean` | 否 | `true` | 是否匹配半径，决定该分支的展示或交互行为。 |
| `dotSize` | `number` | 否 | `4` | 圆点尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `blendMode` | `CSSProperties['mixBlendMode']` | 否 | `'difference'` | 混合模式的结构化配置；对象字段按完整类型传入并由组件读取。 |
| `showLabel` | `boolean` | 否 | `true` | 是否显示标签，决定该分支的展示或交互行为。 |
| `clickEffect` | `boolean` | 否 | `true` | 是否点击效果，决定该分支的展示或交互行为。 |
| `container` | `RefObject<HTMLElement \| null> \| HTMLElement \| null` | 否 | `未指定` | 容器的实际 DOM 或组件句柄引用，用于定位、聚焦或命令调用。 |
| `button.className` | `string \| undefined` | 否 | `未指定` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `button.data-variant` | `any` | 否 | `未指定` | 示例在 DOM 上使用的 variant 数据标记，供局部样式或状态定位读取。 |
| `button.type` | `"button" \| "reset" \| "submit" \| undefined` | 否 | `未指定` | 原生输入或按钮的行为类型；按钮类型会影响表单提交。 |
| `button.data-cursor-label` | `any` | 否 | `未指定` | 示例在 DOM 上使用的 cursor-label 数据标记，供局部样式或状态定位读取。 |
| `button.onClick` | `MouseEventHandler<HTMLButtonElement> \| undefined` | 否 | `未指定` | 用户点击或通过键盘激活时触发的事件处理函数。 |
| `button.children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |

**继承的原生属性：**

- `DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**blendMode 的真实接入：**

```tsx
blendMode="normal"
```

**container 的真实接入：**

```tsx
const elementRef = useRef<HTMLElement | null>(null);
// JSX: container={elementRef}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，不改写上游 API。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.targetSelector` | `".aw-cursor-target"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.cursorColor` | `"#52604e"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.cursorColorOnTarget` | `"#1f2d26"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.hideDefaultCursor` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.blendMode` | `"normal"` | select | "color" / "-moz-initial" / "inherit" / "initial" / "revert" / "revert-layer" / "unset" / "overlay" / "normal" / "saturation" / "multiply" / "color-burn" / "color-dodge" / "darken" / "difference" / "exclusion" / "hard-light" / "hue" / "lighten" / "luminosity" / "screen" / "soft-light" / "plus-darker" / "plus-lighter" | 即时应用 |
| `t0.spinDuration` | `3` | number | 不限 ~ 不限 | 即时应用 |
| `t0.size` | `26` | number | 不限 ~ 不限 | 即时应用 |
| `t0.padding` | `8` | number | 不限 ~ 不限 | 即时应用 |
| `t0.showLabel` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.hoverDuration` | `0.2` | number | 不限 ~ 不限 | 即时应用 |
| `t0.parallaxOn` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.cornerSize` | `12` | number | 不限 ~ 不限 | 即时应用 |
| `t0.thickness` | `3` | number | 不限 ~ 不限 | 即时应用 |
| `t0.matchRadius` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.dotSize` | `4` | number | 不限 ~ 不限 | 即时应用 |
| `t0.clickEffect` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t1.type` | `"button"` | select | "button" / "reset" / "submit" | 即时应用 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

本组件在当前锁定依赖组合下使用明确的类型兼容规则。移植或升级前按需读取 [上游类型兼容说明](../../UPSTREAM_TYPE_COMPATIBILITY.md) 中的对应条目；官方安装文件保持原始字节，不能把本项目的检查结果描述为原始源码未经适配即零诊断。

## 4. Agent Wan 皮肤

- 容器、状态色、边界与焦点使用 Agent Wan 规范；交互命中区不随视觉形变缩小。
- 组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。

## 5. 加载、动效与降级

本例实际配置：设备访问与音频行为以本例真实 Props 和显式回调为准。capabilities 是源码扫描提示，不能据此声称已请求相机、录音或播放音频。

- 依赖清单：`react`、`react-dom`。安装前复用目标项目的兼容版本，不重复加载。
- 运行类型：本例预览入口不要求预先通过图形接口检查；实际组件内部的可选渲染分支由源码和本例 Props 决定。此说明不等于浏览器运行证明。
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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [指针与轨迹](../categories/pointer.md)；否则直接完成当前组件。
