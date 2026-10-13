import Component from '../../../.upstream/src/ts-default/Backgrounds/Galaxy/Galaxy';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

/** Agent Wan natural-tone preset for the real Galaxy component. */
export default function GalaxyDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          starColors={[palette.sage, palette.ivory, palette.sand]}
          backgroundColor={palette.ink}
          transparent={false}
          hueShift={0}
          saturation={0.4}
          glowIntensity={0.2}
          flareIntensity={0.25}
          density={0.65}
          starSpeed={0.2}
          speed={0.5}
          twinkleIntensity={0.12}
          rotationSpeed={0.04}
          mouseInteraction
          clickWarp {...demoProps('t0')}
        />
      </div>
    </div>
  );
}
