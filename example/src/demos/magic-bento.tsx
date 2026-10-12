// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Components/MagicBento/MagicBento';
import { palette } from '../shared/demo-support';

// 上游没有items数据Props；本地集成转换更新固定示例文案与颜色，保留六个真实交互网格卡片。
// 局部粒子、高光、边缘发光与倾斜效果保留；不把固定示例数据当成业务结果。

export default function MagicBentoDemo() {
  const glow = [1, 3, 5].map(offset => parseInt(palette.primary.slice(offset, offset + 2), 16)).join(', ');
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 580, position: 'relative', overflow: 'auto', padding: 20 }}>
      <><style>{`.aw-demo-stage .magic-bento-card { color: var(--aw-color-text-primary); background-color: var(--aw-surface-panel) !important; border-color: var(--aw-color-border-divider) !important; }.aw-demo-stage .magic-bento-card__header,.aw-demo-stage .magic-bento-card__content,.aw-demo-stage .magic-bento-card__title { color: var(--aw-color-text-primary); }.aw-demo-stage .magic-bento-card__description,.aw-demo-stage .magic-bento-card__label { color: var(--aw-color-text-secondary); }`}</style><Component textAutoHide={false} enableStars enableSpotlight enableBorderGlow enableTilt enableMagnetism clickEffect spotlightRadius={220} particleCount={6} glowColor={glow} /></>
    </div>
  );
}
