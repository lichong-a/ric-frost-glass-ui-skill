// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/TextAnimations/ScrollReveal/ScrollReveal';
import { palette } from '../shared/demo-support';
import { useRef } from "react";
// 在预览容器中滚动，观察字词从模糊到清晰。

export default function ScrollRevealDemo() {
  const scrollRef = useRef<HTMLDivElement>(null!);
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <div ref={scrollRef} style={{ height: 340, overflowY: 'auto', padding: 24, color: palette.ink }}><p style={{ paddingBottom: 140, color: palette.muted }}>继续向下滚动，逐词揭示内容</p><Component scrollContainerRef={scrollRef} baseOpacity={0.15} enableBlur baseRotation={2} blurStrength={5} rotationEnd="center center" wordAnimationEnd="center center">Clarity gives every idea room to become something useful.</Component><div style={{ height: 330 }} /></div>
    </div>
  );
}
