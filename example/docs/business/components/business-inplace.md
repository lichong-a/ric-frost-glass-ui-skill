# Inplace

表单与选择 · `business-inplace` · 中文意图：就地编辑 / 摘要编辑 / 查看编辑切换

## 1. 什么场景使用

短内容默认只读，用户明确进入编辑再保存或取消。

**不适合或优先替代：**复杂表单用Drawer或独立页面。

先确认本次任务要解决的业务行为，再选择本组件。普通业务页面优先使用这里的基础能力；只有用户明确要求装饰效果时才追加效果组件。

## 2. 只加载这一项

1. 只读本指南，确认用途与边界。
2. 只读 [src/business/demos/form/business-inplace.tsx](../../../src/business/demos/form/business-inplace.tsx)；需核对 API 与 DIY 配置时读 [本项参数记录](../../../src/parameters/definitions/business-inplace.json)；共享基础有需要才读 [support.tsx](../../../src/business/support.tsx)。
3. 本例从 components 按需导入独立控件；只读实际导入的 .tsx 及同名 .module.css。布局工具类也显式使用 CSS Modules，不给整块区域的 button/input 套统一动效。
4. 涉及业务错误、权限、数据或异步行为时才追加对应契约：[07-segmented-tabs](../../contracts/07-segmented-tabs.md)、[18-auxiliary](../../contracts/18-auxiliary.md)。
5. 预览库使用本项独立 import() 入口；复制到目标项目时也只接入所需组件和直接依赖。

所有实现使用本项目已有 React、原生语义控件、Motion 和 CSS。完整交互、类型与回调以当前示例代码为准；局部弹性、下拉、媒体与日历效果见 [交互动效指南](../motion-guide.md)。

## 3. 本例真实用法

下面来自当前独立示例。默认导出是一个可运行实例；复制后把本地选项、数据与回调接到目标项目已有业务层，不把演示结果当作后端成功。

```tsx
// 当前 Inplace 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import ownedStyles0 from '../../components/DemoLayout.module.css';
import ownedStyles1 from '../../components/Input.module.css';
import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { Field } from '../../components/Field';
import { AnimatedSwap } from '../../components/AnimatedSwap';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessInplaceDemo() {
  const [editing,setEditing]=useState(false); const [value,setValue]=useState('资料整理'); const [draft,setDraft]=useState(value);
  return <BusinessDemo title="Inplace" description="点击名称就地编辑，保存校验非空，取消恢复此前值。">
    <AnimatedSwap value={editing?'editing':'reading'}>{editing?<form data-ui="aw-business-row" className={cn("aw-business-row")} onSubmit={event=>{event.preventDefault();if(!draft.trim())return;setValue(draft.trim());setEditing(false);}}><Field  label={"编辑名称"} control={false} ><input data-ui="aw-business-input" className={cn("aw-business-input")}  value={draft} onChange={event=>setDraft(event.target.value)} onKeyDown={event=>{if(event.key==='Escape')setEditing(false);}} autoFocus={true}  /></Field><Button  disabled={!draft.trim()} type={"submit"} variant={"primary"} >保存</Button><Button  onClick={()=>setEditing(false)} variant={"secondary"} type={"button"} >取消</Button></form>:<Button  onClick={()=>{setDraft(value);setEditing(true);}} variant={"secondary"} type={"button"} >{value} · 点击编辑</Button>}</AnimatedSwap>
  </BusinessDemo>;
}
```

### 完整组件 API

源码默认值来自本包业务实现；本例默认配置来自独立示例，两者可能不同。

本例默认导出是由原生元素与叶组件组成的演示函数，不接收公开 Props。下表按叶组件前缀列出实际 API；原生属性类型单独注明。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `AnimatedSwap.children` | `ReactNode` | 是 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `AnimatedSwap.value` | `string \| number` | 是 | `未指定` | 当前受控值，由调用方维护并随交互回调更新。 |
| `AnimatedSwap.className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `Field.label` | `string` | 是 | `未指定` | 向用户或辅助技术说明控件的名称。 |
| `Field.children` | `ReactNode` | 是 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `Field.hint` | `string` | 否 | `未指定` | 与字段一起显示的帮助文字。 |
| `Field.htmlFor` | `string` | 否 | `(isControl ? children.props.id : undefined)` | 关联控件的 id，让标签点击与辅助技术定位到该控件。 |
| `Field.control` | `boolean` | 否 | `false` | 是否控制，决定该分支的展示或交互行为。 |
| `input.data-ui` | `any` | 否 | `未指定` | 示例在 DOM 上使用的 ui 数据标记，供局部样式或状态定位读取。 |
| `input.className` | `string \| undefined` | 否 | `未指定` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `input.autoFocus` | `boolean \| undefined` | 否 | `未指定` | 是否自动焦点，决定该分支的展示或交互行为。 |
| `input.value` | `string \| number \| readonly string[] \| undefined` | 否 | `未指定` | 当前受控值，由调用方维护并随交互回调更新。 |
| `input.onChange` | `ChangeEventHandler<HTMLInputElement> \| undefined` | 否 | `未指定` | 用户改变值或条目顺序时通知调用方；回调参数类型就是应写回的值或原生事件。 |
| `input.onKeyDown` | `KeyboardEventHandler<HTMLInputElement> \| undefined` | 否 | `未指定` | 身份标识down时执行的回调；按签名接收事件或结果，调用方在函数中同步业务状态。 |
| `Button · t3.type` | `"button" \| "reset" \| "submit" \| undefined` | 否 | `'button'` | 原生输入或按钮的行为类型；按钮类型会影响表单提交。 |
| `Button · t3.className` | `string \| undefined` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `Button · t3.children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `Button · t3.variant` | `'primary' \| 'secondary' \| 'danger' \| 'ghost'` | 否 | `'primary'` | 选择组件内置的外观或效果变体。 |
| `Button · t3.ref` | `Ref<HTMLButtonElement>` | 否 | `未指定` | 连接实际 DOM 元素或组件命令句柄，支持类型声明中的 ref 形式。 |

本示例函数不接收额外公开 Props，能力由原生元素与上述叶组件组合；下面列出实际继承类型和可编辑示例配置。

**继承的原生属性：**

- `DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `ButtonHTMLAttributes<HTMLButtonElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**children 的真实接入：**

```tsx
children={<>{editing?<form data-ui="aw-business-row" className={cn("aw-business-row")} onSubmit={event=>{event.preventDefault();if(!draft.trim())return;setValue(draft.trim());setEditing(false);}}><Field label="编辑名称"><input data-ui="aw-business-input" className={cn("aw-business-input")} autoFocus value={draft} onChange={event=>setDraft(event.target.value)} onKeyDown={event=>{if(event.key==='Escape')setEditing(false);}} /></Field><Button type="submit" disabled={!draft.trim()}>保存</Button><Button variant="secondary" onClick={()=>setEditing(false)}>取消</Button></form>:<Button variant="secondary" onClick={()=>{setDraft(value);setEditing(true);}}>{value} · 点击编辑</Button>}</>}
```

**children 的真实接入：**

```tsx
children={<><input data-ui="aw-business-input" className={cn("aw-business-input")} autoFocus value={draft} onChange={event=>setDraft(event.target.value)} onKeyDown={event=>{if(event.key==='Escape')setEditing(false);}} /></>}
```

**children 的真实接入：**

```tsx
children={<>保存</>}
```

**ref 的真实接入：**

```tsx
const elementRef = useRef<HTMLButtonElement | null>(null);
// JSX: ref={elementRef}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t1.label` | `"编辑名称"` | text | 不限 ~ 不限 | 即时应用 |
| `t1.control` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t2.autoFocus` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t3.type` | `"submit"` | select | "button" / "reset" / "submit" | 即时应用 |
| `t3.variant` | `"primary"` | select | "primary" / "secondary" / "danger" / "ghost" | 即时应用 |
| `t4.variant` | `"secondary"` | select | "primary" / "secondary" / "danger" / "ghost" | 即时应用 |
| `t4.type` | `"button"` | select | "button" / "reset" / "submit" | 即时应用 |
| `t5.variant` | `"secondary"` | select | "primary" / "secondary" / "danger" / "ghost" | 即时应用 |
| `t5.type` | `"button"` | select | "button" / "reset" / "submit" | 即时应用 |
| `state.editing` | `false` | switch | 不限 ~ 不限 | 即时应用；原组件回调同步受控值 |

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

选型有疑问时返回 [表单与选择](../categories/form.md)，先比较最多 2–3 项。
