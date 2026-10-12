// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Components/CardSwap/CardSwap';
import { LABELS, MEDIA, palette } from '../shared/demo-support';
import { useState } from "react";
// 独立实现Card Swap的深度堆栈切换，与Stack分别保留真实行为。

export default function CardSwapDemo() {
  const [status, setStatus] = useState("拖动或甩动前方卡片，将其放到后面");

  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 400, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <div style={{ width: '100%', height: '100%' }}><div style={{ position: 'relative', height: 330, minHeight: 0, width: '100%' }}><Component items={MEDIA.map((image, index) => ({ image, alt: LABELS[index], title: LABELS[index] }))}
width={320} height={225} cardDistance={42} verticalDistance={30} depth={45}
skewAmount={3} visibleCards={3} delay={4000} autoplay={false} pauseOnHover
draggable bounce={0.35} parallax={0.15} hoverSpread={0.2} dim={0.12}
cardRadius={20} theme="light"
onCardClick={index => setStatus('点击卡片：' + LABELS[index % LABELS.length])}
onChange={index => setStatus('当前卡片：' + LABELS[index % LABELS.length])} /></div><p role="status" aria-live="polite" style={{ margin: '12px 20px', fontSize: 14, color: palette.muted }}>{status}</p></div>
    </div>
  );
}
