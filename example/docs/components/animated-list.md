# Animated List

数据与文件 · `animated-list` · 中文意图：动画列表 / 选择列表 / 列表入场

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

列表行依次入场且选择高亮平滑移动。

功能要求：保持内容的语义和可访问名称；只有真实可交互元素可进入焦点顺序。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/data/animated-list.tsx](../../src/demos/data/animated-list.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Components/AnimatedList/AnimatedList.tsx](../../.upstream/src/ts-default/Components/AnimatedList/AnimatedList.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Components/AnimatedList/AnimatedList.css](../../.upstream/src/ts-default/Components/AnimatedList/AnimatedList.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/animated-list.json](../../src/parameters/definitions/animated-list.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component animated-list
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Animated List 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Components/AnimatedList/AnimatedList';
import { palette } from '../../shared/demo-support';
import { useState } from "react";
// 列表数量超过容器可视区，可验证入场、滚动与选择。

export default function AnimatedListDemo() {
  const [status, setStatus] = useState("滚动列表，点击或使用方向键选择");

  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 400, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <div style={{ width: '100%', height: '100%' }}><div style={{ height: 330, width: 'min(100%, 460px)', margin: '0 auto', padding: 16 }}><Component


 onItemSelect={(_item, index) => setStatus('选中工作流 ' + (index + 1))} items={[{ "title": "工作流 1", "description": "资料检索", "meta": "1 项步骤" }, { "title": "工作流 2", "description": "代码审查", "meta": "2 项步骤" }, { "title": "工作流 3", "description": "报告整理", "meta": "3 项步骤" }, { "title": "工作流 4", "description": "资料检索", "meta": "4 项步骤" }, { "title": "工作流 5", "description": "代码审查", "meta": "5 项步骤" }, { "title": "工作流 6", "description": "报告整理", "meta": "6 项步骤" }, { "title": "工作流 7", "description": "资料检索", "meta": "7 项步骤" }, { "title": "工作流 8", "description": "代码审查", "meta": "8 项步骤" }, { "title": "工作流 9", "description": "报告整理", "meta": "9 项步骤" }]} theme={"light"} animation={"pop"} accentColor={"#52604e"} radius={16} gap={8} width={"100%"} maxHeight={300} showGradients={true} displayScrollbar={true} frame={true} enableArrowNavigation={true} initialSelectedIndex={-1} selectOnHover={true} loop={false} animateOnce={false} stagger={0.05} fadeSize={56} itemClassName={""}  /></div><p role="status" aria-live="polite" style={{ margin: '12px 20px', fontSize: 14, color: palette.muted }}>{status}</p></div>
    </div>
  );
}

```

### 完整组件 API

| 参数 | 类型 | 必填 | 上游默认值 | 中文说明 |
|---|---|---|---|---|
| `items` | `AnimatedListItem[]` | 否 | `DEFAULT_ITEMS` | 参与渲染或交互的条目列表，每项字段和可选内容按完整类型传入。 |
| `onItemSelect` | `(item: AnimatedListItem, index: number) => void` | 否 | `未指定` | 用户选择候选项时通知调用方。 |
| `renderItem` | `(item: AnimatedListItem, index: number, isSelected: boolean) => ReactNode` | 否 | `未指定` | 自定义每一项内容的渲染函数，接收条目及索引等参数并返回 ReactNode。 |
| `initialSelectedIndex` | `number` | 否 | `-1` | 初始选中索引，控制 animated list 的对应渲染或交互参数。 |
| `selectOnHover` | `boolean` | 否 | `true` | 是否选择悬停，决定该分支的展示或交互行为。 |
| `enableArrowNavigation` | `boolean` | 否 | `true` | 是否启用箭头导航，决定该分支的展示或交互行为。 |
| `loop` | `boolean` | 否 | `false` | 是否循环，决定该分支的展示或交互行为。 |
| `animation` | `Animation \| 'none'` | 否 | `'pop'` | 动画，控制 animated list 的对应渲染或交互参数。 |
| `animateOnce` | `boolean` | 否 | `false` | 是否动画仅一次，决定该分支的展示或交互行为。 |
| `stagger` | `number` | 否 | `0.05` | 错开，控制 animated list 的对应渲染或交互参数。 |
| `showGradients` | `boolean` | 否 | `true` | 是否显示渐变组，决定该分支的展示或交互行为。 |
| `fadeSize` | `number` | 否 | `56` | 淡出尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `displayScrollbar` | `boolean` | 否 | `true` | 是否显示滚动条，决定该分支的展示或交互行为。 |
| `frame` | `boolean` | 否 | `true` | 是否外框，决定该分支的展示或交互行为。 |
| `theme` | `'dark' \| 'light'` | 否 | `'dark'` | 主题，控制 animated list 的对应渲染或交互参数。 |
| `accentColor` | `string` | 否 | `'var(--al-ink)'` | 强调颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `radius` | `number` | 否 | `14` | 半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `gap` | `number` | 否 | `8` | 相邻单元、卡片或字符之间的间距；单位由组件实现定义。 |
| `width` | `number \| string` | 否 | `420` | 容器或效果的宽度，CSS 字符串与数值的支持以类型为准。 |
| `maxHeight` | `number \| string` | 否 | `440` | 最大高度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `itemClassName` | `string` | 否 | `''` | 条目类名名称，控制 animated list 的对应渲染或交互参数。 |
| `style` | `CSSProperties` | 否 | `未指定` | 容器的 React 内联样式对象，尺寸、布局与 CSS 属性按 CSSProperties 传入。 |

**items 的真实接入：**

```tsx
items={Array.from({ length: 9 }, (_, index) => ({ title: '工作流 ' + (index + 1), description: ['资料检索', '代码审查', '报告整理'][index % 3], meta: (index + 1) + ' 项步骤' }))}
```

**onItemSelect 的真实接入：**

```tsx
onItemSelect={(_item, index) => setStatus('选中工作流 ' + (index + 1))}
```

**renderItem 的真实接入：**

```tsx
renderItem={(item, index, isSelected) => ("示例")}
```

**style 的真实接入：**

```tsx
style={{ width: "100%", minHeight: 240 }}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，不改写上游 API。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.items` | `[{"title":"工作流 1","description":"资料检索","meta":"1 项步骤"},{"title":"工作流 2","description":"代码审查","meta":"2 项步骤"},{"title":"工作流 3","description":"报告整理","meta":"3 项步骤"},{"title":"工作流 4","description":"资料检索","meta":"4 项步骤"},{"title":"工作流 5","description":"代码审查","meta":"5 项步骤"},{"title":"工作流 6","description":"报告整理","meta":"6 项步骤"},{"title":"工作流 7","description":"资料检索","meta":"7 项步骤"},{"title":"工作流 8","description":"代码审查","meta":"8 项步骤"},{"title":"工作流 9","description":"报告整理","meta":"9 项步骤"}]` | json | 不限 ~ 不限 | 即时应用 |
| `t0.theme` | `"light"` | select | "dark" / "light" | 即时应用 |
| `t0.animation` | `"pop"` | select | "pop" / "slide" / "fade" / "none" | 即时应用 |
| `t0.accentColor` | `"#52604e"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.radius` | `16` | number | 不限 ~ 不限 | 即时应用 |
| `t0.gap` | `8` | number | 不限 ~ 不限 | 即时应用 |
| `t0.width` | `"100%"` | json | 不限 ~ 不限 | 即时应用 |
| `t0.maxHeight` | `300` | json | 不限 ~ 不限 | 即时应用 |
| `t0.showGradients` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.displayScrollbar` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.frame` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.enableArrowNavigation` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.initialSelectedIndex` | `-1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.selectOnHover` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.loop` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.animateOnce` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.stagger` | `0.05` | number | 不限 ~ 不限 | 即时应用 |
| `t0.fadeSize` | `56` | number | 不限 ~ 不限 | 即时应用 |
| `t0.itemClassName` | `""` | text | 不限 ~ 不限 | 即时应用 |

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

- 依赖清单：`@hugeicons/core-free-icons`、`@hugeicons/react`、`react`。安装前复用目标项目的兼容版本，不重复加载。
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
