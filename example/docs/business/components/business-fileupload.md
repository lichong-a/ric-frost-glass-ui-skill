# FileUpload

数据与文件 · `business-fileupload` · 中文意图：文件选择 / 附件验证 / 移除附件

## 1. 什么场景使用

用户选择本地文件，验证类型大小数量并能逐项移除。

**不适合或优先替代：**真实上传需明确后端与授权，不能模拟外部写入成功。

先确认本次任务要解决的业务行为，再选择本组件。普通业务页面优先使用这里的基础能力；只有用户明确要求装饰效果时才追加效果组件。

## 2. 只加载这一项

1. 只读本指南，确认用途与边界。
2. 只读 [src/business/demos/data/business-fileupload.tsx](../../../src/business/demos/data/business-fileupload.tsx)；需核对 API 与 DIY 配置时读 [本项参数记录](../../../src/parameters/definitions/business-fileupload.json)；共享基础有需要才读 [support.tsx](../../../src/business/support.tsx)。
3. 本例从 components 按需导入独立控件；只读实际导入的 .tsx 及同名 .module.css。布局工具类也显式使用 CSS Modules，不给整块区域的 button/input 套统一动效。
4. 涉及业务错误、权限、数据或异步行为时才追加对应契约：[13-import-dialog](../../contracts/13-import-dialog.md)。
5. 预览库使用本项独立 import() 入口；复制到目标项目时也只接入所需组件和直接依赖。

所有实现使用本项目已有 React、原生语义控件、Motion 和 CSS。完整交互、类型与回调以当前示例代码为准；局部弹性、下拉、媒体与日历效果见 [交互动效指南](../motion-guide.md)。

## 3. 本例真实用法

下面来自当前独立示例。默认导出是一个可运行实例；复制后把本地选项、数据与回调接到目标项目已有业务层，不把演示结果当作后端成功。

```tsx
// 当前 FileUpload 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：680px（宿主设置，不是组件 Props）。
import { useId, useRef, useState, type DragEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, FileText, Image as ImageIcon, Upload, X } from 'lucide-react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { useBusinessReducedMotion } from '../../motion-preference';
import { LOCAL_FILE_LIMIT, localFileKey, selectLocalFiles } from '../../components/local-file-selection';
import styles from '../../components/FileUpload.module.css';

export default function BusinessFileUploadDemo() {
  const [selection, setSelection] = useState<{ files: File[]; message: string; hasWarnings: boolean }>({
    files: [], message: '请选择文件，每项最多 1 MiB、总数最多 5 项。', hasWarnings: false,
  });
  const [dragOver, setDragOver] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const dragDepth = useRef(0);
  const hintId = useId();
  const reduced = useBusinessReducedMotion();
  const { files, message, hasWarnings } = selection;
  function select(incoming: File[]) {
    if (!incoming.length) return;
    setSelection(current => {
      const result = selectLocalFiles(current.files, incoming);
      const details = [
        `新增 ${result.added} 项`,
        result.rejected ? `${result.rejected} 项类型或大小不符` : '',
        result.duplicates ? `${result.duplicates} 项重复` : '',
        result.overflow ? `${result.overflow} 项超过五项容量` : '',
      ].filter(Boolean).join('，');
      return { files: result.files, message: `${details}。文件仍仅保存在本地。`, hasWarnings: result.rejected > 0 || result.overflow > 0 };
    });
  }
  function enter(event: DragEvent<HTMLDivElement>) {
    if (!event.dataTransfer.types.includes('Files')) return;
    event.preventDefault();
    dragDepth.current++;
    setDragOver(true);
  }
  function leave() {
    dragDepth.current = Math.max(0, dragDepth.current - 1);
    if (!dragDepth.current) setDragOver(false);
  }
  function drop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    dragDepth.current = 0;
    setDragOver(false);
    select(Array.from(event.dataTransfer.files));
  }
  function remove(file: File) {
    setSelection(current => ({ files: current.files.filter(item => localFileKey(item) !== localFileKey(file)), message: `已移除 ${file.name}，剩余文件仅保存在本地。`, hasWarnings: false }));
  }
  return (
    <BusinessDemo title="FileUpload" description="真实选择本地图片、文本或 CSV 文件，验证大小和类型，支持移除；文件保留在浏览器内。">
      <input ref={input} className={styles.nativeInput}      onChange={event => { select(Array.from(event.target.files ?? [])); event.target.value = ''; }} type={"file"} accept={"image/*,.txt,.csv"} multiple={true} aria-label={"选择本地文件"} tabIndex={-1}  />
      <motion.div className={styles.dropZone} data-dragover={dragOver} role="group" aria-label="选择或拖放本地文件" onDragEnter={enter} onDragLeave={leave} onDragOver={event => { event.preventDefault(); event.dataTransfer.dropEffect = 'copy'; }} onDrop={drop} animate={{ borderColor: dragOver ? 'var(--aw-color-action-primary)' : 'var(--aw-color-border-control)' }} transition={{ duration: reduced ? 0 : 0.18 }}>
        <span className={styles.uploadIcon}><Upload size={25} aria-hidden="true" /></span>
        <h3 className={styles.dropTitle}>{dragOver ? '松开以选择文件' : '将文件拖放到这里'}</h3>
        <p id={hintId} className={styles.hint}>图片、TXT 或 CSV · 每项最多 1 MiB · 最多 {LOCAL_FILE_LIMIT} 项</p>
        <Button  data-size="sm" aria-describedby={hintId} onClick={() => input.current?.click()} variant={"secondary"} type={"button"} >选择本地文件</Button>
        <span className={styles.localNote}>文件仅在本地，不会上传。</span>
      </motion.div>
      <div className={styles.listHeader}>
        <h3 className={styles.listTitle}>已选文件 <span className={styles.count}>{files.length} / {LOCAL_FILE_LIMIT}</span></h3>
        <Button  data-size="sm" disabled={!files.length} onClick={() => { setSelection({ files: [], message: '本地选择已清空。', hasWarnings: false }); }} variant={"ghost"} type={"button"} >移除全部</Button>
      </div>
      <ul className={styles.list} aria-label="已选文件">
        <AnimatePresence initial={false} mode="popLayout">
          {files.map(file => {
            const Icon = file.type.startsWith('image/') ? ImageIcon : FileText;
            return (
              <motion.li data-ui="aw-business-row" className={styles.file} key={localFileKey(file)} layout={!reduced} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: reduced ? 0 : 0.18 }}>
                <span className={styles.fileIcon}><Icon size={19} aria-hidden="true" /></span>
                <span className={styles.fileInfo}><span className={styles.fileName}>{file.name}</span><span className={styles.fileSize}>{Math.ceil(file.size / 1024)} KiB</span></span>
                <span className={styles.ready}><Check size={13} aria-hidden="true" />本地就绪</span>
                <Button  data-size="sm" data-icon-only="true" aria-label={'移除' + file.name} onClick={() => remove(file)} variant={"ghost"} type={"button"} ><X size={16} aria-hidden="true" /></Button>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
      {!files.length ? <p className={styles.empty}>尚未选择文件。选择后可在这里查看和移除。</p> : null}
      <p data-ui="aw-business-status" className={styles.status} data-warning={hasWarnings} role="status">{message}</p>
    </BusinessDemo>
  );
}
```

### 完整组件 API

源码默认值来自本包业务实现；本例默认配置来自独立示例，两者可能不同。

本例默认导出是由原生元素与叶组件组成的演示函数，不接收公开 Props。下表按叶组件前缀列出实际 API；原生属性类型单独注明。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `input.ref` | `Ref<HTMLInputElement> \| undefined` | 否 | `未指定` | 连接实际 DOM 元素或组件命令句柄，支持类型声明中的 ref 形式。 |
| `input.className` | `string \| undefined` | 否 | `未指定` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `input.type` | `HTMLInputTypeAttribute \| undefined` | 否 | `未指定` | 原生输入或按钮的行为类型；按钮类型会影响表单提交。 |
| `input.accept` | `string \| undefined` | 否 | `未指定` | accept，控制 input 的对应渲染或交互参数。 |
| `input.multiple` | `boolean \| undefined` | 否 | `未指定` | multiple，控制 input 的对应渲染或交互参数。 |
| `input.aria-label` | `string \| undefined` | 否 | `未指定` | 辅助技术的 label 状态或说明；值须与控件当前可观察行为一致。 |
| `input.tabIndex` | `number \| undefined` | 否 | `未指定` | 键盘 Tab 导航的焦点顺序。 |
| `input.onChange` | `ChangeEventHandler<HTMLInputElement> \| undefined` | 否 | `未指定` | 用户改变值或条目顺序时通知调用方；回调参数类型就是应写回的值或原生事件。 |
| `Button · t1.type` | `"button" \| "reset" \| "submit" \| undefined` | 否 | `'button'` | 原生输入或按钮的行为类型；按钮类型会影响表单提交。 |
| `Button · t1.className` | `string \| undefined` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `Button · t1.children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `Button · t1.variant` | `'primary' \| 'secondary' \| 'danger' \| 'ghost'` | 否 | `'primary'` | 选择组件内置的外观或效果变体。 |
| `Button · t1.ref` | `Ref<HTMLButtonElement>` | 否 | `未指定` | 连接实际 DOM 元素或组件命令句柄，支持类型声明中的 ref 形式。 |

本示例函数不接收额外公开 Props，能力由原生元素与上述叶组件组合；下面列出实际继承类型和可编辑示例配置。

**继承的原生属性：**

- `DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `ButtonHTMLAttributes<HTMLButtonElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**children 的真实接入：**

```tsx
children={<>选择本地文件</>}
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
| `t0.type` | `"file"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.accept` | `"image/*,.txt,.csv"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.multiple` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.aria-label` | `"选择本地文件"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.tabIndex` | `-1` | number | 不限 ~ 不限 | 即时应用 |
| `t1.variant` | `"secondary"` | select | "primary" / "secondary" / "danger" / "ghost" | 即时应用 |
| `t1.type` | `"button"` | select | "button" / "reset" / "submit" | 即时应用 |
| `t2.variant` | `"ghost"` | select | "primary" / "secondary" / "danger" / "ghost" | 即时应用 |
| `t2.type` | `"button"` | select | "button" / "reset" / "submit" | 即时应用 |
| `t3.variant` | `"ghost"` | select | "primary" / "secondary" / "danger" / "ghost" | 即时应用 |
| `t3.type` | `"button"` | select | "button" / "reset" / "submit" | 即时应用 |

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
