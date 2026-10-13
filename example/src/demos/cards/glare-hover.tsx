// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Animations/GlareHover/GlareHover';
import { MEDIA, palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

// 指针方向改变掠过图片的镜面高光。

export default function GlareHoverDemo() {
  const { props: demoProps } = useDemoConfig();
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component width="100%" height="320px" background={palette.ivory} borderRadius="20px"
borderColor={palette.sage} mode="hover" variant="streak" glareColor={palette.ivory}
glareOpacity={0.4} glareSize={28} softness={0.7} glareAngle={-45}
blendMode="screen" rimGlint transitionDuration={550} {...demoProps('t0')}><img src={MEDIA[2]} alt="自然色图形上的玻璃高光" style={{ width: "100%", height: "100%", objectFit: "cover" }} {...demoProps('t1')} /></Component>
    </div>
  );
}
