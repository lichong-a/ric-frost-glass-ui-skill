import Component from '../../../.upstream/src/ts-default/Backgrounds/GhostFibers/GhostFibers';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

/** Agent Wan natural-tone preset for the real Ghost Fibers component. */
export default function GhostFibersDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          glowColor={palette.sage}
          lineColor={palette.ivory}
          speed={0.12}
          rotationSpeed={0.1}
          layers={4}
          spread={1}
          glow={1}
          brightness={1.2}
          grain={0.015}
          mouseInteraction {...demoProps('t0')}
        />
      </div>
    </div>
  );
}
