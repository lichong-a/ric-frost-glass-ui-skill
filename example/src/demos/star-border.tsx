// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Animations/StarBorder/StarBorder';
import { palette } from '../shared/demo-support';
import { useState } from "react";
// 星光沿真实按钮轮廓移动，点击有脉冲并更新计数。
// 此演示使用Canvas；确保容器拥有非零宽高。

export default function StarBorderDemo() {
  const [count, setCount] = useState(0);
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 300, display: 'grid', placeItems: 'center', color: palette.ink, fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 650, padding: 24 }}>
      <Component color={palette.primary} trailColor={palette.sand} duration={6}
stars={1} trailLength={0.22} thickness={1} radius={12} glow={0.25}
hover="lap" sparkle={false} clickPulse theme="light" backgroundColor={palette.ivory}
textColor={palette.ink} borderColor={palette.sage}
onClick={() => setCount(value => value + 1)}>开始协作 · {count}</Component>
    </div>
  );
}
