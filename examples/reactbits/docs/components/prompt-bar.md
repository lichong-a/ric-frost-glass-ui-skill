# Prompt Bar

微交互 · `prompt-bar` · 中文意图：聊天输入 / 提示词输入 / 模型选择 / 附件输入

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

消息输入整合来源命令模型与附件入口。

功能要求：提供真实受控值、可访问标签、键盘输入、中文输入法和错误状态；权限与提交只在明确动作后执行。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [examples/reactbits/src/demos/prompt-bar.tsx](../../src/demos/prompt-bar.tsx) |
| 组件实现（准备后存在） | [examples/reactbits/.upstream/src/ts-default/Micro/PromptBar/PromptBar.tsx](../../.upstream/src/ts-default/Micro/PromptBar/PromptBar.tsx) |
| 组件 CSS（准备后存在） | [examples/reactbits/.upstream/src/ts-default/Micro/PromptBar/PromptBar.css](../../.upstream/src/ts-default/Micro/PromptBar/PromptBar.css) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component prompt-bar
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
import { useState } from 'react';
import PromptBar from '../../.upstream/src/ts-default/Micro/PromptBar/PromptBar';
import { palette, DemoPanel } from '../shared/demo-support';
import '../shared/micro-demos.css';

const sources = [{ key: 'design', name: '设计规范', description: '本地演示上下文' }, { key: 'files', name: '附加示例文件', description: '只添加模拟文件名', attach: true }];
const commands = [{ key: 'summarize', name: '/总结', description: '生成本地演示摘要' }, { key: 'compare', name: '/比较', description: '比较两个方案' }];
const models = [{ key: 'quick', name: '示例 · 快速', tag: '本地' }, { key: 'deep', name: '示例 · 深入', tag: '本地' }];
export default function PromptBarDemo() {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('输入内容，使用 @ 或 / 选择上下文与命令。');
  return <DemoPanel title="Prompt Bar · Agent 输入栏"><div className="aw-micro-stack">
    <div className="aw-micro-wide"><PromptBar placeholder="描述想要构建的页面…" sources={sources} commands={commands} models={models} defaultModel="quick" efforts={['低', '中', '高']} defaultEffort="中" width={500} background={palette.surface} color={palette.ink} menuBackground={palette.ivory} sparkColor={palette.sage} radius={20} busy={busy} onSend={(text, detail) => { setBusy(true); setMessage(`已接收本地模拟请求：${text}；${detail.model?.name ?? '默认演示模型'}，附带 ${detail.attachments.length} 项。`); }} onStop={() => { setBusy(false); setMessage('本地模拟任务已停止。'); }} onAttach={() => { setMessage('已添加模拟文件名，没有读取本机文件。'); return 'design-notes-demo.md'; }} onDictate={() => { setMessage('已填入模拟语音文本，没有请求麦克风。'); return '根据霜玻璃规范创建一个技能管理页面'; }} onEffortChange={effort => setMessage(`演示推理强度：${effort}`)} /></div>
    {busy ? <div className="aw-micro-controls"><button type="button" onClick={() => { setBusy(false); setMessage('本地模拟任务已完成。'); }}>完成模拟任务</button></div> : null}
    <p className="aw-micro-status" role="status" aria-live="polite">{message}</p>
    <p className="aw-micro-hint">此示例展示输入、附件、命令、发送与停止状态，未连接模型或录音设备。</p>
  </div></DemoPanel>;
}
```

完整 Props、类型、回调和默认值以安装后的对应 TSX 源码为准。先读取本例使用的参数，再沿类型定义补充当前任务需要的选项；不要根据通用模板假定所有组件都有 color / speed / children。

## 4. Agent Wan 皮肤

- 容器、状态色、边界与焦点使用 Agent Wan 规范；交互命中区不随视觉形变缩小。
- 优先通过组件真实 Props 设置颜色和强度；使用主题提供的茶绿、沙米、象牙白及墨色映射。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。

## 5. 加载、动效与降级

本例实际配置：本例 onDictate 返回模拟文本、onAttach 返回模拟文件名；不会读取本机文件或录音。发送和停止均为本地演示状态，真实模型与附件服务需由业务层接入。

- 依赖清单：`@hugeicons/core-free-icons`、`@hugeicons/react`、`motion`、`react`。安装前复用目标项目的兼容版本，不重复加载。
- 运行类型：本例预览入口不要求预先通过图形接口检查；实际组件内部的可选渲染分支由源码和本例 Props 决定。此说明不等于浏览器运行证明。
- 动效策略：真实状态驱动的短动效；计时以任务事实为准。
- 示例库降级：动态偏好或能力检查不满足时先不挂载本项，显示原因；减少运动时可明确选择仅播放本次。
- 业务接入的静态降级要求：使用原生或规范内控件表达同一状态和操作，保留键盘与可访问名称。
- 卸载时释放本例监听、计时、动画帧及拥有的渲染资源；不以隐藏 CSS 代替停止循环。

仅当前需求涉及高级运行、资源或设备权限时再读 [效果与降级策略](../effects-policy.md)。

## 6. 验收本组件

1. 参数与对应源码真实 API 一致，构建可导入，安装失败可恢复。
2. 能观察到第 1 节的核心机制，而不只是相同名称的占位卡片。
3. 真实状态 / 事件 / 键盘与必要的触屏等价操作可用。
4. 低饱和配色、文字对比、阅读面、稳定命中范围与基础规范一致。
5. 只激活本项；切换或卸载后停止其持续工作。
6. 减少运动与不可用情形保留本节所述等价内容或功能。

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [微交互](../categories/micro.md)；否则直接完成当前组件。
