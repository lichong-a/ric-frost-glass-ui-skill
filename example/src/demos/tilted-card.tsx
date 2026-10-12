// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Components/TiltedCard/TiltedCard';
import { MEDIA, palette } from '../shared/demo-support';

// 真实图片视差倾斜和跟随标题，倾角按规范保持克制。

export default function TiltedCardDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 340, position: 'relative', display: 'grid', placeItems: 'center', padding: 24, color: palette.ink }}>
      <Component imageSrc={MEDIA[2]} altText="自然色山形示意卡片" captionText="Agent Wan · 山雾"
containerHeight="300px" containerWidth="300px" imageHeight="280px" imageWidth="280px"
rotateAmplitude={7} scaleOnHover={1.04} showMobileWarning={false} showTooltip
displayOverlayContent overlayContent={<p style={{ background: palette.ivory, color: palette.ink, padding: '8px 12px', borderRadius: 10, margin: 16 }}>自然有序</p>} />
    </div>
  );
}
