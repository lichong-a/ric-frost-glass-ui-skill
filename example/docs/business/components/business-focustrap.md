# FocusTrap

弹层与辅助 · `business-focustrap` · 中文意图：焦点边界 / 键盘循环 / 临时交互区

## 1. 什么场景使用

临时任务区需要焦点限制，并能退出和恢复触发点。

**不适合或优先替代：**普通内容不能永久困住焦点；Dialog已有原生模态行为。

先确认本次任务要解决的业务行为，再选择本组件。普通业务页面优先使用这里的基础能力；只有用户明确要求装饰效果时才追加效果组件。

## 2. 只加载这一项

1. 只读本指南，确认用途与边界。
2. 只读 [src/business/demos/overlay/business-focustrap.tsx](../../../src/business/demos/overlay/business-focustrap.tsx)；共享基础有需要才读 [support.tsx](../../../src/business/support.tsx)。
3. 本例从 components 按需导入独立控件；只读实际导入的 .tsx 及同名 .module.css。布局工具类也显式使用 CSS Modules，不给整块区域的 button/input 套统一动效。
4. 涉及业务错误、权限、数据或异步行为时才追加对应契约：[19-overlays-keyboard](../../contracts/19-overlays-keyboard.md)、[18-auxiliary](../../contracts/18-auxiliary.md)。
5. 预览库使用本项独立 import() 入口；复制到目标项目时也只接入所需组件和直接依赖。

所有实现使用本项目已有 React、原生语义控件、Motion 和 CSS。完整交互、类型与回调以当前示例代码为准；局部弹性、下拉、媒体与日历效果见 [交互动效指南](../motion-guide.md)。

## 3. 本例真实用法

下面来自当前独立示例。默认导出是一个可运行实例；复制后把本地选项、数据与回调接到目标项目已有业务层，不把演示结果当作后端成功。

```tsx
// 当前 FocusTrap 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import ownedStyles0 from '../../components/DemoLayout.module.css';
import ownedStyles1 from '../../components/Input.module.css';
import { componentClasses } from '../../class-names';
import { useRef, useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { Field } from '../../components/Field';
import { ToggleButton } from '../../components/ToggleButton';
import { FocusRegion } from '../../components/FocusRegion';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessFocusTrapDemo() {
  const [active, setActive] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  return <BusinessDemo title="FocusTrap" description="开启后 Tab 在示例内循环，Escape 或结束按钮退出，并返回开启按钮。">
    <div data-ui="aw-business-row" className={cn("aw-business-row")}><ToggleButton ref={trigger} pressed={active} disabled={active} onPressedChange={setActive}>{active ? '焦点约束已开启' : '开启焦点约束'}</ToggleButton></div>
    <FocusRegion active={active} onExit={() => setActive(false)} returnFocusRef={trigger}>
      <p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">焦点约束：{active ? '已开启' : '未开启'}</p>
      <Field  label={"示例名称"} control={false} ><input data-ui="aw-business-input" className={cn("aw-business-input")}  defaultValue={"资料助理"}  /></Field>
      <div data-ui="aw-business-row" className={cn("aw-business-row")}><Button  variant={"secondary"} type={"button"} >查看资料</Button><ToggleButton pressed={active} disabled={!active} onPressedChange={setActive}>结束约束</ToggleButton></div>
    </FocusRegion>
  </BusinessDemo>;
}
```

### 完整组件 API

| 参数 | 类型 | 必填 | 上游默认值 | 中文说明 |
|---|---|---|---|---|
| `active` | `boolean` | 是 | `未指定` | 是否启用当前交互或焦点约束。 |
| `onExit` | `() => void` | 否 | `未指定` | 用户退出焦点区域或按下退出键时调用。 |
| `children` | `ReactNode` | 是 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `returnFocusRef` | `RefObject<HTMLElement \| null>` | 否 | `未指定` | 焦点约束退出后要返回的 DOM 元素 ref。 |
| `ToggleButton · t0.children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `ToggleButton · t0.pressed` | `boolean` | 是 | `未指定` | 按钮的当前切换选中状态。 |
| `ToggleButton · t0.onPressedChange` | `(pressed: boolean) => void` | 是 | `未指定` | 切换按钮改变选中状态时回调，参数为新的布尔状态。 |
| `ToggleButton · t0.ref` | `Ref<HTMLButtonElement>` | 否 | `未指定` | 连接实际 DOM 元素或组件命令句柄，支持类型声明中的 ref 形式。 |
| `Field.label` | `string` | 是 | `未指定` | 向用户或辅助技术说明控件的名称。 |
| `Field.children` | `ReactNode` | 是 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `Field.hint` | `string` | 否 | `未指定` | 与字段一起显示的帮助文字。 |
| `Field.htmlFor` | `string` | 否 | `(isControl ? children.props.id : undefined)` | 关联控件的 id，让标签点击与辅助技术定位到该控件。 |
| `Field.control` | `boolean` | 否 | `false` | 是否控制，决定该分支的展示或交互行为。 |
| `input.data-ui` | `any` | 否 | `未指定` | 示例在 DOM 上使用的 ui 数据标记，供局部样式或状态定位读取。 |
| `input.className` | `string \| undefined` | 否 | `未指定` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `input.defaultValue` | `string \| number \| readonly string[] \| undefined` | 否 | `未指定` | 非受控模式的初始值；挂载后更新通常通过内部状态或受控 value 完成。 |
| `Button.type` | `"button" \| "reset" \| "submit" \| undefined` | 否 | `'button'` | 原生输入或按钮的行为类型；按钮类型会影响表单提交。 |
| `Button.className` | `string \| undefined` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `Button.children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `Button.variant` | `'primary' \| 'secondary' \| 'danger' \| 'ghost'` | 否 | `'primary'` | 选择组件内置的外观或效果变体。 |
| `Button.ref` | `Ref<HTMLButtonElement>` | 否 | `未指定` | 连接实际 DOM 元素或组件命令句柄，支持类型声明中的 ref 形式。 |

**继承的原生属性：**

- `Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `ButtonHTMLAttributes<HTMLButtonElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**onExit 的真实接入：**

```tsx
onExit={() => setActive(false)}
```

**children 的真实接入：**

```tsx
children={<><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">焦点约束：{active ? '已开启' : '未开启'}</p><Field label="示例名称"><input data-ui="aw-business-input" className={cn("aw-business-input")} defaultValue="资料助理" /></Field><div data-ui="aw-business-row" className={cn("aw-business-row")}><Button variant="secondary">查看资料</Button><ToggleButton pressed={active} disabled={!active} onPressedChange={setActive}>结束约束</ToggleButton></div></>}
```

**returnFocusRef 的真实接入：**

```tsx
const elementRef = useRef<HTMLElement | null>(null);
// JSX: returnFocusRef={elementRef}
```

**children 的真实接入：**

```tsx
children={<>{active ? '焦点约束已开启' : '开启焦点约束'}</>}
```

**onPressedChange 的真实接入：**

```tsx
onPressedChange={setActive}
```

**ref 的真实接入：**

```tsx
const elementRef = useRef<HTMLButtonElement | null>(null);
// JSX: ref={elementRef}
```

**children 的真实接入：**

```tsx
children={<><input data-ui="aw-business-input" className={cn("aw-business-input")} defaultValue="资料助理" /></>}
```

**children 的真实接入：**

```tsx
children={<>查看资料</>}
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
| `t2.label` | `"示例名称"` | text | 不限 ~ 不限 | 即时应用 |
| `t2.control` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t3.defaultValue` | `"资料助理"` | json | 不限 ~ 不限 | 调节结束后重建 |
| `t4.variant` | `"secondary"` | select | "primary" / "secondary" / "danger" / "ghost" | 即时应用 |
| `t4.type` | `"button"` | select | "button" / "reset" / "submit" | 即时应用 |
| `state.active` | `false` | switch | 不限 ~ 不限 | 即时应用；原组件回调同步受控值 |

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

选型有疑问时返回 [基础辅助](../categories/utility.md)，先比较最多 2–3 项。
