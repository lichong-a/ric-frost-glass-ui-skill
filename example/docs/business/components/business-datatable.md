# DataTable

数据与文件 · `business-datatable` · 中文意图：数据表格 / 排序分页 / 批量数据

## 1. 什么场景使用

结构化记录需要列比较、搜索、排序和分页。

**不适合或优先替代：**卡片内容浏览用DataView；大数据需服务端分页。

先确认本次任务要解决的业务行为，再选择本组件。普通业务页面优先使用这里的基础能力；只有用户明确要求装饰效果时才追加效果组件。

## 2. 只加载这一项

1. 只读本指南，确认用途与边界。
2. 只读 [src/business/demos/data/business-datatable.tsx](../../../src/business/demos/data/business-datatable.tsx)；需核对 API 与 DIY 配置时读 [本项参数记录](../../../src/parameters/definitions/business-datatable.json)；共享基础有需要才读 [support.tsx](../../../src/business/support.tsx)。
3. 本例从 components 按需导入独立控件；只读实际导入的 .tsx 及同名 .module.css。布局工具类也显式使用 CSS Modules，不给整块区域的 button/input 套统一动效。
4. 涉及业务错误、权限、数据或异步行为时才追加对应契约：[11-data-table](../../contracts/11-data-table.md)、[16-pagination](../../contracts/16-pagination.md)、[13-import-dialog](../../contracts/13-import-dialog.md)。
5. 预览库使用本项独立 import() 入口；复制到目标项目时也只接入所需组件和直接依赖。

所有实现使用本项目已有 React、原生语义控件、Motion 和 CSS。完整交互、类型与回调以当前示例代码为准；局部弹性、下拉、媒体与日历效果见 [交互动效指南](../motion-guide.md)。

## 3. 本例真实用法

下面来自当前独立示例。默认导出是一个可运行实例；复制后把本地选项、数据与回调接到目标项目已有业务层，不把演示结果当作后端成功。

```tsx
// 当前 DataTable 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：680px（宿主设置，不是组件 Props）。
import { useEffect, useState } from 'react';
import { ArrowDown, ArrowDownUp, ArrowUp, Search } from 'lucide-react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { SpringCheckbox } from '../../components/SpringCheckbox';
import { Field } from '../../components/Field';
import { AnimatedSelect } from '../../components/AnimatedSelect';
import { Pager } from '../../components/Pager';
import { pagerState } from '../../components/pager-state';
import { workItems } from '../../data';
import inputStyles from '../../components/Input.module.css';
import styles from '../../components/DataTable.module.css';

export default function BusinessDataTableDemo() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<'title' | 'quantity'>('title');
  const [ascending, setAscending] = useState(true);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const [selected, setSelected] = useState<string[]>([]);
  const filtered = workItems
    .filter(item => item.title.includes(query) || item.category.includes(query))
    .sort((a, b) => (sort === 'title' ? a.title.localeCompare(b.title, 'zh-CN') : a.quantity - b.quantity) * (ascending ? 1 : -1));
  const pagination = pagerState(page, pageSize, filtered.length);
  const visible = filtered.slice(pagination.start, pagination.end);
  const sizes = [...new Set([1, 3, 6, pagination.pageSize])].sort((a, b) => a - b);
  useEffect(() => {
    if (page !== pagination.current) setPage(pagination.current);
    if (pageSize !== pagination.pageSize) setPageSize(pagination.pageSize);
  }, [page, pageSize, pagination.current, pagination.pageSize, setPage, setPageSize]);
  function order(field: 'title' | 'quantity') {
    setAscending(field === sort ? !ascending : true);
    setSort(field);
    setPage(0);
  }
  function sortIcon(field: 'title' | 'quantity') {
    const Icon = sort !== field ? ArrowDownUp : ascending ? ArrowUp : ArrowDown;
    return <Icon size={15} aria-hidden="true" />;
  }
  return (
    <BusinessDemo title="DataTable" description="在本地任务表中搜索、排序、勾选和分页；没有网络写入。">
      <div className={styles.toolbar}>
        <Field  label={"搜索任务"} control={false} >
          <input data-ui="aw-business-input" className={inputStyles['aw-business-input']} value={query}  onChange={event => { setQuery(event.target.value); setPage(0); }} placeholder={"搜索任务或类别"}  />
        </Field>
        <Field   label={"每页数量"} control={true} >
          <AnimatedSelect  value={String(pagination.pageSize)} options={sizes.map(size => ({ value: String(size), label: `${size} 项` }))} onChange={value => { setPageSize(Number(value)); setPage(0); }} label={"每页数量"} placeholder={"请选择"} disabled={false}  />
        </Field>
        <span className={styles.resultCount}><Search size={14} aria-hidden="true" />共 {filtered.length} 项任务</span>
      </div>
      <div className={styles.tableWrap} role="region" aria-label="任务表格" tabIndex={0}>
        <table data-ui="aw-business-table" className={styles.table}>
          <thead className={styles.head}>
            <tr>
              <th scope="col" className={`${styles.headCell} ${styles.selectionColumn}`}>选择</th>
              <th scope="col" className={styles.headCell} aria-sort={sort === 'title' ? (ascending ? 'ascending' : 'descending') : 'none'}>
                <button  className={styles.sortControl} data-active={sort === 'title'} aria-label={`任务，点击按${sort === 'title' && ascending ? '降序' : '升序'}排列`} onClick={() => order('title')} type={"button"} >任务{sortIcon('title')}</button>
              </th>
              <th scope="col" className={styles.headCell}>类别</th>
              <th scope="col" className={`${styles.headCell} ${styles.numberColumn}`} aria-sort={sort === 'quantity' ? (ascending ? 'ascending' : 'descending') : 'none'}>
                <button  className={styles.sortControl} data-active={sort === 'quantity'} aria-label={`数量，点击按${sort === 'quantity' && ascending ? '降序' : '升序'}排列`} onClick={() => order('quantity')} type={"button"} >数量{sortIcon('quantity')}</button>
              </th>
            </tr>
          </thead>
          <tbody className={styles.body}>
            {visible.map(item => (
              <tr key={item.id} className={styles.row} data-selected={selected.includes(item.id)}>
                <td className={styles.bodyCell}><SpringCheckbox aria-label={'选择' + item.title} checked={selected.includes(item.id)} onChange={event => setSelected(current => event.target.checked ? (current.includes(item.id) ? current : [...current, item.id]) : current.filter(id => id !== item.id))} /></td>
                <td className={`${styles.bodyCell} ${styles.taskTitle}`}>{item.title}</td>
                <td className={styles.bodyCell}><span className={styles.category}>{item.category}</span></td>
                <td className={`${styles.bodyCell} ${styles.quantity}`}>{item.quantity}</td>
              </tr>
            ))}
            {!filtered.length ? <tr><td className={styles.empty} colSpan={4}>没有符合条件的任务。</td></tr> : null}
          </tbody>
        </table>
      </div>
      <Pager page={page} pageSize={pageSize} total={filtered.length} onChange={setPage} />
      <p data-ui="aw-business-status" className={styles.status} role="status">已选择 {selected.length} 项。</p>
    </BusinessDemo>
  );
}
```

### 完整组件 API

源码默认值来自本包业务实现；本例默认配置来自独立示例，两者可能不同。

本例默认导出是由原生元素与叶组件组成的演示函数，不接收公开 Props。下表按叶组件前缀列出实际 API；原生属性类型单独注明。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `Field · t0.label` | `string` | 是 | `未指定` | 向用户或辅助技术说明控件的名称。 |
| `Field · t0.children` | `ReactNode` | 是 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `Field · t0.hint` | `string` | 否 | `未指定` | 与字段一起显示的帮助文字。 |
| `Field · t0.htmlFor` | `string` | 否 | `(isControl ? children.props.id : undefined)` | 关联控件的 id，让标签点击与辅助技术定位到该控件。 |
| `Field · t0.control` | `boolean` | 否 | `false` | 是否控制，决定该分支的展示或交互行为。 |
| `input.data-ui` | `any` | 否 | `未指定` | 示例在 DOM 上使用的 ui 数据标记，供局部样式或状态定位读取。 |
| `input.className` | `string \| undefined` | 否 | `未指定` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `input.value` | `string \| number \| readonly string[] \| undefined` | 否 | `未指定` | 当前受控值，由调用方维护并随交互回调更新。 |
| `input.placeholder` | `string \| undefined` | 否 | `未指定` | 尚未填写或选择时显示的提示文字。 |
| `input.onChange` | `ChangeEventHandler<HTMLInputElement> \| undefined` | 否 | `未指定` | 用户改变值或条目顺序时通知调用方；回调参数类型就是应写回的值或原生事件。 |
| `AnimatedSelect.id` | `string` | 否 | `generatedId` | 原生控件或容器的唯一标识，用于标签关联、焦点与无障碍引用。 |
| `AnimatedSelect.value` | `string` | 是 | `未指定` | 当前受控值，由调用方维护并随交互回调更新。 |
| `AnimatedSelect.options` | `readonly (string \| { value: string; label: string })[]` | 是 | `未指定` | 可选择的候选项，显示标签与提交值按选项类型定义。 |
| `AnimatedSelect.onChange` | `(value: string) => void` | 是 | `未指定` | 用户改变值或条目顺序时通知调用方；回调参数类型就是应写回的值或原生事件。 |
| `AnimatedSelect.label` | `string` | 是 | `未指定` | 向用户或辅助技术说明控件的名称。 |
| `AnimatedSelect.placeholder` | `string` | 否 | `'请选择'` | 尚未填写或选择时显示的提示文字。 |
| `AnimatedSelect.disabled` | `boolean` | 否 | `false` | 是否禁用控件的用户交互。 |
| `button · t4.type` | `"button" \| "reset" \| "submit" \| undefined` | 否 | `未指定` | 原生输入或按钮的行为类型；按钮类型会影响表单提交。 |
| `button · t4.className` | `string \| undefined` | 否 | `未指定` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `button · t4.data-active` | `boolean` | 否 | `未指定` | 示例在 DOM 上使用的 active 数据标记，供局部样式或状态定位读取。 |
| `button · t4.aria-label` | `string \| undefined` | 否 | `未指定` | 辅助技术的 label 状态或说明；值须与控件当前可观察行为一致。 |
| `button · t4.onClick` | `MouseEventHandler<HTMLButtonElement> \| undefined` | 否 | `未指定` | 用户点击或通过键盘激活时触发的事件处理函数。 |
| `button · t4.children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `SpringCheckbox.checked` | `boolean \| undefined` | 否 | `inner` | 当前受控勾选状态，调用方在变更回调中写回。 |
| `SpringCheckbox.onChange` | `ChangeEventHandler<HTMLInputElement> \| undefined` | 否 | `未指定` | 用户改变值或条目顺序时通知调用方；回调参数类型就是应写回的值或原生事件。 |
| `SpringCheckbox.defaultChecked` | `boolean \| undefined` | 否 | `false` | 非受控模式首次挂载时的勾选状态。 |
| `SpringCheckbox.className` | `string \| undefined` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `SpringCheckbox.children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `Pager.page` | `number` | 是 | `未指定` | 当前分页页码。 |
| `Pager.pageSize` | `number` | 是 | `未指定` | 每页显示的条目数量。 |
| `Pager.total` | `number` | 是 | `未指定` | 参与分页的记录总数。 |
| `Pager.onChange` | `(page: number) => void` | 是 | `未指定` | 用户改变值或条目顺序时通知调用方；回调参数类型就是应写回的值或原生事件。 |

本示例函数不接收额外公开 Props，能力由原生元素与上述叶组件组合；下面列出实际继承类型和可编辑示例配置。

**继承的原生属性：**

- `DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<ThHTMLAttributes<HTMLTableHeaderCellElement>, HTMLTableHeaderCellElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `InputHTMLAttributes<HTMLInputElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**children 的真实接入：**

```tsx
children={<><input data-ui="aw-business-input" className={inputStyles['aw-business-input']} value={query} placeholder="搜索任务或类别" onChange={event => { setQuery(event.target.value); setPage(0); }} /></>}
```

**options 的真实接入：**

```tsx
options={sizes.map(size => ({ value: String(size), label: `${size} 项` }))}
```

**onChange 的真实接入：**

```tsx
onChange={value => { setPageSize(Number(value)); setPage(0); }}
```

**onChange 的真实接入：**

```tsx
onChange={event => setSelected(current => event.target.checked ? (current.includes(item.id) ? current : [...current, item.id]) : current.filter(id => id !== item.id))}
```

**children 的真实接入：**

```tsx
children={"示例"}
```

**onChange 的真实接入：**

```tsx
onChange={setPage}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.label` | `"搜索任务"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.control` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t1.placeholder` | `"搜索任务或类别"` | text | 不限 ~ 不限 | 即时应用 |
| `t2.label` | `"每页数量"` | text | 不限 ~ 不限 | 即时应用 |
| `t2.control` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t3.label` | `"每页数量"` | text | 不限 ~ 不限 | 即时应用 |
| `t3.placeholder` | `"请选择"` | text | 不限 ~ 不限 | 即时应用 |
| `t3.disabled` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t4.type` | `"button"` | select | "button" / "reset" / "submit" | 即时应用 |
| `t5.type` | `"button"` | select | "button" / "reset" / "submit" | 即时应用 |
| `state.query` | `""` | text | 不限 ~ 不限 | 即时应用；原组件回调同步受控值 |
| `state.page` | `0` | number | 0 ~ 不限 | 即时应用；原组件回调同步受控值 |
| `state.pageSize` | `3` | number | 1 ~ 100 | 即时应用；原组件回调同步受控值 |
| `state.selected` | `[]` | json | 不限 ~ 不限 | 即时应用；原组件回调同步受控值 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `680`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. 接入约束

- 颜色、阅读面、圆角、边界、焦点与阴影使用 Agent Ric Token，业务逻辑留在所属模块。
- 服务端状态、资源归属与动作权限由既有可信业务接口处理；前端输入限制只服务于体验。
- 保留本项键盘、名称、空状态、错误状态和恢复入口，清理拥有的监听、计时器、观察器与对象 URL。
- 文档中的本地数组、文件或短命令只用于示例；不增加未授权的上传、设备访问、外部写入或 shell 执行。
- 减少运动偏好下保留业务操作，仅停用短过渡；不要因为动效偏好关闭必要表单与菜单。

## 5. 场景级验收

按第 1 节实际业务任务检查状态变化、键盘路径、边界值、失败和取消。只报告运行过的检查；本指南和源码存在不等于已完成浏览器验收。

能力对照：此前没有独立可运行业务示例，规范和 CSS 不作为运行覆盖。

选型有疑问时返回 [数据与文件](../categories/data.md)，先比较最多 2–3 项。
