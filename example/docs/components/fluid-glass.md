# Fluid Glass

卡片与面板 · `fluid-glass` · 中文意图：流体玻璃 / 动态玻璃

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

玻璃容器保留液体位移与背景折射。

功能要求：保持内容的语义和可访问名称；只有真实可交互元素可进入焦点顺序。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/cards/fluid-glass.tsx](../../src/demos/cards/fluid-glass.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Components/FluidGlass/FluidGlass.tsx](../../.upstream/src/ts-default/Components/FluidGlass/FluidGlass.tsx) |
| 单独 Props 记录 | [example/src/parameters/definitions/fluid-glass.json](../../src/parameters/definitions/fluid-glass.json) |
| 安装资源（setup 后存在） | [example/public/assets/3d/lens.glb](../../public/assets/3d/lens.glb) |
| 安装资源（setup 后存在） | [example/public/assets/3d/cube.glb](../../public/assets/3d/cube.glb) |
| 安装资源（setup 后存在） | [example/public/assets/3d/bar.glb](../../public/assets/3d/bar.glb) |
| 安装资源（setup 后存在） | [example/public/assets/fonts/RobotoFlex.ttf](../../public/assets/fonts/RobotoFlex.ttf) |
| 安装资源（setup 后存在） | [example/notices/RobotoFlex-OFL.txt](../../notices/RobotoFlex-OFL.txt) |
| 安装资源（setup 后存在） | [example/public/assets/draco/draco_decoder.js](../../public/assets/draco/draco_decoder.js) |
| 安装资源（setup 后存在） | [example/public/assets/draco/draco_wasm_wrapper.js](../../public/assets/draco/draco_wasm_wrapper.js) |
| 安装资源（setup 后存在） | [example/public/assets/draco/draco_decoder.wasm](../../public/assets/draco/draco_decoder.wasm) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component fluid-glass
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Fluid Glass 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Components/FluidGlass/FluidGlass';


// 真实Three/Fiber折射透镜，默认图片通过本地集成转换替换为自有素材。
// 需要本地lens.glb、cube.glb、bar.glb模型；按当前选择只展示lens模式，滚动可查看穿过透镜的内容。
// 此演示需要可用WebGL上下文；不支持时应显示能力提示，不声称效果已运行。

export default function FluidGlassDemo() {

  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 480, position: 'relative', overflow: 'hidden' }}>
      <Component
 mode={"lens"} backgroundColor={"#e8e4d7"} textColor={"#1f2d26"} lensProps={{ "ior": 1.12, "thickness": 4, "chromaticAberration": 0.025, "anisotropy": 0.01 }} barProps={{  }} cubeProps={{  }}  />
    </div>
  );
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `mode` | `Mode` | 否 | `'lens'` | 选择组件的渲染或交互工作模式。 |
| `lensProps` | `ModeProps` | 否 | `{}` | 透镜属性配置的结构化配置；对象字段按完整类型传入并由组件读取。 |
| `barProps` | `ModeProps` | 否 | `{}` | 条形属性配置的结构化配置；对象字段按完整类型传入并由组件读取。 |
| `cubeProps` | `ModeProps` | 否 | `{}` | 立方体属性配置的结构化配置；对象字段按完整类型传入并由组件读取。 |
| `backgroundColor` | `string` | 否 | `'#120F17'` | 背景颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `textColor` | `string` | 否 | `'#ffffff'` | 文字颜色，传入组件支持的 CSS 或着色器颜色格式。 |

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.mode` | `"lens"` | select | "lens" / "bar" / "cube" | 调节结束后重建 |
| `t0.backgroundColor` | `"#e8e4d7"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.textColor` | `"#1f2d26"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.lensProps` | `{"ior":1.12,"thickness":4,"chromaticAberration":0.025,"anisotropy":0.01}` | json | 不限 ~ 不限 | 调节结束后重建 |
| `t0.barProps` | `{}` | json | 不限 ~ 不限 | 调节结束后重建 |
| `t0.cubeProps` | `{}` | json | 不限 ~ 不限 | 调节结束后重建 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Wan 皮肤

- 容器、状态色、边界与焦点使用 Agent Wan 规范；交互命中区不随视觉形变缩小。
- 组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。
- 保留折射、光晕或反光的可观察变化；本例允许深色画布和原版高光强度，阅读文字应保持清晰。

## 5. 加载、动效与降级

本例实际配置：本例为真实 Three / Fiber 的 lens 模式，需要 setup 后的 public/assets/3d 模型、public/assets/draco 解码器及 public/assets/fonts/RobotoFlex.ttf。应用适配层将 useGLTF 的解码目录指向 /assets/draco/，两个 Text 使用本地字体；资源不随模板再分发，缺失时先运行本组件 setup。浏览器资源 URL 对应 public 下的相对路径。

- 依赖清单：`@react-three/drei`、`@react-three/fiber`、`maath`、`react`、`three`。安装前复用目标项目的兼容版本，不重复加载。
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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [卡片与面板](../effects/categories/cards.md)；否则直接完成当前组件。
