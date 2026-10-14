// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/TextAnimations/ParticleText/ParticleText';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

// 点击粒子文字触发分散与聚合，移动指针产生局部排斥。
// 此演示使用Canvas；确保容器拥有非零宽高。

export default function ParticleTextDemo() {
  const { props: demoProps } = useDemoConfig();
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component text="AGENT RIC" color={palette.primary} highlightColor={palette.ink}
particleSize={2} density={5} scatter={100} gatherDuration={1100} stagger={180}
pointerRepel={28} repelRadius={95} idleDrift={0.25} trigger="click"
fontSize="clamp(44px, 8vw, 86px)" fontWeight={700} glow={false} {...demoProps('t0')} />
    </div>
  );
}
