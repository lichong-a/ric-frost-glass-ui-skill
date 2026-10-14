import Component from '../../../.upstream/src/ts-default/Backgrounds/Silk/Silk';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

/** Agent Ric natural-tone preset for the real Silk component. */
export default function SilkDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          color={palette.sage}
          sheenColor={palette.ivory}
          speed={2}
          scale={1}
          depth={0.45}
          noiseIntensity={0.45}
          glow={0.15}
          mouseInteraction
          interactionStrength={0.6}
          clickRipple {...demoProps('t0')}
        />
      </div>
    </div>
  );
}
