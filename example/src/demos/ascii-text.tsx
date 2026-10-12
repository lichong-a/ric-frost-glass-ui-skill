// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/TextAnimations/ASCIIText/ASCIIText';
import { palette } from '../shared/demo-support';

// 保留ASCII栅格、波动和点击涟漪，关闭额外色相旋转。
// 此演示需要可用的WebGL上下文；上下文创建失败时应显示能力提示，不能声称效果已经运行。

export default function ASCIITextDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component text="WAN" asciiFontSize={8} colors={[palette.primary, palette.muted, palette.ink]}
textColor={palette.ink} textScale={0.9} blocks={0.5} waves={0.65} waveSpeed={0.5}
chroma={0} tilt={0.45} hueShift={0} scramble={0.25} clickRipple idle interactive theme="light" />
    </div>
  );
}
