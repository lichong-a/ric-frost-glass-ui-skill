// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Animations/GhostCursor/GhostCursor';
import { palette } from '../shared/demo-support';

// 真实WebGL拖影；独立预览文档隔离覆盖层与全局指针监听。
// 此演示需要可用的WebGL上下文；上下文创建失败时应显示能力提示，不能声称效果已经运行。

export default function GhostCursorDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component color={palette.primary} brightness={0.65} edgeIntensity={0.1}
trailLength={35} inertia={0.4} grainIntensity={0.025} bloomStrength={0.08}
bloomRadius={0.6} bloomThreshold={0.08} fadeDelayMs={400} fadeDurationMs={800}
mixBlendMode="normal" maxDevicePixelRatio={1.5} zIndex={2} />
    </div>
  );
}
