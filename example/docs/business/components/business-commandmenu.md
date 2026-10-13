# CommandMenu

导航与菜单 · `business-commandmenu` · 中文意图：命令面板 / 快捷检索 / 动作搜索

## 1. 什么场景使用

很多动作需要统一搜索、方向键选择和Enter触发。

**不适合或优先替代：**少量固定动作使用Menu或可见Button。

先确认本次任务要解决的业务行为，再选择本组件。普通业务页面优先使用这里的基础能力；只有用户明确要求装饰效果时才追加效果组件。

## 2. 只加载这一项

1. 只读本指南，确认用途与边界。
2. 只读 [src/business/demos/navigation/business-commandmenu.tsx](../../../src/business/demos/navigation/business-commandmenu.tsx)；需核对 API 与 DIY 配置时读 [本项参数记录](../../../src/parameters/definitions/business-commandmenu.json)；共享基础有需要才读 [support.tsx](../../../src/business/support.tsx)。
3. 本例从 components 按需导入独立控件；只读实际导入的 .tsx 及同名 .module.css。布局工具类也显式使用 CSS Modules，不给整块区域的 button/input 套统一动效。
4. 涉及业务错误、权限、数据或异步行为时才追加对应契约：[02-sidebar](../../contracts/02-sidebar.md)、[12-row-actions](../../contracts/12-row-actions.md)、[03-header](../../contracts/03-header.md)。
5. 预览库使用本项独立 import() 入口；复制到目标项目时也只接入所需组件和直接依赖。

所有实现使用本项目已有 React、原生语义控件、Motion 和 CSS。完整交互、类型与回调以当前示例代码为准；局部弹性、下拉、媒体与日历效果见 [交互动效指南](../motion-guide.md)。

## 3. 本例真实用法

下面来自当前独立示例。默认导出是一个可运行实例；复制后把本地选项、数据与回调接到目标项目已有业务层，不把演示结果当作后端成功。

```tsx
// 当前 CommandMenu 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import inputStyles from '../../components/Input.module.css';
import { useEffect, useId, useState } from 'react';
import { ArrowDown, ArrowUp, CornerDownLeft, Files, ListTodo, Search, Settings } from 'lucide-react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { CommandTabs } from '../../components/CommandTabs';
import { Dialog } from '../../components/Dialog';
import { Field } from '../../components/Field';
import { commandIndexForKey, commandSelectionIndex, filterCommandEntries } from '../../components/command-menu-state';
import styles from './business-commandmenu.module.css';

const commands = [
  { id: 'tasks', label: '查看任务', category: 'tasks', description: '打开当前工作空间的任务入口', icon: ListTodo },
  { id: 'files', label: '查看资料', category: 'files', description: '打开当前工作空间的资料入口', icon: Files },
  { id: 'settings', label: '查看设置', category: 'settings', description: '打开当前工作空间的设置入口', icon: Settings }
];
const categories = [{ value: 'all', label: '全部' }, { value: 'tasks', label: '任务' }, { value: 'files', label: '资料' }, { value: 'settings', label: '设置' }];

export default function BusinessCommandMenuDemo() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [active, setActive] = useState(0);
  const [message, setMessage] = useState('尚未选择命令');
  const prefix = useId();
  const panelId = `${prefix}-command-panel`;
  const visible = filterCommandEntries(commands, query, category);
  const selectedIndex = commandSelectionIndex(active, visible.length);
  const selectedCommand = selectedIndex === null ? undefined : visible[selectedIndex];
  const tabs = categories.map(item => ({ ...item, count: filterCommandEntries(commands, query, item.value).length }));

  // DIY parameters change the filters directly, without invoking the input callbacks.
  useEffect(() => { setActive(0); }, [query, category]);

  function execute(label: string) { setMessage('当前入口：' + label); setOpen(false); }

  return <BusinessDemo title="CommandMenu" description="打开命令面板搜索当前页面动作；支持上下键选择、Enter执行与Escape关闭。">
    <Button className={styles.trigger} onClick={() => { setQuery(''); setCategory('all'); setActive(0); setOpen(true); }} type={"button"} variant={"primary"} ><Search size={17} aria-hidden="true" />打开命令面板</Button>
    <Dialog open={open}  onClose={() => setOpen(false)} title={"命令面板"} >
      <div className={styles.commandPanel}>
        <CommandTabs items={tabs} value={category} idPrefix={prefix} panelId={panelId} onValueChange={value => { setCategory(value); setActive(0); }} />
        <Field  label={"搜索页面命令"} control={false} ><input data-ui="aw-business-input" className={inputStyles['aw-business-input']}  role="combobox" aria-expanded={open} aria-autocomplete="list" aria-controls="business-command-results" aria-activedescendant={selectedCommand ? `${prefix}-command-${selectedCommand.id}` : undefined}  value={query} onChange={event => { setQuery(event.target.value); setActive(0); }} onKeyDown={event => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            const next = commandIndexForKey(selectedIndex ?? 0, visible.length, event.key);
            if (next !== null) { event.preventDefault(); setActive(next); }
          }
          if (event.key === 'Enter' && selectedCommand) { event.preventDefault(); execute(selectedCommand.label); }
        }} autoFocus={true} placeholder={"搜索任务、资料或设置"}  /></Field>
        <section id={panelId} role="tabpanel" aria-labelledby={`${prefix}-category-${category}`} className={styles.resultsPanel}>
          <div className={styles.resultHeading}><span>可运行的命令</span><span>{visible.length} 条</span></div>
          <ul id="business-command-results" role="listbox" aria-label="可运行的命令" className={styles.results}>
            {visible.map(({ id, label, description, icon: Icon }, index) => <li key={id} role="presentation" className={styles.result}><Button id={`${prefix}-command-${id}`}  role="option" aria-selected={selectedIndex === index} tabIndex={-1} className={styles.commandItem} onPointerMove={() => setActive(index)} onClick={() => execute(label)} variant={"ghost"} type={"button"} >
              <span className={styles.commandIcon}><Icon size={18} aria-hidden="true" /></span><span className={styles.commandCopy}><span className={styles.commandLabel}>{label}</span><span className={styles.commandDescription}>{description}</span></span><CornerDownLeft className={styles.enterIcon} size={15} aria-hidden="true" />
            </Button></li>)}
          </ul>
          {!visible.length ? <p role="status" className={styles.empty}>没有匹配的命令。</p> : null}
        </section>
        <div className={styles.keyboardHelp} aria-hidden="true"><span className={styles.keyHint}><kbd className={styles.key}><ArrowUp size={11} /><ArrowDown size={11} /></kbd>选择</span><span className={styles.keyHint}><kbd className={styles.key}>Enter</kbd>执行</span><span className={styles.keyHint}><kbd className={styles.key}>Esc</kbd>关闭</span></div>
      </div>
    </Dialog>
    <section data-ui="aw-business-item" className={styles.status} role="status">{message}</section>
  </BusinessDemo>;
}
```

### 完整组件 API

源码默认值来自本包业务实现；本例默认配置来自独立示例，两者可能不同。

本例默认导出是由原生元素与叶组件组成的演示函数，不接收公开 Props。下表按叶组件前缀列出实际 API；原生属性类型单独注明。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `Button · t0.type` | `"button" \| "reset" \| "submit" \| undefined` | 否 | `'button'` | 原生输入或按钮的行为类型；按钮类型会影响表单提交。 |
| `Button · t0.className` | `string \| undefined` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `Button · t0.children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `Button · t0.variant` | `'primary' \| 'secondary' \| 'danger' \| 'ghost'` | 否 | `'primary'` | 选择组件内置的外观或效果变体。 |
| `Button · t0.ref` | `Ref<HTMLButtonElement>` | 否 | `未指定` | 连接实际 DOM 元素或组件命令句柄，支持类型声明中的 ref 形式。 |
| `Dialog.open` | `boolean` | 是 | `!dialog.open` | 是否展开或显示内容，由调用方控制。 |
| `Dialog.onClose` | `() => void` | 是 | `未指定` | 请求关闭弹层、对话框或提示时调用，调用方同步更新 open 状态。 |
| `Dialog.title` | `string` | 是 | `未指定` | 组件标题或原生元素提示文字。 |
| `Dialog.children` | `ReactNode` | 是 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `Dialog.side` | `'right' \| 'left' \| 'top' \| 'bottom'` | 否 | `未指定` | 抽屉或浮层从哪个边缘出现。 |
| `CommandTabs.items` | `readonly CommandTabItem[]` | 是 | `未指定` | 参与渲染或交互的条目列表，每项字段和可选内容按完整类型传入。 |
| `CommandTabs.value` | `string` | 是 | `未指定` | 当前受控值，由调用方维护并随交互回调更新。 |
| `CommandTabs.onValueChange` | `(value: string) => void` | 是 | `未指定` | 交互产生新的值时通知调用方。 |
| `CommandTabs.idPrefix` | `string` | 是 | `未指定` | 标识前缀，控制 business commandmenu 的对应渲染或交互参数。 |
| `CommandTabs.panelId` | `string` | 是 | `未指定` | 面板标识，控制 business commandmenu 的对应渲染或交互参数。 |
| `Field.label` | `string` | 是 | `未指定` | 向用户或辅助技术说明控件的名称。 |
| `Field.children` | `ReactNode` | 是 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `Field.hint` | `string` | 否 | `未指定` | 与字段一起显示的帮助文字。 |
| `Field.htmlFor` | `string` | 否 | `(isControl ? children.props.id : undefined)` | 关联控件的 id，让标签点击与辅助技术定位到该控件。 |
| `Field.control` | `boolean` | 否 | `false` | 是否控制，决定该分支的展示或交互行为。 |
| `input.data-ui` | `any` | 否 | `未指定` | 示例在 DOM 上使用的 ui 数据标记，供局部样式或状态定位读取。 |
| `input.className` | `string \| undefined` | 否 | `未指定` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `input.autoFocus` | `boolean \| undefined` | 否 | `未指定` | 是否自动焦点，决定该分支的展示或交互行为。 |
| `input.role` | `AriaRole \| undefined` | 否 | `未指定` | 辅助技术使用的元素角色，须与实际键盘和交互行为相匹配。 |
| `input.aria-expanded` | `Booleanish \| undefined` | 否 | `未指定` | 辅助技术的 expanded 状态或说明；值须与控件当前可观察行为一致。 |
| `input.aria-autocomplete` | `"inline" \| "none" \| "list" \| "both" \| undefined` | 否 | `未指定` | 辅助技术的 autocomplete 状态或说明；值须与控件当前可观察行为一致。 |
| `input.aria-controls` | `string \| undefined` | 否 | `未指定` | 辅助技术的 controls 状态或说明；值须与控件当前可观察行为一致。 |
| `input.aria-activedescendant` | `string \| undefined` | 否 | `未指定` | 辅助技术的 activedescendant 状态或说明；值须与控件当前可观察行为一致。 |
| `input.placeholder` | `string \| undefined` | 否 | `未指定` | 尚未填写或选择时显示的提示文字。 |
| `input.value` | `string \| number \| readonly string[] \| undefined` | 否 | `未指定` | 当前受控值，由调用方维护并随交互回调更新。 |
| `input.onChange` | `ChangeEventHandler<HTMLInputElement> \| undefined` | 否 | `未指定` | 用户改变值或条目顺序时通知调用方；回调参数类型就是应写回的值或原生事件。 |
| `input.onKeyDown` | `KeyboardEventHandler<HTMLInputElement> \| undefined` | 否 | `未指定` | 身份标识down时执行的回调；按签名接收事件或结果，调用方在函数中同步业务状态。 |

本示例函数不接收额外公开 Props，能力由原生元素与上述叶组件组合；下面列出实际继承类型和可编辑示例配置。

**继承的原生属性：**

- `DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `ButtonHTMLAttributes<HTMLButtonElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**children 的真实接入：**

```tsx
children={<><Search size={17} aria-hidden="true" />打开命令面板</>}
```

**ref 的真实接入：**

```tsx
const elementRef = useRef<HTMLButtonElement | null>(null);
// JSX: ref={elementRef}
```

**onClose 的真实接入：**

```tsx
onClose={() => setOpen(false)}
```

**children 的真实接入：**

```tsx
children={<><div className={styles.commandPanel}>
        <CommandTabs items={tabs} value={category} idPrefix={prefix} panelId={panelId} onValueChange={value => { setCategory(value); setActive(0); }} />
        <Field label="搜索页面命令"><input data-ui="aw-business-input" className={inputStyles['aw-business-input']} autoFocus role="combobox" aria-expanded={open} aria-autocomplete="list" aria-controls="business-command-results" aria-activedescendant={selectedCommand ? `${prefix}-command-${selectedCommand.id}` : undefined} placeholder="搜索任务、资料或设置" value={query} onChange={event => { setQuery(event.target.value); setActive(0); }} onKeyDown={event => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            const next = commandIndexForKey(selectedIndex ?? 0, visible.length, event.key);
            if (next !== null) { event.preventDefault(); setActive(next); }
          }
          if (event.key === 'Enter' && selectedCommand) { event.preventDefault(); execute(selectedCommand.label); }
        }} /></Field>
        <section id={panelId} role="tabpanel" aria-labelledby={`${prefix}-category-${category}`} className={styles.resultsPanel}>
          <div className={styles.resultHeading}><span>可运行的命令</span><span>{visible.length} 条</span></div>
          <ul id="business-command-results" role="listbox" aria-label="可运行的命令" className={styles.results}>
            {visible.map(({ id, label, description, icon: Icon }, index) => <li key={id} role="presentation" className={styles.result}><Button id={`${prefix}-command-${id}`} variant="ghost" role="option" aria-selected={selectedIndex === index} tabIndex={-1} className={styles.commandItem} onPointerMove={() => setActive(index)} onClick={() => execute(label)}>
              <span className={styles.commandIcon}><Icon size={18} aria-hidden="true" /></span><span className={styles.commandCopy}><span className={styles.commandLabel}>{label}</span><span className={styles.commandDescription}>{description}</span></span><CornerDownLeft className={styles.enterIcon} size={15} aria-hidden="true" />
            </Button></li>)}
          </ul>
          {!visible.length ? <p role="status" className={styles.empty}>没有匹配的命令。</p> : null}
        </section>
        <div className={styles.keyboardHelp} aria-hidden="true"><span className={styles.keyHint}><kbd className={styles.key}><ArrowUp size={11} /><ArrowDown size={11} /></kbd>选择</span><span className={styles.keyHint}><kbd className={styles.key}>Enter</kbd>执行</span><span className={styles.keyHint}><kbd className={styles.key}>Esc</kbd>关闭</span></div>
      </div></>}
```

**items 的真实接入：**

```tsx
items={tabs}
```

**onValueChange 的真实接入：**

```tsx
onValueChange={value => { setCategory(value); setActive(0); }}
```

**children 的真实接入：**

```tsx
children={<><input data-ui="aw-business-input" className={inputStyles['aw-business-input']} autoFocus role="combobox" aria-expanded={open} aria-autocomplete="list" aria-controls="business-command-results" aria-activedescendant={selectedCommand ? `${prefix}-command-${selectedCommand.id}` : undefined} placeholder="搜索任务、资料或设置" value={query} onChange={event => { setQuery(event.target.value); setActive(0); }} onKeyDown={event => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            const next = commandIndexForKey(selectedIndex ?? 0, visible.length, event.key);
            if (next !== null) { event.preventDefault(); setActive(next); }
          }
          if (event.key === 'Enter' && selectedCommand) { event.preventDefault(); execute(selectedCommand.label); }
        }} /></>}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.type` | `"button"` | select | "button" / "reset" / "submit" | 即时应用 |
| `t0.variant` | `"primary"` | select | "primary" / "secondary" / "danger" / "ghost" | 即时应用 |
| `t1.title` | `"命令面板"` | text | 不限 ~ 不限 | 即时应用 |
| `t3.label` | `"搜索页面命令"` | text | 不限 ~ 不限 | 即时应用 |
| `t3.control` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t4.autoFocus` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t4.placeholder` | `"搜索任务、资料或设置"` | text | 不限 ~ 不限 | 即时应用 |
| `t5.variant` | `"ghost"` | select | "primary" / "secondary" / "danger" / "ghost" | 即时应用 |
| `t5.type` | `"button"` | select | "button" / "reset" / "submit" | 即时应用 |
| `state.open` | `false` | switch | 不限 ~ 不限 | 即时应用；原组件回调同步受控值 |
| `state.query` | `""` | text | 不限 ~ 不限 | 即时应用；原组件回调同步受控值 |
| `state.category` | `"all"` | select | "all" / "tasks" / "files" / "settings" | 即时应用；原组件回调同步受控值 |

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

选型有疑问时返回 [导航与菜单](../categories/navigation.md)，先比较最多 2–3 项。
