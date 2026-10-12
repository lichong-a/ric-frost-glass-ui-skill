// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/TextAnimations/TrueFocus/TrueFocus';
import { palette } from '../shared/demo-support';

// 焦点框与字形清晰度在词组间切换。

export default function TrueFocusDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 300, display: 'grid', placeItems: 'center', color: palette.ink, fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 650, padding: 24 }}>
      <Component sentence="清晰 专注 协作" separator=" " manualMode={false}
blurAmount={3} borderColor={palette.primary} glowColor={palette.sage}
animationDuration={0.65} pauseBetweenAnimations={1.5} />
    </div>
  );
}
