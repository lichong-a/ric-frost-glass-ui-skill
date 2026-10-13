// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Components/Lanyard/Lanyard';
import { MEDIA, palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

// 真实3D挂绳和卡片物理模拟，可拖动与甩动；使用哑光自然色和本地正反面图片。
// 此演示需要可用WebGL上下文；不支持时应显示能力提示，不声称效果已运行。

export default function LanyardDemo() {
  const { props: demoProps } = useDemoConfig();
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 460, position: 'relative', overflow: 'hidden' }}>
      <Component frontImage={MEDIA[1]} backImage={MEDIA[4]} imageFit="cover"
cardColor={palette.ivory} orientation="portrait" finish="matte" cornerRadius={0.1}
size={0.7} anchor="center" strapLength={0.55} strapColor={palette.primary}
strapWidth={0.8} metal="graphite" damping={0.65} elasticity={0.35}
breeze={0.15} interactive intro {...demoProps('t0')} />
    </div>
  );
}
