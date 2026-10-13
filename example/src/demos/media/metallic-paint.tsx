// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Animations/MetallicPaint/MetallicPaint';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

// 使用组件的真实文字金属材质分支，不依赖外部logo图片。
// 此演示需要可用的WebGL上下文；上下文创建失败时应显示能力提示，不能声称效果已经运行。

export default function MetallicPaintDemo() {
  const { props: demoProps } = useDemoConfig();
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component text="WAN" color={palette.primary} backgroundColor={palette.ivory}
softness={0.65} dispersion={0.05} distortion={0.3} edgeBend={0.6}
speed={0.4} mouseTilt={0.2} lightMode dpr={1.5} {...demoProps('t0')} />
    </div>
  );
}
