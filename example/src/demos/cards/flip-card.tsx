import { useState } from 'react';
import FlipCard from '../../../.upstream/src/ts-default/Micro/FlipCard/FlipCard';
import { palette, DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
import { useDemoConfig } from '../../parameters/DemoConfig';
const cn=(names:string)=>componentClasses(styles,names);

export default function FlipCardDemo() {
  const { props: demoProps } = useDemoConfig();
  const [flipped, setFlipped] = useState(false);
  return <DemoPanel title="Flip Card · 翻转信息卡"><div className={cn("aw-micro-stack")}>
    <FlipCard flipped={flipped} onFlipChange={setFlipped} width={280} height={340} radius={20} background={palette.surface} color={palette.ink} shadowColor={palette.primary} shadowOpacity={0.16} glareOpacity={0.12} tiltMax={6} ariaLabel="点击翻转 Agent Wan 信息卡" front={<div className={cn("aw-micro-card")}><span>AGENT WAN</span><h3>霜玻璃<br />设计系统</h3><p>正面 · 点击或拖动翻转</p></div>} back={<div className={cn("aw-micro-card")}><h3>清晰与克制</h3><p>自然色、浅阅读面、可验证的交互状态。</p><p>背面 · 再次点击返回</p></div>} {...demoProps('t0')} />
    <div className={cn("aw-micro-controls")}><button className={styles['aw-micro-action']} type="button" onClick={() => setFlipped(value => !value)} {...demoProps('t1')}>翻转卡片</button></div>
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">当前：{flipped ? '背面' : '正面'}</p>
  </div></DemoPanel>;
}
