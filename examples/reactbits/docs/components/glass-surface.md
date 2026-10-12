# Glass Surface

组合组件 · `glass-surface` · 中文意图：毛玻璃 / 磨砂玻璃 / 玻璃表面 / 毛玻璃卡片

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

圆角表面保留对背后内容的局部折射。

功能要求：保持内容的语义和可访问名称；只有真实可交互元素可进入焦点顺序。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [examples/reactbits/src/demos/glass-surface.tsx](../../src/demos/glass-surface.tsx) |
| 组件实现（准备后存在） | [examples/reactbits/.upstream/src/ts-default/Components/GlassSurface/GlassSurface.tsx](../../.upstream/src/ts-default/Components/GlassSurface/GlassSurface.tsx) |
| 组件 CSS（准备后存在） | [examples/reactbits/.upstream/src/ts-default/Components/GlassSurface/GlassSurface.css](../../.upstream/src/ts-default/Components/GlassSurface/GlassSurface.css) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component glass-surface
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Components/GlassSurface/GlassSurface';
import { MEDIA, palette } from '../shared/demo-support';
import { useRef } from "react";
// 显式传入真实图片backdrop，避免只有透明圆角而看不见折射；文字维持墨绿。
// renderer="auto" 根据能力选择SVG折射、WebGL折射或CSS霜玻璃回退；不将WebGL作为挂载前置条件。

export default function GlassSurfaceDemo() {
  const backdropRef = useRef<HTMLImageElement>(null!);
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 400, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <div style={{ position: 'relative', width: '100%', height: 360, overflow: 'hidden', borderRadius: 20 }}><img ref={backdropRef} src={MEDIA[1]} alt="透过玻璃观察的自然色图形" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /><div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}><Component renderer="auto" backdrop={backdropRef} width={320} height={100} borderRadius={24} blur={12} brightness={52} opacity={0.9} backgroundOpacity={0.22} distortionScale={-100} displace={0.3} redOffset={0} greenOffset={3} blueOffset={6} saturation={0.8} refraction style={{ color: palette.ink, padding: 24 }}><strong style={{ fontSize: 24 }}>霜玻璃表面</strong></Component></div></div>
    </div>
  );
}
```

完整 Props、类型、回调和默认值以安装后的对应 TSX 源码为准。先读取本例使用的参数，再沿类型定义补充当前任务需要的选项；不要根据通用模板假定所有组件都有 color / speed / children。

本组件在当前锁定依赖组合下使用明确的类型兼容规则。移植或升级前按需读取 [上游类型兼容说明](../../UPSTREAM_TYPE_COMPATIBILITY.md) 中的对应条目；官方安装文件保持原始字节，不能把本项目的检查结果描述为原始源码未经适配即零诊断。

## 4. Agent Wan 皮肤

- 容器、状态色、边界与焦点使用 Agent Wan 规范；交互命中区不随视觉形变缩小。
- 优先通过组件真实 Props 设置颜色和强度；使用主题提供的茶绿、沙米、象牙白及墨色映射。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。
- 保留折射或反光的可观察变化，但色彩与高光幅度保持克制；彩色反射不覆盖关键文字。

## 5. 加载、动效与降级

本例实际配置：本例未强制指定 renderer，沿用 auto：SVG / WebGL / CSS 由组件选择。提供 backdrop 不代表每个环境都必须先创建 WebGL 上下文。

- 依赖清单：`react`。安装前复用目标项目的兼容版本，不重复加载。
- 运行类型：本例使用 renderer="auto" 的默认路径：优先 SVG 折射，需要时尝试 WebGL，失败时保留 CSS 霜玻璃；不要用强制 WebGL 预检阻断可用的 SVG / CSS 路径。此说明不等于浏览器运行证明。
- 动效策略：局部玻璃效果；renderer auto 自行选择可用路径，不强制持续 GPU 动画。
- 示例库降级：动态偏好或能力检查不满足时先不挂载本项，显示原因；减少运动时可明确选择仅播放本次。
- 业务接入的静态降级要求：保留等价的列表、图片、链接或原生控制器；真实功能不能依赖动效。
- 卸载时释放本例监听、计时、动画帧及拥有的渲染资源；不以隐藏 CSS 代替停止循环。

仅当前需求涉及高级运行、资源或设备权限时再读 [效果与降级策略](../effects-policy.md)。

## 6. 验收本组件

1. 参数与对应源码真实 API 一致，构建可导入，安装失败可恢复。
2. 能观察到第 1 节的核心机制，而不只是相同名称的占位卡片。
3. 真实状态 / 事件 / 键盘与必要的触屏等价操作可用。
4. 低饱和配色、文字对比、阅读面、稳定命中范围与基础规范一致。
5. 只激活本项；切换或卸载后停止其持续工作。
6. 减少运动与不可用情形保留本节所述等价内容或功能。

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [组合组件](../categories/components.md)；否则直接完成当前组件。
