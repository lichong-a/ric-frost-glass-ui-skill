// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/TextAnimations/ScrollFloat/ScrollFloat';
import { palette } from '../shared/demo-support';
import { useRef } from "react";
// 有独立可滚动容器与足够行程，避免只呈现已结束的滚动效果。

export default function ScrollFloatDemo() {
  const scrollRef = useRef<HTMLDivElement>(null!);
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <div ref={scrollRef} style={{ height: 340, overflowY: 'auto', padding: 24, color: palette.ink }}><p style={{ paddingBottom: 140, color: palette.muted }}>在此区域向下滚动</p><Component scrollContainerRef={scrollRef} animationDuration={0.7} ease="power2.out" scrollStart="top bottom-=12%" scrollEnd="center center" stagger={0.035}>QUIET FLOW</Component><div style={{ height: 300 }} /></div>
    </div>
  );
}
