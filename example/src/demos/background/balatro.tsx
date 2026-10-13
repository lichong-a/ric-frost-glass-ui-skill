import Component from '../../../.upstream/src/ts-default/Backgrounds/Balatro/Balatro';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

/** Agent Wan natural-tone preset for the real Balatro component. */
export default function BalatroDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          color1={palette.sage}
          color2={palette.sand}
          color3={palette.ink}
          spinSpeed={4}
          spinAmount={0.12}
          contrast={2.2}
          lighting={0.28}
          pixelFilter={800}
          isRotate
          mouseInteraction {...demoProps('t0')}
        />
      </div>
    </div>
  );
}
