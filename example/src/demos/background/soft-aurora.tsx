import Component from '../../../.upstream/src/ts-default/Backgrounds/SoftAurora/SoftAurora';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

/** Agent Ric natural-tone preset for the real Soft Aurora component. */
export default function SoftAuroraDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          color1={palette.ivory}
          color2={palette.sage}
          speed={0.3}
          brightness={0.9}
          noiseAmplitude={0.65}
          bandHeight={0.4}
          bandSpread={1.1}
          colorSpeed={0.4}
          enableMouseInteraction
          mouseInfluence={0.2} {...demoProps('t0')}
        />
      </div>
    </div>
  );
}
