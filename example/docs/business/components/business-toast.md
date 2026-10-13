# Toast

状态与反馈 · `business-toast` · 中文意图：短暂通知 / 操作反馈 / 消息堆叠

## 1. 什么场景使用

操作完成后给出非阻断反馈，可关闭且不会抢焦点。

**不适合或优先替代：**必须用户处理的错误应常显在Message或Dialog。

先确认本次任务要解决的业务行为，再选择本组件。普通业务页面优先使用这里的基础能力；只有用户明确要求装饰效果时才追加效果组件。

## 2. 只加载这一项

1. 只读本指南，确认用途与边界。
2. 只读 [src/business/demos/feedback/business-toast.tsx](../../../src/business/demos/feedback/business-toast.tsx)；共享基础有需要才读 [support.tsx](../../../src/business/support.tsx)。
3. 本例从 components 按需导入独立控件；只读实际导入的 .tsx 及同名 .module.css。布局工具类也显式使用 CSS Modules，不给整块区域的 button/input 套统一动效。
4. 涉及业务错误、权限、数据或异步行为时才追加对应契约：[15-feedback](../../contracts/15-feedback.md)。
5. 预览库使用本项独立 import() 入口；复制到目标项目时也只接入所需组件和直接依赖。

所有实现使用本项目已有 React、原生语义控件、Motion 和 CSS。完整交互、类型与回调以当前示例代码为准；局部弹性、下拉、媒体与日历效果见 [交互动效指南](../motion-guide.md)。

## 3. 本例真实用法

下面来自当前独立示例。默认导出是一个可运行实例；复制后把本地选项、数据与回调接到目标项目已有业务层，不把演示结果当作后端成功。

```tsx
// 当前 Toast 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import { useCallback, useEffect, useRef, useState, type MouseEvent, type Ref } from 'react';
import { AnimatePresence, motion, useIsPresent } from 'motion/react';
import { CheckCircle2, Info } from 'lucide-react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { useBusinessReducedMotion } from '../../motion-preference';
import styles from './business-toast.module.css';

function ToastNotice({ notice, reduced, innerRef, onDismiss }: {
  notice: string;
  reduced: boolean;
  innerRef: Ref<HTMLDivElement>;
  onDismiss: () => void;
}) {
  const present = useIsPresent();
  const success = notice === '本地草稿已保存。';
  const Icon = success ? CheckCircle2 : Info;

  return (
    <motion.div
      ref={innerRef}
      className={styles.toast}
      data-tone={success ? 'success' : 'info'}
      role="status"
      aria-atomic="true"
      inert={!present}
      aria-hidden={!present || undefined}
      initial={reduced ? false : { opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: reduced ? 0 : 12, scale: reduced ? 1 : 0.97 }}
      transition={{ duration: reduced ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className={styles.icon} aria-hidden="true"><Icon size={20} /></span>
      <span className={styles.text}>{notice}</span>
      <Button variant="ghost" data-size="sm" aria-label="关闭提示" onClick={onDismiss}>关闭</Button>
    </motion.div>
  );
}

export default function BusinessToastDemo() {
  const [notice, setNotice] = useState<string | null>(null);
  const [sequence, setSequence] = useState(0);
  const reduced = useBusinessReducedMotion();
  const noticeRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const dismissNotice = useCallback(() => {
    // Return keyboard focus before the departing notification becomes inert.
    if (noticeRef.current?.contains(document.activeElement)) triggerRef.current?.focus();
    setNotice(null);
  }, []);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(dismissNotice, 4000);
    return () => window.clearTimeout(timer);
  }, [notice, sequence, dismissNotice]);

  function showSuccess(event: MouseEvent<HTMLButtonElement>) {
    triggerRef.current = event.currentTarget;
    setSequence(value => value + 1);
    setNotice('本地草稿已保存。');
  }

  function showInfo(event: MouseEvent<HTMLButtonElement>) {
    triggerRef.current = event.currentTarget;
    setSequence(value => value + 1);
    setNotice('可以继续完善草稿内容。');
  }

  return (
    <BusinessDemo title="Toast" description="短消息在本地出现，可手动关闭，4秒后自动移除；卸载时清理计时器。">
      <div className={styles.controls}>
        <Button onClick={showSuccess} type={"button"} variant={"primary"} >显示成功提示</Button>
        <Button  onClick={showInfo} variant={"secondary"} type={"button"} >显示普通提示</Button>
      </div>
      <div className={styles.viewport}>
        <AnimatePresence mode="wait">
          {notice ? (
            <ToastNotice
              key={sequence}
              notice={notice}
              reduced={reduced}
              innerRef={noticeRef}
              onDismiss={dismissNotice}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </BusinessDemo>
  );
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

本示例函数不接收额外公开 Props，能力由原生元素与上述叶组件组合；下面列出实际继承类型和可编辑示例配置。

**继承的原生属性：**

- `DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `ButtonHTMLAttributes<HTMLButtonElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**children 的真实接入：**

```tsx
children={<>关闭</>}
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
| `t0.type` | `"button"` | select | "button" / "reset" / "submit" | 即时应用 |
| `t0.variant` | `"primary"` | select | "primary" / "secondary" / "danger" / "ghost" | 即时应用 |
| `t1.variant` | `"secondary"` | select | "primary" / "secondary" / "danger" / "ghost" | 即时应用 |
| `t1.type` | `"button"` | select | "button" / "reset" / "submit" | 即时应用 |

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

选型有疑问时返回 [状态反馈](../categories/feedback.md)，先比较最多 2–3 项。
