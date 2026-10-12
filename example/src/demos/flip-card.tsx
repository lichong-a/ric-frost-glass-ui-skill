import { useState } from 'react';
import FlipCard from '../../.upstream/src/ts-default/Micro/FlipCard/FlipCard';
import { palette, DemoPanel } from '../shared/demo-support';
import '../shared/micro-demos.css';

export default function FlipCardDemo() {
  const [flipped, setFlipped] = useState(false);
  return <DemoPanel title="Flip Card · 翻转信息卡"><div className="aw-micro-stack">
    <FlipCard flipped={flipped} onFlipChange={setFlipped} width={280} height={340} radius={20} background={palette.surface} color={palette.ink} shadowColor={palette.primary} shadowOpacity={0.16} glareOpacity={0.12} tiltMax={6} ariaLabel="点击翻转 Agent Wan 信息卡" front={<div className="aw-micro-card"><span>AGENT WAN</span><h3>霜玻璃<br />设计系统</h3><p>正面 · 点击或拖动翻转</p></div>} back={<div className="aw-micro-card"><h3>清晰与克制</h3><p>自然色、浅阅读面、可验证的交互状态。</p><p>背面 · 再次点击返回</p></div>} />
    <div className="aw-micro-controls"><button type="button" onClick={() => setFlipped(value => !value)}>翻转卡片</button></div>
    <p className="aw-micro-status" role="status" aria-live="polite">当前：{flipped ? '背面' : '正面'}</p>
  </div></DemoPanel>;
}
