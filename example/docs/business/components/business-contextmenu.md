# ContextMenu

导航与菜单 · `business-contextmenu` · 中文意图：右键菜单 / 对象快捷操作 / 上下文动作

## 1. 什么场景使用

操作依赖当前对象，通过右键和可见按钮都能打开。

**不适合或优先替代：**关键操作不能仅隐藏在右键菜单。

先确认本次任务要解决的业务行为，再选择本组件。普通业务页面优先使用这里的基础能力；只有用户明确要求装饰效果时才追加效果组件。

## 2. 只加载这一项

1. 只读本指南，确认用途与边界。
2. 只读 [src/business/demos/navigation/business-contextmenu.tsx](../../../src/business/demos/navigation/business-contextmenu.tsx)；共享基础有需要才读 [support.tsx](../../../src/business/support.tsx)。
3. 本例从 components 按需导入独立控件；只读实际导入的 .tsx 及同名 .module.css。布局工具类也显式使用 CSS Modules，不给整块区域的 button/input 套统一动效。
4. 涉及业务错误、权限、数据或异步行为时才追加对应契约：[02-sidebar](../../contracts/02-sidebar.md)、[12-row-actions](../../contracts/12-row-actions.md)、[03-header](../../contracts/03-header.md)。
5. 预览库使用本项独立 import() 入口；复制到目标项目时也只接入所需组件和直接依赖。

所有实现使用本项目已有 React、原生语义控件、Motion 和 CSS。完整交互、类型与回调以当前示例代码为准；局部弹性、下拉、媒体与日历效果见 [交互动效指南](../motion-guide.md)。

## 3. 本例真实用法

下面来自当前独立示例。默认导出是一个可运行实例；复制后把本地选项、数据与回调接到目标项目已有业务层，不把演示结果当作后端成功。

```tsx
// 当前 ContextMenu 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import ownedStyles0 from '../../components/Button.module.css';
import ownedStyles1 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { MenuSurface } from '../../components/MenuSurface';
import { useState, useRef } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Popover } from '../../components/Popover';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessContextMenuDemo() {
  const [open,setOpen]=useState(false); const [message,setMessage]=useState('请选择卡片动作。'); const anchor=useRef<HTMLElement>(null);
  return <BusinessDemo title="ContextMenu" description="在资料卡上右键打开菜单；键盘菜单键或Shift+F10也可打开。">
    <article data-ui="aw-business-item" ref={anchor} className={cn("aw-business-item")} tabIndex={0} onContextMenu={event=>{event.preventDefault();setOpen(true);}} onKeyDown={event=>{if(event.key==='ContextMenu'||(event.shiftKey&&event.key==='F10')){event.preventDefault();setOpen(true);}}}><h3>资料整理</h3><p>右键或使用 Shift+F10 打开操作菜单。</p></article><Popover open={open} onClose={()=>setOpen(false)} anchorRef={anchor} minWidth={280} ><MenuSurface  label={"资料操作"} >{['查看详情','复制名称','加入收藏'].map(label=><button data-ui="aw-button"  role="menuitem" className={cn("aw-button")} key={label} onClick={async()=>{setOpen(false);if(label==='复制名称'){try{await navigator.clipboard.writeText('资料整理');setMessage('任务名称已复制。');}catch{setMessage('无法自动复制，请手动复制名称：资料整理。');}}else{setMessage('已选择本地动作：'+label);}}} type={"button"} >{label}</button>)}</MenuSurface></Popover><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">{message}</p>
  </BusinessDemo>;
}
```

### 完整组件 API

| 参数 | 类型 | 必填 | 上游默认值 | 中文说明 |
|---|---|---|---|---|
| `Popover.open` | `boolean` | 是 | `未指定` | 是否展开或显示内容，由调用方控制。 |
| `Popover.onClose` | `() => void` | 是 | `未指定` | 请求关闭弹层、对话框或提示时调用，调用方同步更新 open 状态。 |
| `Popover.anchorRef` | `RefObject<HTMLElement \| null>` | 是 | `未指定` | 连接触发器 DOM 的 ref，供弹层定位及焦点返回使用。 |
| `Popover.children` | `ReactNode` | 是 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `Popover.minWidth` | `number` | 否 | `280` | 最小宽度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `MenuSurface.label` | `string` | 是 | `未指定` | 向用户或辅助技术说明控件的名称。 |
| `MenuSurface.children` | `ReactNode` | 是 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `button.data-ui` | `any` | 否 | `未指定` | 示例在 DOM 上使用的 ui 数据标记，供局部样式或状态定位读取。 |
| `button.type` | `"button" \| "reset" \| "submit" \| undefined` | 否 | `未指定` | 原生输入或按钮的行为类型；按钮类型会影响表单提交。 |
| `button.role` | `AriaRole \| undefined` | 否 | `未指定` | 辅助技术使用的元素角色，须与实际键盘和交互行为相匹配。 |
| `button.className` | `string \| undefined` | 否 | `未指定` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `button.key` | `Key \| null \| undefined` | 否 | `未指定` | React 列表项身份，用于更新时保持对应节点。 |
| `button.onClick` | `MouseEventHandler<HTMLButtonElement> \| undefined` | 否 | `未指定` | 用户点击或通过键盘激活时触发的事件处理函数。 |
| `button.children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |

本示例函数不接收额外公开 Props，能力由原生元素与上述叶组件组合；下面列出实际继承类型和可编辑示例配置。

**继承的原生属性：**

- `DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**onClose 的真实接入：**

```tsx
onClose={()=>setOpen(false)}
```

**anchorRef 的真实接入：**

```tsx
const elementRef = useRef<HTMLElement | null>(null);
// JSX: anchorRef={elementRef}
```

**children 的真实接入：**

```tsx
children={<><MenuSurface label="资料操作">{['查看详情','复制名称','加入收藏'].map(label=><button data-ui="aw-button" type="button" role="menuitem" className={cn("aw-button")} key={label} onClick={async()=>{setOpen(false);if(label==='复制名称'){try{await navigator.clipboard.writeText('资料整理');setMessage('任务名称已复制。');}catch{setMessage('无法自动复制，请手动复制名称：资料整理。');}}else{setMessage('已选择本地动作：'+label);}}}>{label}</button>)}</MenuSurface></>}
```

**children 的真实接入：**

```tsx
children={<>{['查看详情','复制名称','加入收藏'].map(label=><button data-ui="aw-button" type="button" role="menuitem" className={cn("aw-button")} key={label} onClick={async()=>{setOpen(false);if(label==='复制名称'){try{await navigator.clipboard.writeText('资料整理');setMessage('任务名称已复制。');}catch{setMessage('无法自动复制，请手动复制名称：资料整理。');}}else{setMessage('已选择本地动作：'+label);}}}>{label}</button>)}</>}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，不改写上游 API。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.minWidth` | `280` | number | 不限 ~ 不限 | 即时应用 |
| `t1.label` | `"资料操作"` | text | 不限 ~ 不限 | 即时应用 |
| `t2.type` | `"button"` | select | "button" / "reset" / "submit" | 即时应用 |
| `state.open` | `false` | switch | 不限 ~ 不限 | 即时应用；原组件回调同步受控值 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. 接入约束

- 颜色、阅读面、圆角、边界、焦点与阴影使用 Agent Wan Token，业务逻辑留在所属模块。
- 服务端状态、资源归属与动作权限由既有可信业务接口处理；前端输入限制只服务于体验。
- 保留本项键盘、名称、空状态、错误状态和恢复入口，清理拥有的监听、计时器、观察器与对象 URL。
- 文档中的本地数组、文件或短命令只用于示例；不增加未授权的上传、设备访问、外部写入或 shell 执行。
- 减少运动偏好下保留业务操作，仅停用短过渡；不要因为动效偏好关闭必要表单与菜单。

## 5. 场景级验收

按第 1 节实际业务任务检查状态变化、键盘路径、边界值、失败和取消。只报告运行过的检查；本指南和源码存在不等于已完成浏览器验收。

能力对照：此前没有独立可运行业务示例，规范和 CSS 不作为运行覆盖。

选型有疑问时返回 [业务导航](../categories/navigation.md)，先比较最多 2–3 项。
