# Paper Crumple

媒体与轮播 · `paper-crumple` · 中文意图：揉纸 / 纸张捏皱

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

图像在按住拖动时表现纸张褶皱。

功能要求：保持内容的语义和可访问名称；只有真实可交互元素可进入焦点顺序。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/media/paper-crumple.tsx](../../src/demos/media/paper-crumple.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Micro/PaperCrumple/PaperCrumple.tsx](../../.upstream/src/ts-default/Micro/PaperCrumple/PaperCrumple.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Micro/PaperCrumple/PaperCrumple.css](../../.upstream/src/ts-default/Micro/PaperCrumple/PaperCrumple.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/paper-crumple.json](../../src/parameters/definitions/paper-crumple.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component paper-crumple
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Paper Crumple 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：720px（宿主设置，不是组件 Props）。
import { useState } from 'react';
import PaperCrumple, { type PaperCrumpleState, type PaperCrumpleRelease } from '../../../.upstream/src/ts-default/Micro/PaperCrumple/PaperCrumple';
import { DemoPanel } from '../../shared/demo-support';
import { microPaperArtwork } from '../../shared/micro-assets';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
const cn=(names:string)=>componentClasses(styles,names);

export default function PaperCrumpleDemo() {
  const [state, setState] = useState<PaperCrumpleState>('flat');
  const [release, setRelease] = useState<PaperCrumpleRelease>("creased");
  const [revision, setRevision] = useState(0);
  const [error, setError] = useState('');
  return <DemoPanel title="Paper Crumple · 纸张揉皱"><div className={cn("aw-micro-stack")}>
    <PaperCrumple src={microPaperArtwork}     releaseBehavior={release}   resetKey={revision}  onStateChange={setState} onError={reason => setError(reason.message)} alt={"自然色示例海报"} width={260} height={325} sceneHeight={430} paperColor={"#faf7f0"} shadowOpacity={0.16} seed={12} backSrc={""} imageFit={"cover"} crumpleAmount={0.85} crumpleDuration={0.55} releaseDuration={0.4} foldCount={6} foldSharpness={0.6} wrinkleDepth={0.65} creaseStrength={0.18} roughness={0.92} paperTexture={0.08} lightIntensity={1.8} lightAngle={-35} shadow={true} draggable={true} dragRotation={10} dragRadius={180} returnToOrigin={true} rotation={0} detail={64} disabled={false}  />
    <div className={cn("aw-micro-controls")}><label className={styles['aw-micro-label']}>松开后<select className={styles['aw-micro-select']} value={release} onChange={event => setRelease(event.target.value as PaperCrumpleRelease)}><option  value={"creased"} >保留折痕</option><option  value={"restore"} >恢复平整</option><option  value={"stay"} >保持揉皱</option></select></label><button className={styles['aw-micro-action']}  onClick={() => { setRevision(value => value + 1); setError(''); }} type={"button"} >重置纸张</button></div>
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">{error || `纸张状态：${state}。按住揉皱，拖动调整位置。`}</p>
  </div></DemoPanel>;
}

```

### 完整组件 API

| 参数 | 类型 | 必填 | 上游默认值 | 中文说明 |
|---|---|---|---|---|
| `src` | `string` | 是 | `undefined` | 加载图像、视频或纹理的资源地址。 |
| `alt` | `string` | 否 | `'Crumplable image'` | 图像无法显示及辅助技术读取时的替代文字。 |
| `backSrc` | `string` | 否 | `''` | 背面资源，控制 paper crumple 的对应渲染或交互参数。 |
| `width` | `number` | 否 | `320` | 容器或效果的宽度，CSS 字符串与数值的支持以类型为准。 |
| `height` | `number` | 否 | `400` | 容器或效果的高度，CSS 字符串与数值的支持以类型为准。 |
| `sceneHeight` | `number` | 否 | `560` | 场景高度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `imageFit` | `'cover' \| 'contain'` | 否 | `'cover'` | 图像适配，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `releaseBehavior` | `PaperCrumpleRelease` | 否 | `'restore'` | 释放行为，控制 paper crumple 的对应渲染或交互参数。 |
| `crumpleAmount` | `number` | 否 | `0.85` | 揉皱幅度，控制 paper crumple 的对应渲染或交互参数。 |
| `crumpleDuration` | `number` | 否 | `0.55` | 揉皱时长，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `releaseDuration` | `number` | 否 | `0.4` | 释放时长，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `foldCount` | `number` | 否 | `6` | 折叠数量，控制 paper crumple 的对应渲染或交互参数。 |
| `foldSharpness` | `number` | 否 | `0.6` | 折叠锐度，控制 paper crumple 的对应渲染或交互参数。 |
| `wrinkleDepth` | `number` | 否 | `0.65` | 褶皱深度，控制 paper crumple 的对应渲染或交互参数。 |
| `creaseStrength` | `number` | 否 | `0.18` | 折痕强度，控制 paper crumple 的对应渲染或交互参数。 |
| `paperColor` | `string` | 否 | `'#f4f0e8'` | 纸张颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `roughness` | `number` | 否 | `0.92` | 粗糙度，控制 paper crumple 的对应渲染或交互参数。 |
| `paperTexture` | `number` | 否 | `0.08` | 纸张纹理，控制 paper crumple 的对应渲染或交互参数。 |
| `lightIntensity` | `number` | 否 | `1.8` | 光照强度，控制 paper crumple 的对应渲染或交互参数。 |
| `lightAngle` | `number` | 否 | `-35` | 光照角度，控制 paper crumple 的对应渲染或交互参数。 |
| `shadow` | `boolean` | 否 | `true` | 是否阴影，决定该分支的展示或交互行为。 |
| `shadowOpacity` | `number` | 否 | `0.08` | 阴影不透明度，控制 paper crumple 的对应渲染或交互参数。 |
| `draggable` | `boolean` | 否 | `true` | 是否可拖动，决定该分支的展示或交互行为。 |
| `dragRotation` | `number` | 否 | `10` | 拖动旋转角度，控制 paper crumple 的对应渲染或交互参数。 |
| `dragRadius` | `number` | 否 | `180` | 拖动半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `returnToOrigin` | `boolean` | 否 | `true` | 是否返回目标起点，决定该分支的展示或交互行为。 |
| `rotation` | `number` | 否 | `0` | 旋转角度，控制 paper crumple 的对应渲染或交互参数。 |
| `seed` | `number` | 否 | `7` | 随机种子，控制 paper crumple 的对应渲染或交互参数。 |
| `detail` | `number` | 否 | `64` | 细节，控制 paper crumple 的对应渲染或交互参数。 |
| `disabled` | `boolean` | 否 | `false` | 是否禁用控件的用户交互。 |
| `resetKey` | `number \| string` | 否 | `0` | 重置身份标识，控制 paper crumple 的对应渲染或交互参数。 |
| `onStateChange` | `(state: PaperCrumpleState) => void` | 否 | `未指定` | 控件的状态机切换状态时通知调用方。 |
| `onError` | `(error: Error) => void` | 否 | `未指定` | 错误时执行的回调；按签名接收事件或结果，调用方在函数中同步业务状态。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `style` | `CSSProperties` | 否 | `未指定` | 容器的 React 内联样式对象，尺寸、布局与 CSS 属性按 CSSProperties 传入。 |
| `select.className` | `string \| undefined` | 否 | `未指定` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `select.value` | `string \| number \| readonly string[] \| undefined` | 否 | `未指定` | 当前受控值，由调用方维护并随交互回调更新。 |
| `select.onChange` | `ChangeEventHandler<HTMLSelectElement> \| undefined` | 否 | `未指定` | 用户改变值或条目顺序时通知调用方；回调参数类型就是应写回的值或原生事件。 |
| `select.children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `option · t2.value` | `string \| number \| readonly string[] \| undefined` | 否 | `未指定` | 当前受控值，由调用方维护并随交互回调更新。 |
| `option · t2.children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `button.className` | `string \| undefined` | 否 | `未指定` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `button.type` | `"button" \| "reset" \| "submit" \| undefined` | 否 | `未指定` | 原生输入或按钮的行为类型；按钮类型会影响表单提交。 |
| `button.onClick` | `MouseEventHandler<HTMLButtonElement> \| undefined` | 否 | `未指定` | 用户点击或通过键盘激活时触发的事件处理函数。 |
| `button.children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |

**继承的原生属性：**

- `DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**onStateChange 的真实接入：**

```tsx
onStateChange={setState}
```

**onError 的真实接入：**

```tsx
onError={reason => setError(reason.message)}
```

**style 的真实接入：**

```tsx
style={{ width: "100%", minHeight: 240 }}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，不改写上游 API。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.alt` | `"自然色示例海报"` | text | 不限 ~ 不限 | 调节结束后重建 |
| `t0.width` | `260` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.height` | `325` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.sceneHeight` | `430` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.paperColor` | `"#faf7f0"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.shadowOpacity` | `0.16` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.seed` | `12` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.backSrc` | `""` | text | 不限 ~ 不限 | 调节结束后重建 |
| `t0.imageFit` | `"cover"` | select | "cover" / "contain" | 调节结束后重建 |
| `t0.crumpleAmount` | `0.85` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.crumpleDuration` | `0.55` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.releaseDuration` | `0.4` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.foldCount` | `6` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.foldSharpness` | `0.6` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.wrinkleDepth` | `0.65` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.creaseStrength` | `0.18` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.roughness` | `0.92` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.paperTexture` | `0.08` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.lightIntensity` | `1.8` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.lightAngle` | `-35` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.shadow` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.draggable` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.dragRotation` | `10` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.dragRadius` | `180` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.returnToOrigin` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.rotation` | `0` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.detail` | `64` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.disabled` | `false` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t2.value` | `"creased"` | json | 不限 ~ 不限 | 调节结束后重建 |
| `t3.value` | `"restore"` | json | 不限 ~ 不限 | 调节结束后重建 |
| `t4.value` | `"stay"` | json | 不限 ~ 不限 | 调节结束后重建 |
| `t5.type` | `"button"` | select | "button" / "reset" / "submit" | 调节结束后重建 |
| `state.release` | `"creased"` | select | "creased" / "restore" / "stay" | 即时应用；原组件回调同步受控值 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `720`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Wan 皮肤

- 容器、状态色、边界与焦点使用 Agent Wan 规范；交互命中区不随视觉形变缩小。
- 组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。

## 5. 加载、动效与降级

本例实际配置：设备访问与音频行为以本例真实 Props 和显式回调为准。capabilities 是源码扫描提示，不能据此声称已请求相机、录音或播放音频。

- 依赖清单：`react`、`three`。安装前复用目标项目的兼容版本，不重复加载。
- 运行类型：本例预览入口声明需 WebGL 2；这是当前示例的运行配置，不是仅凭源码关键词推断。此说明不等于浏览器运行证明。
- 动效策略：按需启用的持续 / 高运动效果。
- 示例库降级：动态偏好或能力检查不满足时先不挂载本项，显示原因；减少运动时可明确选择仅播放本次。
- 业务接入的静态降级要求：保留可读内容与原生交互，并提供当前组件的静态状态
- 卸载时释放本例监听、计时、动画帧及拥有的渲染资源；不以隐藏 CSS 代替停止循环。

仅当前需求涉及高级运行、资源或设备权限时再读 [效果与降级策略](../effects-policy.md)。

## 6. 验收本组件

1. 参数与对应源码真实 API 一致，构建可导入，安装失败可恢复。
2. 能观察到第 1 节的核心机制，而不只是相同名称的占位卡片。
3. 真实状态 / 事件 / 键盘与必要的触屏等价操作可用。
4. 画布保留本例的效果对比度和原版配色；外壳、阅读面与基础规范一致。
5. 只激活本项；切换或卸载后停止其持续工作。
6. 减少运动与不可用情形保留本节所述等价内容或功能。

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [媒体与轮播](../categories/media.md)；否则直接完成当前组件。
