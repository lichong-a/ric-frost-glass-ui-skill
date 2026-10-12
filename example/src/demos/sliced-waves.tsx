import Component from '../../.upstream/src/ts-default/Backgrounds/SlicedWaves/SlicedWaves';
import { palette } from '../shared/demo-support';

/** Agent Wan natural-tone preset for the real Sliced Waves component. */
export default function SlicedWavesDemo() {
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          color1={palette.sage}
          color2={palette.ivory}
          color3={palette.sand}
          ribbons={3}
          spacing={28}
          speed={0.45}
          brightness={1.1}
          glow={0.4}
          grain={0.025}
          mouseInteraction
        />
      </div>
    </div>
  );
}
