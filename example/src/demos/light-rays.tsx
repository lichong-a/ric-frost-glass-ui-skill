import Component from '../../.upstream/src/ts-default/Backgrounds/LightRays/LightRays';
import { palette } from '../shared/demo-support';

/** Agent Wan natural-tone preset for the real Light Rays component. */
export default function LightRaysDemo() {
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          raysColor={palette.ivory}
          raysOrigin="top-center"
          raysSpeed={0.5}
          lightSpread={0.9}
          rayLength={2}
          noiseAmount={0.02}
          saturation={0.5}
          followMouse
          mouseInfluence={0.15}
        />
      </div>
    </div>
  );
}
