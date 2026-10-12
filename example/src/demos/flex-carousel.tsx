// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Components/FlexCarousel/FlexCarousel';
import { LABELS, MEDIA, palette } from '../shared/demo-support';
import { useState } from "react";
// 保留真实图片弯曲与折射；不抢占页面滚轮。
// 此演示需要可用WebGL上下文；不支持时应显示能力提示，不声称效果已运行。

export default function FlexCarouselDemo() {
  const [status, setStatus] = useState("拖动图片，观察边缘液态玻璃折弯");

  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 400, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <div style={{ width: '100%', height: '100%' }}><div style={{ position: 'relative', height: 330, minHeight: 0, width: '100%' }}><Component items={MEDIA.map((src, index) => ({ src, alt: LABELS[index], title: LABELS[index] }))}
preset="liquid" intro="rise" cardHeight={0.62} gap={16} radius={18}
squeeze={0.12} dispersion={0.03} liquid={0.3} focusOnClick captions
autoplay={false} captureWheel={false}
onChange={index => setStatus('当前图片：' + LABELS[index % LABELS.length])}
onSelect={index => setStatus('已选择：' + LABELS[index % LABELS.length])} /></div><p role="status" aria-live="polite" style={{ margin: '12px 20px', fontSize: 14, color: palette.muted }}>{status}</p></div>
    </div>
  );
}
