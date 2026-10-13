import Component from '../../../.upstream/src/ts-default/Backgrounds/MicroSlats/MicroSlats';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

/** Agent Wan natural-tone preset for the real Micro Slats component. */
export default function MicroSlatsDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          preset="swell"
          color={palette.sage}
          glintColor={palette.ivory}
          backgroundColor={palette.ink}
          slatWidth={8}
          slatHeight={24}
          gap={4}
          roundness={0.65}
          speed={0.45}
          interactive
          cursorStrength={0.6} {...demoProps('t0')}
        />
      </div>
    </div>
  );
}
