import Component from '../../../.upstream/src/ts-default/Backgrounds/GridDistortion/GridDistortion';
import { MEDIA } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

/** Agent Wan natural-tone preset for the real Grid Distortion component. */
export default function GridDistortionDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          imageSrc={MEDIA[0]}
          grid={18}
          radius={0.18}
          strength={0.12}
          relaxation={0.96}
          idle={0.15}
          chroma={0}
          clickRipple
          style={{ width: '100%', height: '100%' }} {...demoProps('t0')}
        />
      </div>
    </div>
  );
}
