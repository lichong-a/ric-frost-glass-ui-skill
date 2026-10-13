// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/TextAnimations/TextPressure/TextPressure';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

// 指针改变真实可变字体的字重与字宽；依赖本地Roboto Flex及其OFL许可。fontUrl必须是CSS URL。

export default function TextPressureDemo() {
  const { props: demoProps } = useDemoConfig();
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 280, position: 'relative', overflow: 'hidden', padding: 28 }}>
      <Component text="AGENT" fontFamily="Roboto Flex" fontUrl={import.meta.env.BASE_URL + 'assets/fonts/demo-fonts.css'}
flex width weight italic={false} alpha={false} scale={false}
textColor={palette.ink} strokeColor={palette.primary} minFontSize={32} {...demoProps('t0')} />
    </div>
  );
}
