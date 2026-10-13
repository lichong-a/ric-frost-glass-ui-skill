# Card Nav

导航与菜单 · `card-nav` · 中文意图：卡片导航 / 导航展开面板

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

导航展开卡片分区并显示子链接。

功能要求：保持真实链接/导航语义、当前项状态、键盘路径与可见焦点；展开菜单按基础浮层契约处理。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/navigation/card-nav.tsx](../../src/demos/navigation/card-nav.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Components/CardNav/CardNav.tsx](../../.upstream/src/ts-default/Components/CardNav/CardNav.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Components/CardNav/CardNav.css](../../.upstream/src/ts-default/Components/CardNav/CardNav.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/card-nav.json](../../src/parameters/definitions/card-nav.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component card-nav
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Card Nav 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Components/CardNav/CardNav';
import { palette } from '../../shared/demo-support';
import { useState } from "react";
// 保留真实卡片导航展开与键盘菜单按钮，链接在本示例中更新结果提示。

export default function CardNavDemo() {
  const [status, setStatus] = useState('点击菜单按钮展开三个导航卡片');
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 400, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <div style={{ position: 'relative', width: '100%', maxWidth: 800, height: 420 }} onClickCapture={event => { const target = event.target as Element; const link = target.closest('a'); if (link) { event.preventDefault(); setStatus('已选择：' + link.textContent); } else if (target.closest('.card-nav-cta-button')) { setStatus('开始使用按钮已点击'); } }}><Component         logo={import.meta.env.BASE_URL + "media/agent-wan-mark.svg"} logoAlt={"Agent Wan"} items={[{ "label": "构建", "bgColor": "#e8e4d7", "textColor": "#1f2d26", "links": [{ "label": "智能体", "href": "#agents", "ariaLabel": "选择智能体" }, { "label": "工作流", "href": "#flows", "ariaLabel": "选择工作流" }] }, { "label": "资源", "bgColor": "#a6b39a", "textColor": "#1f2d26", "links": [{ "label": "技能", "href": "#skills", "ariaLabel": "选择技能" }, { "label": "知识", "href": "#knowledge", "ariaLabel": "选择知识" }] }, { "label": "管理", "bgColor": "#faf7f0", "textColor": "#1f2d26", "links": [{ "label": "空间", "href": "#spaces", "ariaLabel": "选择空间" }, { "label": "设置", "href": "#settings", "ariaLabel": "选择设置" }] }]} baseColor={"#faf7f0"} menuColor={"#1f2d26"} buttonBgColor={"#52604e"} buttonTextColor={"#faf7f0"} ease={"power3.out"}  /><p role="status" aria-live="polite" style={{ position: 'absolute', left: 24, bottom: 12, color: palette.muted }}>{status}</p></div>
    </div>
  );
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `logo` | `string` | 是 | `未指定` | 标志，控制 card nav 的对应渲染或交互参数。 |
| `logoAlt` | `string` | 否 | `'Logo'` | 标志替代文字，控制 card nav 的对应渲染或交互参数。 |
| `items` | `CardNavItem[]` | 是 | `[]` | 参与渲染或交互的条目列表，每项字段和可选内容按完整类型传入。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `ease` | `string` | 否 | `'power3.out'` | 动画缓动名称或配置，按所用动画库的类型传入。 |
| `baseColor` | `string` | 否 | `'#fff'` | 基础颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `menuColor` | `string` | 否 | `'#000'` | 菜单颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `buttonBgColor` | `string` | 否 | `未指定` | 按钮背景颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `buttonTextColor` | `string` | 否 | `未指定` | 按钮文字颜色，传入组件支持的 CSS 或着色器颜色格式。 |

**items 的真实接入：**

```tsx
items={[{ label: '构建', bgColor: palette.canvas, textColor: palette.ink, links: [{ label: '智能体', href: '#agents', ariaLabel: '选择智能体' }, { label: '工作流', href: '#flows', ariaLabel: '选择工作流' }] }, { label: '资源', bgColor: palette.sage, textColor: palette.ink, links: [{ label: '技能', href: '#skills', ariaLabel: '选择技能' }, { label: '知识', href: '#knowledge', ariaLabel: '选择知识' }] }, { label: '管理', bgColor: palette.ivory, textColor: palette.ink, links: [{ label: '空间', href: '#spaces', ariaLabel: '选择空间' }, { label: '设置', href: '#settings', ariaLabel: '选择设置' }] }]}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.logo` | `"@media/agent-wan-mark.svg"` | resource | 不限 ~ 不限 | 即时应用 |
| `t0.logoAlt` | `"Agent Wan"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.items` | `[{"label":"构建","bgColor":"#e8e4d7","textColor":"#1f2d26","links":[{"label":"智能体","href":"#agents","ariaLabel":"选择智能体"},{"label":"工作流","href":"#flows","ariaLabel":"选择工作流"}]},{"label":"资源","bgColor":"#a6b39a","textColor":"#1f2d26","links":[{"label":"技能","href":"#skills","ariaLabel":"选择技能"},{"label":"知识","href":"#knowledge","ariaLabel":"选择知识"}]},{"label":"管理","bgColor":"#faf7f0","textColor":"#1f2d26","links":[{"label":"空间","href":"#spaces","ariaLabel":"选择空间"},{"label":"设置","href":"#settings","ariaLabel":"选择设置"}]}]` | json | 不限 ~ 不限 | 即时应用 |
| `t0.baseColor` | `"#faf7f0"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.menuColor` | `"#1f2d26"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.buttonBgColor` | `"#52604e"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.buttonTextColor` | `"#faf7f0"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.ease` | `"power3.out"` | text | 不限 ~ 不限 | 即时应用 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Wan 皮肤

- 容器、状态色、边界与焦点使用 Agent Wan 规范；交互命中区不随视觉形变缩小。
- 组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。

## 5. 加载、动效与降级

本例实际配置：设备访问与音频行为以本例真实 Props 和显式回调为准。capabilities 是源码扫描提示，不能据此声称已请求相机、录音或播放音频。

- 依赖清单：`gsap`、`react`、`react-icons`。安装前复用目标项目的兼容版本，不重复加载。
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
