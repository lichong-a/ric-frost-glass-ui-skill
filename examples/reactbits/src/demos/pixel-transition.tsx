// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Animations/PixelTransition/PixelTransition';
import { MEDIA, palette } from '../shared/demo-support';

// 悬停通过网格遮罩完成图像替换；与Pixel Swap的碎片交换分别实现。
// 此演示使用Canvas；确保容器拥有非零宽高。

export default function PixelTransitionDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component firstContent={<img src={MEDIA[1]} alt="切换前的示意图" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
secondContent={<img src={MEDIA[4]} alt="切换后的示意图" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
pixelColor={palette.sage} gridSize={12} pixelShape="square" gap={1}
pattern="random" pixelAnimation="pop" randomness={0.25}
animationStepDuration={0.35} trigger="hover" aspectRatio="62.5%" />
    </div>
  );
}
