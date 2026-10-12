import Component from '../../.upstream/src/ts-default/Backgrounds/SideRays/SideRays';
import { palette } from '../shared/demo-support';

/** Agent Wan natural-tone preset for the real Side Rays component. */
export default function SideRaysDemo() {
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          rayColor1={palette.sage}
          rayColor2={palette.sand}
          origin="top-right"
          speed={1.25}
          intensity={1.4}
          spread={2}
          saturation={0.6}
          opacity={0.9}
        />
      </div>
    </div>
  );
}
