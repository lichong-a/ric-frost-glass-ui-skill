import Component from '../../../.upstream/src/ts-default/Backgrounds/Orb/Orb';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

/** Agent Wan natural-tone preset for the real Orb component. */
export default function OrbDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          colors={[palette.sage, palette.sand, palette.ivory]}
          backgroundColor={palette.ink}
          glow={0.45}
          bleed={0.45}
          wobble={0.6}
          speed={0.5}
          hoverIntensity={0.8}
          highlight={0.55}
          followCursor
          clickPulse {...demoProps('t0')}
        />
      </div>
    </div>
  );
}
