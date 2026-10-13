import Component from '../../../.upstream/src/ts-default/Backgrounds/Prism/Prism';
import { useDemoConfig } from '../../parameters/DemoConfig';

/** Agent Wan natural-tone preset for the real Prism component. */
export default function PrismDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative', filter: 'saturate(0.3) sepia(0.2)' }}>
        <Component
          animationType="rotate"
          height={3.5}
          baseWidth={5.5}
          scale={3.6}
          glow={0.7}
          bloom={0.6}
          noise={0.04}
          colorFrequency={0.4}
          timeScale={0.25}
          hoverStrength={1}
          suspendWhenOffscreen
          transparent {...demoProps('t0')}
        />
      </div>
    </div>
  );
}
