import Component from '../../../.upstream/src/ts-default/Backgrounds/Grainient/Grainient';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

/** Agent Wan natural-tone preset for the real Grainient component. */
export default function GrainientDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          color1={palette.sage}
          color2={palette.ivory}
          color3={palette.sand}
          timeSpeed={0.15}
          warpStrength={0.7}
          grainAmount={0.045}
          contrast={1.1}
          saturation={0.65}
          grainAnimated={false} {...demoProps('t0')}
        />
      </div>
    </div>
  );
}
