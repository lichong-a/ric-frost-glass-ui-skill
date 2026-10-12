// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Components/Carousel/Carousel';
import { LABELS, MEDIA, palette } from '../shared/demo-support';
import { useState } from "react";
// 真实卡片轮播、箭头与页码反馈，样例避免自动播放干扰。

export default function CarouselDemo() {
  const [status, setStatus] = useState("点击箭头或拖动轮播卡片");

  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 400, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <div style={{ width: '100%', height: '100%' }}><div style={{ position: 'relative', height: 330, minHeight: 0, width: '100%' }}><Component items={MEDIA.map((image, index) => ({ image, title: LABELS[index], description: '自有自然色图形 · ' + (index + 1), alt: LABELS[index] }))}
baseWidth={300} aspectRatio={1.35} gap={18} radius={20} frame
effect="tilt" indicator="counter" arrows loop draggable autoplay={false}
theme="light" onChange={index => setStatus('当前素材：' + LABELS[index % LABELS.length])} /></div><p role="status" aria-live="polite" style={{ margin: '12px 20px', fontSize: 14, color: palette.muted }}>{status}</p></div>
    </div>
  );
}
