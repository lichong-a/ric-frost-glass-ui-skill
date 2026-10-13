# Shuffle

文字动效 · `shuffle` · 中文意图：字符洗牌 / 乱序揭示

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

字符变化后稳定成目标文案。

功能要求：保持内容的语义和可访问名称；只有真实可交互元素可进入焦点顺序。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/text/shuffle.tsx](../../src/demos/text/shuffle.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/TextAnimations/Shuffle/Shuffle.tsx](../../.upstream/src/ts-default/TextAnimations/Shuffle/Shuffle.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/TextAnimations/Shuffle/Shuffle.css](../../.upstream/src/ts-default/TextAnimations/Shuffle/Shuffle.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/shuffle.json](../../src/parameters/definitions/shuffle.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component shuffle
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Shuffle 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/TextAnimations/Shuffle/Shuffle';
import { palette } from '../../shared/demo-support';

// 首次入场和悬停重排；组件自身尊重减少动态效果偏好。
// 此演示使用Canvas；确保容器拥有非零宽高。

export default function ShuffleDemo() {

  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 300, display: 'grid', placeItems: 'center', color: palette.ink, fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 650, padding: 24 }}>
      <Component


  text={"AGENT WAN"} shuffleDirection={"right"} duration={0.32} animationMode={"evenodd"} shuffleTimes={1} stagger={0.035} threshold={0.1} triggerOnce={true} triggerOnHover={true} respectReducedMotion={true} colorFrom={"#a6b39a"} colorTo={"#1f2d26"} style={{ "fontSize": "clamp(40px, 7vw, 76px)" }} maxDelay={0} rootMargin={"-100px"} tag={"p"} textAlign={"center"} loop={false} loopDelay={0} scrambleCharset={""}  />
    </div>
  );
}

```

### 完整组件 API

| 参数 | 类型 | 必填 | 上游默认值 | 中文说明 |
|---|---|---|---|---|
| `text` | `string` | 是 | `未指定` | 显示或生成效果的文字内容。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `style` | `React.CSSProperties` | 否 | `{}` | 容器的 React 内联样式对象，尺寸、布局与 CSS 属性按 CSSProperties 传入。 |
| `shuffleDirection` | `'left' \| 'right' \| 'up' \| 'down'` | 否 | `'right'` | 打乱方向，控制 shuffle 的对应渲染或交互参数。 |
| `duration` | `number` | 否 | `0.35` | 一次动画或过渡的持续时长，时间单位以组件实现和示例为准。 |
| `maxDelay` | `number` | 否 | `0` | 最大延迟，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `ease` | `string \| ((t: number) => number)` | 否 | `'power3.out'` | 动画缓动名称或配置，按所用动画库的类型传入。 |
| `threshold` | `number` | 否 | `0.1` | 阈值，控制 shuffle 的对应渲染或交互参数。 |
| `rootMargin` | `string` | 否 | `'-100px'` | IntersectionObserver 的视口边界扩展量，如 0px 或 -20% 0px。 |
| `tag` | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6' \| 'p' \| 'span'` | 否 | `'p'` | 标签，控制 shuffle 的对应渲染或交互参数。 |
| `textAlign` | `React.CSSProperties['textAlign']` | 否 | `'center'` | 文字对齐的结构化配置；对象字段按完整类型传入并由组件读取。 |
| `onShuffleComplete` | `() => void` | 否 | `未指定` | 文字打乱与复位动画完成时通知调用方。 |
| `shuffleTimes` | `number` | 否 | `1` | 打乱次数，控制 shuffle 的对应渲染或交互参数。 |
| `animationMode` | `'random' \| 'evenodd'` | 否 | `'evenodd'` | 动画模式，控制 shuffle 的对应渲染或交互参数。 |
| `loop` | `boolean` | 否 | `false` | 是否循环，决定该分支的展示或交互行为。 |
| `loopDelay` | `number` | 否 | `0` | 循环延迟，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `stagger` | `number` | 否 | `0.03` | 错开，控制 shuffle 的对应渲染或交互参数。 |
| `scrambleCharset` | `string` | 否 | `''` | 打乱字符集，控制 shuffle 的对应渲染或交互参数。 |
| `colorFrom` | `string` | 否 | `未指定` | 颜色起始，传入组件支持的 CSS 或着色器颜色格式。 |
| `colorTo` | `string` | 否 | `未指定` | 颜色目标，传入组件支持的 CSS 或着色器颜色格式。 |
| `triggerOnce` | `boolean` | 否 | `true` | 是否触发方式仅一次，决定该分支的展示或交互行为。 |
| `respectReducedMotion` | `boolean` | 否 | `true` | 是否遵循减少动效动效，决定该分支的展示或交互行为。 |
| `triggerOnHover` | `boolean` | 否 | `true` | 是否触发方式悬停，决定该分支的展示或交互行为。 |

**style 的真实接入：**

```tsx
style={{ fontSize: 'clamp(40px, 7vw, 76px)' }}
```

**ease 的真实接入：**

```tsx
ease={"power3.out"}
```

**textAlign 的真实接入：**

```tsx
textAlign={"center"}
```

**onShuffleComplete 的真实接入：**

```tsx
onShuffleComplete={() => {}}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，不改写上游 API。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.text` | `"AGENT WAN"` | text | 不限 ~ 不限 | 调节结束后重建 |
| `t0.shuffleDirection` | `"right"` | select | "left" / "right" / "up" / "down" | 调节结束后重建 |
| `t0.duration` | `0.32` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.animationMode` | `"evenodd"` | select | "random" / "evenodd" | 调节结束后重建 |
| `t0.shuffleTimes` | `1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.stagger` | `0.035` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.threshold` | `0.1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.triggerOnce` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.triggerOnHover` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.respectReducedMotion` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.colorFrom` | `"#a6b39a"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.colorTo` | `"#1f2d26"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.style` | `{"fontSize":"clamp(40px, 7vw, 76px)"}` | json | 不限 ~ 不限 | 调节结束后重建 |
| `t0.maxDelay` | `0` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.rootMargin` | `"-100px"` | text | 不限 ~ 不限 | 调节结束后重建 |
| `t0.tag` | `"p"` | select | "h1" / "h2" / "h3" / "h4" / "h5" / "h6" / "p" / "span" | 调节结束后重建 |
| `t0.textAlign` | `"center"` | select | "-moz-initial" / "inherit" / "initial" / "revert" / "revert-layer" / "unset" / "center" / "end" / "start" / "left" / "right" / "-khtml-center" / "-khtml-left" / "-khtml-right" / "-moz-center" / "-moz-left" / "-moz-right" / "-webkit-center" / "-webkit-left" / "-webkit-match-parent" / "-webkit-right" / "justify" / "match-parent" | 调节结束后重建 |
| `t0.loop` | `false` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.loopDelay` | `0` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.scrambleCharset` | `""` | text | 不限 ~ 不限 | 调节结束后重建 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

本组件在当前锁定依赖组合下使用明确的类型兼容规则。移植或升级前按需读取 [上游类型兼容说明](../../UPSTREAM_TYPE_COMPATIBILITY.md) 中的对应条目；官方安装文件保持原始字节，不能把本项目的检查结果描述为原始源码未经适配即零诊断。

## 4. Agent Wan 皮肤

- 标题按页面层级选择宋体或 UI 字体；正文保持无衬线。动画终态必须是完整、清晰、可复制的文字。
- 组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。

## 5. 加载、动效与降级

本例实际配置：设备访问与音频行为以本例真实 Props 和显式回调为准。capabilities 是源码扫描提示，不能据此声称已请求相机、录音或播放音频。

- 依赖清单：`@gsap/react`、`gsap`、`react`。安装前复用目标项目的兼容版本，不重复加载。
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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [文字动效](../categories/text.md)；否则直接完成当前组件。
