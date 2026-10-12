import Component from '../../.upstream/src/ts-default/Backgrounds/Lightfall/Lightfall';
import { palette } from '../shared/demo-support';

/** Agent Wan natural-tone preset for the real Lightfall component. */
export default function LightfallDemo() {
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          colors={[palette.ivory, palette.sand]}
          backgroundColor={palette.ink}
          speed={0.15}
          streakCount={3}
          density={0.6}
          glow={0.6}
          bloom={0.15}
          twinkle={0.15}
          mouseInteraction
          mouseStrength={0.25}
        />
      </div>
    </div>
  );
}
