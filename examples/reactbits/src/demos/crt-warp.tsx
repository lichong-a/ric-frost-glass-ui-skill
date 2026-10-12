import Component from '../../.upstream/src/ts-default/Backgrounds/CRTWarp/CRTWarp';
import { palette } from '../shared/demo-support';

/** Agent Wan natural-tone preset for the real CRT Warp component. */
export default function CRTWarpDemo() {
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          color={palette.sage}
          backgroundColor={palette.ink}
          speed={0.25}
          curvature={0.12}
          scanlineStrength={0.1}
          waveAmplitude={0.2}
          bloom={0.8}
          noise={0.03}
          brightness={1.1}
          rgbShift={0.002}
          fps={30}
          mouseReact
        />
      </div>
    </div>
  );
}
