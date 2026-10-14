import Component from '../../../.upstream/src/ts-default/Backgrounds/GradientBlinds/GradientBlinds';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

/** Agent Ric natural-tone preset for the real Gradient Blinds component. */
export default function GradientBlindsDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          gradientColors={[palette.sage, palette.ivory, palette.sand]}
          angle={20}
          noise={0.07}
          blindCount={18}
          blindMinWidth={36}
          spotlightRadius={0.55}
          spotlightOpacity={0.45}
          spotlightSoftness={1}
          distortAmount={0.1}
          mixBlendMode="normal" {...demoProps('t0')}
        />
      </div>
    </div>
  );
}
