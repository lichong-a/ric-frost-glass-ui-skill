// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/TextAnimations/RotatingText/RotatingText';
import { palette } from '../shared/demo-support';

// 轮换关键词；固定的外部容器可避免页面其他内容跳动。

export default function RotatingTextDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 300, display: 'grid', placeItems: 'center', color: palette.ink, fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 650, padding: 24 }}>
      <Component texts={['清晰', '有序', '协作']} staggerFrom="last"
initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '-120%' }}
staggerDuration={0.03} transition={{ type: 'spring', damping: 30, stiffness: 320 }}
rotationInterval={2600} style={{ background: palette.sage, color: palette.ink,
padding: '12px 22px', borderRadius: 12, overflow: 'hidden' }} />
    </div>
  );
}
