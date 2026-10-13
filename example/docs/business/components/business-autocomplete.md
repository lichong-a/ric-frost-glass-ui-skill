# AutoComplete

表单与选择 · `business-autocomplete` · 中文意图：自动补全 / 搜索建议 / 候选项搜索 / 输入时搜索候选

## 1. 什么场景使用

候选项较多且用户知道部分名称，需要边输入边筛选并选择明确对象。

**不适合或优先替代：**只有少量固定候选项时优先Select；自由文本不能强制选项。

先确认本次任务要解决的业务行为，再选择本组件。普通业务页面优先使用这里的基础能力；只有用户明确要求装饰效果时才追加效果组件。

## 2. 只加载这一项

1. 只读本指南，确认用途与边界。
2. 只读 [src/business/demos/form/business-autocomplete.tsx](../../../src/business/demos/form/business-autocomplete.tsx)；共享基础有需要才读 [support.tsx](../../../src/business/support.tsx)。
3. 本例从 components 按需导入独立控件；只读实际导入的 .tsx 及同名 .module.css。布局工具类也显式使用 CSS Modules，不给整块区域的 button/input 套统一动效。
4. 涉及业务错误、权限、数据或异步行为时才追加对应契约：[05-input](../../contracts/05-input.md)、[06-select](../../contracts/06-select.md)。
5. 预览库使用本项独立 import() 入口；复制到目标项目时也只接入所需组件和直接依赖。

所有实现使用本项目已有 React、原生语义控件、Motion 和 CSS。完整交互、类型与回调以当前示例代码为准；局部弹性、下拉、媒体与日历效果见 [交互动效指南](../motion-guide.md)。

## 3. 本例真实用法

下面来自当前独立示例。默认导出是一个可运行实例；复制后把本地选项、数据与回调接到目标项目已有业务层，不把演示结果当作后端成功。

```tsx
// 当前 AutoComplete 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import ownedStyles0 from '../../components/Button.module.css';
import ownedStyles1 from '../../components/DemoLayout.module.css';
import ownedStyles2 from '../../components/Input.module.css';
import ownedStyles3 from '../../components/SelectOptions.module.css';
import { componentClasses } from '../../class-names';
import { useState, useId, useEffect } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { Field } from '../../components/Field';
import { AnimatePresence } from 'motion/react';
import { DropdownSurface } from '../../components/DropdownSurface';

const ownedStyles={...ownedStyles0,...ownedStyles1,...ownedStyles2,...ownedStyles3};
const cn=(names:string)=>componentClasses(ownedStyles,names);
// 场景：从较多候选项中边输入边搜索，支持键盘选择与清空。
export default function AutoCompleteDemo() {
  const options = ['项目工作台', '智能体管理', '技能目录', '知识库', '工具连接', '运行记录', '团队空间'];
  const id = useId(); const [query, setQuery] = useState(""); const [selected, setSelected] = useState('');
  const [open, setOpen] = useState(false); const [active, setActive] = useState(0);
  const matches = options.filter(item => item.includes(query.trim()));
  useEffect(() => {
    if (open) document.getElementById(`${id}-option-${active}`)?.scrollIntoView({ block: 'nearest' });
  }, [id, open, active, matches.length]);
  function choose(value: string) { setQuery(value); setSelected(value); setOpen(false); }
  return <BusinessDemo title="AutoComplete · 自动补全" description="从较多候选项中边输入边搜索，支持方向键、Enter 和 Escape。"><Field  htmlFor={id} label={"搜索工作入口"} control={false} ><div data-ui="aw-business-combo" className={cn("aw-business-combo")} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}><input className={cn('aw-business-input')} id={id} role="combobox" aria-autocomplete="list" aria-expanded={open} aria-controls={`${id}-options`} aria-activedescendant={open && matches[active] ? `${id}-option-${active}` : undefined} value={query}  onFocus={() => setOpen(true)} onChange={event => { setQuery(event.target.value); setSelected(''); setActive(0); setOpen(true); }} onKeyDown={event => { if (['ArrowDown','ArrowUp'].includes(event.key)) { event.preventDefault(); setOpen(true); setActive(value => matches.length ? (value + (event.key === 'ArrowDown' ? 1 : -1) + matches.length) % matches.length : 0); } else if (event.key === 'Enter' && open && matches[active]) { event.preventDefault(); choose(matches[active]); } else if (event.key === 'Escape') setOpen(false); }} placeholder={"输入“管理”或“目录”"}  /><AnimatePresence>{open ? <DropdownSurface data-ui="aw-business-combo-list" key="suggestions" className={cn("aw-business-combo-list")}><ul data-ui="aw-business-options" id={`${id}-options`} role="listbox" className={cn("aw-business-options")}>{matches.length ? matches.map((item,index) => <li key={item} id={`${id}-option-${index}`} role="option" aria-selected={active === index}><button className={cn('aw-business-button-feedback')}   onPointerDown={event => event.preventDefault()} onClick={() => choose(item)} type={"button"} tabIndex={-1} >{item}</button></li>) : <li data-ui="aw-business-empty" className={cn("aw-business-empty")}>没有匹配的入口</li>}</ul></DropdownSurface> : null}</AnimatePresence></div></Field><div data-ui="aw-business-row" className={cn("aw-business-row")}><Button  onClick={() => { setQuery(''); setSelected(''); setOpen(false); }} variant={"secondary"} type={"button"} >清空</Button><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">{selected ? `已选择：${selected}` : '尚未选择入口'}</p></div></BusinessDemo>;
}
```

### 完整组件 API

| 参数 | 类型 | 必填 | 上游默认值 | 中文说明 |
|---|---|---|---|---|
| `Field.label` | `string` | 是 | `未指定` | 向用户或辅助技术说明控件的名称。 |
| `Field.children` | `ReactNode` | 是 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `Field.hint` | `string` | 否 | `未指定` | 与字段一起显示的帮助文字。 |
| `Field.htmlFor` | `string` | 否 | `(isControl ? children.props.id : undefined)` | 关联控件的 id，让标签点击与辅助技术定位到该控件。 |
| `Field.control` | `boolean` | 否 | `false` | 是否控制，决定该分支的展示或交互行为。 |
| `input.className` | `string \| undefined` | 否 | `未指定` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `input.id` | `string \| undefined` | 否 | `未指定` | 原生控件或容器的唯一标识，用于标签关联、焦点与无障碍引用。 |
| `input.role` | `AriaRole \| undefined` | 否 | `未指定` | 辅助技术使用的元素角色，须与实际键盘和交互行为相匹配。 |
| `input.aria-autocomplete` | `"inline" \| "none" \| "list" \| "both" \| undefined` | 否 | `未指定` | 辅助技术的 autocomplete 状态或说明；值须与控件当前可观察行为一致。 |
| `input.aria-expanded` | `Booleanish \| undefined` | 否 | `未指定` | 辅助技术的 expanded 状态或说明；值须与控件当前可观察行为一致。 |
| `input.aria-controls` | `string \| undefined` | 否 | `未指定` | 辅助技术的 controls 状态或说明；值须与控件当前可观察行为一致。 |
| `input.aria-activedescendant` | `string \| undefined` | 否 | `未指定` | 辅助技术的 activedescendant 状态或说明；值须与控件当前可观察行为一致。 |
| `input.value` | `string \| number \| readonly string[] \| undefined` | 否 | `未指定` | 当前受控值，由调用方维护并随交互回调更新。 |
| `input.placeholder` | `string \| undefined` | 否 | `未指定` | 尚未填写或选择时显示的提示文字。 |
| `input.onFocus` | `FocusEventHandler<HTMLInputElement> \| undefined` | 否 | `未指定` | 焦点时执行的回调；按签名接收事件或结果，调用方在函数中同步业务状态。 |
| `input.onChange` | `ChangeEventHandler<HTMLInputElement> \| undefined` | 否 | `未指定` | 用户改变值或条目顺序时通知调用方；回调参数类型就是应写回的值或原生事件。 |
| `input.onKeyDown` | `KeyboardEventHandler<HTMLInputElement> \| undefined` | 否 | `未指定` | 身份标识down时执行的回调；按签名接收事件或结果，调用方在函数中同步业务状态。 |
| `DropdownSurface.children` | `ReactNode` | 是 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `DropdownSurface.className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `DropdownSurface.style` | `CSSProperties` | 否 | `未指定` | 容器的 React 内联样式对象，尺寸、布局与 CSS 属性按 CSSProperties 传入。 |
| `DropdownSurface.surfaceRef` | `Ref<HTMLDivElement>` | 否 | `未指定` | 连接弹出面板的 DOM ref，供调用方测量与管理焦点。 |
| `button.className` | `string \| undefined` | 否 | `未指定` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `button.type` | `"button" \| "reset" \| "submit" \| undefined` | 否 | `未指定` | 原生输入或按钮的行为类型；按钮类型会影响表单提交。 |
| `button.tabIndex` | `number \| undefined` | 否 | `未指定` | 键盘 Tab 导航的焦点顺序。 |
| `button.onPointerDown` | `PointerEventHandler<HTMLButtonElement> \| undefined` | 否 | `未指定` | 指针down时执行的回调；按签名接收事件或结果，调用方在函数中同步业务状态。 |
| `button.onClick` | `MouseEventHandler<HTMLButtonElement> \| undefined` | 否 | `未指定` | 用户点击或通过键盘激活时触发的事件处理函数。 |
| `button.children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `Button.type` | `"button" \| "reset" \| "submit" \| undefined` | 否 | `'button'` | 原生输入或按钮的行为类型；按钮类型会影响表单提交。 |
| `Button.className` | `string \| undefined` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `Button.children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `Button.variant` | `'primary' \| 'secondary' \| 'danger' \| 'ghost'` | 否 | `'primary'` | 选择组件内置的外观或效果变体。 |
| `Button.ref` | `Ref<HTMLButtonElement>` | 否 | `未指定` | 连接实际 DOM 元素或组件命令句柄，支持类型声明中的 ref 形式。 |

本示例函数不接收额外公开 Props，能力由原生元素与上述叶组件组合；下面列出实际继承类型和可编辑示例配置。

**继承的原生属性：**

- `DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `ButtonHTMLAttributes<HTMLButtonElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**children 的真实接入：**

```tsx
children={<><div data-ui="aw-business-combo" className={cn("aw-business-combo")} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}><input className={cn('aw-business-input')} id={id} role="combobox" aria-autocomplete="list" aria-expanded={open} aria-controls={`${id}-options`} aria-activedescendant={open && matches[active] ? `${id}-option-${active}` : undefined} value={query} placeholder="输入“管理”或“目录”" onFocus={() => setOpen(true)} onChange={event => { setQuery(event.target.value); setSelected(''); setActive(0); setOpen(true); }} onKeyDown={event => { if (['ArrowDown','ArrowUp'].includes(event.key)) { event.preventDefault(); setOpen(true); setActive(value => matches.length ? (value + (event.key === 'ArrowDown' ? 1 : -1) + matches.length) % matches.length : 0); } else if (event.key === 'Enter' && open && matches[active]) { event.preventDefault(); choose(matches[active]); } else if (event.key === 'Escape') setOpen(false); }} /><AnimatePresence>{open ? <DropdownSurface data-ui="aw-business-combo-list" key="suggestions" className={cn("aw-business-combo-list")}><ul data-ui="aw-business-options" id={`${id}-options`} role="listbox" className={cn("aw-business-options")}>{matches.length ? matches.map((item,index) => <li key={item} id={`${id}-option-${index}`} role="option" aria-selected={active === index}><button className={cn('aw-business-button-feedback')} type="button" tabIndex={-1} onPointerDown={event => event.preventDefault()} onClick={() => choose(item)}>{item}</button></li>) : <li data-ui="aw-business-empty" className={cn("aw-business-empty")}>没有匹配的入口</li>}</ul></DropdownSurface> : null}</AnimatePresence></div></>}
```

**children 的真实接入：**

```tsx
children={<><ul data-ui="aw-business-options" id={`${id}-options`} role="listbox" className={cn("aw-business-options")}>{matches.length ? matches.map((item,index) => <li key={item} id={`${id}-option-${index}`} role="option" aria-selected={active === index}><button className={cn('aw-business-button-feedback')} type="button" tabIndex={-1} onPointerDown={event => event.preventDefault()} onClick={() => choose(item)}>{item}</button></li>) : <li data-ui="aw-business-empty" className={cn("aw-business-empty")}>没有匹配的入口</li>}</ul></>}
```

**style 的真实接入：**

```tsx
style={{ width: "100%", minHeight: 240 }}
```

**surfaceRef 的真实接入：**

```tsx
const elementRef = useRef<HTMLDivElement | null>(null);
// JSX: surfaceRef={elementRef}
```

**children 的真实接入：**

```tsx
children={<>清空</>}
```

**ref 的真实接入：**

```tsx
const elementRef = useRef<HTMLButtonElement | null>(null);
// JSX: ref={elementRef}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，不改写上游 API。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.label` | `"搜索工作入口"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.control` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t1.placeholder` | `"输入“管理”或“目录”"` | text | 不限 ~ 不限 | 即时应用 |
| `t3.type` | `"button"` | select | "button" / "reset" / "submit" | 即时应用 |
| `t3.tabIndex` | `-1` | number | 不限 ~ 不限 | 即时应用 |
| `t4.variant` | `"secondary"` | select | "primary" / "secondary" / "danger" / "ghost" | 即时应用 |
| `t4.type` | `"button"` | select | "button" / "reset" / "submit" | 即时应用 |
| `state.query` | `""` | text | 不限 ~ 不限 | 即时应用；原组件回调同步受控值 |

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

选型有疑问时返回 [业务表单](../categories/form.md)，先比较最多 2–3 项。
