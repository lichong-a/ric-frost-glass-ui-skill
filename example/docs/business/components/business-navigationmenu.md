# NavigationMenu

导航与菜单 · `business-navigationmenu` · 中文意图：导航菜单 / 栏目切换 / 主导航

## 1. 什么场景使用

页面或模块之间导航，有清晰的当前项和目标。

**不适合或优先替代：**一次性动作使用Menu；层级位置用Breadcrumb。

先确认本次任务要解决的业务行为，再选择本组件。普通业务页面优先使用这里的基础能力；只有用户明确要求装饰效果时才追加效果组件。

## 2. 只加载这一项

1. 只读本指南，确认用途与边界。
2. 只读 [src/business/demos/navigation/business-navigationmenu.tsx](../../../src/business/demos/navigation/business-navigationmenu.tsx)；需核对 API 与 DIY 配置时读 [本项参数记录](../../../src/parameters/definitions/business-navigationmenu.json)；共享基础有需要才读 [support.tsx](../../../src/business/support.tsx)。
3. 本例从 components 按需导入独立控件；只读实际导入的 .tsx 及同名 .module.css。布局工具类也显式使用 CSS Modules，不给整块区域的 button/input 套统一动效。
4. 涉及业务错误、权限、数据或异步行为时才追加对应契约：[02-sidebar](../../contracts/02-sidebar.md)、[12-row-actions](../../contracts/12-row-actions.md)、[03-header](../../contracts/03-header.md)。
5. 预览库使用本项独立 import() 入口；复制到目标项目时也只接入所需组件和直接依赖。

所有实现使用本项目已有 React、原生语义控件、Motion 和 CSS。完整交互、类型与回调以当前示例代码为准；局部弹性、下拉、媒体与日历效果见 [交互动效指南](../motion-guide.md)。

## 3. 本例真实用法

下面来自当前独立示例。默认导出是一个可运行实例；复制后把本地选项、数据与回调接到目标项目已有业务层，不把演示结果当作后端成功。

```tsx
// 当前 NavigationMenu 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import { useId, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, LayoutGroup, motion, useIsPresent } from 'motion/react';
import { BookOpen, Bot, ChevronDown, ChevronRight, Layers, LayoutDashboard, Plug, WandSparkles } from 'lucide-react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { AnimatedSwap } from '../../components/AnimatedSwap';
import { DropdownSurface } from '../../components/DropdownSurface';
import { SelectionIndicator } from '../../components/SelectionIndicator';
import { controlSpring, useBusinessReducedMotion } from '../../motion-preference';
import styles from './business-navigationmenu.module.css';

const primaryPages = [{ label: '工作台', icon: LayoutDashboard }, { label: '智能体', icon: Bot }];
const resources = [
  { label: '技能', description: '可复用的工作能力', icon: WandSparkles },
  { label: '知识', description: '工作空间的资料内容', icon: BookOpen },
  { label: '连接器', description: '已接入的服务入口', icon: Plug }
];

function ResourceLayer({ children, reduced }: { children: ReactNode; reduced: boolean }) {
  const present = useIsPresent();
  return <motion.div className={styles.resourceLayer} inert={!present} aria-hidden={!present || undefined} initial={reduced ? false : { height: 0, opacity: 0, y: -6 }} animate={{ height: 'auto', opacity: 1, y: 0 }} exit={{ height: 0, opacity: 0, y: reduced ? 0 : -4 }} transition={{ duration: reduced ? 0 : .22, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}

export default function BusinessNavigationMenuDemo() {
  const [selected, setSelected] = useState("工作台");
  const [expanded, setExpanded] = useState(false);
  const resourceTrigger = useRef<HTMLButtonElement>(null);
  const prefix = useId();
  const reduced = useBusinessReducedMotion();

  return <BusinessDemo title="NavigationMenu" description="主导航切换工作区，资源菜单可展开并选择二级入口。">
    <LayoutGroup id={prefix}>
      <nav data-ui="aw-business-row" aria-label="主导航" className={styles.primaryNavigation} onKeyDown={event => { if (event.key === 'Escape' && expanded) { event.preventDefault(); setExpanded(false); resourceTrigger.current?.focus(); } }}>{primaryPages.map(({ label, icon: Icon }) => <Button  data-size="sm" className={styles.navigationItem} key={label} aria-current={selected === label ? 'page' : undefined} onClick={() => { setSelected(label); setExpanded(false); }} variant={"ghost"} type={"button"} >
        {selected === label ? <SelectionIndicator identity={`${prefix}-navigation`} /> : null}<Icon size={16} aria-hidden="true" /><span className={styles.navigationLabel}>{label}</span>
      </Button>)}
        <Button  data-size="sm" ref={resourceTrigger} className={styles.resourceTrigger} data-selected={resources.some(item => item.label === selected)} aria-expanded={expanded} aria-controls={expanded ? 'business-resource-nav' : undefined} onClick={() => setExpanded(value => !value)} variant={"ghost"} type={"button"} ><Layers size={16} aria-hidden="true" />资源<motion.span className={styles.chevron} aria-hidden="true" animate={{ rotate: expanded ? 180 : 0 }} transition={reduced ? { duration: 0 } : controlSpring}><ChevronDown size={14} /></motion.span></Button>
      </nav>
    </LayoutGroup>
    <AnimatePresence initial={false}>{expanded ? <ResourceLayer key="resources" reduced={reduced}>
      <DropdownSurface className={styles.resourceSurface}>
        <nav id="business-resource-nav" aria-label="资源导航" className={styles.resourceNavigation} onKeyDown={event => { if (event.key === 'Escape') { event.preventDefault(); setExpanded(false); resourceTrigger.current?.focus(); } }}>
          {resources.map(({ label, description, icon: Icon }) => <Button  className={styles.resourceItem} key={label} aria-current={selected === label ? 'page' : undefined} onClick={() => { setSelected(label); setExpanded(false); resourceTrigger.current?.focus(); }} variant={"ghost"} type={"button"} >
            <span className={styles.resourceIcon}><Icon size={18} aria-hidden="true" /></span><span className={styles.resourceCopy}><span className={styles.resourceLabel}>{label}</span><span className={styles.resourceDescription}>{description}</span></span><ChevronRight className={styles.resourceArrow} size={15} aria-hidden="true" />
          </Button>)}
        </nav>
      </DropdownSurface>
    </ResourceLayer> : null}</AnimatePresence>
    <section data-ui="aw-business-item" className={styles.workspace}><AnimatedSwap value={selected}><h3 className={styles.workspaceTitle}>{selected}</h3><p className={styles.workspaceCopy}>已切换到当前示例的{selected}工作区。</p></AnimatedSwap></section>
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
| `SelectionIndicator.identity` | `string` | 是 | `未指定` | 区分本次内容或动效节点的身份，改变后用于切换和布局过渡。 |
| `SelectionIndicator.className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `DropdownSurface.children` | `ReactNode` | 是 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `DropdownSurface.className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `DropdownSurface.style` | `CSSProperties` | 否 | `未指定` | 容器的 React 内联样式对象，尺寸、布局与 CSS 属性按 CSSProperties 传入。 |
| `DropdownSurface.surfaceRef` | `Ref<HTMLDivElement>` | 否 | `未指定` | 连接弹出面板的 DOM ref，供调用方测量与管理焦点。 |
| `AnimatedSwap.children` | `ReactNode` | 是 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `AnimatedSwap.value` | `string \| number` | 是 | `未指定` | 当前受控值，由调用方维护并随交互回调更新。 |
| `AnimatedSwap.className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |

本示例函数不接收额外公开 Props，能力由原生元素与上述叶组件组合；下面列出实际继承类型和可编辑示例配置。

**继承的原生属性：**

- `DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `ButtonHTMLAttributes<HTMLButtonElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**children 的真实接入：**

```tsx
children={<>{selected === label ? <SelectionIndicator identity={`${prefix}-navigation`} /> : null}<Icon size={16} aria-hidden="true" /><span className={styles.navigationLabel}>{label}</span></>}
```

**ref 的真实接入：**

```tsx
const elementRef = useRef<HTMLButtonElement | null>(null);
// JSX: ref={elementRef}
```

**children 的真实接入：**

```tsx
children={<><nav id="business-resource-nav" aria-label="资源导航" className={styles.resourceNavigation} onKeyDown={event => { if (event.key === 'Escape') { event.preventDefault(); setExpanded(false); resourceTrigger.current?.focus(); } }}>
          {resources.map(({ label, description, icon: Icon }) => <Button variant="ghost" className={styles.resourceItem} key={label} aria-current={selected === label ? 'page' : undefined} onClick={() => { setSelected(label); setExpanded(false); resourceTrigger.current?.focus(); }}>
            <span className={styles.resourceIcon}><Icon size={18} aria-hidden="true" /></span><span className={styles.resourceCopy}><span className={styles.resourceLabel}>{label}</span><span className={styles.resourceDescription}>{description}</span></span><ChevronRight className={styles.resourceArrow} size={15} aria-hidden="true" />
          </Button>)}
        </nav></>}
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
children={<><h3 className={styles.workspaceTitle}>{selected}</h3><p className={styles.workspaceCopy}>已切换到当前示例的{selected}工作区。</p></>}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.variant` | `"ghost"` | select | "primary" / "secondary" / "danger" / "ghost" | 即时应用 |
| `t0.type` | `"button"` | select | "button" / "reset" / "submit" | 即时应用 |
| `t2.variant` | `"ghost"` | select | "primary" / "secondary" / "danger" / "ghost" | 即时应用 |
| `t2.type` | `"button"` | select | "button" / "reset" / "submit" | 即时应用 |
| `t4.variant` | `"ghost"` | select | "primary" / "secondary" / "danger" / "ghost" | 即时应用 |
| `t4.type` | `"button"` | select | "button" / "reset" / "submit" | 即时应用 |
| `state.selected` | `"工作台"` | text | 不限 ~ 不限 | 即时应用；原组件回调同步受控值 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. 接入约束

- 颜色、阅读面、圆角、边界、焦点与阴影使用 Agent Ric Token，业务逻辑留在所属模块。
- 服务端状态、资源归属与动作权限由既有可信业务接口处理；前端输入限制只服务于体验。
- 保留本项键盘、名称、空状态、错误状态和恢复入口，清理拥有的监听、计时器、观察器与对象 URL。
- 文档中的本地数组、文件或短命令只用于示例；不增加未授权的上传、设备访问、外部写入或 shell 执行。
- 减少运动偏好下保留业务操作，仅停用短过渡；不要因为动效偏好关闭必要表单与菜单。

## 5. 场景级验收

按第 1 节实际业务任务检查状态变化、键盘路径、边界值、失败和取消。只报告运行过的检查；本指南和源码存在不等于已完成浏览器验收。

能力对照：pill-nav、line-sidebar 是已有相邻效果；通用业务行为按本例补齐。

选型有疑问时返回 [导航与菜单](../categories/navigation.md)，先比较最多 2–3 项。
