// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Components/MorphSlider/MorphSlider';
import { LABELS, MEDIA, palette } from '../shared/demo-support';

// 使用内置上一张、下一张和指示器，展示真实WebGL图片位移过渡。
// 此演示需要可用WebGL上下文；不支持时应显示能力提示，不声称效果已运行。

export default function MorphSliderDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 400, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component items={MEDIA.map((image, index) => ({ image, caption: LABELS[index] }))}
transition="melt" duration={0.8} intensity={0.3} aberration={0.04} drift={0.12}
autoplay={false} loop radius={20} overlayColor={palette.primary}
showCaptions showControls showIndicators />
    </div>
  );
}
