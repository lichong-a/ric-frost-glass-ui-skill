# Branched Menu

导航与菜单 · `branched-menu` · 中文意图：树枝菜单 / 分支导航

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

分组菜单折叠展开并描绘选中分支。

功能要求：保持真实链接/导航语义、当前项状态、键盘路径与可见焦点；展开菜单按基础浮层契约处理。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/navigation/branched-menu.tsx](../../src/demos/navigation/branched-menu.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Micro/BranchedMenu/BranchedMenu.tsx](../../.upstream/src/ts-default/Micro/BranchedMenu/BranchedMenu.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Micro/BranchedMenu/BranchedMenu.css](../../.upstream/src/ts-default/Micro/BranchedMenu/BranchedMenu.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/branched-menu.json](../../src/parameters/definitions/branched-menu.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component branched-menu
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Branched Menu 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import { useState } from 'react';
import BranchedMenu from '../../../.upstream/src/ts-default/Micro/BranchedMenu/BranchedMenu';
import { DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
const cn=(names:string)=>componentClasses(styles,names);

const items = [
  { label: '工作空间', children: [{ value: 'skills', label: '技能与工具' }, { value: 'agents', label: '智能体' }, { value: 'knowledge', label: '知识库' }] },
  { label: '设置', children: [{ value: 'members', label: '成员管理' }, { value: 'preferences', label: '偏好设置' }] },
];
export default function BranchedMenuDemo() {
  const [message, setMessage] = useState('当前选中：技能与工具');
  return <DemoPanel title="Branched Menu · 分支导航"><div className={cn("aw-micro-stack")}>
    <BranchedMenu         onSelect={(_, item) => setMessage(`当前选中：${item.label}`)} onToggle={(index, open) => setMessage(`${items[index].label}：${open ? '展开' : '收起'}`)} items={[{ "label": "工作空间", "children": [{ "value": "skills", "label": "技能与工具" }, { "value": "agents", "label": "智能体" }, { "value": "knowledge", "label": "知识库" }] }, { "label": "设置", "children": [{ "value": "members", "label": "成员管理" }, { "value": "preferences", "label": "偏好设置" }] }]} defaultOpen={0} defaultActive={"skills"} color={"#1f2d26"} accentColor={"#52604e"} lineColor={"#a6b39a"} width={280} rowHeight={44} indent={40} trunk={14} radius={10} lineWidth={1.5} fontSize={14} drawDuration={400} foldDuration={300}  />
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">{message}（本地演示导航）</p>
  </div></DemoPanel>;
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `items` | `BranchedMenuItem[]` | 否 | `DEFAULT_ITEMS` | 参与渲染或交互的条目列表，每项字段和可选内容按完整类型传入。 |
| `defaultOpen` | `number \| number[]` | 否 | `0` | 非受控初始打开的有序数据集合；每一项按数组元素类型配置。 |
| `defaultActive` | `string` | 否 | `''` | 非受控初始激活，控制 branched menu 的对应渲染或交互参数。 |
| `onSelect` | `(value: string, item: BranchedMenuChild \| BranchedMenuItem) => void` | 否 | `未指定` | 用户选择条目时通知调用方，参数为选中项的标识或数据。 |
| `onToggle` | `(index: number, open: boolean) => void` | 否 | `未指定` | 节点展开或收起时通知调用方，参数为目标节点的标识。 |
| `color` | `string` | 否 | `'#f5f5f5'` | 颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `accentColor` | `string` | 否 | `'#f5f5f5'` | 强调颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `lineColor` | `string` | 否 | `'#3f3f46'` | 线条颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `width` | `number` | 否 | `240` | 容器或效果的宽度，CSS 字符串与数值的支持以类型为准。 |
| `rowHeight` | `number` | 否 | `36` | 行高度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `indent` | `number` | 否 | `40` | 缩进，控制 branched menu 的对应渲染或交互参数。 |
| `trunk` | `number` | 否 | `14` | 主干，控制 branched menu 的对应渲染或交互参数。 |
| `radius` | `number` | 否 | `10` | 半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `lineWidth` | `number` | 否 | `1.5` | 线条宽度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `fontSize` | `number` | 否 | `14` | 字体尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `drawDuration` | `number` | 否 | `400` | 绘制时长，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `foldDuration` | `number` | 否 | `300` | 折叠时长，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |

**items 的真实接入：**

```tsx
items={items}
```

**defaultOpen 的真实接入：**

```tsx
defaultOpen={0}
```

**onSelect 的真实接入：**

```tsx
onSelect={(_, item) => setMessage(`当前选中：${item.label}`)}
```

**onToggle 的真实接入：**

```tsx
onToggle={(index, open) => setMessage(`${items[index].label}：${open ? '展开' : '收起'}`)}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.items` | `[{"label":"工作空间","children":[{"value":"skills","label":"技能与工具"},{"value":"agents","label":"智能体"},{"value":"knowledge","label":"知识库"}]},{"label":"设置","children":[{"value":"members","label":"成员管理"},{"value":"preferences","label":"偏好设置"}]}]` | json | 不限 ~ 不限 | 即时应用 |
| `t0.defaultOpen` | `0` | json | 不限 ~ 不限 | 调节结束后重建 |
| `t0.defaultActive` | `"skills"` | text | 不限 ~ 不限 | 调节结束后重建 |
| `t0.color` | `"#1f2d26"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.accentColor` | `"#52604e"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.lineColor` | `"#a6b39a"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.width` | `280` | number | 不限 ~ 不限 | 即时应用 |
| `t0.rowHeight` | `44` | number | 不限 ~ 不限 | 即时应用 |
| `t0.indent` | `40` | number | 不限 ~ 不限 | 即时应用 |
| `t0.trunk` | `14` | number | 不限 ~ 不限 | 即时应用 |
| `t0.radius` | `10` | number | 不限 ~ 不限 | 即时应用 |
| `t0.lineWidth` | `1.5` | number | 不限 ~ 不限 | 即时应用 |
| `t0.fontSize` | `14` | number | 不限 ~ 不限 | 即时应用 |
| `t0.drawDuration` | `400` | number | 不限 ~ 不限 | 即时应用 |
| `t0.foldDuration` | `300` | number | 不限 ~ 不限 | 即时应用 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [导航与菜单](../effects/categories/navigation.md)；否则直接完成当前组件。
