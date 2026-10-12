import Component from '../../.upstream/src/ts-default/Backgrounds/FaultyTerminal/FaultyTerminal';
import { palette } from '../shared/demo-support';

/** Agent Wan natural-tone preset for the real Faulty Terminal component. */
export default function FaultyTerminalDemo() {
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          tint={palette.sage}
          scale={1.5}
          gridMul={[2, 1]}
          timeScale={0.2}
          glitchAmount={0.25}
          flickerAmount={0.08}
          noiseAmp={0.15}
          scanlineIntensity={0.15}
          chromaticAberration={0}
          curvature={0.08}
          brightness={0.8}
          mouseReact
        />
      </div>
    </div>
  );
}
