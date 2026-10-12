import Component from '../../.upstream/src/ts-default/Backgrounds/RippleGrid/RippleGrid';
import { palette } from '../shared/demo-support';

/** Agent Wan natural-tone preset for the real Ripple Grid component. */
export default function RippleGridDemo() {
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          color={palette.sage}
          variant="lines"
          cellSize={48}
          lineWidth={0.8}
          glow={0.3}
          rippleStrength={0.65}
          autoRipple="center"
          rippleInterval={3}
          mouseInteraction
          clickRipple
        />
      </div>
    </div>
  );
}
