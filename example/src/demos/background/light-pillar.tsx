import Component from '../../../.upstream/src/ts-default/Backgrounds/LightPillar/LightPillar';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

/** Agent Ric natural-tone preset for the real Light Pillar component. */
export default function LightPillarDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          topColor={palette.ivory}
          bottomColor={palette.sage}
          intensity={0.75}
          bloom={0.18}
          pillarWidth={3}
          rotationSpeed={0.15}
          noiseIntensity={0.15}
          quality="medium"
          mixBlendMode="normal"
          interactive
          clickPulse {...demoProps('t0')}
        />
      </div>
    </div>
  );
}
