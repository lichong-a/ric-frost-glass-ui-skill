// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Components/AccordionGallery/AccordionGallery';
import { LABELS, MEDIA, palette } from '../shared/demo-support';

// 点击面板展开，面板自带标题；未配置假跳转链接。

export default function AccordionGalleryDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 400, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component items={MEDIA.slice(0, 5).map((image, index) => ({ image, label: LABELS[index], alt: LABELS[index] }))}
defaultIndex={1} height={340} gap={10} radius={20} expandRatio={0.55}
trigger="click" orientation="horizontal" accentColor={palette.sage}
overlayColor={palette.ink} textColor={palette.ivory} duration={0.6}
parallax={0.15} tilt={0.1} showLabels />
    </div>
  );
}
