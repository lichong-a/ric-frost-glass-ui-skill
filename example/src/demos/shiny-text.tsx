// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/TextAnimations/ShinyText/ShinyText';
import { palette } from '../shared/demo-support';

// 低强度的高光掠过文字；不使用白色强闪。
// 保留CSS渐变高光扫描；标题使用随字号缩放的行高，完整显示汉字。

export default function ShinyTextDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 300, display: 'grid', placeItems: 'center', color: palette.ink, fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 650, lineHeight: 1.35, padding: 24 }}>
      <Component text="细节，让界面安静发光" color={palette.primary} shineColor={palette.sand}
speed={3.5} shineWidth={22} softness={0.85} glow={0.05} trigger="loop" pauseOnHover />
    </div>
  );
}
