import Component from '../../../.upstream/src/ts-default/Backgrounds/Ferrofluid/Ferrofluid';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

/** Agent Wan natural-tone preset for the real Ferrofluid component. */
export default function FerrofluidDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          colors={[palette.sage, palette.sand, palette.ivory]}
          speed={0.25}
          scale={1.6}
          spikeHeight={0.6}
          turbulence={0.65}
          fluidity={0.5}
          transparent
          mouseInteraction
          mouseStrength={0.5}
          clickPulse {...demoProps('t0')}
        />
      </div>
    </div>
  );
}
