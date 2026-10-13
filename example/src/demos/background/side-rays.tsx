import Component from '../../../.upstream/src/ts-default/Backgrounds/SideRays/SideRays';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

/** Agent Wan natural-tone preset for the real Side Rays component. */
export default function SideRaysDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          rayColor1={palette.sage}
          rayColor2={palette.sand}
          origin="top-right"
          speed={1.25}
          intensity={1.4}
          spread={2}
          saturation={0.6}
          opacity={0.9} {...demoProps('t0')}
        />
      </div>
    </div>
  );
}
