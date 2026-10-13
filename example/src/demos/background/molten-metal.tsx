import Component from '../../../.upstream/src/ts-default/Backgrounds/MoltenMetal/MoltenMetal';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

/** Agent Wan natural-tone preset for the real Molten Metal component. */
export default function MoltenMetalDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          color1={palette.sage}
          color2={palette.sand}
          color3={palette.ivory}
          backgroundColor={palette.ink}
          speed={0.18}
          scale={4}
          glow={0.7}
          brightness={1.1}
          grainIntensity={0.025}
          mouseInteraction
          mouseStrength={0.2} {...demoProps('t0')}
        />
      </div>
    </div>
  );
}
