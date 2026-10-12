// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Components/DepthCarousel/DepthCarousel';
import { LABELS, MEDIA, palette } from '../shared/demo-support';
import { useState } from "react";
// 前后景深轨道保留，当前图片变化有文字反馈。

export default function DepthCarouselDemo() {
  const [status, setStatus] = useState("使用按钮、拖动或方向键切换");

  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 400, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <div style={{ width: '100%', height: '100%' }}><div style={{ position: 'relative', height: 330, minHeight: 0, width: '100%' }}><Component items={MEDIA.map((image, index) => ({ image, alt: LABELS[index] }))}
cardWidth={240} cardHeight={210} radius={20} tint={palette.canvas}
depth={160} spread={60} tilt={12} perspective={1400} visibleCards={4}
falloff={0.18} blur={3} autoplay={false} loop showControls showIndicators
onChange={index => setStatus('当前图片：' + LABELS[index % LABELS.length])} /></div><p role="status" aria-live="polite" style={{ margin: '12px 20px', fontSize: 14, color: palette.muted }}>{status}</p></div>
    </div>
  );
}
