# Grid Scan

背景与光效 · `grid-scan` · 中文意图：网格扫描 / 空间扫描

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-ric-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

三维网格空间保留扫描推进。

功能要求：装饰层不拦截业务点击、不隐藏真实指针，不成为完成业务的唯一操作方式。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/background/grid-scan.tsx](../../src/demos/background/grid-scan.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Backgrounds/GridScan/GridScan.tsx](../../.upstream/src/ts-default/Backgrounds/GridScan/GridScan.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Backgrounds/GridScan/GridScan.css](../../.upstream/src/ts-default/Backgrounds/GridScan/GridScan.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/grid-scan.json](../../src/parameters/definitions/grid-scan.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component grid-scan
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Grid Scan 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import { GridScan as Component } from '../../../.upstream/src/ts-default/Backgrounds/GridScan/GridScan';


/** Agent Ric natural-tone preset for the real Grid Scan component. */
export default function GridScanDemo() {
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component













           enableWebcam={false} enableGyro={false} showPreview={false} linesColor={"#a6b39a"} scanColor={"#c3ae88"} scanOpacity={0.35} lineThickness={0.7} enablePost={false} chromaticAberration={0} noiseIntensity={0.02} scanGlow={0.25} scanDuration={3} scanDelay={2.5} scanOnClick={true} modelsPath={"https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@0.22.2/weights"} sensitivity={0.55} gridScale={0.1} lineStyle={"solid"} lineJitter={0.1} bloomIntensity={0} bloomThreshold={0} bloomSmoothing={0} scanDirection={"pingpong"} scanSoftness={2} scanPhaseTaper={0.9} snapBackDelay={250} lightMode={false}
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
| `enableWebcam` | `boolean` | 否 | `false` | 是否请求摄像头并启用人脸检测来驱动网格；启用后仍须浏览器授予权限。 |
| `showPreview` | `boolean` | 否 | `false` | 是否显示预览，决定该分支的展示或交互行为。 |
| `modelsPath` | `string` | 否 | `'https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@0.22.2/weights'` | 人脸模型权重资源的根地址，由摄像头检测加载流程使用。 |
| `sensitivity` | `number` | 否 | `0.55` | 灵敏度，控制 grid scan 的对应渲染或交互参数。 |
| `lineThickness` | `number` | 否 | `1` | 线条厚度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `linesColor` | `string` | 否 | `'#2F293A'` | 线条颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `gridScale` | `number` | 否 | `0.1` | 网格缩放，控制 grid scan 的对应渲染或交互参数。 |
| `lineStyle` | `'solid' \| 'dashed' \| 'dotted'` | 否 | `'solid'` | 线条样式，控制 grid scan 的对应渲染或交互参数。 |
| `lineJitter` | `number` | 否 | `0.1` | 线条抖动，控制 grid scan 的对应渲染或交互参数。 |
| `enablePost` | `boolean` | 否 | `true` | 是否启用后处理，决定该分支的展示或交互行为。 |
| `bloomIntensity` | `number` | 否 | `0` | 泛光强度，控制 grid scan 的对应渲染或交互参数。 |
| `bloomThreshold` | `number` | 否 | `0` | 泛光阈值，控制 grid scan 的对应渲染或交互参数。 |
| `bloomSmoothing` | `number` | 否 | `0` | 泛光平滑，控制 grid scan 的对应渲染或交互参数。 |
| `chromaticAberration` | `number` | 否 | `0.002` | 色散色散，控制 grid scan 的对应渲染或交互参数。 |
| `noiseIntensity` | `number` | 否 | `0.01` | 噪声强度，控制 grid scan 的对应渲染或交互参数。 |
| `scanColor` | `string` | 否 | `'#FF9FFC'` | 扫描颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `scanOpacity` | `number` | 否 | `0.4` | 扫描不透明度，控制 grid scan 的对应渲染或交互参数。 |
| `scanDirection` | `'forward' \| 'backward' \| 'pingpong'` | 否 | `'pingpong'` | 扫描方向，控制 grid scan 的对应渲染或交互参数。 |
| `scanSoftness` | `number` | 否 | `2` | 扫描柔和度，控制 grid scan 的对应渲染或交互参数。 |
| `scanGlow` | `number` | 否 | `0.5` | 扫描辉光，控制 grid scan 的对应渲染或交互参数。 |
| `scanPhaseTaper` | `number` | 否 | `0.9` | 扫描阶段渐缩，控制 grid scan 的对应渲染或交互参数。 |
| `scanDuration` | `number` | 否 | `2.0` | 扫描时长，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `scanDelay` | `number` | 否 | `2.0` | 扫描延迟，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `enableGyro` | `boolean` | 否 | `false` | 是否启用设备姿态或陀螺仪交互驱动效果。 |
| `scanOnClick` | `boolean` | 否 | `false` | 是否扫描点击，决定该分支的展示或交互行为。 |
| `snapBackDelay` | `number` | 否 | `250` | 吸附背面延迟，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `lightMode` | `boolean` | 否 | `false` | 是否光照模式，决定该分支的展示或交互行为。 |
| `className` | `string` | 否 | `未指定` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `style` | `React.CSSProperties` | 否 | `未指定` | 容器的 React 内联样式对象，尺寸、布局与 CSS 属性按 CSSProperties 传入。 |

**style 的真实接入：**

```tsx
style={{ width: "100%", minHeight: 240 }}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.enableWebcam` | `false` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.enableGyro` | `false` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.showPreview` | `false` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.linesColor` | `"#a6b39a"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.scanColor` | `"#c3ae88"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.scanOpacity` | `0.35` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.lineThickness` | `0.7` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.enablePost` | `false` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.chromaticAberration` | `0` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.noiseIntensity` | `0.02` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.scanGlow` | `0.25` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.scanDuration` | `3` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.scanDelay` | `2.5` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.scanOnClick` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.modelsPath` | `"https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@0.22.2/weights"` | text | 不限 ~ 不限 | 调节结束后重建 |
| `t0.sensitivity` | `0.55` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.gridScale` | `0.1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.lineStyle` | `"solid"` | select | "solid" / "dashed" / "dotted" | 调节结束后重建 |
| `t0.lineJitter` | `0.1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.bloomIntensity` | `0` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.bloomThreshold` | `0` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.bloomSmoothing` | `0` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.scanDirection` | `"pingpong"` | select | "forward" / "backward" / "pingpong" | 调节结束后重建 |
| `t0.scanSoftness` | `2` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.scanPhaseTaper` | `0.9` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.snapBackDelay` | `250` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.lightMode` | `false` | switch | 不限 ~ 不限 | 调节结束后重建 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Ric 皮肤

- 画布优先保留 React Bits 的原版配色与可观察强度，背景有独立边界并为光晕预留空间；业务正文使用稳定阅读面。
- 组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。

## 5. 加载、动效与降级

本例实际配置：本例 enableWebcam=false、enableGyro=false、showPreview=false；应用适配层同时阻止禁用相机时加载相机模型。源码有相机相关分支，不代表本例会请求设备。

- 依赖清单：`face-api.js`、`postprocessing`、`react`、`three`。安装前复用目标项目的兼容版本，不重复加载。
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
