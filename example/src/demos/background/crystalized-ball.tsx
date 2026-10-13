// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Animations/CrystalizedBall/CrystalizedBall';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

// 保留真实WebGL玻璃球、边缘电弧和内部粒子，控制粒子量与亮度。
// 此演示需要可用的WebGL上下文；上下文创建失败时应显示能力提示，不能声称效果已经运行。

export default function CrystalizedBallDemo() {
  const { props: demoProps } = useDemoConfig();
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component preset="frost" theme="light" color={palette.primary} size={0.68}
speed={0.4} crackle={0.45} glow={0.45} particleCount={3500} fill={0.3}
interactive hoverStrength={0.4} {...demoProps('t0')} />
    </div>
  );
}
