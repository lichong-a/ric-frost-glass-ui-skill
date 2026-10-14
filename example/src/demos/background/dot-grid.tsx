import Component from '../../../.upstream/src/ts-default/Backgrounds/DotGrid/DotGrid';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

/** Agent Ric natural-tone preset for the real Dot Grid component. */
export default function DotGridDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          baseColor={palette.primary}
          activeColor={palette.sage}
          dotSize={4}
          gap={18}
          proximity={140}
          strength={0.6}
          shockStrength={2.5}
          glow={0.2}
          returnDuration={0.8}
          mouseInteraction
          clickShock {...demoProps('t0')}
        />
      </div>
    </div>
  );
}
