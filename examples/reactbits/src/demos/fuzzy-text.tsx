// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/TextAnimations/FuzzyText/FuzzyText';
import { palette } from '../shared/demo-support';

// 在Canvas字形上展示轻微扰动，悬停和点击提高强度。
// 此演示使用Canvas；确保容器拥有非零宽高。

export default function FuzzyTextDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 300, display: 'grid', placeItems: 'center', color: palette.ink, fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 650, padding: 24 }}>
      <Component fontSize="clamp(64px, 12vw, 112px)" color={palette.primary} fontWeight={700}
baseIntensity={0.04} hoverIntensity={0.2} enableHover fuzzRange={24} fps={30}
clickEffect glitchMode={false}>404</Component>
    </div>
  );
}
