// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Animations/GradualBlur/GradualBlur';
import { MEDIA, palette } from '../shared/demo-support';

// 下边缘分层模糊叠在真实滚动内容上，主体文字区保持清晰。

export default function GradualBlurDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <section style={{ position: 'relative', height: 360, overflow: 'hidden', borderRadius: 20 }}><div style={{ height: '100%', overflowY: 'auto', padding: 24 }}><img src={MEDIA[3]} alt="用于观察渐进模糊的示意图" style={{ width: '100%', height: 240, objectFit: 'cover', borderRadius: 12 }} />{Array.from({ length: 5 }, (_, index) => <p key={index} style={{ color: palette.ink, lineHeight: 1.8 }}>第 {index + 1} 段：内容逐渐经过底部模糊边界，保留滚动时的层次和可读区。</p>)}</div><Component target="parent" position="bottom" height="6rem" strength={1.5} divCount={5} curve="bezier" exponential opacity={1} zIndex={2} /></section>
    </div>
  );
}
