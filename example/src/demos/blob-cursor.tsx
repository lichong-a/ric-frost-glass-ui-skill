// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Animations/BlobCursor/BlobCursor';
import { palette } from '../shared/demo-support';

// 真实胶状体跟随指针并在点击时分裂；原生指针保持可见。
// 此演示需要可用的WebGL上下文；上下文创建失败时应显示能力提示，不能声称效果已经运行。

export default function BlobCursorDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component material="jelly" color={palette.primary} size={95} morph={0.45}
morphSpeed={0.4} trail={0.4} lag={0.35} goo={0.6} stretch={0.6}
wobble={0.3} drip={0.25} splash splashCount={6} shine={0.4}
shadow hideCursor={false} />
    </div>
  );
}
