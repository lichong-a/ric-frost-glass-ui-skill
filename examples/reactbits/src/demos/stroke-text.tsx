// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/TextAnimations/StrokeText/StrokeText';
import { palette } from '../shared/demo-support';

// 按字描边后填充，可用示例站的重播重新开始。

export default function StrokeTextDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 300, display: 'grid', placeItems: 'center', color: palette.ink, fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 650, padding: 24 }}>
      <Component text="Quiet Craft" strokeColor={palette.primary} fillColor={palette.ink}
strokeWidth={1.3} drawDuration={1.2} fillDelay={0.18} stagger={0.05}
trigger="mount" fillMode="wipe" fontSize={90} fontWeight={700} letterSpacing={-2} />
    </div>
  );
}
