import { useState } from 'react';
import PulseHeart from '../../.upstream/src/ts-default/Micro/PulseHeart/PulseHeart';
import { palette, DemoPanel } from '../shared/demo-support';
import '../shared/micro-demos.css';

export default function PulseHeartDemo() {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(24);
  return <DemoPanel title="Pulse Heart · 喜欢反馈"><div className="aw-micro-stack">
    <PulseHeart liked={liked} count={count} onChange={(next, total) => { setLiked(next); setCount(total); }} likedColor={palette.terra} idleColor={palette.primary} pillColor={palette.surface} textColor={palette.ink} size={28} label="喜欢这个示例" showCount />
    <p className="aw-micro-status" role="status" aria-live="polite">{liked ? '已喜欢' : '未喜欢'} · 本地示例计数 {count}</p>
  </div></DemoPanel>;
}
