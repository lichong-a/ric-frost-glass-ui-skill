// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Animations/CursorGrid/CursorGrid';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

// 指针附近格子变亮，点击向外传播脉冲。
// 此演示使用Canvas；确保容器拥有非零宽高。

export default function CursorGridDemo() {
  const { props: demoProps } = useDemoConfig();
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component cellSize={38} color={palette.primary} radius={100} falloff="smooth"
holdTime={220} fadeDuration={600} lineWidth={1} maxOpacity={0.65}
fillOpacity={0.08} gridOpacity={0.06} cellRadius={6} clickPulse pulseSpeed={450} {...demoProps('t0')} />
    </div>
  );
}
