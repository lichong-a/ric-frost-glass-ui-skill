// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Animations/ElectricLogo/ElectricLogo';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

// 自有透明AW标记产生真实轮廓电弧，避免整张矩形图片变成发光边框。
// 此演示需要可用的WebGL上下文；上下文创建失败时应显示能力提示，不能声称效果已经运行。

export default function ElectricLogoDemo() {
  const { props: demoProps } = useDemoConfig();
  const mark = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 180"><path fill="#52604e" d="M20 150 80 30h24l60 120h-29l-12-27H61l-12 27Zm53-51h38L92 58Z"/><path fill="#52604e" d="m141 30 23 79 23-79h25l-36 120h-24L116 30Z"/></svg>');
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component src={mark} color={palette.primary} glowColor={palette.sage}
scale={0.65} strands={3} bend={0.4} crackle={0.8} arcs={0.5}
speed={0.8} glow={0.35} intensity={0.7} interactive theme="light" {...demoProps('t0')} />
    </div>
  );
}
