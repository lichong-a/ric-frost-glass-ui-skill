// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Components/HoloCard/HoloCard';
import { MEDIA, palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

// 移动指针观察真实全息材质，点击翻到背面。降低箔膜强度与高光，保留自然色素材。
// 此演示需要可用WebGL上下文；不支持时应显示能力提示，不声称效果已运行。

export default function HoloCardDemo() {
  const { props: demoProps } = useDemoConfig();
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 340, position: 'relative', display: 'grid', placeItems: 'center', padding: 24, color: palette.ink }}>
      <Component image={MEDIA[0]} backImage={MEDIA[3]} alt="Agent Wan自然色收藏卡"
preset="gold" intensity={0.3} edgeSparkle={0.2} frame={2} glare={0.2}
foilColor={palette.sand} width={250} radius={20} tiltMax={8} hoverScale={1.025}
idle={false} shadow {...demoProps('t0')} />
    </div>
  );
}
