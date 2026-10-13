// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Components/DomeGallery/DomeGallery';
import { LABELS, MEDIA, palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

// 拖动真实半球投影画廊，点击图片可放大；背景遮罩使用规范底色。

export default function DomeGalleryDemo() {
  const { props: demoProps } = useDemoConfig();
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 480, position: 'relative', overflow: 'hidden' }}>
      <Component images={MEDIA.map((src, index) => ({ src, alt: LABELS[index] }))}
fit={0.55} minRadius={340} maxRadius={700} padFactor={0.15}
overlayBlurColor={palette.canvas} segments={24} maxVerticalRotationDeg={12}
dragSensitivity={16} dragDampening={2} enlargeTransitionMs={280}
openedImageWidth="min(80vw, 440px)" openedImageHeight="280px"
imageBorderRadius="16px" openedImageBorderRadius="20px" grayscale={false} {...demoProps('t0')} />
    </div>
  );
}
