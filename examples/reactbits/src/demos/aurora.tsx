import Component from '../../.upstream/src/ts-default/Backgrounds/Aurora/Aurora';
import { palette } from '../shared/demo-support';

/** Agent Wan natural-tone preset for the real Aurora component. */
export default function AuroraDemo() {
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          colorStops={[palette.primary, palette.sage, palette.sand]}
          speed={0.45}
          glow={0.35}
          height={0.65}
          blend={0.6}
          brightness={1.05}
          layers={2}
          mouseInteraction
        />
      </div>
    </div>
  );
}
