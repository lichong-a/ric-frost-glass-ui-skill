// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Components/CircularCarousel/CircularCarousel';
import { LABELS, MEDIA, palette } from '../shared/demo-support';
import { useState } from "react";
// 真实3D圆柱轮播，提供拖动、聚焦和当前项反馈。

export default function CircularCarouselDemo() {
  const [status, setStatus] = useState("拖动环形轮播，点击某张图片聚焦");

  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 400, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <div style={{ width: '100%', height: '100%' }}><div style={{ position: 'relative', height: 330, minHeight: 0, width: '100%' }}><Component items={MEDIA.map((src, index) => ({ src, alt: LABELS[index], title: LABELS[index], subtitle: '自然色素材' }))}
preset="cylinder" intro="rise" cardWidth={160} aspectRatio={1.25} gap={18}
speed={6} autoplay="off" draggable snap pauseOnHover captions
fadeColor={palette.canvas} cornerRadius={20}
onChange={index => setStatus('当前图片：' + LABELS[index % LABELS.length])}
onItemClick={(_item, index) => setStatus('点击图片：' + LABELS[index % LABELS.length])} /></div><p role="status" aria-live="polite" style={{ margin: '12px 20px', fontSize: 14, color: palette.muted }}>{status}</p></div>
    </div>
  );
}
