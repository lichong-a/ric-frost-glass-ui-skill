// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/TextAnimations/GradientText/GradientText';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

// 通过相邻苔绿与墨绿形成连续渐变，不套用高饱和默认色。

export default function GradientTextDemo() {
  const { props: demoProps } = useDemoConfig();
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 300, display: 'grid', placeItems: 'center', color: palette.ink, fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 650, lineHeight: 1.35, padding: 24 }}>
      <Component colors={[palette.ink, palette.primary, palette.muted, palette.primary]}
animationSpeed={10} variant="flow" glow={0.05} pauseOnHover
style={{ fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 650 }} {...demoProps('t0')}>自然色，缓慢流动</Component>
    </div>
  );
}
