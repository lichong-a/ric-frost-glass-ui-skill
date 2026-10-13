# Infinite Menu

导航与菜单 · `infinite-menu` · 中文意图：球形菜单 / 无限图片菜单

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

可拖拽图片球体吸附到前方并显示名称。

功能要求：保持真实链接/导航语义、当前项状态、键盘路径与可见焦点；展开菜单按基础浮层契约处理。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/navigation/infinite-menu.tsx](../../src/demos/navigation/infinite-menu.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Components/InfiniteMenu/InfiniteMenu.tsx](../../.upstream/src/ts-default/Components/InfiniteMenu/InfiniteMenu.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Components/InfiniteMenu/InfiniteMenu.css](../../.upstream/src/ts-default/Components/InfiniteMenu/InfiniteMenu.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/infinite-menu.json](../../src/parameters/definitions/infinite-menu.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component infinite-menu
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Infinite Menu 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Components/InfiniteMenu/InfiniteMenu';
import { LABELS, palette } from '../../shared/demo-support';
import { useState } from "react";
// 保留真实可旋转球面图片网格，减少贴片数量以控制预览负担。
// 此演示需要可用WebGL上下文；不支持时应显示能力提示，不声称效果已运行。

export default function InfiniteMenuDemo() {
  const [status, setStatus] = useState("拖动球面网格，选择正前方素材");

  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 440, position: 'relative', overflow: 'hidden' }}>
      <div style={{ width: '100%', height: '100%' }}><div style={{ height: 380, position: 'relative', overflow: 'hidden' }}><Component



onActiveChange={(_item, index) => setStatus('当前素材：' + LABELS[index % LABELS.length])}
onItemClick={(_item, index) => setStatus('选择素材：' + LABELS[index % LABELS.length])} items={[{ "image": import.meta.env.BASE_URL + "media/scene-1.svg", "title": "山雾", "description": "自然色图形 1" }, { "image": import.meta.env.BASE_URL + "media/scene-2.svg", "title": "茶庭", "description": "自然色图形 2" }, { "image": import.meta.env.BASE_URL + "media/scene-3.svg", "title": "沙洲", "description": "自然色图形 3" }, { "image": import.meta.env.BASE_URL + "media/scene-4.svg", "title": "静水", "description": "自然色图形 4" }, { "image": import.meta.env.BASE_URL + "media/scene-5.svg", "title": "林间", "description": "自然色图形 5" }, { "image": import.meta.env.BASE_URL + "media/scene-6.svg", "title": "岩纹", "description": "自然色图形 6" }]} count={60} tileSize={0.55} roundness={0.22} zoom={1.6} pullBack={0.8} stretch={0.35} inertia={0.5} autoplay={0.8} grayscale={false} dim={0.2} showInfo={true} theme={"light"} accentColor={"#52604e"} backgroundColor={"#e8e4d7"} intro={true}  /></div><p role="status" aria-live="polite" style={{ margin: '12px 20px', fontSize: 14, color: palette.muted }}>{status}</p></div>
    </div>
  );
}

```

### 完整组件 API

| 参数 | 类型 | 必填 | 上游默认值 | 中文说明 |
|---|---|---|---|---|
| `items` | `InfiniteMenuItem[]` | 否 | `[]` | 参与渲染或交互的条目列表，每项字段和可选内容按完整类型传入。 |
| `count` | `number` | 否 | `160` | 数量，控制 infinite menu 的对应渲染或交互参数。 |
| `tileSize` | `number` | 否 | `0.63` | 字符格尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `roundness` | `number` | 否 | `0.2` | 圆润程度，控制 infinite menu 的对应渲染或交互参数。 |
| `zoom` | `number` | 否 | `1.65` | 缩放，控制 infinite menu 的对应渲染或交互参数。 |
| `pullBack` | `number` | 否 | `1` | 拉动背面，控制 infinite menu 的对应渲染或交互参数。 |
| `stretch` | `number` | 否 | `0.6` | 拉伸，控制 infinite menu 的对应渲染或交互参数。 |
| `inertia` | `number` | 否 | `0.6` | 惯性，控制 infinite menu 的对应渲染或交互参数。 |
| `autoplay` | `number` | 否 | `3` | 是否自动播放，决定该分支的展示或交互行为。 |
| `grayscale` | `boolean` | 否 | `true` | 是否灰度，决定该分支的展示或交互行为。 |
| `dim` | `number` | 否 | `0.5` | 暗化，控制 infinite menu 的对应渲染或交互参数。 |
| `intro` | `boolean` | 否 | `true` | 是否入场，决定该分支的展示或交互行为。 |
| `showInfo` | `boolean` | 否 | `true` | 是否显示信息，决定该分支的展示或交互行为。 |
| `renderInfo` | `(item: InfiniteMenuItem, index: number, moving: boolean) => React.ReactNode` | 否 | `未指定` | 自定义当前项目说明的渲染函数，接收条目、索引及移动状态。 |
| `theme` | `'dark' \| 'light'` | 否 | `'dark'` | 主题，控制 infinite menu 的对应渲染或交互参数。 |
| `accentColor` | `string` | 否 | `ink` | 强调颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `backgroundColor` | `string` | 否 | `未指定` | 背景颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `onActiveChange` | `(item: InfiniteMenuItem, index: number) => void` | 否 | `未指定` | 激活改变时执行的回调；按签名接收事件或结果，调用方在函数中同步业务状态。 |
| `onItemClick` | `(item: InfiniteMenuItem, index: number) => void` | 否 | `未指定` | 用户点击列表或菜单项时通知调用方，参数为条目及索引。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `style` | `React.CSSProperties` | 否 | `未指定` | 容器的 React 内联样式对象，尺寸、布局与 CSS 属性按 CSSProperties 传入。 |

**items 的真实接入：**

```tsx
items={MEDIA.map((image, index) => ({ image, title: LABELS[index], description: '自然色图形 ' + (index + 1) }))}
```

**renderInfo 的真实接入：**

```tsx
renderInfo={(item, index, moving) => ("示例")}
```

**onActiveChange 的真实接入：**

```tsx
onActiveChange={(_item, index) => setStatus('当前素材：' + LABELS[index % LABELS.length])}
```

**onItemClick 的真实接入：**

```tsx
onItemClick={(_item, index) => setStatus('选择素材：' + LABELS[index % LABELS.length])}
```

**style 的真实接入：**

```tsx
style={{ width: "100%", minHeight: 240 }}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，不改写上游 API。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.items` | `[{"image":"@media/scene-1.svg","title":"山雾","description":"自然色图形 1"},{"image":"@media/scene-2.svg","title":"茶庭","description":"自然色图形 2"},{"image":"@media/scene-3.svg","title":"沙洲","description":"自然色图形 3"},{"image":"@media/scene-4.svg","title":"静水","description":"自然色图形 4"},{"image":"@media/scene-5.svg","title":"林间","description":"自然色图形 5"},{"image":"@media/scene-6.svg","title":"岩纹","description":"自然色图形 6"}]` | json | 不限 ~ 不限 | 调节结束后重建 |
| `t0.count` | `60` | range | 1 ~ 160 | 调节结束后重建 |
| `t0.tileSize` | `0.55` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.roundness` | `0.22` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.zoom` | `1.6` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.pullBack` | `0.8` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.stretch` | `0.35` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.inertia` | `0.5` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.autoplay` | `0.8` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.grayscale` | `false` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.dim` | `0.2` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.showInfo` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.theme` | `"light"` | select | "dark" / "light" | 调节结束后重建 |
| `t0.accentColor` | `"#52604e"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.backgroundColor` | `"#e8e4d7"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.intro` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |

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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [导航与菜单](../categories/navigation.md)；否则直接完成当前组件。
