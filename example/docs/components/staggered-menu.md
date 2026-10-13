# Staggered Menu

导航与菜单 · `staggered-menu` · 中文意图：交错菜单 / 菜单逐项展开

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

菜单按顺序展示和退出各选项。

功能要求：保持真实链接/导航语义、当前项状态、键盘路径与可见焦点；展开菜单按基础浮层契约处理。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/navigation/staggered-menu.tsx](../../src/demos/navigation/staggered-menu.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Components/StaggeredMenu/StaggeredMenu.tsx](../../.upstream/src/ts-default/Components/StaggeredMenu/StaggeredMenu.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Components/StaggeredMenu/StaggeredMenu.css](../../.upstream/src/ts-default/Components/StaggeredMenu/StaggeredMenu.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/staggered-menu.json](../../src/parameters/definitions/staggered-menu.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component staggered-menu
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Staggered Menu 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import { useState } from 'react';
import Component from '../../../.upstream/src/ts-default/Components/StaggeredMenu/StaggeredMenu';

import styles from './staggered-menu.module.css';

export default function StaggeredMenuDemo() {
  const [status, setStatus] = useState('点击 Menu 展开导航。');
  return (
    <section className={styles.stage} data-visual-demo="staggered-menu"
      onClickCapture={event => {
        const link = (event.target as Element).closest('a');
        if (link) { event.preventDefault(); setStatus('已选择：' + link.textContent); }
      }}>
      <div className={styles.intro}><span className={styles.eyebrow}>STAGGERED MENU</span><h2 className={styles.title}>一层一层，进入下一站。</h2><p className={styles.description}>打开菜单，查看分层遮罩和错峰入场。</p></div>
      <Component


        onMenuOpen={() => setStatus('分层菜单已展开。')}
        onMenuClose={() => setStatus('分层菜单已收起。')} position={"right"} items={[{ "label": "工作台", "ariaLabel": "选择工作台", "link": "#section-0" }, { "label": "智能体", "ariaLabel": "选择智能体", "link": "#section-1" }, { "label": "技能", "ariaLabel": "选择技能", "link": "#section-2" }, { "label": "设置", "ariaLabel": "选择设置", "link": "#section-3" }]} socialItems={[]} displaySocials={false} displayItemNumbering={true} logoUrl={import.meta.env.BASE_URL + "media/agent-wan-mark.svg"} menuButtonColor={"#354c41"} openMenuButtonColor={"#354c41"} colors={["#b4cabc", "#5b876c"]} accentColor={"#3f6651"} closeOnClickAway={true} isFixed={false} changeMenuColorOnOpen={true}  />
      <p className={styles.status} role="status" aria-live="polite">{status}</p>
    </section>
  );
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `position` | `'left' \| 'right'` | 否 | `'right'` | 位置，控制 staggered menu 的对应渲染或交互参数。 |
| `colors` | `string[]` | 否 | `['#B497CF', '#5227FF']` | 颜色组的有序数据集合；每一项按数组元素类型配置。 |
| `items` | `StaggeredMenuItem[]` | 否 | `[]` | 参与渲染或交互的条目列表，每项字段和可选内容按完整类型传入。 |
| `socialItems` | `StaggeredMenuSocialItem[]` | 否 | `[]` | 社交入口条目的有序数据集合；每一项按数组元素类型配置。 |
| `displaySocials` | `boolean` | 否 | `true` | 是否显示社交入口组，决定该分支的展示或交互行为。 |
| `displayItemNumbering` | `boolean` | 否 | `true` | 是否显示条目编号，决定该分支的展示或交互行为。 |
| `className` | `string` | 否 | `未指定` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `logoUrl` | `string` | 否 | `'/src/assets/logos/reactbits-gh-white.svg'` | 标志地址，控制 staggered menu 的对应渲染或交互参数。 |
| `menuButtonColor` | `string` | 否 | `'#fff'` | 菜单按钮颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `openMenuButtonColor` | `string` | 否 | `'#fff'` | 打开菜单按钮颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `accentColor` | `string` | 否 | `'#5227FF'` | 强调颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `changeMenuColorOnOpen` | `boolean` | 否 | `true` | 是否改变菜单颜色打开，决定该分支的展示或交互行为。 |
| `closeOnClickAway` | `boolean` | 否 | `true` | 是否关闭点击移开，决定该分支的展示或交互行为。 |
| `onMenuOpen` | `() => void` | 否 | `未指定` | 菜单打开时通知调用方。 |
| `onMenuClose` | `() => void` | 否 | `未指定` | 菜单关闭时通知调用方。 |
| `isFixed` | `boolean` | 否 | `false` | 是否固定，决定该分支的展示或交互行为。 |

**colors 的真实接入：**

```tsx
colors={['#b4cabc', '#5b876c']}
```

**items 的真实接入：**

```tsx
items={['工作台', '智能体', '技能', '设置'].map((label, index) => ({
          label, ariaLabel: '选择' + label, link: '#section-' + index,
        }))}
```

**socialItems 的真实接入：**

```tsx
socialItems={[]}
```

**onMenuOpen 的真实接入：**

```tsx
onMenuOpen={() => setStatus('分层菜单已展开。')}
```

**onMenuClose 的真实接入：**

```tsx
onMenuClose={() => setStatus('分层菜单已收起。')}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.position` | `"right"` | select | "left" / "right" | 即时应用 |
| `t0.items` | `[{"label":"工作台","ariaLabel":"选择工作台","link":"#section-0"},{"label":"智能体","ariaLabel":"选择智能体","link":"#section-1"},{"label":"技能","ariaLabel":"选择技能","link":"#section-2"},{"label":"设置","ariaLabel":"选择设置","link":"#section-3"}]` | json | 不限 ~ 不限 | 即时应用 |
| `t0.socialItems` | `[]` | json | 不限 ~ 不限 | 即时应用 |
| `t0.displaySocials` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.displayItemNumbering` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.logoUrl` | `"@media/agent-wan-mark.svg"` | resource | 不限 ~ 不限 | 即时应用 |
| `t0.menuButtonColor` | `"#354c41"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.openMenuButtonColor` | `"#354c41"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.colors` | `["#b4cabc","#5b876c"]` | json | 不限 ~ 不限 | 即时应用 |
| `t0.accentColor` | `"#3f6651"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.closeOnClickAway` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.isFixed` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.changeMenuColorOnOpen` | `true` | switch | 不限 ~ 不限 | 即时应用 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Wan 皮肤

- 容器、状态色、边界与焦点使用 Agent Wan 规范；交互命中区不随视觉形变缩小。
- 组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。

## 5. 加载、动效与降级

本例实际配置：设备访问与音频行为以本例真实 Props 和显式回调为准。capabilities 是源码扫描提示，不能据此声称已请求相机、录音或播放音频。

- 依赖清单：`gsap`、`react`。安装前复用目标项目的兼容版本，不重复加载。
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
