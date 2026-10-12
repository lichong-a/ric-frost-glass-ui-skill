import Component from '../../.upstream/src/ts-default/Backgrounds/WebThreads/WebThreads';
import { palette } from '../shared/demo-support';

/** Agent Wan natural-tone preset for the real Web Threads component. */
export default function WebThreadsDemo() {
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          color1={palette.sage}
          color2={palette.sand}
          color3={palette.ivory}
          backgroundColor={palette.ink}
          speed={0.14}
          threadCount={8}
          glow={0.04}
          brightness={0.9}
          grainIntensity={0.02}
          mouseInteraction
          mouseStrength={0.2}
        />
      </div>
    </div>
  );
}
