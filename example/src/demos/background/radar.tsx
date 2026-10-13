import Component from '../../../.upstream/src/ts-default/Backgrounds/Radar/Radar';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

/** Agent Wan natural-tone preset for the real Radar component. */
export default function RadarDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          color={palette.sage}
          backgroundColor={palette.ink}
          mode="sweep"
          speed={0.45}
          ringCount={5}
          targets={4}
          clutter={0.15}
          glow={0.35}
          grain={0.02}
          mouseInteraction {...demoProps('t0')}
        />
      </div>
    </div>
  );
}
