// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/TextAnimations/ScrambledText/ScrambledText';
import { palette } from '../shared/demo-support';

// 指针附近的字词短暂变为符号，并恢复原文。

export default function ScrambledTextDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 300, display: 'grid', placeItems: 'center', color: palette.ink, fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 650, padding: 24 }}>
      <Component radius={100} duration={0.8} speed={0.35} scrambleChars=".:·"
style={{ fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.6, color: palette.ink, maxWidth: 600 }}>Move through the words. A quiet signal becomes clear.</Component>
    </div>
  );
}
