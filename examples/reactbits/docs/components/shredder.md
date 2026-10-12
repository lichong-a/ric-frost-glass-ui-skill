# Shredder

微交互 · `shredder` · 中文意图：碎纸机 / 拖拽删除

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

拖入底部的行被分解成纸条。

功能要求：将视觉触发与真实动作回调分开；禁用/加载阻止重复提交，提供普通点击或键盘的等价操作，危险动作按确认契约处理。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [examples/reactbits/src/demos/shredder.tsx](../../src/demos/shredder.tsx) |
| 官方实现（setup 后存在） | [examples/reactbits/.upstream/src/ts-default/Micro/Shredder/Shredder.tsx](../../.upstream/src/ts-default/Micro/Shredder/Shredder.tsx) |
| 官方 CSS（setup 后存在） | [examples/reactbits/.upstream/src/ts-default/Micro/Shredder/Shredder.css](../../.upstream/src/ts-default/Micro/Shredder/Shredder.css) |
| 官方文档 | [Shredder](https://reactbits.dev/micro/shredder) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在 `examples/reactbits` 运行：

```bash
npm run setup:reactbits -- --component shredder
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
import { useState } from 'react';
import Shredder from '../../.upstream/src/ts-default/Micro/Shredder/Shredder';
import { palette, DemoPanel } from '../shared/demo-support';
import '../shared/micro-demos.css';

const initialItems = [{ id: 'draft-a', title: '页面布局草稿', text: '拖入底部碎纸口，演示移除过期草稿。' }, { id: 'draft-b', title: '早期配色方案', text: '只影响当前示例中的本地卡片。' }, { id: 'draft-c', title: '组件探索记录', text: '可先重新排序，再选择要移除的条目。' }];
export default function ShredderDemo() {
  const [items, setItems] = useState(initialItems);
  const [message, setMessage] = useState('将纸卡拖向下方碎纸口；聚焦纸卡后也可按 Delete 删除。');
  const [revision, setRevision] = useState(0);
  return <DemoPanel title="Shredder · 碎纸交互"><div className="aw-micro-stack aw-shredder-stack">
    <Shredder key={revision} items={items} renderItem={item => <article className="aw-micro-paper aw-shredder-paper"><strong>{item.title}</strong><span>{item.text}</span></article>} onShred={item => { setItems(value => value.filter(candidate => candidate.id !== item.id)); setMessage(`已移除本地示例：${item.title}`); }} onReorder={next => { setItems(next); setMessage('本地纸卡顺序已更新。'); }} width={320} height={430} fallHeight={84} color={palette.ink} slitColor={palette.primary} autoAnimate={false} loop={false} loopAfterDelete={false} />
    <div className="aw-micro-controls"><button type="button" onClick={() => { setItems(initialItems); setRevision(value => value + 1); setMessage('纸卡已恢复。'); }}>恢复示例纸卡</button></div>
    <p className="aw-micro-status" role="status" aria-live="polite">{message} 剩余 {items.length} 张。</p>
  </div></DemoPanel>;
}
```

完整 Props、类型、回调和默认值以安装后的对应 TSX 源码为准。先读取本例使用的参数，再沿类型定义补充当前任务需要的选项；不要根据通用模板假定所有组件都有 color / speed / children。

## 4. Agent Wan 皮肤

- 容器、状态色、边界与焦点使用 Agent Wan 规范；交互命中区不随视觉形变缩小。
- 优先通过组件真实 Props 设置颜色和强度；使用主题提供的茶绿、沙米、象牙白及墨色映射。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。

## 5. 加载、动效与降级

本例实际配置：设备访问与音频行为以本例真实 Props 和显式回调为准。capabilities 是源码扫描提示，不能据此声称已请求相机、录音或播放音频。

- 依赖清单：`react`、`react-dom`。安装前复用目标项目的兼容版本，不重复加载。
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
