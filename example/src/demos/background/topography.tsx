import Component from '../../../.upstream/src/ts-default/Backgrounds/Topography/Topography';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

/** Agent Ric natural-tone preset for the real Topography component. */
export default function TopographyDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          lowColor={palette.primary}
          midColor={palette.sage}
          highColor={palette.sand}
          speed={0.2}
          bands={3}
          thickness={0.02}
          contrast={2}
          glow={0.3}
          grainIntensity={0.025}
          fillBands={false}
          mouseInteraction {...demoProps('t0')}
        />
      </div>
    </div>
  );
}
