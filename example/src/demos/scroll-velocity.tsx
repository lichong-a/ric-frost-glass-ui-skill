// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/TextAnimations/ScrollVelocity/ScrollVelocity';
import { palette } from '../shared/demo-support';
import { useRef } from "react";
// 将速度驱动绑定到实际预览滚动容器。

export default function ScrollVelocityDemo() {
  const scrollRef = useRef<HTMLDivElement>(null!);
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <div ref={scrollRef} style={{ height: 340, overflowY: 'auto', color: palette.ink }}><p style={{ padding: 24 }}>在此区域滚动，速度会影响文字移动</p><div style={{ height: 140 }} /><Component scrollContainerRef={scrollRef} texts={['AGENT WAN ·', 'QUIET FLOW ·']} velocity={35} numCopies={5} damping={55} stiffness={320} scrollerStyle={{ color: palette.primary, fontSize: 40, fontWeight: 650 }} /><div style={{ height: 420 }} /></div>
    </div>
  );
}
