import Component from '../../../.upstream/src/ts-default/Backgrounds/PrismaticBurst/PrismaticBurst';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

/** Agent Ric natural-tone preset for the real Prismatic Burst component. */
export default function PrismaticBurstDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          colors={[palette.sage, palette.sand, palette.ivory]}
          intensity={1.5}
          speed={0.25}
          animationType="rotate3d"
          rayCount={24}
          distort={0.1}
          mixBlendMode="normal" {...demoProps('t0')}
        />
      </div>
    </div>
  );
}
