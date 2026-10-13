import Component from '../../../.upstream/src/ts-default/Backgrounds/PlasmaWave/PlasmaWave';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

/** Agent Wan natural-tone preset for the real Plasma Wave component. */
export default function PlasmaWaveDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          colors={[palette.sage, palette.sand]}
          speed={0.55}
          thickness={0.26}
          glow={0.45}
          brightness={1}
          core={0.4}
          grain={0.02}
          mouseInteraction {...demoProps('t0')}
        />
      </div>
    </div>
  );
}
