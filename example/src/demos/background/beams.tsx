import Component from '../../../.upstream/src/ts-default/Backgrounds/Beams/Beams';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

/** Agent Ric natural-tone preset for the real Beams component. */
export default function BeamsDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          color={palette.ivory}
          backgroundColor={palette.ink}
          speed={0.4}
          beamWidth={140}
          fillLight={0.25}
          brightness={1.05}
          glow={0.3}
          grain={0.075}
          mouseInteraction
          mouseStrength={0.5} {...demoProps('t0')}
        />
      </div>
    </div>
  );
}
