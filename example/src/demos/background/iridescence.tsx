import Component from '../../../.upstream/src/ts-default/Backgrounds/Iridescence/Iridescence';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

/** Agent Ric natural-tone preset for the real Iridescence component. */
export default function IridescenceDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          color={palette.sage}
          speed={0.4}
          amplitude={0.15}
          saturation={0.25}
          brightness={1.1}
          warp={0.6}
          sheen={0.2}
          grain={0.02}
          mouseReact
          clickSwirl {...demoProps('t0')}
        />
      </div>
    </div>
  );
}
