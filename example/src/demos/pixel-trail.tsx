// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Animations/PixelTrail/PixelTrail';
import { palette } from '../shared/demo-support';

// 移动产生真实像素流体拖尾，尺寸衰减清晰可见。
// 此演示需要可用的WebGL上下文；上下文创建失败时应显示能力提示，不能声称效果已经运行。

export default function PixelTrailDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component gridSize={40} trailSize={0.12} maxAge={650} interpolate={5}
color={palette.primary} trailColor={palette.sage} shape="square" gap={2}
decay="shrink" flow={0.4} gravity={0.3} sparkle={0.05} glow={0.1}
shine={0.2} clickBurst dpr={1.5} />
    </div>
  );
}
