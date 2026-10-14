import Component from '../../../.upstream/src/ts-default/Backgrounds/Scanner/Scanner';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

/** Agent Ric natural-tone preset for the real Scanner component. */
export default function ScannerDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          color1={palette.sage}
          color2={palette.sand}
          color3={palette.ivory}
          speed={0.25}
          sweepSpeed={0.18}
          scanDirection="vertical"
          brightness={0.95}
          glow={0.15}
          grainIntensity={0.02}
          mouseInteraction
          mouseStrength={0.25} {...demoProps('t0')}
        />
      </div>
    </div>
  );
}
