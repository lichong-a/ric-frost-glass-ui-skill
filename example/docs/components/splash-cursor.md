# Splash Cursor

指针与轨迹 · `splash-cursor` · 中文意图：水花光标 / 流体光标

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

指针扰动产生液体波纹与水花。

功能要求：装饰层不拦截业务点击、不隐藏真实指针，不成为完成业务的唯一操作方式。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/pointer/splash-cursor.tsx](../../src/demos/pointer/splash-cursor.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Animations/SplashCursor/SplashCursor.tsx](../../.upstream/src/ts-default/Animations/SplashCursor/SplashCursor.tsx) |
| 单独 Props 记录 | [example/src/parameters/definitions/splash-cursor.json](../../src/parameters/definitions/splash-cursor.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component splash-cursor
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Splash Cursor 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Animations/SplashCursor/SplashCursor';
import { palette } from '../../shared/demo-support';

// 必须在独立iframe预览。上游实现固定整个viewport且没有完整卸载清理；切换时销毁iframe文档可释放该演示。
// 关闭彩虹模式，流体颜色使用苔绿；光标移动运行真实流体模拟。
// 此演示需要可用的WebGL上下文；上下文创建失败时应显示能力提示，不能声称效果已经运行。

export default function SplashCursorDemo() {

  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component

    SIM_RESOLUTION={96} DYE_RESOLUTION={512} RAINBOW_MODE={false} COLOR={"#52604e"} COLOR_UPDATE_SPEED={0} TRANSPARENT={true} SPLAT_RADIUS={0.15} SPLAT_FORCE={3000} CURL={10} PRESSURE_ITERATIONS={12} CAPTURE_RESOLUTION={512} DENSITY_DISSIPATION={3.5} VELOCITY_DISSIPATION={2} PRESSURE={0.1} SHADING={true} BACK_COLOR={{ "r": 0.5, "g": 0, "b": 0 }}  />
    </div>
  );
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `SIM_RESOLUTION` | `number` | 否 | `128` | 模拟分辨率，控制 splash cursor 的对应渲染或交互参数。 |
| `DYE_RESOLUTION` | `number` | 否 | `1440` | 染料分辨率，控制 splash cursor 的对应渲染或交互参数。 |
| `CAPTURE_RESOLUTION` | `number` | 否 | `512` | 采样分辨率，控制 splash cursor 的对应渲染或交互参数。 |
| `DENSITY_DISSIPATION` | `number` | 否 | `3.5` | 密度耗散，控制 splash cursor 的对应渲染或交互参数。 |
| `VELOCITY_DISSIPATION` | `number` | 否 | `2` | 速度矢量耗散，控制 splash cursor 的对应渲染或交互参数。 |
| `PRESSURE` | `number` | 否 | `0.1` | 压力，控制 splash cursor 的对应渲染或交互参数。 |
| `PRESSURE_ITERATIONS` | `number` | 否 | `20` | 压力迭代次数，控制 splash cursor 的对应渲染或交互参数。 |
| `CURL` | `number` | 否 | `3` | 旋度，控制 splash cursor 的对应渲染或交互参数。 |
| `SPLAT_RADIUS` | `number` | 否 | `0.2` | 注入半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `SPLAT_FORCE` | `number` | 否 | `6000` | 注入作用力，控制 splash cursor 的对应渲染或交互参数。 |
| `SHADING` | `boolean` | 否 | `true` | 是否面部明暗，决定该分支的展示或交互行为。 |
| `COLOR_UPDATE_SPEED` | `number` | 否 | `10` | 颜色更新速度，传入组件支持的 CSS 或着色器颜色格式。 |
| `BACK_COLOR` | `ColorRGB` | 否 | `{ r: 0.5, g: 0, b: 0 }` | 背面颜色的结构化配置；对象字段按完整类型传入并由组件读取。 |
| `TRANSPARENT` | `boolean` | 否 | `true` | 是否透明背景，决定该分支的展示或交互行为。 |
| `RAINBOW_MODE` | `boolean` | 否 | `true` | 是否彩虹模式，决定该分支的展示或交互行为。 |
| `COLOR` | `string` | 否 | `'#ff0000'` | 颜色，传入组件支持的 CSS 或着色器颜色格式。 |

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.SIM_RESOLUTION` | `96` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.DYE_RESOLUTION` | `512` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.RAINBOW_MODE` | `false` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.COLOR` | `"#52604e"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.COLOR_UPDATE_SPEED` | `0` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.TRANSPARENT` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.SPLAT_RADIUS` | `0.15` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.SPLAT_FORCE` | `3000` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.CURL` | `10` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.PRESSURE_ITERATIONS` | `12` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.CAPTURE_RESOLUTION` | `512` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.DENSITY_DISSIPATION` | `3.5` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.VELOCITY_DISSIPATION` | `2` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.PRESSURE` | `0.1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.SHADING` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.BACK_COLOR` | `{"r":0.5,"g":0,"b":0}` | json | 不限 ~ 不限 | 调节结束后重建 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Wan 皮肤

- 容器、状态色、边界与焦点使用 Agent Wan 规范；交互命中区不随视觉形变缩小。
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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [指针与轨迹](../effects/categories/pointer.md)；否则直接完成当前组件。
