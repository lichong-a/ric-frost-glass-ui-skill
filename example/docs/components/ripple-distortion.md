# Ripple Distortion

媒体与轮播 · `ripple-distortion` · 中文意图：水波折射 / 内容涟漪

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-ric-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

指针驱动的水纹使内容发生衰减位移。

功能要求：装饰层不拦截业务点击、不隐藏真实指针，不成为完成业务的唯一操作方式。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/media/ripple-distortion.tsx](../../src/demos/media/ripple-distortion.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Animations/RippleDistortion/RippleDistortion.tsx](../../.upstream/src/ts-default/Animations/RippleDistortion/RippleDistortion.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Animations/RippleDistortion/RippleDistortion.css](../../.upstream/src/ts-default/Animations/RippleDistortion/RippleDistortion.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/ripple-distortion.json](../../src/parameters/definitions/ripple-distortion.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component ripple-distortion
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Ripple Distortion 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Animations/RippleDistortion/RippleDistortion';
import { MEDIA, palette } from '../../shared/demo-support';
import { useEffect, useState } from "react";
// 指针水波实际扭曲图片纹理；保留原图颜色和低强度反射。
// 此演示需要可用的WebGL上下文；上下文创建失败时应显示能力提示，不能声称效果已经运行。
// 同一本地SVG先栅格化为有明确尺寸的PNG纹理，再进入真实WebGL水波；不修改图形算法或原素材。

export default function RippleDistortionDemo() {
  const [imageSource, setImageSource] = useState<string | null>(null);
  const [imageError, setImageError] = useState('');
  useEffect(() => {
    let canceled = false;
    const image = new Image();
    image.src = MEDIA[3];
    void image.decode().then(() => {
      if (canceled) return;
      if (!image.naturalWidth || !image.naturalHeight) throw new Error('The local image has no dimensions.');
      // SVG image elements without intrinsic dimensions cannot be uploaded by some WebGL drivers.
      // Rasterize the same artwork once; the real RippleDistortion shader remains unchanged.
      const texture = document.createElement('canvas');
      texture.width = 1600;
      texture.height = Math.round(texture.width * image.naturalHeight / image.naturalWidth);
      const context = texture.getContext('2d');
      if (!context) throw new Error('A 2D context is required to prepare the local image.');
      context.drawImage(image, 0, 0, texture.width, texture.height);
      setImageSource(texture.toDataURL('image/png'));
    }).catch(() => {
      if (!canceled) setImageError('本地图片纹理准备失败，请重新加载组件。');
    });
    return () => { canceled = true; image.removeAttribute('src'); };
  }, []);
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, minHeight: 360, padding: 0, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      {imageSource ? <Component src={imageSource}

   brushSize={95} strength={0.12} swirl={0.5} rings={3} dispersion={0.1} tint={"#a6b39a"} tintAmount={0.15} highlightColor={"#faf7f0"} clickStrength={0.5} quality={"medium"} spread={5} fade={3} spacing={15} glint={0} grayscale={true} trigger={"hover"} enabled={true}  /> : <p className="aw-demo-notice" role={imageError ? "alert" : "status"}>{imageError || "正在准备本地图片纹理…"}</p>}
    </div>
  );
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `src` | `string` | 否 | `'https://images.unsplash.com/photo-1782977389500-dd7adad33ebe?q=80&w=3416&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'` | 加载图像、视频或纹理的资源地址。 |
| `brushSize` | `number` | 否 | `150` | 指针笔刷尺寸，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `strength` | `number` | 否 | `0.2` | 强度，控制 ripple distortion 的对应渲染或交互参数。 |
| `swirl` | `number` | 否 | `1` | 旋涡，控制 ripple distortion 的对应渲染或交互参数。 |
| `rings` | `number` | 否 | `4` | 圆环组，控制 ripple distortion 的对应渲染或交互参数。 |
| `spread` | `number` | 否 | `5` | 展开间距，控制 ripple distortion 的对应渲染或交互参数。 |
| `fade` | `number` | 否 | `3` | 淡出，控制 ripple distortion 的对应渲染或交互参数。 |
| `spacing` | `number` | 否 | `15` | 间距，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `dispersion` | `number` | 否 | `0` | 色散，控制 ripple distortion 的对应渲染或交互参数。 |
| `glint` | `number` | 否 | `0` | 微光，控制 ripple distortion 的对应渲染或交互参数。 |
| `tint` | `string` | 否 | `'#a855f7'` | 色调，控制 ripple distortion 的对应渲染或交互参数。 |
| `tintAmount` | `number` | 否 | `0.1` | 色调幅度，控制 ripple distortion 的对应渲染或交互参数。 |
| `grayscale` | `boolean` | 否 | `true` | 是否灰度，决定该分支的展示或交互行为。 |
| `highlightColor` | `string` | 否 | `'#ffffff'` | 高亮颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `trigger` | `RippleTrigger` | 否 | `'hover'` | 触发方式，控制 ripple distortion 的对应渲染或交互参数。 |
| `clickStrength` | `number` | 否 | `2` | 点击强度，控制 ripple distortion 的对应渲染或交互参数。 |
| `quality` | `RippleQuality` | 否 | `'low'` | 渲染质量，控制 ripple distortion 的对应渲染或交互参数。 |
| `enabled` | `boolean` | 否 | `true` | 是否启用，决定该分支的展示或交互行为。 |
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
| `t0.brushSize` | `95` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.strength` | `0.12` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.swirl` | `0.5` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.rings` | `3` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.dispersion` | `0.1` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.tint` | `"#a6b39a"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.tintAmount` | `0.15` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.highlightColor` | `"#faf7f0"` | color | 不限 ~ 不限 | 调节结束后重建 |
| `t0.clickStrength` | `0.5` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.quality` | `"medium"` | select | "low" / "medium" / "high" | 调节结束后重建 |
| `t0.spread` | `5` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.fade` | `3` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.spacing` | `15` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.glint` | `0` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.grayscale` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.trigger` | `"hover"` | select | "hover" / "click" / "both" | 调节结束后重建 |
| `t0.enabled` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Ric 皮肤

- 容器、状态色、边界与焦点使用 Agent Ric 规范；交互命中区不随视觉形变缩小。
- 组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。

## 5. 加载、动效与降级

本例实际配置：设备访问与音频行为以本例真实 Props 和显式回调为准。capabilities 是源码扫描提示，不能据此声称已请求相机、录音或播放音频。

- 依赖清单：`ogl`、`react`。安装前复用目标项目的兼容版本，不重复加载。
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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [媒体与轮播](../effects/categories/media.md)；否则直接完成当前组件。
