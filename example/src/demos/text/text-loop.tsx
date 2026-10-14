// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/TextAnimations/TextLoop/TextLoop';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

// 沿SVG曲线路径连续流动，悬停暂停；作为独立展示，业务正文保持静态。

export default function TextLoopDemo() {
  const { props: demoProps } = useDemoConfig();
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component text="AGENT RIC · FLOW" shape="wave" speed={45} direction="forward"
separator="·" curviness={65} fontSize={44} fontWeight={650} letterSpacing={1}
color={palette.ink} ribbon ribbonColor={palette.sage} ribbonWidth={72} pauseOnHover {...demoProps('t0')} />
    </div>
  );
}
