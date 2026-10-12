// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Animations/Ribbons/Ribbons';
import { palette } from '../shared/demo-support';

// 真实弹性条带跟随指针，限定自然色和透明背景。
// 此演示需要可用的WebGL上下文；上下文创建失败时应显示能力提示，不能声称效果已经运行。

export default function RibbonsDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component colors={[palette.primary, palette.sage, palette.sand]} thickness={18}
length={1.1} spread={12} stiffness={0.35} bounce={0.4} shape="lens"
wave={0.3} softness={0.65} fade opacity={0.7} backgroundColor="transparent" dpr={1.5} />
    </div>
  );
}
