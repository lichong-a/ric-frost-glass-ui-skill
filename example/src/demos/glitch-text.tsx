// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/TextAnimations/GlitchText/GlitchText';
import { palette } from '../shared/demo-support';

// 悬停展示同色字形错位；关闭上游红蓝阴影，避免高饱和闪烁。

export default function GlitchTextDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 300, display: 'grid', placeItems: 'center', color: palette.ink, fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 650, padding: 24 }}>
      <><style>{`.aw-rb-glitch.glitch,.aw-rb-glitch.glitch::before,.aw-rb-glitch.glitch::after { color: #52604e; }.aw-rb-glitch.glitch::before,.aw-rb-glitch.glitch::after { background-color: #faf7f0; }`}</style><Component speed={0.7} enableShadows={false} enableOnHover className="aw-rb-glitch">AGENT WAN</Component></>
    </div>
  );
}
