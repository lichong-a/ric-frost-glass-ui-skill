import Component from '../../.upstream/src/ts-default/Backgrounds/LetterGlitch/LetterGlitch';
import { palette } from '../shared/demo-support';

/** Agent Wan natural-tone preset for the real Letter Glitch component. */
export default function LetterGlitchDemo() {
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          glitchColors={[palette.primary, palette.sage, palette.sand]}
          glitchSpeed={120}
          centerVignette={false}
          outerVignette
          smooth
          backgroundColor={palette.ink}
          characters="AGENTWAN/0123456789<>{}[]+-="
        />
      </div>
    </div>
  );
}
