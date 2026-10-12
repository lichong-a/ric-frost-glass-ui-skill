import Component from '../../.upstream/src/ts-default/Backgrounds/Particles/Particles';
import { palette } from '../shared/demo-support';

/** Agent Wan natural-tone preset for the real Particles component. */
export default function ParticlesDemo() {
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          particleCount={140}
          particleColors={[palette.ivory, palette.sage, palette.sand]}
          particleSpread={10}
          speed={0.07}
          particleBaseSize={80}
          shape="circle"
          glow={0.25}
          twinkle={0.15}
          moveParticlesOnHover
          particleHoverFactor={0.6}
          clickBurst
          alphaParticles
        />
      </div>
    </div>
  );
}
