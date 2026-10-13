import { useState } from 'react';
import PulseHeart from '../../../.upstream/src/ts-default/Micro/PulseHeart/PulseHeart';
import { palette, DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
import { useDemoConfig } from '../../parameters/DemoConfig';
const cn=(names:string)=>componentClasses(styles,names);

export default function PulseHeartDemo() {
  const { props: demoProps } = useDemoConfig();
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(24);
  return <DemoPanel title="Pulse Heart · 喜欢反馈"><div className={cn("aw-micro-stack")}>
    <PulseHeart liked={liked} count={count} onChange={(next, total) => { setLiked(next); setCount(total); }} likedColor={palette.terra} idleColor={palette.primary} pillColor={palette.surface} textColor={palette.ink} size={28} label="喜欢这个示例" showCount {...demoProps('t0')} />
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">{liked ? '已喜欢' : '未喜欢'} · 本地示例计数 {count}</p>
  </div></DemoPanel>;
}
