# Gallery

媒体与轮播 · `business-gallery` · 中文意图：图片图库 / 缩略图 / 查看大图

## 1. 什么场景使用

多张图片需要缩略图选择与前后查看，保持图片描述。

**不适合或优先替代：**连续自动展示用Carousel；单张图可直接Image。

先确认本次任务要解决的业务行为，再选择本组件。普通业务页面优先使用这里的基础能力；只有用户明确要求装饰效果时才追加效果组件。

## 2. 只加载这一项

1. 只读本指南，确认用途与边界。
2. 只读 [src/business/demos/media/business-gallery.tsx](../../../src/business/demos/media/business-gallery.tsx)；共享基础有需要才读 [support.tsx](../../../src/business/support.tsx)。
3. 本例从 components 按需导入独立控件；只读实际导入的 .tsx 及同名 .module.css。布局工具类也显式使用 CSS Modules，不给整块区域的 button/input 套统一动效。
4. 涉及业务错误、权限、数据或异步行为时才追加对应契约：[18-auxiliary](../../contracts/18-auxiliary.md)。
5. 预览库使用本项独立 import() 入口；复制到目标项目时也只接入所需组件和直接依赖。

所有实现使用本项目已有 React、原生语义控件、Motion 和 CSS。完整交互、类型与回调以当前示例代码为准；局部弹性、下拉、媒体与日历效果见 [交互动效指南](../motion-guide.md)。

## 3. 本例真实用法

下面来自当前独立示例。默认导出是一个可运行实例；复制后把本地选项、数据与回调接到目标项目已有业务层，不把演示结果当作后端成功。

```tsx
// 当前 Gallery 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { Dialog } from '../../components/Dialog';
import { MediaViewer } from '../../components/MediaViewer';
import { MEDIA } from '../../../shared/demo-support';

const ownedStyles={};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessGalleryDemo() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  return <BusinessDemo title="Gallery" description="缩略图高亮弹性滑动，大图以形状揭示切换，可放大并继续浏览。">
    <MediaViewer  index={index} onChange={setIndex}   sources={[import.meta.env.BASE_URL + "media/scene-1.svg", import.meta.env.BASE_URL + "media/scene-2.svg", import.meta.env.BASE_URL + "media/scene-3.svg", import.meta.env.BASE_URL + "media/scene-4.svg", import.meta.env.BASE_URL + "media/scene-5.svg", import.meta.env.BASE_URL + "media/scene-6.svg"]} label={"自然色图片集"} thumbnails={true}  />
    <Button onClick={() => setOpen(true)} type={"button"} variant={"primary"} >放大当前图片</Button>
    <Dialog open={open} title={`图片 ${index + 1} / ${MEDIA.length}`} onClose={() => setOpen(false)}><MediaViewer  index={index} onChange={setIndex}  sources={[import.meta.env.BASE_URL + "media/scene-1.svg", import.meta.env.BASE_URL + "media/scene-2.svg", import.meta.env.BASE_URL + "media/scene-3.svg", import.meta.env.BASE_URL + "media/scene-4.svg", import.meta.env.BASE_URL + "media/scene-5.svg", import.meta.env.BASE_URL + "media/scene-6.svg"]} label={"放大的自然色图片"} thumbnails={false}  /></Dialog>
  </BusinessDemo>;
}
```

### 完整组件 API

| 参数 | 类型 | 必填 | 上游默认值 | 中文说明 |
|---|---|---|---|---|
| `sources` | `readonly string[]` | 是 | `未指定` | 按顺序展示的媒体资源地址列表。 |
| `index` | `number` | 是 | `未指定` | 当前展示条目的索引。 |
| `onChange` | `(index: number) => void` | 是 | `未指定` | 用户改变值或条目顺序时通知调用方；回调参数类型就是应写回的值或原生事件。 |
| `label` | `string` | 是 | `未指定` | 向用户或辅助技术说明控件的名称。 |
| `thumbnails` | `boolean` | 否 | `false` | 是否显示可点击切换的缩略图列表。 |
| `Button.type` | `"button" \| "reset" \| "submit" \| undefined` | 否 | `'button'` | 原生输入或按钮的行为类型；按钮类型会影响表单提交。 |
| `Button.className` | `string \| undefined` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `Button.children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `Button.variant` | `'primary' \| 'secondary' \| 'danger'` | 否 | `'primary'` | 选择组件内置的外观或效果变体。 |
| `Button.ref` | `Ref<HTMLButtonElement>` | 否 | `未指定` | 连接实际 DOM 元素或组件命令句柄，支持类型声明中的 ref 形式。 |
| `Dialog.open` | `boolean` | 是 | `!dialog.open` | 是否展开或显示内容，由调用方控制。 |
| `Dialog.onClose` | `() => void` | 是 | `未指定` | 请求关闭弹层、对话框或提示时调用，调用方同步更新 open 状态。 |
| `Dialog.title` | `string` | 是 | `未指定` | 组件标题或原生元素提示文字。 |
| `Dialog.children` | `ReactNode` | 是 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `Dialog.side` | `'right' \| 'left' \| 'top' \| 'bottom'` | 否 | `未指定` | 抽屉或浮层从哪个边缘出现。 |

**继承的原生属性：**

- `ButtonHTMLAttributes<HTMLButtonElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**sources 的真实接入：**

```tsx
sources={MEDIA}
```

**onChange 的真实接入：**

```tsx
onChange={setIndex}
```

**children 的真实接入：**

```tsx
children={<>放大当前图片</>}
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

**children 的真实接入：**

```tsx
children={<><MediaViewer sources={MEDIA} index={index} onChange={setIndex} label="放大的自然色图片" /></>}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，不改写上游 API。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.sources` | `["@media/scene-1.svg","@media/scene-2.svg","@media/scene-3.svg","@media/scene-4.svg","@media/scene-5.svg","@media/scene-6.svg"]` | json | 不限 ~ 不限 | 即时应用 |
| `t0.label` | `"自然色图片集"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.thumbnails` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t1.type` | `"button"` | select | "button" / "reset" / "submit" | 即时应用 |
| `t1.variant` | `"primary"` | select | "primary" / "secondary" / "danger" | 即时应用 |
| `t3.sources` | `["@media/scene-1.svg","@media/scene-2.svg","@media/scene-3.svg","@media/scene-4.svg","@media/scene-5.svg","@media/scene-6.svg"]` | json | 不限 ~ 不限 | 即时应用 |
| `t3.label` | `"放大的自然色图片"` | text | 不限 ~ 不限 | 即时应用 |
| `t3.thumbnails` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `state.index` | `0` | number | 不限 ~ 不限 | 即时应用；原组件回调同步受控值 |
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

能力对照：dome-gallery、circular-gallery 是已有相邻效果；通用业务行为按本例补齐。

选型有疑问时返回 [媒体浏览](../categories/media.md)，先比较最多 2–3 项。
