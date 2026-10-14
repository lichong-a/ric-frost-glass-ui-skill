# Dot Grid

背景与光效 · `dot-grid` · 中文意图：弹性点阵 / 点阵拖拽

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-ric-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

点阵受指针推动、拖拽并回弹。

功能要求：装饰层不拦截业务点击、不隐藏真实指针，不成为完成业务的唯一操作方式。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/background/dot-grid.tsx](../../src/demos/background/dot-grid.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Backgrounds/DotGrid/DotGrid.tsx](../../.upstream/src/ts-default/Backgrounds/DotGrid/DotGrid.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Backgrounds/DotGrid/DotGrid.css](../../.upstream/src/ts-default/Backgrounds/DotGrid/DotGrid.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/dot-grid.json](../../src/parameters/definitions/dot-grid.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component dot-grid
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Dot Grid 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import Component from '../../../.upstream/src/ts-default/Backgrounds/DotGrid/DotGrid';


/** Agent Ric natural-tone preset for the real Dot Grid component. */
export default function DotGridDemo() {
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component










           baseColor={"#52604e"} activeColor={"#a6b39a"} dotSize={4} gap={18} proximity={140} strength={0.6} shockStrength={2.5} glow={0.2} returnDuration={0.8} mouseInteraction={true} clickShock={true} bounce={0.6} tension={0.4} shockRadius={320} swell={0.8} stretch={0.5} shape={"circle"} fade={0} opacity={1} intro={true} paused={false}
        />
      </div>
    </div>
  );
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `dotSize` | `number` | 否 | `5` | 圆点尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `gap` | `number` | 否 | `18` | 相邻单元、卡片或字符之间的间距；单位由组件实现定义。 |
| `baseColor` | `string` | 否 | `'#3a3446'` | 基础颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `activeColor` | `string` | 否 | `'#ffffff'` | 激活颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `proximity` | `number` | 否 | `140` | 邻近程度，控制 dot grid 的对应渲染或交互参数。 |
| `strength` | `number` | 否 | `1` | 强度，控制 dot grid 的对应渲染或交互参数。 |
| `bounce` | `number` | 否 | `0.6` | 回弹，控制 dot grid 的对应渲染或交互参数。 |
| `tension` | `number` | 否 | `0.4` | 张力，控制 dot grid 的对应渲染或交互参数。 |
| `returnDuration` | `number` | 否 | `0.8` | 返回时长，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `shockRadius` | `number` | 否 | `320` | 冲击半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `shockStrength` | `number` | 否 | `5` | 冲击强度，控制 dot grid 的对应渲染或交互参数。 |
| `swell` | `number` | 否 | `0.8` | 膨胀，控制 dot grid 的对应渲染或交互参数。 |
| `stretch` | `number` | 否 | `0.5` | 拉伸，控制 dot grid 的对应渲染或交互参数。 |
| `glow` | `number` | 否 | `0.5` | 辉光，控制 dot grid 的对应渲染或交互参数。 |
| `shape` | `Shape` | 否 | `'circle'` | 形状，控制 dot grid 的对应渲染或交互参数。 |
| `fade` | `number` | 否 | `0` | 淡出，控制 dot grid 的对应渲染或交互参数。 |
| `opacity` | `number` | 否 | `1` | 不透明度，控制 dot grid 的对应渲染或交互参数。 |
| `intro` | `boolean` | 否 | `true` | 是否入场，决定该分支的展示或交互行为。 |
| `mouseInteraction` | `boolean` | 否 | `true` | 是否鼠标交互，决定该分支的展示或交互行为。 |
| `clickShock` | `boolean` | 否 | `true` | 是否点击冲击，决定该分支的展示或交互行为。 |
| `paused` | `boolean` | 否 | `false` | 是否暂停持续动画或模拟更新。 |
| `dpr` | `number` | 否 | `未指定` | 渲染像素比；影响 Canvas/WebGL 的清晰度与绘制成本。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `style` | `CSSProperties` | 否 | `未指定` | 容器的 React 内联样式对象，尺寸、布局与 CSS 属性按 CSSProperties 传入。 |

**style 的真实接入：**

```tsx
style={{ width: "100%", minHeight: 240 }}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.baseColor` | `"#52604e"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.activeColor` | `"#a6b39a"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.dotSize` | `4` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.gap` | `18` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.proximity` | `140` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.strength` | `0.6` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.shockStrength` | `2.5` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.glow` | `0.2` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.returnDuration` | `0.8` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.mouseInteraction` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.clickShock` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.bounce` | `0.6` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.tension` | `0.4` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.shockRadius` | `320` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.swell` | `0.8` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.stretch` | `0.5` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.shape` | `"circle"` | select | "circle" / "square" | 调节结束后重建 |
| `t0.fade` | `0` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.opacity` | `1` | range | 0 ~ 1 比例 | 调节结束后重建 |
| `t0.intro` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.paused` | `false` | switch | 不限 ~ 不限 | 调节结束后重建 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Ric 皮肤

- 画布优先保留 React Bits 的原版配色与可观察强度，背景有独立边界并为光晕预留空间；业务正文使用稳定阅读面。
- 组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。

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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [背景与光效](../effects/categories/background.md)；否则直接完成当前组件。
