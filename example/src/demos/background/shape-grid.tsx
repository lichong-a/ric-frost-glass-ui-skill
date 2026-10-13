import Component from '../../../.upstream/src/ts-default/Backgrounds/ShapeGrid/ShapeGrid';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

/** Agent Wan natural-tone preset for the real Shape Grid component. */
export default function ShapeGridDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          shape="hexagon"
          cellSize={40}
          lineColor={palette.primary}
          hoverColor={palette.sage}
          hoverFillColor={palette.primary}
          backgroundColor={palette.ink}
          speed={0.3}
          fillOpacity={0.2}
          glow={0.2}
          rainbow={false}
          clickCascade {...demoProps('t0')}
        />
      </div>
    </div>
  );
}
