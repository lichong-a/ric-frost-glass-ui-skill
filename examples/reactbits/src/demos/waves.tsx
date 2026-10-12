import Component from '../../.upstream/src/ts-default/Backgrounds/Waves/Waves';
import { palette } from '../shared/demo-support';

/** Agent Wan natural-tone preset for the real Waves component. */
export default function WavesDemo() {
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          lineColor={palette.sage}
          accentColor={palette.sand}
          backgroundColor={palette.ink}
          spacing={14}
          lineWidth={1}
          amplitude={24}
          speed={0.5}
          mouseInteraction
          mouseStrength={0.6}
          clickRipple
        />
      </div>
    </div>
  );
}
