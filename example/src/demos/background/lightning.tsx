import Component from '../../../.upstream/src/ts-default/Backgrounds/Lightning/Lightning';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

/** Agent Wan natural-tone preset for the real Lightning component. */
export default function LightningDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          color={palette.sand}
          bolts={1}
          branches={0.25}
          intensity={0.7}
          speed={0.4}
          flicker={0.08}
          glow={0.5}
          mouseInteraction
          mouseStrength={0.45}
          clickStrike {...demoProps('t0')}
        />
      </div>
    </div>
  );
}
