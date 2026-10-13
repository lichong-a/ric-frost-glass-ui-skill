// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/TextAnimations/MaskedHeading/MaskedHeading';
import { MEDIA, palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

// 图片填充实际字形蒙版；素材使用本示例自有的自然色SVG。

export default function MaskedHeadingDemo() {
  const { props: demoProps } = useDemoConfig();
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minWidth: 0, minHeight: 300, display: 'grid', placeItems: 'center', color: palette.ink, fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 650, padding: 24 }}>
      <Component text="AGENT WAN" src={MEDIA[1]} reveal="wipe" trigger="mount"
align="center" parallax={14} drift={8} fillScale={1.15} saturation={0.6}
weight={800} style={{ fontSize: 'clamp(48px, 9vw, 100px)', width: '100%' }} {...demoProps('t0')} />
    </div>
  );
}
