import Component from '../../.upstream/src/ts-default/Backgrounds/Plasma/Plasma';
import { palette } from '../shared/demo-support';

/** Agent Wan natural-tone preset for the real Plasma component. */
export default function PlasmaDemo() {
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          color={palette.sage}
          speed={0.45}
          shine={0.55}
          softness={0.7}
          twist={0.8}
          grain={0.02}
          brightness={1}
          mouseInteractive
        />
      </div>
    </div>
  );
}
