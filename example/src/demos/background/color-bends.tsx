import Component from '../../../.upstream/src/ts-default/Backgrounds/ColorBends/ColorBends';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

/** Agent Wan natural-tone preset for the real Color Bends component. */
export default function ColorBendsDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          colors={[palette.sage, palette.sand, palette.ivory]}
          transparent={false}
          speed={0.12}
          frequency={0.7}
          warpStrength={0.8}
          iterations={2}
          noise={0.04}
          intensity={1.1}
          mouseInfluence={0.5}
          parallax={0.2} {...demoProps('t0')}
        />
      </div>
    </div>
  );
}
