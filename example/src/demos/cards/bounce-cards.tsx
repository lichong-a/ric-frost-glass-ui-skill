// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Components/BounceCards/BounceCards';
import { LABELS, MEDIA, palette } from '../../shared/demo-support';
import { useState } from "react";
import { useDemoConfig } from '../../parameters/DemoConfig';
// 真实扇形卡片弹入、悬停分离和点击回调。

export default function BounceCardsDemo() {
  const { props: demoProps } = useDemoConfig();
  const [status, setStatus] = useState("悬停让卡片分开，点击选择");

  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 400, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <div style={{ width: '100%', height: '100%' }}><div style={{ minHeight: 310, width: '100%', display: 'grid', placeItems: 'center' }}><Component images={MEDIA.slice(0, 5).map((src, index) => ({ src, alt: LABELS[index] }))}
containerWidth={520} containerHeight={280} cardSize={150} spread={70}
rotation={6} arc={8} animationDelay={0.2} animationStagger={0.07}
bounciness={0.4} enableHover pushDistance={80} hoverScale={1.03}
borderWidth={4} borderColor={palette.ivory} radius={20} shadow
onCardClick={index => setStatus('点击卡片：' + LABELS[index % LABELS.length])} {...demoProps('t0')} /></div><p role="status" aria-live="polite" style={{ margin: '12px 20px', fontSize: 14, color: palette.muted }}>{status}</p></div>
    </div>
  );
}
