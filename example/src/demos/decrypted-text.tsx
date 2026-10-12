// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/TextAnimations/DecryptedText/DecryptedText';
import { palette } from '../shared/demo-support';

// 点击切换加密和已解析文字状态。

export default function DecryptedTextDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 300, display: 'grid', placeItems: 'center', color: palette.ink, fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 650, padding: 24 }}>
      <Component text="AGENT WAN · READY" animateOn="click" clickMode="toggle"
speed={65} maxIterations={14} sequential revealDirection="start"
characters="ABCDE0123456789" style={{ color: palette.ink }} />
    </div>
  );
}
