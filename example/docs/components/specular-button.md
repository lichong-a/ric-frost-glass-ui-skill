# Specular Button

按钮与操作 · `specular-button` · 中文意图：玻璃按钮 / 镜面按钮

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

按钮高光沿边缘响应指针。

功能要求：将视觉触发与真实动作回调分开；禁用/加载阻止重复提交，提供普通点击或键盘的等价操作，危险动作按确认契约处理。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/actions/specular-button.tsx](../../src/demos/actions/specular-button.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Components/SpecularButton/SpecularButton.tsx](../../.upstream/src/ts-default/Components/SpecularButton/SpecularButton.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Components/SpecularButton/SpecularButton.css](../../.upstream/src/ts-default/Components/SpecularButton/SpecularButton.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/specular-button.json](../../src/parameters/definitions/specular-button.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component specular-button
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Specular Button 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Components/SpecularButton/SpecularButton';
import { palette } from '../../shared/demo-support';
import { useState } from "react";
// 使用真实Specular Button，不以普通按钮替代高光算法。
// 此演示需要可用WebGL上下文；不支持时应显示能力提示，不声称效果已运行。

export default function SpecularButtonDemo() {
  const [status, setStatus] = useState("将指针移近按钮，观察玻璃边缘高光");

  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 400, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <div style={{ width: '100%', height: '100%' }}><div style={{ height: 300, display: 'grid', placeItems: 'center' }}><Component

  idleIntensity={0.12}

 onClick={() => setStatus('已点击：创建工作流')} type={"button"} size={"lg"} radius={12} tint={"#a6b39a"} tintOpacity={0.22} blur={16} textColor={"#1f2d26"} lineColor={"#faf7f0"} baseColor={"#52604e"} intensity={0.55} shineSize={9} shineFade={30} thickness={1} glow={0.25} followMouse={true} proximity={160} speed={0.35} autoAnimate={false} disabled={false} >创建工作流</Component></div><p role="status" aria-live="polite" style={{ margin: '12px 20px', fontSize: 14, color: palette.muted }}>{status}</p></div>
    </div>
  );
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `children` | `ReactNode` | 否 | `'Get Started'` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `size` | `SpecularButtonSize` | 否 | `'lg'` | 尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `radius` | `number` | 否 | `18` | 半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `tint` | `string` | 否 | `'#ffffff'` | 色调，控制 specular button 的对应渲染或交互参数。 |
| `tintOpacity` | `number` | 否 | `0.04` | 色调不透明度，控制 specular button 的对应渲染或交互参数。 |
| `blur` | `number` | 否 | `0` | 模糊，控制 specular button 的对应渲染或交互参数。 |
| `textColor` | `string` | 否 | `'#f5f5f5'` | 文字颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `lineColor` | `string` | 否 | `'#ffffff'` | 线条颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `baseColor` | `string` | 否 | `'#525252'` | 基础颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `intensity` | `number` | 否 | `1` | 强度，控制 specular button 的对应渲染或交互参数。 |
| `idleIntensity` | `number` | 否 | `0.35` | 静止强度，控制 specular button 的对应渲染或交互参数。 |
| `shineSize` | `number` | 否 | `10` | 扫光尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `shineFade` | `number` | 否 | `34` | 扫光淡出，控制 specular button 的对应渲染或交互参数。 |
| `thickness` | `number` | 否 | `1.2` | 厚度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `glow` | `number` | 否 | `1` | 辉光，控制 specular button 的对应渲染或交互参数。 |
| `speed` | `number` | 否 | `0.35` | 动画、流动或滚动的推进速度；不同效果使用各自的速度尺度。 |
| `followMouse` | `boolean` | 否 | `true` | 是否跟随鼠标，决定该分支的展示或交互行为。 |
| `proximity` | `number` | 否 | `250` | 邻近程度，控制 specular button 的对应渲染或交互参数。 |
| `autoAnimate` | `boolean` | 否 | `false` | 是否自动动画，决定该分支的展示或交互行为。 |
| `type` | `'button' \| 'submit' \| 'reset'` | 否 | `'button'` | 原生输入或按钮的行为类型；按钮类型会影响表单提交。 |
| `className` | `string \| undefined` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `style` | `CSSProperties \| undefined` | 否 | `未指定` | 容器的 React 内联样式对象，尺寸、布局与 CSS 属性按 CSSProperties 传入。 |
| `onClick` | `MouseEventHandler<HTMLButtonElement> \| undefined` | 否 | `未指定` | 用户点击或通过键盘激活时触发的事件处理函数。 |
| `disabled` | `boolean \| undefined` | 否 | `false` | 是否禁用控件的用户交互。 |

**继承的原生属性：**

- `Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'type'>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**children 的真实接入：**

```tsx
children={<>创建工作流</>}
```

**style 的真实接入：**

```tsx
style={{ width: "100%", minHeight: 240 }}
```

**onClick 的真实接入：**

```tsx
onClick={() => setStatus('已点击：创建工作流')}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.type` | `"button"` | select | "button" / "submit" / "reset" | 调节结束后重建 |
| `t0.size` | `"lg"` | select | "sm" / "md" / "lg" | 调节结束后重建 |
| `t0.radius` | `12` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.tint` | `"#a6b39a"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.tintOpacity` | `0.22` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.blur` | `16` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.textColor` | `"#1f2d26"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.lineColor` | `"#faf7f0"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.baseColor` | `"#52604e"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.intensity` | `0.55` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.shineSize` | `9` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.shineFade` | `30` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.thickness` | `1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.glow` | `0.25` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.followMouse` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.proximity` | `160` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.speed` | `0.35` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.autoAnimate` | `false` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.disabled` | `false` | switch | 不限 ~ 不限 | 调节结束后重建 |

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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [按钮与操作](../effects/categories/actions.md)；否则直接完成当前组件。
