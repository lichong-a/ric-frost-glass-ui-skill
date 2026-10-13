import { GridScan as Component } from '../../../.upstream/src/ts-default/Backgrounds/GridScan/GridScan';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

/** Agent Wan natural-tone preset for the real Grid Scan component. */
export default function GridScanDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          enableWebcam={false}
          enableGyro={false}
          showPreview={false}
          linesColor={palette.sage}
          scanColor={palette.sand}
          scanOpacity={0.35}
          lineThickness={0.7}
          enablePost={false}
          chromaticAberration={0}
          noiseIntensity={0.02}
          scanGlow={0.25}
          scanDuration={3}
          scanDelay={2.5}
          scanOnClick {...demoProps('t0')}
        />
      </div>
    </div>
  );
}
