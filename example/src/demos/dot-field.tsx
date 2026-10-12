import Component from '../../.upstream/src/ts-default/Backgrounds/DotField/DotField';
import { palette } from '../shared/demo-support';

/** Agent Wan natural-tone preset for the real Dot Field component. */
export default function DotFieldDemo() {
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          dotRadius={2}
          dotSpacing={16}
          cursorRadius={170}
          cursorForce={0.1}
          bulgeStrength={45}
          waveAmplitude={4}
          gradientFrom={palette.sage}
          gradientTo={palette.sand}
          glowColor={palette.primary}
          sparkle={false}
        />
      </div>
    </div>
  );
}
