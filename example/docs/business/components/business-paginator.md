# Paginator

数据与文件 · `business-paginator` · 中文意图：分页控件 / 页码 / 切换每页条数

## 1. 什么场景使用

有界结果集需要前后页和每页数量选择。

**不适合或优先替代：**无限加载与服务端游标要按目标API设计。

先确认本次任务要解决的业务行为，再选择本组件。普通业务页面优先使用这里的基础能力；只有用户明确要求装饰效果时才追加效果组件。

## 2. 只加载这一项

1. 只读本指南，确认用途与边界。
2. 只读 [src/business/demos/data/business-paginator.tsx](../../../src/business/demos/data/business-paginator.tsx)；共享基础有需要才读 [support.tsx](../../../src/business/support.tsx)。
3. 本例从 components 按需导入独立控件；只读实际导入的 .tsx 及同名 .module.css。布局工具类也显式使用 CSS Modules，不给整块区域的 button/input 套统一动效。
4. 涉及业务错误、权限、数据或异步行为时才追加对应契约：[11-data-table](../../contracts/11-data-table.md)、[16-pagination](../../contracts/16-pagination.md)、[13-import-dialog](../../contracts/13-import-dialog.md)。
5. 预览库使用本项独立 import() 入口；复制到目标项目时也只接入所需组件和直接依赖。

所有实现使用本项目已有 React、原生语义控件、Motion 和 CSS。完整交互、类型与回调以当前示例代码为准；局部弹性、下拉、媒体与日历效果见 [交互动效指南](../motion-guide.md)。

## 3. 本例真实用法

下面来自当前独立示例。默认导出是一个可运行实例；复制后把本地选项、数据与回调接到目标项目已有业务层，不把演示结果当作后端成功。

```tsx
// 当前 Paginator 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Field } from '../../components/Field';
import { workItems } from '../../data';
import { Pager } from '../../components/Pager';
import { AnimatedSelect } from '../../components/AnimatedSelect';

const ownedStyles={};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessPaginatorDemo() {
  const [page,setPage]=useState(0); const [size,setSize]=useState(2);
  return <BusinessDemo title="Paginator" description="分页浏览本地记录，页容量改变时回到第一页。">
    <Field  label={"每页数量"} control={false} ><AnimatedSelect  value={String(size)} onChange={value=>{setSize(Number(value));setPage(0);}}  label={"每页数量"} options={[{ "value": "2", "label": "2 项" }, { "value": "3", "label": "3 项" }]} placeholder={"请选择"} disabled={false}  /></Field><ul>{workItems.slice(page*size,page*size+size).map(item=><li key={item.id}>{item.title}</li>)}</ul><Pager page={page} pageSize={size}  onChange={setPage} total={6}  />
  </BusinessDemo>;
}
```

### 完整组件 API

| 参数 | 类型 | 必填 | 上游默认值 | 中文说明 |
|---|---|---|---|---|
| `page` | `number` | 是 | `未指定` | 当前分页页码。 |
| `pageSize` | `number` | 是 | `未指定` | 每页显示的条目数量。 |
| `total` | `number` | 是 | `未指定` | 参与分页的记录总数。 |
| `onChange` | `(page: number) => void` | 是 | `未指定` | 用户改变值或条目顺序时通知调用方；回调参数类型就是应写回的值或原生事件。 |
| `Field.label` | `string` | 是 | `未指定` | 向用户或辅助技术说明控件的名称。 |
| `Field.children` | `ReactNode` | 是 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `Field.hint` | `string` | 否 | `未指定` | 与字段一起显示的帮助文字。 |
| `Field.htmlFor` | `string` | 否 | `(isControl ? children.props.id : undefined)` | 关联控件的 id，让标签点击与辅助技术定位到该控件。 |
| `Field.control` | `boolean` | 否 | `false` | 是否控制，决定该分支的展示或交互行为。 |
| `AnimatedSelect.id` | `string` | 否 | `generatedId` | 原生控件或容器的唯一标识，用于标签关联、焦点与无障碍引用。 |
| `AnimatedSelect.value` | `string` | 是 | `未指定` | 当前受控值，由调用方维护并随交互回调更新。 |
| `AnimatedSelect.options` | `readonly (string \| { value: string; label: string })[]` | 是 | `未指定` | 可选择的候选项，显示标签与提交值按选项类型定义。 |
| `AnimatedSelect.onChange` | `(value: string) => void` | 是 | `未指定` | 用户改变值或条目顺序时通知调用方；回调参数类型就是应写回的值或原生事件。 |
| `AnimatedSelect.label` | `string` | 是 | `未指定` | 向用户或辅助技术说明控件的名称。 |
| `AnimatedSelect.placeholder` | `string` | 否 | `'请选择'` | 尚未填写或选择时显示的提示文字。 |
| `AnimatedSelect.disabled` | `boolean` | 否 | `false` | 是否禁用控件的用户交互。 |

**onChange 的真实接入：**

```tsx
onChange={setPage}
```

**children 的真实接入：**

```tsx
children={<><AnimatedSelect label="每页数量" value={String(size)} onChange={value=>{setSize(Number(value));setPage(0);}} options={[{value:"2",label:"2 项"},{value:"3",label:"3 项"}]} /></>}
```

**options 的真实接入：**

```tsx
options={[{value:"2",label:"2 项"},{value:"3",label:"3 项"}]}
```

**onChange 的真实接入：**

```tsx
onChange={value=>{setSize(Number(value));setPage(0);}}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，不改写上游 API。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.label` | `"每页数量"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.control` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t1.label` | `"每页数量"` | text | 不限 ~ 不限 | 即时应用 |
| `t1.options` | `[{"value":"2","label":"2 项"},{"value":"3","label":"3 项"}]` | json | 不限 ~ 不限 | 即时应用 |
| `t1.placeholder` | `"请选择"` | text | 不限 ~ 不限 | 即时应用 |
| `t1.disabled` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t2.total` | `6` | number | 不限 ~ 不限 | 即时应用 |
| `state.page` | `0` | number | 不限 ~ 不限 | 即时应用；原组件回调同步受控值 |
| `state.size` | `2` | number | 不限 ~ 不限 | 即时应用；原组件回调同步受控值 |

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

选型有疑问时返回 [数据与文件](../categories/data.md)，先比较最多 2–3 项。
