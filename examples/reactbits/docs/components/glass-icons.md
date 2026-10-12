# Glass Icons

组合组件 · `glass-icons` · 中文意图：玻璃图标 / 毛玻璃图标

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

图标玻璃层保留背景透色与折射。

功能要求：保持内容的语义和可访问名称；只有真实可交互元素可进入焦点顺序。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [examples/reactbits/src/demos/glass-icons.tsx](../../src/demos/glass-icons.tsx) |
| 组件实现（准备后存在） | [examples/reactbits/.upstream/src/ts-default/Components/GlassIcons/GlassIcons.tsx](../../.upstream/src/ts-default/Components/GlassIcons/GlassIcons.tsx) |
| 组件 CSS（准备后存在） | [examples/reactbits/.upstream/src/ts-default/Components/GlassIcons/GlassIcons.css](../../.upstream/src/ts-default/Components/GlassIcons/GlassIcons.css) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component glass-icons
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Components/GlassIcons/GlassIcons';
import { palette } from '../shared/demo-support';
import { useState } from "react";
import { Folder, Layers, FileText, Settings } from "lucide-react";
// 图标使用线性Lucide图形；玻璃材质真实计算，颜色来自规范。
// 此演示需要可用WebGL上下文；不支持时应显示能力提示，不声称效果已运行。

export default function GlassIconsDemo() {
  const [status, setStatus] = useState("悬停图标并点击，查看真实玻璃折射与结果");

  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 400, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <div style={{ width: '100%', height: '100%' }}><div style={{ minHeight: 300, display: 'grid', placeItems: 'center', padding: 24 }}><Component items={[{ icon: <Folder size={24} />, color: palette.sage, label: '资料' }, { icon: <Layers size={24} />, color: palette.primary, label: '智能体' }, { icon: <FileText size={24} />, color: palette.sand, label: '规范' }, { icon: <Settings size={24} />, color: palette.primary, label: '设置' }].map(item => ({ ...item, onClick: () => setStatus('点击图标：' + item.label) }))}
size={68} gap={28} columns={4} roundness={0.5} refraction={0.45}
bevel={0.4} dispersion={0} frost={0.45} shine={0.45} tint={palette.ivory}
tintOpacity={0.3} iconColor={palette.ivory} plate="tilt" tilt={18}
spread={0.3} hover="lift" parallax={0.35} labels="always" theme="light" /></div><p role="status" aria-live="polite" style={{ margin: '12px 20px', fontSize: 14, color: palette.muted }}>{status}</p></div>
    </div>
  );
}
```

完整 Props、类型、回调和默认值以安装后的对应 TSX 源码为准。先读取本例使用的参数，再沿类型定义补充当前任务需要的选项；不要根据通用模板假定所有组件都有 color / speed / children。

## 4. Agent Wan 皮肤

- 容器、状态色、边界与焦点使用 Agent Wan 规范；交互命中区不随视觉形变缩小。
- 优先通过组件真实 Props 设置颜色和强度；使用主题提供的茶绿、沙米、象牙白及墨色映射。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。
- 保留折射或反光的可观察变化，但色彩与高光幅度保持克制；彩色反射不覆盖关键文字。

## 5. 加载、动效与降级

本例实际配置：设备访问与音频行为以本例真实 Props 和显式回调为准。capabilities 是源码扫描提示，不能据此声称已请求相机、录音或播放音频。

- 依赖清单：`react`。安装前复用目标项目的兼容版本，不重复加载。
- 运行类型：本例预览入口声明需 WebGL；这是当前示例的运行配置，不是仅凭源码关键词推断。此说明不等于浏览器运行证明。
- 动效策略：按需启用的持续 / 高运动效果。
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
