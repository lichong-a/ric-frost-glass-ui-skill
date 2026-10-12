// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Components/DecayCard/DecayCard';
import { MEDIA, palette } from '../shared/demo-support';

// 实际着色器让图片在指针下侵蚀并恢复，作用域限制在卡片。
// 此演示需要可用WebGL上下文；不支持时应显示能力提示，不声称效果已运行。

export default function DecayCardDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 340, position: 'relative', display: 'grid', placeItems: 'center', padding: 24, color: palette.ink }}>
      <Component image={MEDIA[5]} width={300} height={270} intensity={0.25}
sensitivity={0.35} hoverDecay={0.08} recovery={0.65} idle={0.1}
grain={0.1} detail={4} pattern={3} flow={0.15} chroma={0} travel={25}
tilt={5} scope="card" radius={20} grayscale={false}><h3 style={{ color: palette.ivory, padding: 20 }}>形态与回归</h3></Component>
    </div>
  );
}
