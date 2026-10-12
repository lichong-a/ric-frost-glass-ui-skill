// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Animations/HalftoneReveal/HalftoneReveal';
import { MEDIA, palette } from '../shared/demo-support';

// 网点印刷层在指针下展开为真实图片，与Dither Veil采用不同的视觉算法。
// 此演示需要可用的WebGL上下文；上下文创建失败时应显示能力提示，不能声称效果已经运行。

export default function HalftoneRevealDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component src={MEDIA[4]} mode="mono" shape="dot" cellSize={7} angle={45}
inkColor={palette.primary} accentColor={palette.sage} paperColor={palette.ivory}
revealRadius={120} softness={0.65} linger={0.7} clickBurst />
    </div>
  );
}
