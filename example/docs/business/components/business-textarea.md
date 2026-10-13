# Textarea

表单与选择 · `business-textarea` · 中文意图：多行文本 / 需求说明 / 备注

## 1. 什么场景使用

录入多行说明、反馈或备注，提供长度与错误反馈。

**不适合或优先替代：**短名称用InputText；富文本编辑不属于本例。

先确认本次任务要解决的业务行为，再选择本组件。普通业务页面优先使用这里的基础能力；只有用户明确要求装饰效果时才追加效果组件。

## 2. 只加载这一项

1. 只读本指南，确认用途与边界。
2. 只读 [src/business/demos/form/business-textarea.tsx](../../../src/business/demos/form/business-textarea.tsx)；共享基础有需要才读 [support.tsx](../../../src/business/support.tsx)。
3. 本例从 components 按需导入独立控件；只读实际导入的 .tsx 及同名 .module.css。布局工具类也显式使用 CSS Modules，不给整块区域的 button/input 套统一动效。
4. 涉及业务错误、权限、数据或异步行为时才追加对应契约：[05-input](../../contracts/05-input.md)。
5. 预览库使用本项独立 import() 入口；复制到目标项目时也只接入所需组件和直接依赖。

所有实现使用本项目已有 React、原生语义控件、Motion 和 CSS。完整交互、类型与回调以当前示例代码为准；局部弹性、下拉、媒体与日历效果见 [交互动效指南](../motion-guide.md)。

## 3. 本例真实用法

下面来自当前独立示例。默认导出是一个可运行实例；复制后把本地选项、数据与回调接到目标项目已有业务层，不把演示结果当作后端成功。

```tsx
// 当前 Textarea 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import ownedStyles0 from '../../components/DemoLayout.module.css';
import ownedStyles1 from '../../components/Input.module.css';
import { componentClasses } from '../../class-names';
import { useState, useId } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Field } from '../../components/Field';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
// 场景：多行说明、备注和反馈，明确长度与可调整高度。
export default function TextareaDemo() {
  const id = useId(); const [value, setValue] = useState("");
  return <BusinessDemo title="Textarea · 多行文本" description="适合说明、备注和反馈，提供字数提示。"><Field  htmlFor={id} label={"需求说明"} control={false} ><textarea className={cn('aw-business-input')} id={id}   value={value} onChange={event => setValue(event.target.value)}  rows={5} maxLength={500} placeholder={"描述需要完成的工作"}  /></Field><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">{value.length}/500 字</p></BusinessDemo>;
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
| `textarea.className` | `string \| undefined` | 否 | `未指定` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `textarea.id` | `string \| undefined` | 否 | `未指定` | 原生控件或容器的唯一标识，用于标签关联、焦点与无障碍引用。 |
| `textarea.rows` | `number \| undefined` | 否 | `未指定` | 行数，控制 textarea 的对应渲染或交互参数。 |
| `textarea.maxLength` | `number \| undefined` | 否 | `未指定` | 允许输入的最大字符数。 |
| `textarea.value` | `string \| number \| readonly string[] \| undefined` | 否 | `未指定` | 当前受控值，由调用方维护并随交互回调更新。 |
| `textarea.onChange` | `ChangeEventHandler<HTMLTextAreaElement> \| undefined` | 否 | `未指定` | 用户改变值或条目顺序时通知调用方；回调参数类型就是应写回的值或原生事件。 |
| `textarea.placeholder` | `string \| undefined` | 否 | `未指定` | 尚未填写或选择时显示的提示文字。 |

本示例函数不接收额外公开 Props，能力由原生元素与上述叶组件组合；下面列出实际继承类型和可编辑示例配置。

**继承的原生属性：**

- `DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**children 的真实接入：**

```tsx
children={<><textarea className={cn('aw-business-input')} id={id} rows={5} maxLength={500} value={value} onChange={event => setValue(event.target.value)} placeholder="描述需要完成的工作" /></>}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，不改写上游 API。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.label` | `"需求说明"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.control` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t1.rows` | `5` | number | 不限 ~ 不限 | 即时应用 |
| `t1.maxLength` | `500` | number | 不限 ~ 不限 | 即时应用 |
| `t1.placeholder` | `"描述需要完成的工作"` | text | 不限 ~ 不限 | 即时应用 |
| `state.value` | `""` | text | 不限 ~ 不限 | 即时应用；原组件回调同步受控值 |

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
