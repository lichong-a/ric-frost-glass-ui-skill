import Component from '../../../.upstream/src/ts-default/Backgrounds/DarkVeil/DarkVeil';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

/** Agent Wan natural-tone preset for the real Dark Veil component. */
export default function DarkVeilDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          color={palette.sage}
          speed={0.25}
          brightness={1.05}
          glow={0.2}
          sheen={0.15}
          grain={0.02}
          mouseInteraction
          mouseStrength={0.5} {...demoProps('t0')}
        />
      </div>
    </div>
  );
}
