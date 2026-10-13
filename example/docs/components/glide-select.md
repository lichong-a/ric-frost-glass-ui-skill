# Glide Select

表单与选择 · `glide-select` · 中文意图：胶囊选择器 / 滑动选项

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

下拉从入口角部展开且高亮随选项移动。

功能要求：由真实 value / state 与回调驱动；操作可用键盘完成，不能只在动画内部保存业务状态。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/form/glide-select.tsx](../../src/demos/form/glide-select.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Micro/GlideSelect/GlideSelect.tsx](../../.upstream/src/ts-default/Micro/GlideSelect/GlideSelect.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Micro/GlideSelect/GlideSelect.css](../../.upstream/src/ts-default/Micro/GlideSelect/GlideSelect.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/glide-select.json](../../src/parameters/definitions/glide-select.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component glide-select
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Glide Select 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：640px（宿主设置，不是组件 Props）。
import { useState } from 'react';
import GlideSelect from '../../../.upstream/src/ts-default/Micro/GlideSelect/GlideSelect';
import { DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
const cn=(names:string)=>componentClasses(styles,names);

const options = [{ value: 'design', label: '设计工作空间', tag: '当前' }, { value: 'research', label: '研究工作空间', tag: '示例' }, { value: 'delivery', label: '交付工作空间', tag: '示例' }];
export default function GlideSelectDemo() {
  const [value, setValue] = useState("design");
  return <DemoPanel title="Glide Select · 平滑选择"><div className={cn("aw-micro-stack")} style={{ minHeight: 360, paddingTop: 40 }}>
    <GlideSelect  value={value} onChange={setValue}         options={[{ "value": "design", "label": "设计工作空间", "tag": "当前" }, { "value": "research", "label": "研究工作空间", "tag": "示例" }, { "value": "delivery", "label": "交付工作空间", "tag": "示例" }]} ariaLabel={"选择演示工作空间"} showTags={true} accentColor={"#52604e"} surfaceColor={"#faf7f0"} highlightColor={"#a6b39a"} textColor={"#1f2d26"} radius={10} menuWidth={280} placeholder={"Select…"} size={"md"} placement={"bottom"} align={"left"} popDuration={180} glideDuration={220} rememberPosition={true} disabled={false}  />
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">当前：{options.find(item => item.value === value)?.label}</p>
  </div></DemoPanel>;
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `options` | `(string \| GlideSelectOption)[]` | 否 | `DEFAULT_OPTIONS` | 可选择的候选项，显示标签与提交值按选项类型定义。 |
| `value` | `string` | 否 | `inner` | 当前受控值，由调用方维护并随交互回调更新。 |
| `defaultValue` | `string` | 否 | `''` | 非受控模式的初始值；挂载后更新通常通过内部状态或受控 value 完成。 |
| `onChange` | `(value: string, option: GlideSelectOption) => void` | 否 | `未指定` | 用户改变值或条目顺序时通知调用方；回调参数类型就是应写回的值或原生事件。 |
| `placeholder` | `string` | 否 | `'Select…'` | 尚未填写或选择时显示的提示文字。 |
| `showTags` | `boolean` | 否 | `true` | 是否显示标签组，决定该分支的展示或交互行为。 |
| `accentColor` | `string` | 否 | `'#f5f5f5'` | 强调颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `surfaceColor` | `string` | 否 | `'#27272a'` | 表面颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `highlightColor` | `string` | 否 | `'#3f3f46'` | 高亮颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `textColor` | `string` | 否 | `'#f5f5f5'` | 文字颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `size` | `'sm' \| 'md' \| 'lg'` | 否 | `'md'` | 尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `radius` | `number` | 否 | `10` | 半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `menuWidth` | `number` | 否 | `176` | 菜单宽度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `placement` | `'top' \| 'bottom'` | 否 | `'bottom'` | 布局位置，控制 glide select 的对应渲染或交互参数。 |
| `align` | `'left' \| 'right'` | 否 | `'left'` | 对齐，控制 glide select 的对应渲染或交互参数。 |
| `popDuration` | `number` | 否 | `180` | 弹出时长，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `glideDuration` | `number` | 否 | `220` | 滑移时长，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `rememberPosition` | `boolean` | 否 | `true` | 是否记住位置，决定该分支的展示或交互行为。 |
| `disabled` | `boolean` | 否 | `false` | 是否禁用控件的用户交互。 |
| `ariaLabel` | `string` | 否 | `'Select'` | 无障碍标签，控制 glide select 的对应渲染或交互参数。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |

**options 的真实接入：**

```tsx
options={options}
```

**onChange 的真实接入：**

```tsx
onChange={setValue}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.options` | `[{"value":"design","label":"设计工作空间","tag":"当前"},{"value":"research","label":"研究工作空间","tag":"示例"},{"value":"delivery","label":"交付工作空间","tag":"示例"}]` | json | 不限 ~ 不限 | 即时应用 |
| `t0.ariaLabel` | `"选择演示工作空间"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.showTags` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.accentColor` | `"#52604e"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.surfaceColor` | `"#faf7f0"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.highlightColor` | `"#a6b39a"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.textColor` | `"#1f2d26"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.radius` | `10` | number | 不限 ~ 不限 | 即时应用 |
| `t0.menuWidth` | `280` | number | 不限 ~ 不限 | 即时应用 |
| `t0.placeholder` | `"Select…"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.size` | `"md"` | select | "sm" / "md" / "lg" | 即时应用 |
| `t0.placement` | `"bottom"` | select | "top" / "bottom" | 即时应用 |
| `t0.align` | `"left"` | select | "left" / "right" | 即时应用 |
| `t0.popDuration` | `180` | number | 不限 ~ 不限 | 即时应用 |
| `t0.glideDuration` | `220` | number | 不限 ~ 不限 | 即时应用 |
| `t0.rememberPosition` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.disabled` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `state.value` | `"design"` | select | "design" / "research" / "delivery" | 即时应用；原组件回调同步受控值 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `640`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Wan 皮肤

- 容器、状态色、边界与焦点使用 Agent Wan 规范；交互命中区不随视觉形变缩小。
- 组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。

## 5. 加载、动效与降级

本例实际配置：设备访问与音频行为以本例真实 Props 和显式回调为准。capabilities 是源码扫描提示，不能据此声称已请求相机、录音或播放音频。

- 依赖清单：`@hugeicons/core-free-icons`、`@hugeicons/react`、`react`。安装前复用目标项目的兼容版本，不重复加载。
- 运行类型：本例预览入口不要求预先通过图形接口检查；实际组件内部的可选渲染分支由源码和本例 Props 决定。此说明不等于浏览器运行证明。
- 动效策略：遵从系统减少动效偏好，功能交互保持可用。
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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [表单与选择](../effects/categories/form.md)；否则直接完成当前组件。
