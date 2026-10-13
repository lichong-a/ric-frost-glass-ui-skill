// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Animations/FadeContent/FadeContent';
import { DemoPanel, palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

// 使用真实Props名ease；上游旧usage中的easing已过时。

export default function FadeContentDemo() {
  const { props: demoProps } = useDemoConfig();
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 300, display: 'grid', placeItems: 'center', color: palette.ink, fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 650, padding: 24 }}>
      <Component blur duration={650} ease="power2.out" initialOpacity={0} threshold={0.1} {...demoProps('t0')}><DemoPanel title="上下文已更新"><p>淡入与解除模糊使用同一内容容器。</p></DemoPanel></Component>
    </div>
  );
}
