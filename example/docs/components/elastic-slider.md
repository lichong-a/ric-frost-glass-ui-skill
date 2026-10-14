# Elastic Slider

表单与选择 · `elastic-slider` · 中文意图：弹性滑块 / 弹簧滑块

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-ric-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

滑块拉伸后通过弹性运动归位。

功能要求：由真实 value / state 与回调驱动；操作可用键盘完成，不能只在动画内部保存业务状态。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/form/elastic-slider.tsx](../../src/demos/form/elastic-slider.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Components/ElasticSlider/ElasticSlider.tsx](../../.upstream/src/ts-default/Components/ElasticSlider/ElasticSlider.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Components/ElasticSlider/ElasticSlider.css](../../.upstream/src/ts-default/Components/ElasticSlider/ElasticSlider.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/elastic-slider.json](../../src/parameters/definitions/elastic-slider.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component elastic-slider
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Elastic Slider 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Components/ElasticSlider/ElasticSlider';
import { palette } from '../../shared/demo-support';
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { Volume1, Volume2 } from "lucide-react";
// 使用ChakraProvider(defaultSystem)满足上游Icon上下文；此组件仅提供内部值，没有onChange Props，不伪造受控接口。

export default function ElasticSliderDemo() {

  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 340, position: 'relative', display: 'grid', placeItems: 'center', padding: 24, color: palette.ink }}>
      <ChakraProvider value={defaultSystem}><style>{`.slider-container { color: #52604e; }.slider-range { background-color: #52604e; }.slider-track { background-color: #c3c8b8; }.value-indicator,.icon { color: #5c6259; }`}</style><div style={{ width: '100%', minHeight: 300, display: 'grid', placeItems: 'center', color: palette.ink }}><Component      leftIcon={<Volume1 size={22} />} rightIcon={<Volume2 size={22} />} startingValue={0} defaultValue={45} maxValue={100} isStepped={true} stepSize={5}  /><p style={{ fontSize: 14, color: palette.muted }}>拖动滑块，观察两端弹性与组件内置数值</p></div></ChakraProvider>
    </div>
  );
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `defaultValue` | `number` | 否 | `50` | 非受控模式的初始值；挂载后更新通常通过内部状态或受控 value 完成。 |
| `startingValue` | `number` | 否 | `0` | 开始值，控制 elastic slider 的对应渲染或交互参数。 |
| `maxValue` | `number` | 否 | `100` | 最大值，控制 elastic slider 的对应渲染或交互参数。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `isStepped` | `boolean` | 否 | `false` | 是否阶梯，决定该分支的展示或交互行为。 |
| `stepSize` | `number` | 否 | `1` | 步进尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `leftIcon` | `React.ReactNode` | 否 | `<Icon as={RiVolumeDownFill} />` | 左侧图标，控制 elastic slider 的对应渲染或交互参数。 |
| `rightIcon` | `React.ReactNode` | 否 | `<Icon as={RiVolumeUpFill} />` | 右侧图标，控制 elastic slider 的对应渲染或交互参数。 |

**leftIcon 的真实接入：**

```tsx
leftIcon={<Volume1 size={22} />}
```

**rightIcon 的真实接入：**

```tsx
rightIcon={<Volume2 size={22} />}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.startingValue` | `0` | number | 不限 ~ 不限 | 即时应用 |
| `t0.defaultValue` | `45` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.maxValue` | `100` | number | 不限 ~ 不限 | 即时应用 |
| `t0.isStepped` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.stepSize` | `5` | number | 不限 ~ 不限 | 即时应用 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Ric 皮肤

- 容器、状态色、边界与焦点使用 Agent Ric 规范；交互命中区不随视觉形变缩小。
- 组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。

## 5. 加载、动效与降级

本例实际配置：设备访问与音频行为以本例真实 Props 和显式回调为准。capabilities 是源码扫描提示，不能据此声称已请求相机、录音或播放音频。

- 依赖清单：`@chakra-ui/react`、`motion`、`react`、`react-icons`。安装前复用目标项目的兼容版本，不重复加载。
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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [表单与选择](../effects/categories/form.md)；否则直接完成当前组件。
