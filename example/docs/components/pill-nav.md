# Pill Nav

导航与菜单 · `pill-nav` · 中文意图：胶囊导航 / 滑动导航高亮

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-ric-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

导航的选中底板平滑滑动到目标项。

功能要求：保持真实链接/导航语义、当前项状态、键盘路径与可见焦点；展开菜单按基础浮层契约处理。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/navigation/pill-nav.tsx](../../src/demos/navigation/pill-nav.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Components/PillNav/PillNav.tsx](../../.upstream/src/ts-default/Components/PillNav/PillNav.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Components/PillNav/PillNav.css](../../.upstream/src/ts-default/Components/PillNav/PillNav.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/pill-nav.json](../../src/parameters/definitions/pill-nav.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component pill-nav
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Pill Nav 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Components/PillNav/PillNav';
import { palette } from '../../shared/demo-support';
import { MemoryRouter, useLocation } from "react-router-dom";
// MemoryRouter提供真实路由上下文；activeHref来自useLocation，不使用固定选中项。

export default function PillNavDemo() {
  function RoutedExample() { const location = useLocation(); return <div style={{ padding: 28, color: palette.ink }}><Component    activeHref={location.pathname}      logo={import.meta.env.BASE_URL + "media/agent-ric-mark.svg"} logoAlt={"Agent Ric"} items={[{ "label": "工作台", "href": "/overview" }, { "label": "智能体", "href": "/agents" }, { "label": "技能", "href": "/skills" }, { "label": "设置", "href": "/settings" }]} baseColor={"#52604e"} pillColor={"#faf7f0"} hoveredPillTextColor={"#faf7f0"} pillTextColor={"#1f2d26"} ease={"power2.out"} initialLoadAnimation={true}  /><p role="status" style={{ paddingTop: 190, color: palette.muted }}>当前示例路由：{location.pathname}</p></div>; }
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 400, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <MemoryRouter initialEntries={["/overview"]}><RoutedExample /></MemoryRouter>
    </div>
  );
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `logo` | `string` | 是 | `未指定` | 标志，控制 pill nav 的对应渲染或交互参数。 |
| `logoAlt` | `string` | 否 | `'Logo'` | 标志替代文字，控制 pill nav 的对应渲染或交互参数。 |
| `items` | `PillNavItem[]` | 是 | `未指定` | 参与渲染或交互的条目列表，每项字段和可选内容按完整类型传入。 |
| `activeHref` | `string` | 否 | `未指定` | 激活链接地址，控制 pill nav 的对应渲染或交互参数。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `ease` | `string` | 否 | `'power3.easeOut'` | 动画缓动名称或配置，按所用动画库的类型传入。 |
| `baseColor` | `string` | 否 | `'#fff'` | 基础颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `pillColor` | `string` | 否 | `'#120F17'` | 胶囊颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `hoveredPillTextColor` | `string` | 否 | `'#120F17'` | 悬停时胶囊文字颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `pillTextColor` | `string` | 否 | `baseColor` | 胶囊文字颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `onMobileMenuClick` | `() => void` | 否 | `未指定` | 移动端菜单点击时执行的回调；按签名接收事件或结果，调用方在函数中同步业务状态。 |
| `initialLoadAnimation` | `boolean` | 否 | `true` | 是否初始加载动画，决定该分支的展示或交互行为。 |

**items 的真实接入：**

```tsx
items={[{ label: '工作台', href: '/overview' }, { label: '智能体', href: '/agents' }, { label: '技能', href: '/skills' }, { label: '设置', href: '/settings' }]}
```

**onMobileMenuClick 的真实接入：**

```tsx
onMobileMenuClick={() => {}}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.logo` | `"@media/agent-ric-mark.svg"` | resource | 不限 ~ 不限 | 即时应用 |
| `t0.logoAlt` | `"Agent Ric"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.items` | `[{"label":"工作台","href":"/overview"},{"label":"智能体","href":"/agents"},{"label":"技能","href":"/skills"},{"label":"设置","href":"/settings"}]` | json | 不限 ~ 不限 | 即时应用 |
| `t0.baseColor` | `"#52604e"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.pillColor` | `"#faf7f0"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.hoveredPillTextColor` | `"#faf7f0"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.pillTextColor` | `"#1f2d26"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.ease` | `"power2.out"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.initialLoadAnimation` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Ric 皮肤

- 容器、状态色、边界与焦点使用 Agent Ric 规范；交互命中区不随视觉形变缩小。
- 组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。

## 5. 加载、动效与降级

本例实际配置：设备访问与音频行为以本例真实 Props 和显式回调为准。capabilities 是源码扫描提示，不能据此声称已请求相机、录音或播放音频。

- 依赖清单：`gsap`、`react`、`react-router-dom`。安装前复用目标项目的兼容版本，不重复加载。
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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [导航与菜单](../effects/categories/navigation.md)；否则直接完成当前组件。
