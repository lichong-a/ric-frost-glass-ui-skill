// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Components/PixelCard/PixelCard';
import { palette } from '../shared/demo-support';

// 像素由实际Canvas网格生成，不是静态图案。
// 此演示使用Canvas，容器必须具有非零宽高。

export default function PixelCardDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 340, position: 'relative', display: 'grid', placeItems: 'center', padding: 24, color: palette.ink }}>
      <Component colors={[palette.primary, palette.sage, palette.sand]} glowColor={palette.primary}
shape="square" origin="pointer" gap={7} pixelSize={2} speed={22}
revealDuration={500} spotlight={0.35} glow={0.2} opacity={0.35}
fade={0.7} trigger="hover" radius={20} clickPulse intro theme="light"
style={{ width: 300, height: 280, padding: 24, color: palette.ink }}><div><h3>微光像素</h3><p>将指针移入卡片，观察像素逐个亮起。</p></div></Component>
    </div>
  );
}
