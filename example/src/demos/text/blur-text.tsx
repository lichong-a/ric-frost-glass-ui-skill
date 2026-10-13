// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/TextAnimations/BlurText/BlurText';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

// 先模糊再清晰地逐字进入，不改变业务阅读面。

export default function BlurTextDemo() {
  const { props: demoProps } = useDemoConfig();
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 300, display: 'grid', placeItems: 'center', color: palette.ink, fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 650, padding: 24 }}>
      <Component text="让智能体协作更清晰" delay={70} animateBy="letters" direction="top"
threshold={0.1} rootMargin="0px" stepDuration={0.22} {...demoProps('t0')} />
    </div>
  );
}
