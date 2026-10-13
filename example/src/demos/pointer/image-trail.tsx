// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Animations/ImageTrail/ImageTrail';
import { MEDIA, palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

// 快速移动指针生成不同位置的图片轨迹；六张本地图片无外链请求。

export default function ImageTrailDemo() {
  const { props: demoProps } = useDemoConfig();
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component items={MEDIA} variant={1} {...demoProps('t0')} />
    </div>
  );
}
