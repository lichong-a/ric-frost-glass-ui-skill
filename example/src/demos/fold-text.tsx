// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/TextAnimations/FoldText/FoldText';
import { palette } from '../shared/demo-support';

// 从顶部折线展开文字，作为标题入场样例。

export default function FoldTextDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 300, display: 'grid', placeItems: 'center', color: palette.ink, fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 650, padding: 24 }}>
      <Component text="Build with clarity" splitBy="char" hinge="top" trigger="mount"
duration={0.55} stagger={0.035} perspective={800} creaseShading={0.3}
fontSize="clamp(36px, 6vw, 64px)" fontWeight={650} color={palette.ink} />
    </div>
  );
}
