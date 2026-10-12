// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Animations/Cubes/Cubes';
import { palette } from '../shared/demo-support';

// 指针让立方体旋转，点击沿真实3D网格传播涟漪。
// 此演示需要可用的WebGL上下文；上下文创建失败时应显示能力提示，不能声称效果已经运行。

export default function CubesDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component gridSize={8} gap={6} faceColor={palette.ivory} edgeColor={palette.primary}
edgeWidth={1} faceOpacity={0.75} shading={0.4} maxAngle={26} radius={2.5}
speed={0.6} bounce={0.35} autoAnimate={false} rippleOnClick
rippleColor={palette.sage} dpr={1.5} />
    </div>
  );
}
