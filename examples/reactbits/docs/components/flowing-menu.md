# Flowing Menu

组合组件 · `flowing-menu` · 中文意图：流动菜单 / 跟随选中指示

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

激活指示在菜单条目之间连续流动。

功能要求：保持真实链接/导航语义、当前项状态、键盘路径与可见焦点；展开菜单按基础浮层契约处理。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [examples/reactbits/src/demos/flowing-menu.tsx](../../src/demos/flowing-menu.tsx) |
| 官方实现（setup 后存在） | [examples/reactbits/.upstream/src/ts-default/Components/FlowingMenu/FlowingMenu.tsx](../../.upstream/src/ts-default/Components/FlowingMenu/FlowingMenu.tsx) |
| 官方 CSS（setup 后存在） | [examples/reactbits/.upstream/src/ts-default/Components/FlowingMenu/FlowingMenu.css](../../.upstream/src/ts-default/Components/FlowingMenu/FlowingMenu.css) |
| 官方文档 | [Flowing Menu](https://reactbits.dev/components/flowing-menu) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在 `examples/reactbits` 运行：

```bash
npm run setup:reactbits -- --component flowing-menu
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Components/FlowingMenu/FlowingMenu';
import { LABELS, MEDIA, palette } from '../shared/demo-support';
import { useState } from "react";
// 悬停启动真实图文跑马灯，示例点击更新本地状态。

export default function FlowingMenuDemo() {
  const [status, setStatus] = useState('悬停菜单项，点击选择');
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 440, position: 'relative', overflow: 'hidden' }}>
      <div style={{ height: 420 }} onClickCapture={event => { const link = (event.target as Element).closest('a'); if (link) { event.preventDefault(); setStatus('已选择：' + link.textContent?.trim().split(/\s+/)[0]); } }}><div style={{ height: 350 }}><Component items={LABELS.slice(0, 4).map((text, index) => ({ link: '#scene-' + index, text, image: MEDIA[index] }))} speed={24} textColor={palette.ink} bgColor={palette.ivory} marqueeBgColor={palette.sage} marqueeTextColor={palette.ink} borderColor={palette.canvas} /></div><p role="status" aria-live="polite" style={{ color: palette.muted, padding: '0 20px' }}>{status}</p></div>
    </div>
  );
}
```

完整 Props、类型、回调和默认值以安装后的对应 TSX 源码为准。先读取本例使用的参数，再沿类型定义补充当前任务需要的选项；不要根据通用模板假定所有组件都有 color / speed / children。

## 4. Agent Wan 皮肤

- 容器、状态色、边界与焦点使用 Agent Wan 规范；交互命中区不随视觉形变缩小。
- 优先通过组件真实 Props 设置颜色和强度；使用主题提供的茶绿、沙米、象牙白及墨色映射。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。

## 5. 加载、动效与降级

本例实际配置：设备访问与音频行为以本例真实 Props 和显式回调为准。capabilities 是源码扫描提示，不能据此声称已请求相机、录音或播放音频。

- 依赖清单：`gsap`、`react`。安装前复用目标项目的兼容版本，不重复加载。
- 运行类型：本例预览入口不要求预先通过图形接口检查；实际组件内部的可选渲染分支由源码和本例 Props 决定。此说明不等于浏览器运行证明。
- 动效策略：行为驱动；三维、物理与持续轮播按需启用。
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
