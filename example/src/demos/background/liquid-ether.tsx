import Component from '../../../.upstream/src/ts-default/Backgrounds/LiquidEther/LiquidEther';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

/** Agent Wan natural-tone preset for the real Liquid Ether component. */
export default function LiquidEtherDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          colors={[palette.sage, palette.sand, palette.ivory]}
          backgroundColor={palette.ink}
          resolution={0.5}
          iterationsPoisson={24}
          iterationsViscous={24}
          mouseForce={14}
          cursorSize={90}
          autoDemo
          autoSpeed={0.25}
          autoIntensity={1.4} {...demoProps('t0')}
        />
      </div>
    </div>
  );
}
