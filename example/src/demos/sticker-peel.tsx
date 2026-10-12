// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Animations/StickerPeel/StickerPeel';
import { MEDIA, palette } from '../shared/demo-support';

// 悬停掀角、按压加深并拖动贴纸；图片为自有示意资产。

export default function StickerPeelDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component imageSrc={MEDIA[5]} width={180} rotate={-10} peelBackHoverPct={18}
peelBackActivePct={35} shadowIntensity={0.4} lightingIntensity={0.1}
initialPosition="center" />
    </div>
  );
}
