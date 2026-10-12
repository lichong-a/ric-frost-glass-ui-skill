import Component from '../../.upstream/src/ts-default/Backgrounds/Threads/Threads';
import { palette } from '../shared/demo-support';

/** Agent Wan natural-tone preset for the real Threads component. */
export default function ThreadsDemo() {
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          color={palette.sage}
          accentColor={palette.sand}
          lineCount={70}
          thickness={0.6}
          brightness={1.1}
          amplitude={1.1}
          softness={1.4}
          speed={0.35}
          enableMouseInteraction
        />
      </div>
    </div>
  );
}
