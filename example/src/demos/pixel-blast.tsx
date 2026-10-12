import Component from '../../.upstream/src/ts-default/Backgrounds/PixelBlast/PixelBlast';
import { palette } from '../shared/demo-support';

/** Agent Wan natural-tone preset for the real Pixel Blast component. */
export default function PixelBlastDemo() {
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          color={palette.sage}
          variant="square"
          pixelSize={4}
          patternScale={2}
          patternDensity={0.85}
          liquid
          liquidStrength={0.035}
          enableRipples
          rippleIntensityScale={0.8}
          speed={0.25}
          transparent
          autoPauseOffscreen
        />
      </div>
    </div>
  );
}
