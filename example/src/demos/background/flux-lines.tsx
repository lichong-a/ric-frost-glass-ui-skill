import Component from '../../../.upstream/src/ts-default/Backgrounds/FluxLines/FluxLines';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

/** Agent Wan natural-tone preset for the real Flux Lines component. */
export default function FluxLinesDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          colors={[palette.sage, palette.sand, palette.ivory]}
          speed={0.25}
          scale={1.6}
          turbulence={0.7}
          fluidity={0.15}
          glow={0.9}
          lineWidth={1}
          backgroundColor={palette.ink}
          transparent={false}
          mouseInteraction
          mouseStrength={0.55}
          clickSwirl {...demoProps('t0')}
        />
      </div>
    </div>
  );
}
