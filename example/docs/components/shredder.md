# Shredder

数据与文件 · `shredder` · 中文意图：碎纸机 / 拖拽删除

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-ric-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

拖入底部的行被分解成纸条。

功能要求：将视觉触发与真实动作回调分开；禁用/加载阻止重复提交，提供普通点击或键盘的等价操作，危险动作按确认契约处理。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/data/shredder.tsx](../../src/demos/data/shredder.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Micro/Shredder/Shredder.tsx](../../.upstream/src/ts-default/Micro/Shredder/Shredder.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Micro/Shredder/Shredder.css](../../.upstream/src/ts-default/Micro/Shredder/Shredder.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/shredder.json](../../src/parameters/definitions/shredder.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component shredder
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Shredder 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：720px（宿主设置，不是组件 Props）。
import { useState } from 'react';
import Shredder from '../../../.upstream/src/ts-default/Micro/Shredder/Shredder';
import { DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
const cn=(names:string)=>componentClasses(styles,names);

const initialItems = [{ id: 'draft-a', title: '页面布局草稿', text: '拖入底部碎纸口，演示移除过期草稿。' }, { id: 'draft-b', title: '早期配色方案', text: '只影响当前示例中的本地卡片。' }, { id: 'draft-c', title: '组件探索记录', text: '可先重新排序，再选择要移除的条目。' }];
export default function ShredderDemo() {
  const [items, setItems] = useState([{ "id": "draft-a", "title": "页面布局草稿", "text": "拖入底部碎纸口，演示移除过期草稿。" }, { "id": "draft-b", "title": "早期配色方案", "text": "只影响当前示例中的本地卡片。" }, { "id": "draft-c", "title": "组件探索记录", "text": "可先重新排序，再选择要移除的条目。" }]);
  const [message, setMessage] = useState('将纸卡拖向下方碎纸口；聚焦纸卡后也可按 Delete 删除。');
  const [revision, setRevision] = useState(0);
  return <DemoPanel title="Shredder · 碎纸交互"><div className={cn("aw-micro-stack aw-shredder-stack")}>
    <Shredder key={revision} items={items} renderItem={item => <article className={cn("aw-micro-paper aw-shredder-paper")}><strong>{item.title}</strong><span>{item.text}</span></article>} onShred={item => { setItems(value => value.filter(candidate => candidate.id !== item.id)); setMessage(`已移除本地示例：${item.title}`); }} onReorder={next => { setItems(next); setMessage('本地纸卡顺序已更新。'); }}         width={320} height={430} fallHeight={84} color={"#1f2d26"} slitColor={"#52604e"} autoAnimate={false} loop={false} loopAfterDelete={false} inset={14} gap={10} slitHeight={4} feedSpeed={180} bite={18} autoFeed={true} stripWidth={10} curl={1} dragTilt={6} lift={1.02} disabled={false}  />
    <div className={cn("aw-micro-controls")}><button className={styles['aw-micro-action']}  onClick={() => { setItems(initialItems); setRevision(value => value + 1); setMessage('纸卡已恢复。'); }} type={"button"} >恢复示例纸卡</button></div>
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">{message} 剩余 {items.length} 张。</p>
  </div></DemoPanel>;
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `items` | `T[]` | 否 | `[]` | 参与渲染或交互的条目列表，每项字段和可选内容按完整类型传入。 |
| `renderItem` | `(item: T, index: number) => ReactNode` | 是 | `未指定` | 自定义每一项内容的渲染函数，接收条目及索引等参数并返回 ReactNode。 |
| `onShred` | `(item: T) => void` | 否 | `未指定` | 拖动动作完成碎纸处理时通知调用方。 |
| `onReorder` | `(items: T[]) => void` | 否 | `未指定` | 拖动条目改变排列顺序后通知调用方。 |
| `width` | `number` | 否 | `340` | 容器或效果的宽度，CSS 字符串与数值的支持以类型为准。 |
| `height` | `number` | 否 | `460` | 容器或效果的高度，CSS 字符串与数值的支持以类型为准。 |
| `inset` | `number` | 否 | `14` | 内缩，控制 shredder 的对应渲染或交互参数。 |
| `gap` | `number` | 否 | `10` | 相邻单元、卡片或字符之间的间距；单位由组件实现定义。 |
| `slitHeight` | `number` | 否 | `4` | 狭缝高度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `fallHeight` | `number` | 否 | `140` | 下落高度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `feedSpeed` | `number` | 否 | `180` | 供入速度，控制 shredder 的对应渲染或交互参数。 |
| `bite` | `number` | 否 | `18` | 纸张被碎纸口咬入时允许的推进距离。 |
| `autoFeed` | `boolean` | 否 | `true` | 是否自动供入，决定该分支的展示或交互行为。 |
| `stripWidth` | `number` | 否 | `10` | 纸条宽度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `curl` | `number` | 否 | `1` | 旋度，控制 shredder 的对应渲染或交互参数。 |
| `autoAnimate` | `boolean` | 否 | `false` | 是否自动动画，决定该分支的展示或交互行为。 |
| `loop` | `boolean` | 否 | `false` | 是否循环，决定该分支的展示或交互行为。 |
| `loopAfterDelete` | `boolean` | 否 | `false` | 是否循环之后删除，决定该分支的展示或交互行为。 |
| `dragTilt` | `number` | 否 | `6` | 拖动倾斜，控制 shredder 的对应渲染或交互参数。 |
| `lift` | `number` | 否 | `1.02` | 抬起，控制 shredder 的对应渲染或交互参数。 |
| `slitColor` | `string` | 否 | `'#3f3f46'` | 狭缝颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `color` | `string` | 否 | `'#f5f5f5'` | 颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `disabled` | `boolean` | 否 | `false` | 是否禁用控件的用户交互。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `button.className` | `string \| undefined` | 否 | `未指定` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `button.type` | `"button" \| "reset" \| "submit" \| undefined` | 否 | `未指定` | 原生输入或按钮的行为类型；按钮类型会影响表单提交。 |
| `button.onClick` | `MouseEventHandler<HTMLButtonElement> \| undefined` | 否 | `未指定` | 用户点击或通过键盘激活时触发的事件处理函数。 |
| `button.children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |

**继承的原生属性：**

- `DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**items 的真实接入：**

```tsx
items={items}
```

**renderItem 的真实接入：**

```tsx
renderItem={item => <article className={cn("aw-micro-paper aw-shredder-paper")}><strong>{item.title}</strong><span>{item.text}</span></article>}
```

**onShred 的真实接入：**

```tsx
onShred={item => { setItems(value => value.filter(candidate => candidate.id !== item.id)); setMessage(`已移除本地示例：${item.title}`); }}
```

**onReorder 的真实接入：**

```tsx
onReorder={next => { setItems(next); setMessage('本地纸卡顺序已更新。'); }}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.width` | `320` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.height` | `430` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.fallHeight` | `84` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.color` | `"#1f2d26"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.slitColor` | `"#52604e"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.autoAnimate` | `false` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.loop` | `false` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.loopAfterDelete` | `false` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.inset` | `14` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.gap` | `10` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.slitHeight` | `4` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.feedSpeed` | `180` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.bite` | `18` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.autoFeed` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.stripWidth` | `10` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.curl` | `1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.dragTilt` | `6` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.lift` | `1.02` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.disabled` | `false` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t1.type` | `"button"` | select | "button" / "reset" / "submit" | 调节结束后重建 |
| `state.items` | `[{"id":"draft-a","title":"页面布局草稿","text":"拖入底部碎纸口，演示移除过期草稿。"},{"id":"draft-b","title":"早期配色方案","text":"只影响当前示例中的本地卡片。"},{"id":"draft-c","title":"组件探索记录","text":"可先重新排序，再选择要移除的条目。"}]` | json | 不限 ~ 不限 | 即时应用；原组件回调同步受控值 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `720`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Ric 皮肤

- 容器、状态色、边界与焦点使用 Agent Ric 规范；交互命中区不随视觉形变缩小。
- 组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。

## 5. 加载、动效与降级

本例实际配置：设备访问与音频行为以本例真实 Props 和显式回调为准。capabilities 是源码扫描提示，不能据此声称已请求相机、录音或播放音频。

- 依赖清单：`react`、`react-dom`。安装前复用目标项目的兼容版本，不重复加载。
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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [数据与文件](../effects/categories/data.md)；否则直接完成当前组件。
