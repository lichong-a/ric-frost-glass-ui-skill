# Folder Float

数据与文件 · `folder-float` · 中文意图：悬浮文件夹 / 纸条弹出

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

文件夹打开时内部便笺弹到周围。

功能要求：保持内容的语义和可访问名称；只有真实可交互元素可进入焦点顺序。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/data/folder-float.tsx](../../src/demos/data/folder-float.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Micro/FolderFloat/FolderFloat.tsx](../../.upstream/src/ts-default/Micro/FolderFloat/FolderFloat.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Micro/FolderFloat/FolderFloat.css](../../.upstream/src/ts-default/Micro/FolderFloat/FolderFloat.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/folder-float.json](../../src/parameters/definitions/folder-float.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component folder-float
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Folder Float 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：640px（宿主设置，不是组件 Props）。
import { useState } from 'react';
import FolderFloat from '../../../.upstream/src/ts-default/Micro/FolderFloat/FolderFloat';
import { DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
const cn=(names:string)=>componentClasses(styles,names);

const items = [{ label: 'UI 规范', value: 'spec' }, { label: '设计变量', value: 'tokens' }, { label: '组件契约', value: 'contracts' }];
export default function FolderFloatDemo() {
  const [message, setMessage] = useState('点击文件夹展开文档。');
  return <DemoPanel title="Folder Float · 浮动文件夹"><div className={cn("aw-micro-stack")}>
    <div style={{ padding: '100px 20px 20px' }}><FolderFloat            onOpenChange={open => setMessage(open ? '文件夹已展开。' : '文件夹已收起。')} onSelect={value => setMessage(`已选择：${items.find(item => item.value === value)?.label}`)} items={[{ "label": "UI 规范", "value": "spec" }, { "label": "设计变量", "value": "tokens" }, { "label": "组件契约", "value": "contracts" }]} label={"设计资源"} sublabel={"3 份本地示例文档"} trigger={"click"} folderColor={"#52604e"} frontColor={"#a6b39a"} paperColor={"#faf7f0"} itemColor={"rgb(250 247 240 / 0.82)"} itemTextColor={"#1f2d26"} labelColor={"#1f2d26"} physics={true} defaultOpen={false} closeOnSelect={true} drift={0.5} width={200} height={148} radius={14} spread={180} lift={26} tilt={8} flapAngle={34} restAngle={16} openDuration={520} stagger={45} bounce={0.3}  /></div>
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">{message}</p>
  </div></DemoPanel>;
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `items` | `FolderFloatItem[]` | 否 | `DEFAULT_ITEMS` | 参与渲染或交互的条目列表，每项字段和可选内容按完整类型传入。 |
| `label` | `string` | 否 | `'Design feedback'` | 向用户或辅助技术说明控件的名称。 |
| `sublabel` | `string` | 否 | `''` | 副标签，控制 folder float 的对应渲染或交互参数。 |
| `trigger` | `FolderFloatTrigger` | 否 | `'hover'` | 触发方式，控制 folder float 的对应渲染或交互参数。 |
| `defaultOpen` | `boolean` | 否 | `false` | 是否非受控初始打开，决定该分支的展示或交互行为。 |
| `closeOnSelect` | `boolean` | 否 | `true` | 是否关闭选择，决定该分支的展示或交互行为。 |
| `physics` | `boolean` | 否 | `true` | 是否物理模拟，决定该分支的展示或交互行为。 |
| `drift` | `number` | 否 | `0.5` | 漂移，控制 folder float 的对应渲染或交互参数。 |
| `onSelect` | `(value: string, index: number) => void` | 否 | `未指定` | 用户选择条目时通知调用方，参数为选中项的标识或数据。 |
| `onOpenChange` | `(open: boolean) => void` | 否 | `未指定` | 展开状态改变时通知调用方，参数为新的布尔状态。 |
| `folderColor` | `string` | 否 | `'#3f3f46'` | 文件夹颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `frontColor` | `string` | 否 | `'#52525b'` | 正面颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `paperColor` | `string` | 否 | `'#f5f5f5'` | 纸张颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `itemColor` | `string` | 否 | `'#f5f5f5'` | 条目颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `itemTextColor` | `string` | 否 | `'#18181b'` | 条目文字颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `labelColor` | `string` | 否 | `'#f5f5f5'` | 标签颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `width` | `number` | 否 | `200` | 容器或效果的宽度，CSS 字符串与数值的支持以类型为准。 |
| `height` | `number` | 否 | `148` | 容器或效果的高度，CSS 字符串与数值的支持以类型为准。 |
| `radius` | `number` | 否 | `14` | 半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `spread` | `number` | 否 | `180` | 展开间距，控制 folder float 的对应渲染或交互参数。 |
| `lift` | `number` | 否 | `26` | 抬起，控制 folder float 的对应渲染或交互参数。 |
| `tilt` | `number` | 否 | `8` | 倾斜，控制 folder float 的对应渲染或交互参数。 |
| `flapAngle` | `number` | 否 | `34` | 翻片角度，控制 folder float 的对应渲染或交互参数。 |
| `restAngle` | `number` | 否 | `16` | 静止角度，控制 folder float 的对应渲染或交互参数。 |
| `openDuration` | `number` | 否 | `520` | 打开时长，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `stagger` | `number` | 否 | `45` | 错开，控制 folder float 的对应渲染或交互参数。 |
| `bounce` | `number` | 否 | `0.3` | 回弹，控制 folder float 的对应渲染或交互参数。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |

**items 的真实接入：**

```tsx
items={items}
```

**onSelect 的真实接入：**

```tsx
onSelect={value => setMessage(`已选择：${items.find(item => item.value === value)?.label}`)}
```

**onOpenChange 的真实接入：**

```tsx
onOpenChange={open => setMessage(open ? '文件夹已展开。' : '文件夹已收起。')}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.items` | `[{"label":"UI 规范","value":"spec"},{"label":"设计变量","value":"tokens"},{"label":"组件契约","value":"contracts"}]` | json | 不限 ~ 不限 | 即时应用 |
| `t0.label` | `"设计资源"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.sublabel` | `"3 份本地示例文档"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.trigger` | `"click"` | select | "hover" / "click" | 即时应用 |
| `t0.folderColor` | `"#52604e"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.frontColor` | `"#a6b39a"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.paperColor` | `"#faf7f0"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.itemColor` | `"rgb(250 247 240 / 0.82)"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.itemTextColor` | `"#1f2d26"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.labelColor` | `"#1f2d26"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.physics` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.defaultOpen` | `false` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.closeOnSelect` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.drift` | `0.5` | number | 不限 ~ 不限 | 即时应用 |
| `t0.width` | `200` | number | 不限 ~ 不限 | 即时应用 |
| `t0.height` | `148` | number | 不限 ~ 不限 | 即时应用 |
| `t0.radius` | `14` | number | 不限 ~ 不限 | 即时应用 |
| `t0.spread` | `180` | number | 不限 ~ 不限 | 即时应用 |
| `t0.lift` | `26` | number | 不限 ~ 不限 | 即时应用 |
| `t0.tilt` | `8` | number | 不限 ~ 不限 | 即时应用 |
| `t0.flapAngle` | `34` | number | 不限 ~ 不限 | 即时应用 |
| `t0.restAngle` | `16` | number | 不限 ~ 不限 | 即时应用 |
| `t0.openDuration` | `520` | number | 不限 ~ 不限 | 即时应用 |
| `t0.stagger` | `45` | number | 不限 ~ 不限 | 即时应用 |
| `t0.bounce` | `0.3` | number | 不限 ~ 不限 | 即时应用 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `640`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Wan 皮肤

- 容器、状态色、边界与焦点使用 Agent Wan 规范；交互命中区不随视觉形变缩小。
- 组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。

## 5. 加载、动效与降级

本例实际配置：设备访问与音频行为以本例真实 Props 和显式回调为准。capabilities 是源码扫描提示，不能据此声称已请求相机、录音或播放音频。

- 依赖清单：`matter-js`、`react`。安装前复用目标项目的兼容版本，不重复加载。
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
