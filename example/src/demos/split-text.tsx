// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/TextAnimations/SplitText/SplitText';
import { palette } from '../shared/demo-support';

// GSAP逐字入场；字体大小由演示容器继承。

export default function SplitTextDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 300, display: 'grid', placeItems: 'center', color: palette.ink, fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 650, lineHeight: 1.35, padding: 24 }}>
      <Component text="自然有序，清晰可见" delay={55} duration={0.5} ease="power3.out"
splitType="chars" from={{ opacity: 0, y: 24 }} to={{ opacity: 1, y: 0 }}
threshold={0.1} rootMargin="0px" textAlign="center" tag="p" />
    </div>
  );
}
