import Component from '../../.upstream/src/ts-default/Backgrounds/GradientWaves/GradientWaves';
import { palette } from '../shared/demo-support';

/** Agent Wan natural-tone preset for the real Gradient Waves component. */
export default function GradientWavesDemo() {
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          horizonColor={palette.primary}
          waveColor={palette.sage}
          crestColor={palette.ivory}
          speed={0.2}
          amplitude={2}
          turbulence={10}
          detail="medium"
          brightness={1}
          grainIntensity={0.025}
          mouseInteraction
          parallaxStrength={0.3}
        />
      </div>
    </div>
  );
}
