// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Components/CircularGallery/CircularGallery';
import { LABELS, MEDIA, palette } from '../shared/demo-support';

// 拖动或滚动浏览真实WebGL弧面画廊，标签使用本地系统字体。
// 此演示需要可用WebGL上下文；不支持时应显示能力提示，不声称效果已运行。

export default function CircularGalleryDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 400, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component items={MEDIA.map((image, index) => ({ image, text: LABELS[index] }))}
bend={1.4} textColor={palette.ink} borderRadius={0.06} font="600 24px sans-serif"
scrollSpeed={1.1} scrollEase={0.04} />
    </div>
  );
}
