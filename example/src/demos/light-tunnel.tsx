import Component from '../../.upstream/src/ts-default/Backgrounds/LightTunnel/LightTunnel';
import { palette } from '../shared/demo-support';

/** Agent Wan natural-tone preset for the real Light Tunnel component. */
export default function LightTunnelDemo() {
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          cableColor={palette.sage}
          pulseColor={palette.ivory}
          tunnelColor={palette.primary}
          tunnelOpacity={0.12}
          speed={0.06}
          pulseSpeed={0.8}
          cableCount={20}
          glow={0.6}
          thickness={0.35}
          colorVariance={false}
          grainIntensity={0.02}
          mouseInteraction
        />
      </div>
    </div>
  );
}
