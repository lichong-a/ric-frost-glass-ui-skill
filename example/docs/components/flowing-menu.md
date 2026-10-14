# Flowing Menu

导航与菜单 · `flowing-menu` · 中文意图：流动菜单 / 跟随选中指示

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-ric-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

激活指示在菜单条目之间连续流动。

功能要求：保持真实链接/导航语义、当前项状态、键盘路径与可见焦点；展开菜单按基础浮层契约处理。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/navigation/flowing-menu.tsx](../../src/demos/navigation/flowing-menu.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Components/FlowingMenu/FlowingMenu.tsx](../../.upstream/src/ts-default/Components/FlowingMenu/FlowingMenu.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Components/FlowingMenu/FlowingMenu.css](../../.upstream/src/ts-default/Components/FlowingMenu/FlowingMenu.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/flowing-menu.json](../../src/parameters/definitions/flowing-menu.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component flowing-menu
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Flowing Menu 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import { useState } from 'react';
import Component from '../../../.upstream/src/ts-default/Components/FlowingMenu/FlowingMenu';




import styles from './flowing-menu.module.css';



export default function FlowingMenuDemo() {
  const [status, setStatus] = useState('悬停菜单项，展开图文流动；点击选择。');
  return (
    <section className={styles.stage} data-visual-demo="flowing-menu" onClickCapture={event => {
      const link = (event.target as Element).closest('a');
      if (link) { event.preventDefault(); setStatus('已选择：' + link.textContent?.trim()); }
    }}>
      <div className={styles.menu}>
        <Component
             items={[{ "link": "#canopy", "text": "林间漫游", "image": new URL("../../assets/restoration/prismatic-canopy.svg", import.meta.url).href }, { "link": "#mineral", "text": "矿物色谱", "image": new URL("../../assets/restoration/mineral-tide.svg", import.meta.url).href }, { "link": "#orbit", "text": "星际轨道", "image": new URL("../../assets/restoration/nocturne-orbit.svg", import.meta.url).href }, { "link": "#solar", "text": "太阳之境", "image": new URL("../../assets/restoration/solar-dunes.svg", import.meta.url).href }]} speed={18} textColor={"#e9f1ea"} bgColor={"#10251d"} marqueeBgColor={"#dce9d7"} marqueeTextColor={"#10251d"} borderColor={"#ffffff26"}  />
      </div>
      <p className={styles.status} role="status" aria-live="polite">{status}</p>
    </section>
  );
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `items` | `MenuItemData[]` | 否 | `[]` | 参与渲染或交互的条目列表，每项字段和可选内容按完整类型传入。 |
| `speed` | `number` | 否 | `15` | 动画、流动或滚动的推进速度；不同效果使用各自的速度尺度。 |
| `textColor` | `string` | 否 | `'#fff'` | 文字颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `bgColor` | `string` | 否 | `'#120F17'` | 背景颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `marqueeBgColor` | `string` | 否 | `'#fff'` | 跑马灯背景颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `marqueeTextColor` | `string` | 否 | `'#120F17'` | 跑马灯文字颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `borderColor` | `string` | 否 | `'#fff'` | 边框颜色，传入组件支持的 CSS 或着色器颜色格式。 |

**items 的真实接入：**

```tsx
items={items}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.items` | `[{"link":"#canopy","text":"林间漫游","image":"@asset/restoration/prismatic-canopy.svg"},{"link":"#mineral","text":"矿物色谱","image":"@asset/restoration/mineral-tide.svg"},{"link":"#orbit","text":"星际轨道","image":"@asset/restoration/nocturne-orbit.svg"},{"link":"#solar","text":"太阳之境","image":"@asset/restoration/solar-dunes.svg"}]` | json | 不限 ~ 不限 | 即时应用 |
| `t0.speed` | `18` | range | 3 ~ 40 s | 即时应用 |
| `t0.textColor` | `"#e9f1ea"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.bgColor` | `"#10251d"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.marqueeBgColor` | `"#dce9d7"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.marqueeTextColor` | `"#10251d"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.borderColor` | `"#ffffff26"` | color | 不限 ~ 不限 | 即时应用 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Ric 皮肤

- 容器、状态色、边界与焦点使用 Agent Ric 规范；交互命中区不随视觉形变缩小。
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
