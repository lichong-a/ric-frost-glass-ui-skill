// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Animations/Strands/Strands';
import { palette } from '../shared/demo-support';

// 保留真实波动条带与玻璃折射，色彩仅来自规范的自然色系。
// 此演示需要可用的WebGL上下文；上下文创建失败时应显示能力提示，不能声称效果已经运行。

export default function StrandsDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component colors={[palette.primary, palette.sage, palette.sand]} count={3} speed={0.3}
amplitude={0.6} waviness={0.7} thickness={0.6} glow={0.6} taper={3}
spread={0.9} intensity={0.5} saturation={0.65} hueShift={0} opacity={0.8}
scale={1.1} glass refraction={0.4} dispersion={0.1} />
    </div>
  );
}
