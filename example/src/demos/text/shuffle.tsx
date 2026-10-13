// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/TextAnimations/Shuffle/Shuffle';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

// 首次入场和悬停重排；组件自身尊重减少动态效果偏好。
// 此演示使用Canvas；确保容器拥有非零宽高。

export default function ShuffleDemo() {
  const { props: demoProps } = useDemoConfig();
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 300, display: 'grid', placeItems: 'center', color: palette.ink, fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 650, padding: 24 }}>
      <Component text="AGENT WAN" shuffleDirection="right" duration={0.32}
animationMode="evenodd" shuffleTimes={1} stagger={0.035} threshold={0.1}
triggerOnce triggerOnHover respectReducedMotion colorFrom={palette.sage}
colorTo={palette.ink} style={{ fontSize: 'clamp(40px, 7vw, 76px)' }} {...demoProps('t0')} />
    </div>
  );
}
