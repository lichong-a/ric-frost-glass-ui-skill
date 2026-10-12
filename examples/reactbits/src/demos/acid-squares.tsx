import Component from '../../.upstream/src/ts-default/Backgrounds/AcidSquares/AcidSquares';
import { palette } from '../shared/demo-support';

/** Agent Wan natural-tone preset for the real Acid Squares component. */
export default function AcidSquaresDemo() {
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          color={palette.ink}
          accentColor={palette.sage}
          shape="square"
          speed={0.35}
          pulse={0.6}
          pulseSpeed={0.3}
          twist={0.05}
          sparkle={0.01}
          brightness={1}
          grain={0.02}
          mouseInteraction
          mouseStrength={0.5}
        />
      </div>
    </div>
  );
}
