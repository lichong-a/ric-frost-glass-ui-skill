# Split Flap Text

文字效果 · `split-flap-text` · 中文意图：翻牌文字 / 机场翻牌 / 机械字符牌

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

翻片逐格转到新的字符或短句。

功能要求：保持内容的语义和可访问名称；只有真实可交互元素可进入焦点顺序。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [examples/reactbits/src/demos/split-flap-text.tsx](../../src/demos/split-flap-text.tsx) |
| 官方实现（setup 后存在） | [examples/reactbits/.upstream/src/ts-default/TextAnimations/SplitFlapText/SplitFlapText.tsx](../../.upstream/src/ts-default/TextAnimations/SplitFlapText/SplitFlapText.tsx) |
| 官方 CSS（setup 后存在） | [examples/reactbits/.upstream/src/ts-default/TextAnimations/SplitFlapText/SplitFlapText.css](../../.upstream/src/ts-default/TextAnimations/SplitFlapText/SplitFlapText.css) |
| 官方文档 | [Split Flap Text](https://reactbits.dev/text-animations/split-flap-text) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在 `examples/reactbits` 运行：

```bash
npm run setup:reactbits -- --component split-flap-text
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/TextAnimations/SplitFlapText/SplitFlapText';
import { palette } from '../shared/demo-support';

// 翻牌字符集采用英文和数字；业务状态另提供不依赖动效的可读文本。

export default function SplitFlapTextDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 300, display: 'grid', placeItems: 'center', color: palette.ink, fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 650, padding: 24 }}>
      <Component words={['AGENT WAN', 'FLOW READY', 'SKILL SYNC']}
flipDuration={0.12} stagger={0.035} cycleDelay={3200} charset="alphanumeric"
flipsPerChar={5} tileColor={palette.primary} textColor={palette.ivory}
tileRadius={10} gap={4} fontSize={32} loop padTo={10} />
    </div>
  );
}
```

完整 Props、类型、回调和默认值以安装后的对应 TSX 源码为准。先读取本例使用的参数，再沿类型定义补充当前任务需要的选项；不要根据通用模板假定所有组件都有 color / speed / children。

本组件在当前锁定依赖组合下使用明确的类型兼容规则。移植或升级前按需读取 [上游类型兼容说明](../../UPSTREAM_TYPE_COMPATIBILITY.md) 中的对应条目；官方安装文件保持原始字节，不能把本项目的检查结果描述为原始源码未经适配即零诊断。

## 4. Agent Wan 皮肤

- 标题按页面层级选择宋体或 UI 字体；正文保持无衬线。动画终态必须是完整、清晰、可复制的文字。
- 优先通过组件真实 Props 设置颜色和强度；使用主题提供的茶绿、沙米、象牙白及墨色映射。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。

## 5. 加载、动效与降级

本例实际配置：设备访问与音频行为以本例真实 Props 和显式回调为准。capabilities 是源码扫描提示，不能据此声称已请求相机、录音或播放音频。

- 依赖清单：`react`。安装前复用目标项目的兼容版本，不重复加载。
- 运行类型：本例预览入口不要求预先通过图形接口检查；实际组件内部的可选渲染分支由源码和本例 Props 决定。此说明不等于浏览器运行证明。
- 动效策略：按触发播放；循环、乱码与大幅字形变换需明确场景。
- 示例库降级：动态偏好或能力检查不满足时先不挂载本项，显示原因；减少运动时可明确选择仅播放本次。
- 业务接入的静态降级要求：输出完整可选择的静态文本；数值直接显示真实终值。
- 卸载时释放本例监听、计时、动画帧及拥有的渲染资源；不以隐藏 CSS 代替停止循环。

仅当前需求涉及高级运行、资源或设备权限时再读 [效果与降级策略](../effects-policy.md)。

## 6. 验收本组件

1. 参数与对应源码真实 API 一致，构建可导入，安装失败可恢复。
2. 能观察到第 1 节的核心机制，而不只是相同名称的占位卡片。
3. 真实状态 / 事件 / 键盘与必要的触屏等价操作可用。
4. 低饱和配色、文字对比、阅读面、稳定命中范围与基础规范一致。
5. 只激活本项；切换或卸载后停止其持续工作。
6. 减少运动与不可用情形保留本节所述等价内容或功能。

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [文字效果](../categories/text-animations.md)；否则直接完成当前组件。
