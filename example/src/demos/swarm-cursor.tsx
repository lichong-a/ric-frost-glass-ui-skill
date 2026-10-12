// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Animations/SwarmCursor/SwarmCursor';
import { palette } from '../shared/demo-support';

// 展示群体跟随与点击散开，限制粒子数和发光。
// 此演示需要可用的WebGL上下文；上下文创建失败时应显示能力提示，不能声称效果已经运行。

export default function SwarmCursorDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component color={palette.primary} accentColor={palette.sand} count={10} size={8}
speed={1.5} spread={70} wander={0.15} trail={0.45} glow={0.2} opacity={0.7}
scatterOnClick style={{ width: '100%', height: '100%' }}><div style={{ height: 320, display: "grid", placeItems: "center", color: palette.ink }}><p>移动指针聚集粒子，点击使其散开</p></div></Component>
    </div>
  );
}
