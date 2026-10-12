import Component from '../../.upstream/src/ts-default/Backgrounds/LineWaves/LineWaves';
import { palette } from '../shared/demo-support';

/** Agent Wan natural-tone preset for the real Line Waves component. */
export default function LineWavesDemo() {
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          color1={palette.sage}
          color2={palette.sand}
          color3={palette.ivory}
          innerLineCount={32}
          outerLineCount={40}
          speed={0.18}
          brightness={0.35}
          warpIntensity={0.6}
          enableMouseInteraction
          mouseInfluence={1}
        />
      </div>
    </div>
  );
}
