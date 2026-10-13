// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/TextAnimations/CurvedLoop/CurvedLoop';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

// 真实拖动曲线跑马灯；演示高度覆盖上游100vh默认值，避免撑大预览。

export default function CurvedLoopDemo() {
  const { props: demoProps } = useDemoConfig();
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <><style>{`.curved-loop-jacket { min-height: 300px; }.aw-rb-curved { fill: #52604e; font-size: 5rem; }`}</style><Component marqueeText="AGENT WAN · QUIET CRAFT ·" speed={1.4} curveAmount={160} direction="right" interactive className="aw-rb-curved" {...demoProps('t0')} /></>
    </div>
  );
}
