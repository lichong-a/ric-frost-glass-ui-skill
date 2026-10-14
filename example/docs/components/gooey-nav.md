# Gooey Nav

导航与菜单 · `gooey-nav` · 中文意图：液态导航 / 融合选中块

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-ric-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

选中底板以液态融合方式移动。

功能要求：保持真实链接/导航语义、当前项状态、键盘路径与可见焦点；展开菜单按基础浮层契约处理。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/navigation/gooey-nav.tsx](../../src/demos/navigation/gooey-nav.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Components/GooeyNav/GooeyNav.tsx](../../.upstream/src/ts-default/Components/GooeyNav/GooeyNav.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Components/GooeyNav/GooeyNav.css](../../.upstream/src/ts-default/Components/GooeyNav/GooeyNav.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/gooey-nav.json](../../src/parameters/definitions/gooey-nav.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component gooey-nav
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Gooey Nav 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Components/GooeyNav/GooeyNav';
import { palette } from '../../shared/demo-support';
import { useState } from "react";
// 导航选中状态由真实组件维护，事件反馈当前名称。
// 此演示需要可用WebGL上下文；不支持时应显示能力提示，不声称效果已运行。

export default function GooeyNavDemo() {
  const [status, setStatus] = useState("点击切换导航项，观察黏性高亮过渡");

  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 400, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <div style={{ width: '100%', height: '100%' }}><div style={{ height: 300, display: 'grid', placeItems: 'center' }}><Component




onChange={(_index, item) => setStatus('当前导航：' + item.label)} items={[{ "label": "工作台" }, { "label": "智能体" }, { "label": "技能" }, { "label": "设置" }]} initialActiveIndex={0} theme={"light"} size={"md"} frame={true} color={"#52604e"} activeTextColor={"#faf7f0"} colors={["#52604e", "#a6b39a", "#c3ae88"]} particleCount={8} spread={28} animationTime={450} timeVariance={120} gooeyness={0.4} wobble={0.3} hoverEffect={true}  /></div><p role="status" aria-live="polite" style={{ margin: '12px 20px', fontSize: 14, color: palette.muted }}>{status}</p></div>
    </div>
  );
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `items` | `GooeyNavItem[]` | 否 | `DEFAULT_ITEMS` | 参与渲染或交互的条目列表，每项字段和可选内容按完整类型传入。 |
| `initialActiveIndex` | `number` | 否 | `0` | 初始激活索引，控制 gooey nav 的对应渲染或交互参数。 |
| `activeIndex` | `number` | 否 | `innerIndex` | 激活索引，控制 gooey nav 的对应渲染或交互参数。 |
| `onChange` | `(index: number, item: GooeyNavItem) => void` | 否 | `未指定` | 用户改变值或条目顺序时通知调用方；回调参数类型就是应写回的值或原生事件。 |
| `theme` | `Palette` | 否 | `'dark'` | 主题，控制 gooey nav 的对应渲染或交互参数。 |
| `color` | `string` | 否 | `PILLS[palette].color` | 颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `activeTextColor` | `string` | 否 | `contrastInk(pillRgb)` | 激活文字颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `colors` | `string[]` | 否 | `[]` | 颜色组的有序数据集合；每一项按数组元素类型配置。 |
| `size` | `Size` | 否 | `'md'` | 尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `frame` | `boolean` | 否 | `true` | 是否外框，决定该分支的展示或交互行为。 |
| `animationTime` | `number` | 否 | `600` | 动画时间，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `particleCount` | `number` | 否 | `15` | 粒子数量，控制 gooey nav 的对应渲染或交互参数。 |
| `timeVariance` | `number` | 否 | `300` | 时间差异，控制 gooey nav 的对应渲染或交互参数。 |
| `spread` | `number` | 否 | `56` | 展开间距，控制 gooey nav 的对应渲染或交互参数。 |
| `gooeyness` | `number` | 否 | `0.5` | 粘连程度，控制 gooey nav 的对应渲染或交互参数。 |
| `wobble` | `number` | 否 | `0.5` | 摇晃，控制 gooey nav 的对应渲染或交互参数。 |
| `hoverEffect` | `boolean` | 否 | `true` | 是否悬停效果，决定该分支的展示或交互行为。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `style` | `CSSProperties` | 否 | `未指定` | 容器的 React 内联样式对象，尺寸、布局与 CSS 属性按 CSSProperties 传入。 |

**items 的真实接入：**

```tsx
items={['工作台', '智能体', '技能', '设置'].map(label => ({ label }))}
```

**onChange 的真实接入：**

```tsx
onChange={(_index, item) => setStatus('当前导航：' + item.label)}
```

**colors 的真实接入：**

```tsx
colors={[palette.primary, palette.sage, palette.sand]}
```

**style 的真实接入：**

```tsx
style={{ width: "100%", minHeight: 240 }}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.items` | `[{"label":"工作台"},{"label":"智能体"},{"label":"技能"},{"label":"设置"}]` | json | 不限 ~ 不限 | 调节结束后重建 |
| `t0.initialActiveIndex` | `0` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.theme` | `"light"` | select | "dark" / "light" | 调节结束后重建 |
| `t0.size` | `"md"` | select | "sm" / "md" / "lg" | 调节结束后重建 |
| `t0.frame` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.color` | `"#52604e"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.activeTextColor` | `"#faf7f0"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.colors` | `["#52604e","#a6b39a","#c3ae88"]` | json | 不限 ~ 不限 | 调节结束后重建 |
| `t0.particleCount` | `8` | range | 1 ~ 128 | 调节结束后重建 |
| `t0.spread` | `28` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.animationTime` | `450` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.timeVariance` | `120` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.gooeyness` | `0.4` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.wobble` | `0.3` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.hoverEffect` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |

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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [导航与菜单](../effects/categories/navigation.md)；否则直接完成当前组件。
