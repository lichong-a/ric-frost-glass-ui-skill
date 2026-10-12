// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Animations/DitherVeil/DitherVeil';
import { MEDIA, palette } from '../shared/demo-support';

// 移动指针揭示彩色原图，离开后逐渐回到双色网点图。
// 此演示需要可用的WebGL上下文；上下文创建失败时应显示能力提示，不能声称效果已经运行。

export default function DitherVeilDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component src={MEDIA[0]} pattern="floyd" pixelSize={3} inkColor={palette.primary}
paperColor={palette.ivory} revealRadius={125} softness={0.6} linger={0.8}
rimColor={palette.sage} rim={0.2} clickBurst />
    </div>
  );
}
