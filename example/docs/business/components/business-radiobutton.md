# RadioButton

表单与选择 · `business-radiobutton` · 中文意图：单选组 / 互斥选项 / 范围选择

## 1. 什么场景使用

少量互斥选项需要同时展示，保留原生组键盘操作。

**不适合或优先替代：**多项可并存用CheckboxGroup；大量选项用Select。

先确认本次任务要解决的业务行为，再选择本组件。普通业务页面优先使用这里的基础能力；只有用户明确要求装饰效果时才追加效果组件。

## 2. 只加载这一项

1. 只读本指南，确认用途与边界。
2. 只读 [src/business/demos/form/business-radiobutton.tsx](../../../src/business/demos/form/business-radiobutton.tsx)；需核对 API 与 DIY 配置时读 [本项参数记录](../../../src/parameters/definitions/business-radiobutton.json)；共享基础有需要才读 [support.tsx](../../../src/business/support.tsx)。
3. 本例从 components 按需导入独立控件；只读实际导入的 .tsx 及同名 .module.css。布局工具类也显式使用 CSS Modules，不给整块区域的 button/input 套统一动效。
4. 涉及业务错误、权限、数据或异步行为时才追加对应契约：[06-select](../../contracts/06-select.md)。
5. 预览库使用本项独立 import() 入口；复制到目标项目时也只接入所需组件和直接依赖。

所有实现使用本项目已有 React、原生语义控件、Motion 和 CSS。完整交互、类型与回调以当前示例代码为准；局部弹性、下拉、媒体与日历效果见 [交互动效指南](../motion-guide.md)。

## 3. 本例真实用法

下面来自当前独立示例。默认导出是一个可运行实例；复制后把本地选项、数据与回调接到目标项目已有业务层，不把演示结果当作后端成功。

```tsx
// 当前 RadioButton 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import ownedStyles0 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { SpringRadio } from '../../components/SpringRadio';
import { useState, useId } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
// 场景：少量互斥选项且需要同时看到候选项时使用单选组。
export default function RadioButtonDemo() {
  const options = ['仅当前空间','所有参与空间','全部空间']; const [value, setValue] = useState("仅当前空间"); const id = useId();
  return <BusinessDemo title="RadioButton · 单选组" description="选项互斥，用同一 name 保留原生方向键操作。"><fieldset className={cn('aw-business-fieldset')}><legend>查看范围</legend>{options.map(item => <label data-ui="aw-business-choice" key={item} className={cn("aw-business-choice")}><SpringRadio name={id} value={item} checked={value === item} onChange={() => setValue(item)} />{item}</label>)}</fieldset><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">范围：{value}</p></BusinessDemo>;
}
```

### 完整组件 API

源码默认值来自本包业务实现；本例默认配置来自独立示例，两者可能不同。

本例默认导出是可运行演示入口。下表无前缀参数属于 [SpringRadio](../../../src/business/components/SpringRadio.tsx) 的组件 API，带前缀参数属于对应叶组件；这些参数不表示演示函数本身接收相同 Props。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `onChange` | `ChangeEventHandler<HTMLInputElement> \| undefined` | 否 | `未指定` | 用户改变值或条目顺序时通知调用方；回调参数类型就是应写回的值或原生事件。 |
| `checked` | `boolean` | 是 | `未指定` | 当前受控勾选状态，调用方在变更回调中写回。 |

**继承的原生属性：**

- `Omit<InputHTMLAttributes<HTMLInputElement>, 'checked' | 'defaultChecked'>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**children 的真实接入：**

```tsx
children={"示例"}
```

**onChange 的真实接入：**

```tsx
onChange={() => setValue(item)}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `state.value` | `"仅当前空间"` | text | 不限 ~ 不限 | 即时应用；原组件回调同步受控值 |

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

能力对照：jelly-radio 是已有相邻效果；通用业务行为按本例补齐。

选型有疑问时返回 [表单与选择](../categories/form.md)，先比较最多 2–3 项。
