// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Components/Stack/Stack';
import { LABELS, MEDIA, palette } from '../shared/demo-support';
import { useState } from "react";
// 真实堆叠卡片与手势回弹，图片均为自有素材。

export default function StackDemo() {
  const [status, setStatus] = useState("拖动、甩动或点击最上面的卡片");

  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 400, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <div style={{ width: '100%', height: '100%' }}><div style={{ width: 260, height: 260, position: 'relative', margin: '36px auto 0' }}><Component cards={MEDIA.map((src, index) => <img key={src} src={src} alt={LABELS[index]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />)}
layout="fan" visible={4} spread={22} depth={14} radius={20} frame={4}
frameColor={palette.ivory} shadow tilt={5} threshold={65} speed={0.45}
sendToBackOnClick autoplay={false} onChange={index => setStatus('当前卡片：' + LABELS[index % LABELS.length])} /></div><p role="status" aria-live="polite" style={{ margin: '12px 20px', fontSize: 14, color: palette.muted }}>{status}</p></div>
    </div>
  );
}
