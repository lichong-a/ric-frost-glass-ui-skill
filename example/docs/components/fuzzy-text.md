# Fuzzy Text

文字动效 · `fuzzy-text` · 中文意图：毛刺文字 / 抖动文字 / 噪点字

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

文字边缘产生可调节的细小噪动。

功能要求：保持内容的语义和可访问名称；只有真实可交互元素可进入焦点顺序。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/text/fuzzy-text.tsx](../../src/demos/text/fuzzy-text.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/TextAnimations/FuzzyText/FuzzyText.tsx](../../.upstream/src/ts-default/TextAnimations/FuzzyText/FuzzyText.tsx) |
| 单独 Props 记录 | [example/src/parameters/definitions/fuzzy-text.json](../../src/parameters/definitions/fuzzy-text.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component fuzzy-text
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Fuzzy Text 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/TextAnimations/FuzzyText/FuzzyText';
import { palette } from '../../shared/demo-support';

// 在Canvas字形上展示轻微扰动，悬停和点击提高强度。
// 此演示使用Canvas；确保容器拥有非零宽高。

export default function FuzzyTextDemo() {

  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 300, display: 'grid', placeItems: 'center', color: palette.ink, fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 650, padding: 24 }}>
      <Component

  fontSize={"clamp(64px, 12vw, 112px)"} color={"#52604e"} fontWeight={700} baseIntensity={0.04} hoverIntensity={0.2} enableHover={true} fuzzRange={24} fps={30} clickEffect={true} glitchMode={false} fontFamily={"inherit"} direction={"horizontal"} transitionDuration={0} glitchInterval={2000} glitchDuration={200} gradient={null} letterSpacing={0} >404</Component>
    </div>
  );
}

```

### 完整组件 API

| 参数 | 类型 | 必填 | 上游默认值 | 中文说明 |
|---|---|---|---|---|
| `children` | `React.ReactNode` | 是 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `fontSize` | `number \| string` | 否 | `'clamp(2rem, 8vw, 8rem)'` | 字体尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `fontWeight` | `string \| number` | 否 | `900` | 字体字重，控制 fuzzy text 的对应渲染或交互参数。 |
| `fontFamily` | `string` | 否 | `'inherit'` | 字体字族，控制 fuzzy text 的对应渲染或交互参数。 |
| `color` | `string` | 否 | `'#fff'` | 颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `enableHover` | `boolean` | 否 | `true` | 是否启用悬停，决定该分支的展示或交互行为。 |
| `baseIntensity` | `number` | 否 | `0.18` | 基础强度，控制 fuzzy text 的对应渲染或交互参数。 |
| `hoverIntensity` | `number` | 否 | `0.5` | 悬停强度，控制 fuzzy text 的对应渲染或交互参数。 |
| `fuzzRange` | `number` | 否 | `30` | 扰动范围范围，控制 fuzzy text 的对应渲染或交互参数。 |
| `fps` | `number` | 否 | `60` | 每秒帧数，控制 fuzzy text 的对应渲染或交互参数。 |
| `direction` | `'horizontal' \| 'vertical' \| 'both'` | 否 | `'horizontal'` | 方向，控制 fuzzy text 的对应渲染或交互参数。 |
| `transitionDuration` | `number` | 否 | `0` | 过渡时长，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `clickEffect` | `boolean` | 否 | `false` | 是否点击效果，决定该分支的展示或交互行为。 |
| `glitchMode` | `boolean` | 否 | `false` | 是否故障错位模式，决定该分支的展示或交互行为。 |
| `glitchInterval` | `number` | 否 | `2000` | 故障错位间隔，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `glitchDuration` | `number` | 否 | `200` | 故障错位时长，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `gradient` | `string[] \| null` | 否 | `null` | 渐变的有序数据集合；每一项按数组元素类型配置。 |
| `letterSpacing` | `number` | 否 | `0` | 字母间距，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |

**children 的真实接入：**

```tsx
children={<>404</>}
```

**gradient 的真实接入：**

```tsx
gradient={null}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，不改写上游 API。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.fontSize` | `"clamp(64px, 12vw, 112px)"` | json | 不限 ~ 不限 | 调节结束后重建 |
| `t0.color` | `"#52604e"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.fontWeight` | `700` | json | 不限 ~ 不限 | 调节结束后重建 |
| `t0.baseIntensity` | `0.04` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.hoverIntensity` | `0.2` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.enableHover` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.fuzzRange` | `24` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.fps` | `30` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.clickEffect` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.glitchMode` | `false` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.fontFamily` | `"inherit"` | text | 不限 ~ 不限 | 调节结束后重建 |
| `t0.direction` | `"horizontal"` | select | "horizontal" / "vertical" / "both" | 调节结束后重建 |
| `t0.transitionDuration` | `0` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.glitchInterval` | `2000` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.glitchDuration` | `200` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.gradient` | `null` | json | 不限 ~ 不限 | 调节结束后重建 |
| `t0.letterSpacing` | `0` | number | 不限 ~ 不限 | 调节结束后重建 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Wan 皮肤

- 标题按页面层级选择宋体或 UI 字体；正文保持无衬线。动画终态必须是完整、清晰、可复制的文字。
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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [文字动效](../categories/text.md)；否则直接完成当前组件。
