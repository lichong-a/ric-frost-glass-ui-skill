// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/TextAnimations/TextCursor/TextCursor';
import { palette } from '../shared/demo-support';

// 移动指针留下短暂字形路径，原生指针仍保留。

export default function TextCursorDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component text="✦" mode="stamp" fontSize={26} spacing={70} maxPoints={8}
color={palette.primary} shrink={0.45} fade={0.65} smoothing={0.3}
exitDuration={0.45} removalInterval={40} followMouseDirection
keepUpright randomFloat={false} popIn hideCursor={false} />
    </div>
  );
}
