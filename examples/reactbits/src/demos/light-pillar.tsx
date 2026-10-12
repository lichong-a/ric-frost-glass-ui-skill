import Component from '../../.upstream/src/ts-default/Backgrounds/LightPillar/LightPillar';
import { palette } from '../shared/demo-support';

/** Agent Wan natural-tone preset for the real Light Pillar component. */
export default function LightPillarDemo() {
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          topColor={palette.ivory}
          bottomColor={palette.sage}
          intensity={0.75}
          bloom={0.18}
          pillarWidth={3}
          rotationSpeed={0.15}
          noiseIntensity={0.15}
          quality="medium"
          mixBlendMode="normal"
          interactive
          clickPulse
        />
      </div>
    </div>
  );
}
