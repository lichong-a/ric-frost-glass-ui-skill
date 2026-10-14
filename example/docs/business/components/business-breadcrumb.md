# Breadcrumb

导航与菜单 · `business-breadcrumb` · 中文意图：面包屑 / 层级路径 / 返回上级

## 1. 什么场景使用

展示当前层级位置并提供上级导航目标。

**不适合或优先替代：**平级主导航用NavigationMenu。

先确认本次任务要解决的业务行为，再选择本组件。普通业务页面优先使用这里的基础能力；只有用户明确要求装饰效果时才追加效果组件。

## 2. 只加载这一项

1. 只读本指南，确认用途与边界。
2. 只读 [src/business/demos/navigation/business-breadcrumb.tsx](../../../src/business/demos/navigation/business-breadcrumb.tsx)；需核对 API 与 DIY 配置时读 [本项参数记录](../../../src/parameters/definitions/business-breadcrumb.json)；共享基础有需要才读 [support.tsx](../../../src/business/support.tsx)。
3. 本例从 components 按需导入独立控件；只读实际导入的 .tsx 及同名 .module.css。布局工具类也显式使用 CSS Modules，不给整块区域的 button/input 套统一动效。
4. 涉及业务错误、权限、数据或异步行为时才追加对应契约：[02-sidebar](../../contracts/02-sidebar.md)、[12-row-actions](../../contracts/12-row-actions.md)、[03-header](../../contracts/03-header.md)。
5. 预览库使用本项独立 import() 入口；复制到目标项目时也只接入所需组件和直接依赖。

所有实现使用本项目已有 React、原生语义控件、Motion 和 CSS。完整交互、类型与回调以当前示例代码为准；局部弹性、下拉、媒体与日历效果见 [交互动效指南](../motion-guide.md)。

## 3. 本例真实用法

下面来自当前独立示例。默认导出是一个可运行实例；复制后把本地选项、数据与回调接到目标项目已有业务层，不把演示结果当作后端成功。

```tsx
// 当前 Breadcrumb 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useIsPresent } from 'motion/react';
import { ArrowUpRight, Bot, ChevronRight, FileText, House } from 'lucide-react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { controlSpring, useBusinessReducedMotion } from '../../motion-preference';
import styles from './business-breadcrumb.module.css';

function BreadcrumbStep({ children, reduced }: { children: ReactNode; reduced: boolean }) {
  const present = useIsPresent();
  return <motion.li className={styles.step} inert={!present} aria-hidden={!present || undefined} layout={reduced ? false : 'position'} initial={reduced ? false : { opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={reduced ? { opacity: 0 } : { opacity: 0, x: -6 }} transition={reduced ? { duration: 0 } : controlSpring}>{children}</motion.li>;
}

export default function BusinessBreadcrumbDemo() {
  const [level, setLevel] = useState(2);
  const currentCrumb = useRef<HTMLSpanElement>(null);
  const moveFocus = useRef(false);
  const path = ['工作空间', '智能体', '资料助理'];
  const icons = [House, Bot, FileText];
  const reduced = useBusinessReducedMotion();

  useEffect(() => {
    if (!moveFocus.current) return;
    currentCrumb.current?.focus();
    moveFocus.current = false;
  }, [level]);

  return <BusinessDemo title="Breadcrumb" description="沿工作空间层级返回父节点，当前节点保持明确语义。">
    <nav aria-label="面包屑" className={styles.navigation} data-motion={reduced ? 'reduce' : 'allow'}>
      <ol data-ui="aw-business-row" className={styles.trail}>
        <AnimatePresence initial={false}>{path.slice(0, level + 1).map((label, index) => {
          const Icon = icons[index];
          return <BreadcrumbStep key={label} reduced={reduced}>
            {index ? <ChevronRight className={styles.separator} size={13} aria-hidden="true" /> : null}
            {index === level ? <span ref={currentCrumb} tabIndex={-1} className={styles.current} aria-current="page"><Icon size={14} aria-hidden="true" /><span>{label}</span></span> : <Button  data-size="sm" className={styles.crumb} onClick={() => { moveFocus.current = true; setLevel(index); }} variant={"ghost"} type={"button"} ><Icon size={14} aria-hidden="true" /><span>{label}</span></Button>}
          </BreadcrumbStep>;
        })}</AnimatePresence>
      </ol>
    </nav>
    <p data-ui="aw-business-status" className={styles.status} role="status">当前节点：{path[level]}</p>
    <Button  data-size="sm" className={styles.returnAction} onClick={() => setLevel(2)} variant={"ghost"} type={"button"} >返回资料助理<ArrowUpRight size={14} aria-hidden="true" /></Button>
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

本示例函数不接收额外公开 Props，能力由原生元素与上述叶组件组合；下面列出实际继承类型和可编辑示例配置。

**继承的原生属性：**

- `DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `ButtonHTMLAttributes<HTMLButtonElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**children 的真实接入：**

```tsx
children={<><Icon size={14} aria-hidden="true" /><span>{label}</span></>}
```

**ref 的真实接入：**

```tsx
const elementRef = useRef<HTMLButtonElement | null>(null);
// JSX: ref={elementRef}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.variant` | `"ghost"` | select | "primary" / "secondary" / "danger" / "ghost" | 即时应用 |
| `t0.type` | `"button"` | select | "button" / "reset" / "submit" | 即时应用 |
| `t1.variant` | `"ghost"` | select | "primary" / "secondary" / "danger" / "ghost" | 即时应用 |
| `t1.type` | `"button"` | select | "button" / "reset" / "submit" | 即时应用 |

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

能力对照：此前没有独立可运行业务示例，规范和 CSS 不作为运行覆盖。

选型有疑问时返回 [导航与菜单](../categories/navigation.md)，先比较最多 2–3 项。
