// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Animations/MagicRings/MagicRings';
import { palette } from '../shared/demo-support';

// 真实多层环形着色器，指针影响中心与尺度。
// 此演示需要可用的WebGL上下文；上下文创建失败时应显示能力提示，不能声称效果已经运行。

export default function MagicRingsDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component color={palette.primary} colorTwo={palette.sand} ringCount={5} speed={0.45}
attenuation={10} lineThickness={1.6} baseRadius={0.3} radiusStep={0.11}
scaleRate={0.06} opacity={0.7} noiseAmount={0.04} ringGap={1.5}
followMouse mouseInfluence={0.15} hoverScale={1.08} parallax={0.03} clickBurst />
    </div>
  );
}
