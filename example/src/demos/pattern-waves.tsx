import Component from '../../.upstream/src/ts-default/Backgrounds/PatternWaves/PatternWaves';
import { palette } from '../shared/demo-support';

/** Agent Wan natural-tone preset for the real Pattern Waves component. */
export default function PatternWavesDemo() {
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          preset="silk"
          color={palette.sage}
          backgroundColor={palette.ink}
          speed={0.35}
          interactive
          cursorStrength={0.35}
          fade="edges"
        />
      </div>
    </div>
  );
}
