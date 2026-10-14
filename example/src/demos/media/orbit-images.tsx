// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Animations/OrbitImages/OrbitImages';
import { MEDIA, palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

// 六张图片沿真实SVG路径循环，轨道边界明确。

export default function OrbitImagesDemo() {
  const { props: demoProps } = useDemoConfig();
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component images={MEDIA} altPrefix="自然色图像" shape="ellipse" radiusX={220}
radiusY={75} rotation={-6} duration={36} itemSize={62} responsive
showPath pathColor={palette.sage} pathWidth={1} width="100%" height={340}
centerContent={<span style={{ color: palette.ink, fontSize: 24 }}>Agent Ric</span>} {...demoProps('t0')} />
    </div>
  );
}
