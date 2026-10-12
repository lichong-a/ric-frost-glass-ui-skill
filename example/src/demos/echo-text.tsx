// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/TextAnimations/EchoText/EchoText';
import { palette } from '../shared/demo-support';

// 保留文字回声拖影，使用苔绿相邻色。

export default function EchoTextDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 300, display: 'grid', placeItems: 'center', color: palette.ink, fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 650, padding: 24 }}>
      <Component text="Quiet Motion" echoes={6} lag={0.18} offset={20} direction="right"
fade={0.68} blur={2} tint={palette.sage} mode="both" cursorRadius={240}
duration={700} fontSize="clamp(36px, 6vw, 66px)" fontWeight={650} color={palette.ink} />
    </div>
  );
}
