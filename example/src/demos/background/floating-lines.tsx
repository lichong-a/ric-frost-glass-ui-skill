import Component from '../../../.upstream/src/ts-default/Backgrounds/FloatingLines/FloatingLines';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

/** Agent Ric natural-tone preset for the real Floating Lines component. */
export default function FloatingLinesDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          linesGradient={[palette.sage, palette.sand, palette.ivory]}
          backgroundColor={palette.ink}
          lineCount={[5, 5, 5]}
          lineDistance={[5, 5, 5]}
          animationSpeed={0.5}
          bendStrength={-0.35}
          parallaxStrength={0.12}
          mixBlendMode="normal"
          interactive {...demoProps('t0')}
        />
      </div>
    </div>
  );
}
