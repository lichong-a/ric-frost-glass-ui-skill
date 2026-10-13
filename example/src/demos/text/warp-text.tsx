// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/TextAnimations/WarpText/WarpText';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

// WebGL折射在文字本体上运行；指针附近产生局部弯曲。
// 此演示需要可用的WebGL上下文；上下文创建失败时应显示能力提示，不能声称效果已经运行。

export default function WarpTextDemo() {
  const { props: demoProps } = useDemoConfig();
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component text="SOFT SIGNAL" color={palette.primary} warpStrength={0.05}
warpScale={1.4} speed={0.25} pointerInfluence={0.3} pointerStrength={0.24}
refraction={0.008} ripple fontSize="clamp(40px, 8vw, 88px)" fontWeight={700}
style={{ height: 320, width: '100%' }} {...demoProps('t0')} />
    </div>
  );
}
