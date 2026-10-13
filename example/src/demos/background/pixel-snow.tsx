import Component from '../../../.upstream/src/ts-default/Backgrounds/PixelSnow/PixelSnow';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

/** Agent Wan natural-tone preset for the real Pixel Snow component. */
export default function PixelSnowDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          color={palette.ivory}
          variant="snowflake"
          density={0.25}
          speed={0.6}
          flakeSize={1}
          pixelSize={3}
          wind={0.15}
          glow={0.25}
          twinkle={0.1}
          accumulate={false}
          mouseInteraction {...demoProps('t0')}
        />
      </div>
    </div>
  );
}
