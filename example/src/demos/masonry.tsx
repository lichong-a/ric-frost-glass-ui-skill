// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Components/Masonry/Masonry';
import { LABELS, MEDIA, palette } from '../shared/demo-support';
import { useState } from "react";
// 真实不等高瀑布流和重排；本示例捕获卡片点击显示选择，避免上游默认window.open打开新页。

export default function MasonryDemo() {
  const [selected, setSelected] = useState('点击素材卡片');
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 620, position: 'relative', overflowY: 'auto' }}>
      <div style={{ padding: 18 }} onClickCapture={event => { const item = (event.target as Element).closest('[data-key]'); if (item) { event.preventDefault(); event.stopPropagation(); setSelected('已选择：' + LABELS[Number(item.getAttribute('data-key')) % LABELS.length]); } }}><p role="status" style={{ color: palette.muted }}>{selected}</p><Component items={MEDIA.map((img, index) => ({ id: String(index), img, url: img, height: [300, 220, 360, 280, 340, 250][index] }))} ease="power3.out" duration={0.55} stagger={0.05} animateFrom="bottom" scaleOnHover hoverScale={0.97} blurToFocus colorShiftOnHover={false} /></div>
    </div>
  );
}
