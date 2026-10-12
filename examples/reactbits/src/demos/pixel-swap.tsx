// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Animations/PixelSwap/PixelSwap';
import { MEDIA, palette } from '../shared/demo-support';

// 点击通过像素碎片交换两张自有图片。
// aspectRatio使用CSS比例值；点击或按Enter/空格执行真实像素切换。

export default function PixelSwapDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component firstContent={<img src={MEDIA[0]} alt="切换前的山形示意图" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
secondContent={<img src={MEDIA[5]} alt="切换后的自然色示意图" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
pixelSize={36} gap={2} pixelRadius={4} pixelScale={0.4} duration={900}
pixelDuration={320} pattern="random" trigger="click" fade aspectRatio="8 / 5" style={{ maxWidth: 640 }} />
    </div>
  );
}
