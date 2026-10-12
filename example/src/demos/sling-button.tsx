import { useState } from 'react';
import SlingButton from '../../.upstream/src/ts-default/Micro/SlingButton/SlingButton';
import { palette, DemoPanel } from '../shared/demo-support';
import '../shared/micro-demos.css';

export default function SlingButtonDemo() {
  const [count, setCount] = useState(0);
  return <DemoPanel title="Sling Button · 弹射发送"><div className="aw-micro-stack">
    <div style={{ padding: 70 }}><SlingButton onSend={() => setCount(value => value + 1)} padColor={palette.primary} iconColor={palette.ivory} accentColor={palette.sand} wellColor={palette.surface} bandColor={palette.sage} size={60} tapSends ariaLabel="发送一条本地演示消息" /></div>
    <p className="aw-micro-hint">拖拽拉伸后松手，或直接点击按钮。</p>
    <p className="aw-micro-status" role="status" aria-live="polite">已触发 {count} 次本地发送回调。</p>
  </div></DemoPanel>;
}
