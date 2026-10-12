// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Animations/MetaBalls/MetaBalls';
import { palette } from '../shared/demo-support';

// 真实等值面融合、拉伸与指针球相互作用。
// 此演示需要可用的WebGL上下文；上下文创建失败时应显示能力提示，不能声称效果已经运行。

export default function MetaBallsDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component color={palette.primary} cursorBallColor={palette.sand} variant="solid"
motion="orbit" ballCount={9} animationSize={25} gooeyness={0.5} stretch={0.4}
wobble={0.3} speed={0.5} enableTransparency enableMouseInteraction clickBurst dpr={1.5} />
    </div>
  );
}
