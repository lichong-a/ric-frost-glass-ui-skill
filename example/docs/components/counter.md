# Counter

数据与文件 · `counter` · 中文意图：滚动数字 / 数字计数器

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

数值变化以可配置的滚动或缓动呈现。

功能要求：由真实 value / state 与回调驱动；操作可用键盘完成，不能只在动画内部保存业务状态。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/data/counter.tsx](../../src/demos/data/counter.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Components/Counter/Counter.tsx](../../.upstream/src/ts-default/Components/Counter/Counter.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Components/Counter/Counter.css](../../.upstream/src/ts-default/Components/Counter/Counter.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/counter.json](../../src/parameters/definitions/counter.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component counter
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Counter 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Components/Counter/Counter';
import { palette } from '../../shared/demo-support';
import { useState } from "react";
// 真实数字滚轮由外部state驱动，按钮改变数字而不是仅展示静态值。

export default function CounterDemo() {
  const [value, setValue] = useState(128);
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 340, position: 'relative', display: 'grid', placeItems: 'center', padding: 24, color: palette.ink }}>
      <div style={{ display: 'grid', gap: 24, placeItems: 'center' }}><Component value={value}            fontSize={68} padding={6} gap={4} borderRadius={12} textColor={"#1f2d26"} fontWeight={650} gradientHeight={18} gradientFrom={"#faf7f0"} gradientTo={"transparent"} containerStyle={{ "background": "#faf7f0", "padding": "12px 18px", "borderRadius": 12 }} digitStyle={{ "overflow": "hidden" }} horizontalPadding={8}  /><div style={{ display: 'flex', gap: 12 }}><button  className="aw-button" data-variant="secondary" onClick={() => setValue(number => Math.max(0, number - 1))} type={"button"} >减少</button><button  className="aw-button" data-variant="primary" onClick={() => setValue(number => number + 1)} type={"button"} >增加</button></div><p aria-live="polite" style={{ color: palette.muted }}>当前数值：{value}</p></div>
    </div>
  );
}

```

### 完整组件 API

| 参数 | 类型 | 必填 | 上游默认值 | 中文说明 |
|---|---|---|---|---|
| `value` | `number` | 是 | `未指定` | 当前受控值，由调用方维护并随交互回调更新。 |
| `fontSize` | `number` | 否 | `100` | 字体尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `padding` | `number` | 否 | `0` | 内边距，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `places` | `PlaceValue[]` | 否 | `[...value.toString()].map((ch, i, a) => {<br>    if (ch === '.') {<br>      return '.';<br>    }<br>    const dotIndex = a.indexOf('.');<br>    const isInteger = dotIndex === -1;<br><br>    const exponent = isInteger ? a.length - i - 1 : i < dotIndex ? dotIndex - i - 1 : -(i - dotIndex);<br><br>    return 10 ** exponent;<br>  })` | 计数位的有序数据集合；每一项按数组元素类型配置。 |
| `gap` | `number` | 否 | `8` | 相邻单元、卡片或字符之间的间距；单位由组件实现定义。 |
| `borderRadius` | `number` | 否 | `4` | 边框半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `horizontalPadding` | `number` | 否 | `8` | 水平内边距，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `textColor` | `string` | 否 | `'inherit'` | 文字颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `fontWeight` | `React.CSSProperties['fontWeight']` | 否 | `'inherit'` | 字体字重的结构化配置；对象字段按完整类型传入并由组件读取。 |
| `containerStyle` | `React.CSSProperties` | 否 | `未指定` | 容器样式的结构化配置；对象字段按完整类型传入并由组件读取。 |
| `counterStyle` | `React.CSSProperties` | 否 | `未指定` | 计数器样式的结构化配置；对象字段按完整类型传入并由组件读取。 |
| `digitStyle` | `React.CSSProperties` | 否 | `未指定` | 数字字符样式的结构化配置；对象字段按完整类型传入并由组件读取。 |
| `gradientHeight` | `number` | 否 | `16` | 渐变高度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `gradientFrom` | `string` | 否 | `'black'` | 渐变起始，控制 counter 的对应渲染或交互参数。 |
| `gradientTo` | `string` | 否 | `'transparent'` | 渐变目标，控制 counter 的对应渲染或交互参数。 |
| `topGradientStyle` | `React.CSSProperties` | 否 | `defaultTopGradientStyle` | 顶部渐变样式的结构化配置；对象字段按完整类型传入并由组件读取。 |
| `bottomGradientStyle` | `React.CSSProperties` | 否 | `defaultBottomGradientStyle` | 底部渐变样式的结构化配置；对象字段按完整类型传入并由组件读取。 |
| `button · t1.type` | `"button" \| "reset" \| "submit" \| undefined` | 否 | `未指定` | 原生输入或按钮的行为类型；按钮类型会影响表单提交。 |
| `button · t1.className` | `string \| undefined` | 否 | `未指定` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `button · t1.data-variant` | `any` | 否 | `未指定` | 示例在 DOM 上使用的 variant 数据标记，供局部样式或状态定位读取。 |
| `button · t1.onClick` | `MouseEventHandler<HTMLButtonElement> \| undefined` | 否 | `未指定` | 用户点击或通过键盘激活时触发的事件处理函数。 |
| `button · t1.children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |

**继承的原生属性：**

- `DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**places 的真实接入：**

```tsx
places={[1]}
```

**fontWeight 的真实接入：**

```tsx
fontWeight={650}
```

**containerStyle 的真实接入：**

```tsx
containerStyle={{ background: palette.ivory, padding: '12px 18px', borderRadius: 12 }}
```

**counterStyle 的真实接入：**

```tsx
counterStyle={{ width: "100%", minHeight: 240 }}
```

**digitStyle 的真实接入：**

```tsx
digitStyle={{ overflow: 'hidden' }}
```

**topGradientStyle 的真实接入：**

```tsx
topGradientStyle={{ width: "100%", minHeight: 240 }}
```

**bottomGradientStyle 的真实接入：**

```tsx
bottomGradientStyle={{ width: "100%", minHeight: 240 }}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，不改写上游 API。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.fontSize` | `68` | number | 不限 ~ 不限 | 即时应用 |
| `t0.padding` | `6` | number | 不限 ~ 不限 | 即时应用 |
| `t0.gap` | `4` | number | 不限 ~ 不限 | 即时应用 |
| `t0.borderRadius` | `12` | number | 不限 ~ 不限 | 即时应用 |
| `t0.textColor` | `"#1f2d26"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.fontWeight` | `650` | number | 不限 ~ 不限 | 即时应用 |
| `t0.gradientHeight` | `18` | number | 不限 ~ 不限 | 即时应用 |
| `t0.gradientFrom` | `"#faf7f0"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.gradientTo` | `"transparent"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.containerStyle` | `{"background":"#faf7f0","padding":"12px 18px","borderRadius":12}` | json | 不限 ~ 不限 | 即时应用 |
| `t0.digitStyle` | `{"overflow":"hidden"}` | json | 不限 ~ 不限 | 即时应用 |
| `t0.horizontalPadding` | `8` | number | 不限 ~ 不限 | 即时应用 |
| `t1.type` | `"button"` | select | "button" / "reset" / "submit" | 即时应用 |
| `t2.type` | `"button"` | select | "button" / "reset" / "submit" | 即时应用 |
| `state.value` | `128` | number | 不限 ~ 不限 | 即时应用；原组件回调同步受控值 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Wan 皮肤

- 容器、状态色、边界与焦点使用 Agent Wan 规范；交互命中区不随视觉形变缩小。
- 组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。

## 5. 加载、动效与降级

本例实际配置：设备访问与音频行为以本例真实 Props 和显式回调为准。capabilities 是源码扫描提示，不能据此声称已请求相机、录音或播放音频。

- 依赖清单：`motion`、`react`。安装前复用目标项目的兼容版本，不重复加载。
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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [数据与文件](../categories/data.md)；否则直接完成当前组件。
