// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Components/SpecularButton/SpecularButton';
import { palette } from '../../shared/demo-support';
import { useState } from "react";
import { useDemoConfig } from '../../parameters/DemoConfig';
// 使用真实Specular Button，不以普通按钮替代高光算法。
// 此演示需要可用WebGL上下文；不支持时应显示能力提示，不声称效果已运行。

export default function SpecularButtonDemo() {
  const { props: demoProps } = useDemoConfig();
  const [status, setStatus] = useState("将指针移近按钮，观察玻璃边缘高光");

  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 400, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <div style={{ width: '100%', height: '100%' }}><div style={{ height: 300, display: 'grid', placeItems: 'center' }}><Component type="button" size="lg" radius={12} tint={palette.sage}
tintOpacity={0.22} blur={16} textColor={palette.ink} lineColor={palette.ivory}
baseColor={palette.primary} intensity={0.55} idleIntensity={0.12}
shineSize={9} shineFade={30} thickness={1} glow={0.25} followMouse
proximity={160} onClick={() => setStatus('已点击：创建工作流')} {...demoProps('t0')}>创建工作流</Component></div><p role="status" aria-live="polite" style={{ margin: '12px 20px', fontSize: 14, color: palette.muted }}>{status}</p></div>
    </div>
  );
}
