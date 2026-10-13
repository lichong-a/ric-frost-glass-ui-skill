# Crosshair

指针与轨迹 · `crosshair` · 中文意图：十字光标 / 坐标准星

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

准星、坐标与测量框跟随指针和目标。

功能要求：装饰层不拦截业务点击、不隐藏真实指针，不成为完成业务的唯一操作方式。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/pointer/crosshair.tsx](../../src/demos/pointer/crosshair.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Animations/Crosshair/Crosshair.tsx](../../.upstream/src/ts-default/Animations/Crosshair/Crosshair.tsx) |
| 单独 Props 记录 | [example/src/parameters/definitions/crosshair.json](../../src/parameters/definitions/crosshair.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component crosshair
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Crosshair 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Animations/Crosshair/Crosshair';
import { palette } from '../../shared/demo-support';
import { useRef, useState } from "react";
// 十字线与实时坐标绑定到局部容器，目标按钮保持可操作。
// 此演示使用Canvas；确保容器拥有非零宽高。

export default function CrosshairDemo() {
  const scopeRef = useRef<HTMLDivElement>(null!); const [count, setCount] = useState(0);
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <div ref={scopeRef} style={{ position: 'relative', height: 340, display: 'grid', placeItems: 'center' }}><Component containerRef={scopeRef}          color={"#52604e"} targetEffect={"lock"} targetSelector={".aw-crosshair-target"} thickness={1} opacity={0.7} smoothing={0.3} showCoordinates={true} hideCursor={false} blendMode={"normal"} lineStyle={"solid"} gap={0} fade={0} clickPulse={true}  /><button className="aw-button aw-crosshair-target" data-variant="secondary"  onClick={() => setCount(value => value + 1)} type={"button"} >锁定目标 · {count}</button></div>
    </div>
  );
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `color` | `string` | 否 | `'#ffffff'` | 颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `containerRef` | `React.RefObject<HTMLElement \| null> \| null` | 否 | `null` | 容器引用的实际 DOM 或组件句柄引用，用于定位、聚焦或命令调用。 |
| `thickness` | `number` | 否 | `1` | 厚度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `opacity` | `number` | 否 | `0.85` | 不透明度，控制 crosshair 的对应渲染或交互参数。 |
| `lineStyle` | `CrosshairLineStyle` | 否 | `'solid'` | 线条样式，控制 crosshair 的对应渲染或交互参数。 |
| `gap` | `number` | 否 | `0` | 相邻单元、卡片或字符之间的间距；单位由组件实现定义。 |
| `fade` | `number` | 否 | `0` | 淡出，控制 crosshair 的对应渲染或交互参数。 |
| `smoothing` | `number` | 否 | `0.35` | 平滑，控制 crosshair 的对应渲染或交互参数。 |
| `showCoordinates` | `boolean` | 否 | `true` | 是否显示坐标，决定该分支的展示或交互行为。 |
| `targetEffect` | `CrosshairTargetEffect` | 否 | `'lock'` | 目标效果，控制 crosshair 的对应渲染或交互参数。 |
| `targetSelector` | `string` | 否 | `'a, button, [data-crosshair-target]'` | 目标选择器，控制 crosshair 的对应渲染或交互参数。 |
| `clickPulse` | `boolean` | 否 | `true` | 是否点击脉冲，决定该分支的展示或交互行为。 |
| `hideCursor` | `boolean` | 否 | `false` | 是否隐藏指针，决定该分支的展示或交互行为。 |
| `blendMode` | `'normal' \| 'difference'` | 否 | `'normal'` | 混合模式，控制 crosshair 的对应渲染或交互参数。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `style` | `React.CSSProperties` | 否 | `未指定` | 容器的 React 内联样式对象，尺寸、布局与 CSS 属性按 CSSProperties 传入。 |
| `button.className` | `string \| undefined` | 否 | `未指定` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `button.data-variant` | `any` | 否 | `未指定` | 示例在 DOM 上使用的 variant 数据标记，供局部样式或状态定位读取。 |
| `button.type` | `"button" \| "reset" \| "submit" \| undefined` | 否 | `未指定` | 原生输入或按钮的行为类型；按钮类型会影响表单提交。 |
| `button.onClick` | `MouseEventHandler<HTMLButtonElement> \| undefined` | 否 | `未指定` | 用户点击或通过键盘激活时触发的事件处理函数。 |
| `button.children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |

**继承的原生属性：**

- `DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**containerRef 的真实接入：**

```tsx
const elementRef = useRef<HTMLElement | null>(null);
// JSX: containerRef={elementRef}
```

**style 的真实接入：**

```tsx
style={{ width: "100%", minHeight: 240 }}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.color` | `"#52604e"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.targetEffect` | `"lock"` | select | "lock" / "glitch" / "none" | 调节结束后重建 |
| `t0.targetSelector` | `".aw-crosshair-target"` | text | 不限 ~ 不限 | 调节结束后重建 |
| `t0.thickness` | `1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.opacity` | `0.7` | range | 0 ~ 1 比例 | 调节结束后重建 |
| `t0.smoothing` | `0.3` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.showCoordinates` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.hideCursor` | `false` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.blendMode` | `"normal"` | select | "normal" / "difference" | 调节结束后重建 |
| `t0.lineStyle` | `"solid"` | select | "solid" / "dashed" / "dotted" | 调节结束后重建 |
| `t0.gap` | `0` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.fade` | `0` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.clickPulse` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t1.type` | `"button"` | select | "button" / "reset" / "submit" | 调节结束后重建 |

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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [指针与轨迹](../effects/categories/pointer.md)；否则直接完成当前组件。
