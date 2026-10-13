# CascadeSelect

表单与选择 · `business-cascadeselect` · 中文意图：级联选择 / 地区层级 / 逐层选择

## 1. 什么场景使用

选择必须沿父子依赖逐层展开，父项变化清除子项。

**不适合或优先替代：**完整树可见时用TreeSelect；无层级关系用Select。

先确认本次任务要解决的业务行为，再选择本组件。普通业务页面优先使用这里的基础能力；只有用户明确要求装饰效果时才追加效果组件。

## 2. 只加载这一项

1. 只读本指南，确认用途与边界。
2. 只读 [src/business/demos/form/business-cascadeselect.tsx](../../../src/business/demos/form/business-cascadeselect.tsx)；需核对 API 与 DIY 配置时读 [本项参数记录](../../../src/parameters/definitions/business-cascadeselect.json)；共享基础有需要才读 [support.tsx](../../../src/business/support.tsx)。
3. 本例从 components 按需导入独立控件；只读实际导入的 .tsx 及同名 .module.css。布局工具类也显式使用 CSS Modules，不给整块区域的 button/input 套统一动效。
4. 涉及业务错误、权限、数据或异步行为时才追加对应契约：[06-select](../../contracts/06-select.md)。
5. 预览库使用本项独立 import() 入口；复制到目标项目时也只接入所需组件和直接依赖。

所有实现使用本项目已有 React、原生语义控件、Motion 和 CSS。完整交互、类型与回调以当前示例代码为准；局部弹性、下拉、媒体与日历效果见 [交互动效指南](../motion-guide.md)。

## 3. 本例真实用法

下面来自当前独立示例。默认导出是一个可运行实例；复制后把本地选项、数据与回调接到目标项目已有业务层，不把演示结果当作后端成功。

```tsx
// 当前 CascadeSelect 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import ownedStyles0 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { useId, useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Field } from '../../components/Field';
import { AnimatedSelect } from '../../components/AnimatedSelect';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessCascadeSelectDemo() {
  const groups = [{ label: '研发', teams: [{ label: '界面组', members: ['林清', '周远'] }, { label: '平台组', members: ['陈宁', '许安'] }] }, { label: '服务', teams: [{ label: '支持组', members: ['赵禾', '沈言'] }] }];
  const [department, setDepartment] = useState("");
  const [team, setTeam] = useState("");
  const [member, setMember] = useState("");
  const prefix = useId();
  const teams = groups.find(item => item.label === department)?.teams ?? [];
  const members = teams.find(item => item.label === team)?.members ?? [];
  return <BusinessDemo title="CascadeSelect" description="按区域、团队、成员三级联动选择；弹性下拉保持各级状态清晰。">
    <div data-ui="aw-business-grid" className={cn("aw-business-grid")}>
      <Field  htmlFor={`${prefix}-department`} label={"区域"} control={false} ><AnimatedSelect id={`${prefix}-department`}   value={department}  onChange={value => { setDepartment(value); setTeam(''); setMember(''); }} label={"区域"} placeholder={"请选择区域"} options={["研发", "服务"]} disabled={false}  /></Field>
      <Field  htmlFor={`${prefix}-team`} label={"团队"} control={false} ><AnimatedSelect id={`${prefix}-team`}   disabled={!department} value={team} options={teams.map(item => item.label)} onChange={value => { setTeam(value); setMember(''); }} label={"团队"} placeholder={"请选择团队"}  /></Field>
      <Field  htmlFor={`${prefix}-member`} label={"成员"} control={false} ><AnimatedSelect id={`${prefix}-member`}   disabled={!team} value={member} options={members} onChange={setMember} label={"成员"} placeholder={"请选择成员"}  /></Field>
    </div><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">{member ? `${department} / ${team} / ${member}` : '请选择完整的层级。'}</p>
  </BusinessDemo>;
}
```

### 完整组件 API

源码默认值来自本包业务实现；本例默认配置来自独立示例，两者可能不同。

本例默认导出是可运行演示入口。下表无前缀参数属于 [AnimatedSelect](../../../src/business/components/AnimatedSelect.tsx) 的组件 API，带前缀参数属于对应叶组件；这些参数不表示演示函数本身接收相同 Props。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `id` | `string` | 否 | `generatedId` | 原生控件或容器的唯一标识，用于标签关联、焦点与无障碍引用。 |
| `value` | `string` | 是 | `未指定` | 当前受控值，由调用方维护并随交互回调更新。 |
| `options` | `readonly (string \| { value: string; label: string })[]` | 是 | `未指定` | 可选择的候选项，显示标签与提交值按选项类型定义。 |
| `onChange` | `(value: string) => void` | 是 | `未指定` | 用户改变值或条目顺序时通知调用方；回调参数类型就是应写回的值或原生事件。 |
| `label` | `string` | 是 | `未指定` | 向用户或辅助技术说明控件的名称。 |
| `placeholder` | `string` | 否 | `'请选择'` | 尚未填写或选择时显示的提示文字。 |
| `disabled` | `boolean` | 否 | `false` | 是否禁用控件的用户交互。 |
| `Field · t0.label` | `string` | 是 | `未指定` | 向用户或辅助技术说明控件的名称。 |
| `Field · t0.children` | `ReactNode` | 是 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `Field · t0.hint` | `string` | 否 | `未指定` | 与字段一起显示的帮助文字。 |
| `Field · t0.htmlFor` | `string` | 否 | `(isControl ? children.props.id : undefined)` | 关联控件的 id，让标签点击与辅助技术定位到该控件。 |
| `Field · t0.control` | `boolean` | 否 | `false` | 是否控制，决定该分支的展示或交互行为。 |

**options 的真实接入：**

```tsx
options={groups.map(item => item.label)}
```

**onChange 的真实接入：**

```tsx
onChange={value => { setDepartment(value); setTeam(''); setMember(''); }}
```

**children 的真实接入：**

```tsx
children={<><AnimatedSelect id={`${prefix}-department`} label="区域" placeholder="请选择区域" value={department} options={groups.map(item => item.label)} onChange={value => { setDepartment(value); setTeam(''); setMember(''); }} /></>}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.label` | `"区域"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.control` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t1.label` | `"区域"` | text | 不限 ~ 不限 | 即时应用 |
| `t1.placeholder` | `"请选择区域"` | text | 不限 ~ 不限 | 即时应用 |
| `t1.options` | `["研发","服务"]` | json | 不限 ~ 不限 | 即时应用 |
| `t1.disabled` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t2.label` | `"团队"` | text | 不限 ~ 不限 | 即时应用 |
| `t2.control` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t3.label` | `"团队"` | text | 不限 ~ 不限 | 即时应用 |
| `t3.placeholder` | `"请选择团队"` | text | 不限 ~ 不限 | 即时应用 |
| `t4.label` | `"成员"` | text | 不限 ~ 不限 | 即时应用 |
| `t4.control` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t5.label` | `"成员"` | text | 不限 ~ 不限 | 即时应用 |
| `t5.placeholder` | `"请选择成员"` | text | 不限 ~ 不限 | 即时应用 |
| `state.department` | `""` | text | 不限 ~ 不限 | 即时应用；原组件回调同步受控值 |
| `state.team` | `""` | text | 不限 ~ 不限 | 即时应用；原组件回调同步受控值 |
| `state.member` | `""` | text | 不限 ~ 不限 | 即时应用；原组件回调同步受控值 |

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
