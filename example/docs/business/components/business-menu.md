# Menu

导航与菜单 · `business-menu` · 中文意图：动作菜单 / 列表菜单 / 更多操作

## 1. 什么场景使用

一组相关动作通过菜单选择，保留禁用与键盘状态。

**不适合或优先替代：**内容导航用NavigationMenu；复杂检索用CommandMenu。

先确认本次任务要解决的业务行为，再选择本组件。普通业务页面优先使用这里的基础能力；只有用户明确要求装饰效果时才追加效果组件。

## 2. 只加载这一项

1. 只读本指南，确认用途与边界。
2. 只读 [src/business/demos/navigation/business-menu.tsx](../../../src/business/demos/navigation/business-menu.tsx)；共享基础有需要才读 [support.tsx](../../../src/business/support.tsx)。
3. 本例从 components 按需导入独立控件；只读实际导入的 .tsx 及同名 .module.css。布局工具类也显式使用 CSS Modules，不给整块区域的 button/input 套统一动效。
4. 涉及业务错误、权限、数据或异步行为时才追加对应契约：[02-sidebar](../../contracts/02-sidebar.md)、[12-row-actions](../../contracts/12-row-actions.md)、[03-header](../../contracts/03-header.md)。
5. 预览库使用本项独立 import() 入口；复制到目标项目时也只接入所需组件和直接依赖。

所有实现使用本项目已有 React、原生语义控件、Motion 和 CSS。完整交互、类型与回调以当前示例代码为准；局部弹性、下拉、媒体与日历效果见 [交互动效指南](../motion-guide.md)。

## 3. 本例真实用法

下面来自当前独立示例。默认导出是一个可运行实例；复制后把本地选项、数据与回调接到目标项目已有业务层，不把演示结果当作后端成功。

```tsx
// 当前 Menu 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import { useId, useRef, useState } from 'react';
import { Archive, ChevronRight, FilePlus, MoreHorizontal, Save } from 'lucide-react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { MenuSurface } from '../../components/MenuSurface';
import { Popover } from '../../components/Popover';
import styles from './business-menu.module.css';

const actions = [
  { label: '新建草稿', description: '开始整理新的内容', icon: FilePlus },
  { label: '保存记录', description: '记录当前工作进展', icon: Save },
  { label: '归档资料', description: '整理已完成的内容', icon: Archive }
];

export default function BusinessMenuDemo() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('等待选择');
  const anchor = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  return <BusinessDemo title="Menu" description="使用按钮展开操作菜单，选择动作会记录本地结果。">
    <Button  className={styles.trigger} ref={anchor} aria-haspopup="menu" aria-controls={open ? menuId : undefined} aria-expanded={open} onClick={() => setOpen(value => !value)} variant={"secondary"} type={"button"} ><MoreHorizontal size={19} aria-hidden="true" />任务菜单</Button>
    <Popover open={open} onClose={() => setOpen(false)} anchorRef={anchor}  minWidth={268} >
      <div id={menuId} className={styles.panel}>
        <p className={styles.heading}>当前任务</p>
        <MenuSurface  label={"任务菜单"} >{actions.map(({ label, description, icon: Icon }) => <Button key={label}  className={styles.option} role="menuitem" tabIndex={-1} onClick={() => { setMessage(label + '：已更新当前示例状态。'); setOpen(false); }} variant={"ghost"} type={"button"} >
          <Icon className={styles.optionIcon} size={18} aria-hidden="true" />
          <span className={styles.optionCopy}><span className={styles.optionLabel}>{label}</span><span className={styles.optionDescription}>{description}</span></span>
          <ChevronRight className={styles.arrow} size={15} aria-hidden="true" />
        </Button>)}</MenuSurface>
      </div>
    </Popover>
    <p data-ui="aw-business-status" className={styles.status} role="status">{message}</p>
  </BusinessDemo>;
}
```

### 完整组件 API

| 参数 | 类型 | 必填 | 上游默认值 | 中文说明 |
|---|---|---|---|---|
| `Button · t0.type` | `"button" \| "reset" \| "submit" \| undefined` | 否 | `'button'` | 原生输入或按钮的行为类型；按钮类型会影响表单提交。 |
| `Button · t0.className` | `string \| undefined` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `Button · t0.children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `Button · t0.variant` | `'primary' \| 'secondary' \| 'danger' \| 'ghost'` | 否 | `'primary'` | 选择组件内置的外观或效果变体。 |
| `Button · t0.ref` | `Ref<HTMLButtonElement>` | 否 | `未指定` | 连接实际 DOM 元素或组件命令句柄，支持类型声明中的 ref 形式。 |
| `Popover.open` | `boolean` | 是 | `未指定` | 是否展开或显示内容，由调用方控制。 |
| `Popover.onClose` | `() => void` | 是 | `未指定` | 请求关闭弹层、对话框或提示时调用，调用方同步更新 open 状态。 |
| `Popover.anchorRef` | `RefObject<HTMLElement \| null>` | 是 | `未指定` | 连接触发器 DOM 的 ref，供弹层定位及焦点返回使用。 |
| `Popover.children` | `ReactNode` | 是 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `Popover.minWidth` | `number` | 否 | `280` | 最小宽度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `MenuSurface.label` | `string` | 是 | `未指定` | 向用户或辅助技术说明控件的名称。 |
| `MenuSurface.children` | `ReactNode` | 是 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |

本示例函数不接收额外公开 Props，能力由原生元素与上述叶组件组合；下面列出实际继承类型和可编辑示例配置。

**继承的原生属性：**

- `DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `ButtonHTMLAttributes<HTMLButtonElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**children 的真实接入：**

```tsx
children={<><MoreHorizontal size={19} aria-hidden="true" />任务菜单</>}
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

**anchorRef 的真实接入：**

```tsx
const elementRef = useRef<HTMLElement | null>(null);
// JSX: anchorRef={elementRef}
```

**children 的真实接入：**

```tsx
children={<><div id={menuId} className={styles.panel}>
        <p className={styles.heading}>当前任务</p>
        <MenuSurface label="任务菜单">{actions.map(({ label, description, icon: Icon }) => <Button key={label} variant="ghost" className={styles.option} role="menuitem" tabIndex={-1} onClick={() => { setMessage(label + '：已更新当前示例状态。'); setOpen(false); }}>
          <Icon className={styles.optionIcon} size={18} aria-hidden="true" />
          <span className={styles.optionCopy}><span className={styles.optionLabel}>{label}</span><span className={styles.optionDescription}>{description}</span></span>
          <ChevronRight className={styles.arrow} size={15} aria-hidden="true" />
        </Button>)}</MenuSurface>
      </div></>}
```

**children 的真实接入：**

```tsx
children={<>{actions.map(({ label, description, icon: Icon }) => <Button key={label} variant="ghost" className={styles.option} role="menuitem" tabIndex={-1} onClick={() => { setMessage(label + '：已更新当前示例状态。'); setOpen(false); }}>
          <Icon className={styles.optionIcon} size={18} aria-hidden="true" />
          <span className={styles.optionCopy}><span className={styles.optionLabel}>{label}</span><span className={styles.optionDescription}>{description}</span></span>
          <ChevronRight className={styles.arrow} size={15} aria-hidden="true" />
        </Button>)}</>}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，不改写上游 API。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.variant` | `"secondary"` | select | "primary" / "secondary" / "danger" / "ghost" | 即时应用 |
| `t0.type` | `"button"` | select | "button" / "reset" / "submit" | 即时应用 |
| `t1.minWidth` | `268` | number | 不限 ~ 不限 | 即时应用 |
| `t2.label` | `"任务菜单"` | text | 不限 ~ 不限 | 即时应用 |
| `t3.variant` | `"ghost"` | select | "primary" / "secondary" / "danger" / "ghost" | 即时应用 |
| `t3.type` | `"button"` | select | "button" / "reset" / "submit" | 即时应用 |
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

能力对照：bubble-menu、card-nav、staggered-menu 是已有相邻效果；通用业务行为按本例补齐。

选型有疑问时返回 [业务导航](../categories/navigation.md)，先比较最多 2–3 项。
