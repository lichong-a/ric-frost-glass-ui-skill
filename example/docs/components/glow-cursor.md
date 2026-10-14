# Glow Cursor

指针与轨迹 · `glow-cursor` · 中文意图：发光光标 / 柔光拖尾

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-ric-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

指针留下逐渐衰减的柔和光迹。

功能要求：装饰层不拦截业务点击、不隐藏真实指针，不成为完成业务的唯一操作方式。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/pointer/glow-cursor.tsx](../../src/demos/pointer/glow-cursor.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Animations/GlowCursor/GlowCursor.tsx](../../.upstream/src/ts-default/Animations/GlowCursor/GlowCursor.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Animations/GlowCursor/GlowCursor.css](../../.upstream/src/ts-default/Animations/GlowCursor/GlowCursor.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/glow-cursor.json](../../src/parameters/definitions/glow-cursor.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component glow-cursor
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Glow Cursor 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Animations/GlowCursor/GlowCursor';
import { palette } from '../../shared/demo-support';

// 真实流动光迹限制在独立预览文档；移动与点击均可触发。
// 此演示需要可用的WebGL上下文；上下文创建失败时应显示能力提示，不能声称效果已经运行。

export default function GlowCursorDemo() {

  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component

   color={"#52604e"} secondaryColor={"#c3ae88"} intensity={0.75} trailWidth={2.5} linger={0.8} glow={0.65} clickBurst={true} quality={"medium"} theme={"light"} maxDevicePixelRatio={1.5} style={{ "width": "100%", "height": "100%" }} hotspot={0.8} followSpeed={0.6} grain={0} enabled={true} ><div style={{ height: 320, display: "grid", placeItems: "center", color: palette.ink }}><p>移动指针，留下柔和光迹</p></div></Component>
    </div>
  );
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `color` | `string` | 否 | `'#5f8bff'` | 颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `secondaryColor` | `string` | 否 | `未指定` | 次要颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `intensity` | `number` | 否 | `1.3` | 强度，控制 glow cursor 的对应渲染或交互参数。 |
| `trailWidth` | `number` | 否 | `3` | 轨迹宽度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `linger` | `number` | 否 | `1.4` | 停留，控制 glow cursor 的对应渲染或交互参数。 |
| `glow` | `number` | 否 | `1.2` | 辉光，控制 glow cursor 的对应渲染或交互参数。 |
| `hotspot` | `number` | 否 | `0.8` | 热点，控制 glow cursor 的对应渲染或交互参数。 |
| `followSpeed` | `number` | 否 | `0.6` | 是否跟随速度，决定该分支的展示或交互行为。 |
| `grain` | `number` | 否 | `0` | 颗粒，控制 glow cursor 的对应渲染或交互参数。 |
| `clickBurst` | `boolean` | 否 | `true` | 是否点击爆发，决定该分支的展示或交互行为。 |
| `quality` | `'low' \| 'medium' \| 'high'` | 否 | `'high'` | 渲染质量，控制 glow cursor 的对应渲染或交互参数。 |
| `theme` | `'dark' \| 'light'` | 否 | `'dark'` | 主题，控制 glow cursor 的对应渲染或交互参数。 |
| `blendMode` | `CSSProperties['mixBlendMode']` | 否 | `(theme === 'light' ? 'normal' : 'screen')` | 混合模式的结构化配置；对象字段按完整类型传入并由组件读取。 |
| `maxDevicePixelRatio` | `number` | 否 | `2` | 最大设备像素比例，控制 glow cursor 的对应渲染或交互参数。 |
| `enabled` | `boolean` | 否 | `true` | 是否启用，决定该分支的展示或交互行为。 |
| `children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `className` | `string \| undefined` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `style` | `CSSProperties \| undefined` | 否 | `未指定` | 容器的 React 内联样式对象，尺寸、布局与 CSS 属性按 CSSProperties 传入。 |

**继承的原生属性：**

- `Omit<HTMLAttributes<HTMLDivElement>, 'color'>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**blendMode 的真实接入：**

```tsx
blendMode={"color"}
```

**children 的真实接入：**

```tsx
children={<><div style={{ height: 320, display: "grid", placeItems: "center", color: palette.ink }}><p>移动指针，留下柔和光迹</p></div></>}
```

**style 的真实接入：**

```tsx
style={{ width: '100%', height: '100%' }}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.color` | `"#52604e"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.secondaryColor` | `"#c3ae88"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.intensity` | `0.75` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.trailWidth` | `2.5` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.linger` | `0.8` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.glow` | `0.65` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.clickBurst` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.quality` | `"medium"` | select | "low" / "medium" / "high" | 调节结束后重建 |
| `t0.theme` | `"light"` | select | "dark" / "light" | 调节结束后重建 |
| `t0.maxDevicePixelRatio` | `1.5` | range | 0.25 ~ 2 倍率 | 调节结束后重建 |
| `t0.style` | `{"width":"100%","height":"100%"}` | json | 不限 ~ 不限 | 调节结束后重建 |
| `t0.hotspot` | `0.8` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.followSpeed` | `0.6` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.grain` | `0` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.enabled` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Ric 皮肤

- 容器、状态色、边界与焦点使用 Agent Ric 规范；交互命中区不随视觉形变缩小。
- 组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。
- 保留折射、光晕或反光的可观察变化；本例允许深色画布和原版高光强度，阅读文字应保持清晰。

## 5. 加载、动效与降级

本例实际配置：设备访问与音频行为以本例真实 Props 和显式回调为准。capabilities 是源码扫描提示，不能据此声称已请求相机、录音或播放音频。

- 依赖清单：`react`。安装前复用目标项目的兼容版本，不重复加载。
- 运行类型：本例预览入口声明需 WebGL；这是当前示例的运行配置，不是仅凭源码关键词推断。此说明不等于浏览器运行证明。
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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [指针与轨迹](../effects/categories/pointer.md)；否则直接完成当前组件。
