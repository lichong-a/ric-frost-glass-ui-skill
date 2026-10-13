# Click Spark

指针与轨迹 · `click-spark` · 中文意图：点击火花 / 点击粒子

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

点击位置触发短促粒子扩散。

功能要求：装饰层不拦截业务点击、不隐藏真实指针，不成为完成业务的唯一操作方式。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/pointer/click-spark.tsx](../../src/demos/pointer/click-spark.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Animations/ClickSpark/ClickSpark.tsx](../../.upstream/src/ts-default/Animations/ClickSpark/ClickSpark.tsx) |
| 单独 Props 记录 | [example/src/parameters/definitions/click-spark.json](../../src/parameters/definitions/click-spark.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component click-spark
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Click Spark 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Animations/ClickSpark/ClickSpark';
import { palette } from '../../shared/demo-support';
import { useState } from "react";
// 真实点击坐标产生粒子火花，按钮计数验证交互没有被覆盖层吞掉。
// 此演示使用Canvas；确保容器拥有非零宽高。

export default function ClickSparkDemo() {
  const [count, setCount] = useState(0);
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component
   sparkColor={"#52604e"} sparkSize={7} sparkRadius={20} sparkCount={7} duration={350} easing={"ease-out"} extraScale={1} ><div style={{ width: "100%", minHeight: 320, display: "grid", placeItems: "center" }}><button className="aw-button" data-variant="primary"  onClick={() => setCount(value => value + 1)} type={"button"} >点击产生火花 · {count}</button></div></Component>
    </div>
  );
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `sparkColor` | `string` | 否 | `'#fff'` | 火花颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `sparkSize` | `number` | 否 | `10` | 火花尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `sparkRadius` | `number` | 否 | `15` | 火花半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `sparkCount` | `number` | 否 | `8` | 火花数量，控制 click spark 的对应渲染或交互参数。 |
| `duration` | `number` | 否 | `400` | 一次动画或过渡的持续时长，时间单位以组件实现和示例为准。 |
| `easing` | `'linear' \| 'ease-in' \| 'ease-out' \| 'ease-in-out'` | 否 | `'ease-out'` | 动画进度的缓动曲线名称或函数，按类型传入。 |
| `extraScale` | `number` | 否 | `1.0` | 额外缩放，控制 click spark 的对应渲染或交互参数。 |
| `children` | `React.ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `button.className` | `string \| undefined` | 否 | `未指定` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `button.data-variant` | `any` | 否 | `未指定` | 示例在 DOM 上使用的 variant 数据标记，供局部样式或状态定位读取。 |
| `button.type` | `"button" \| "reset" \| "submit" \| undefined` | 否 | `未指定` | 原生输入或按钮的行为类型；按钮类型会影响表单提交。 |
| `button.onClick` | `MouseEventHandler<HTMLButtonElement> \| undefined` | 否 | `未指定` | 用户点击或通过键盘激活时触发的事件处理函数。 |
| `button.children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |

**继承的原生属性：**

- `DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**children 的真实接入：**

```tsx
children={<><div style={{ width: "100%", minHeight: 320, display: "grid", placeItems: "center" }}><button className="aw-button" data-variant="primary" type="button" onClick={() => setCount(value => value + 1)}>点击产生火花 · {count}</button></div></>}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.sparkColor` | `"#52604e"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.sparkSize` | `7` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.sparkRadius` | `20` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.sparkCount` | `7` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.duration` | `350` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.easing` | `"ease-out"` | select | "linear" / "ease-in" / "ease-out" / "ease-in-out" | 调节结束后重建 |
| `t0.extraScale` | `1` | number | 不限 ~ 不限 | 调节结束后重建 |
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
