// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Animations/LaserFlow/LaserFlow';
import { palette } from '../shared/demo-support';
import { useRef } from "react";
// 光束与真实DOM表面关联；不是在任意空背景上播放占位效果。
// 此演示需要可用的WebGL上下文；上下文创建失败时应显示能力提示，不能声称效果已经运行。

export default function LaserFlowDemo() {
  const surfaceRef = useRef<HTMLDivElement>(null!);
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <div style={{ position: 'relative', width: '100%', height: 360, overflow: 'hidden' }}><Component surfaceRef={surfaceRef} color={palette.primary} theme="light" intensity={0.7} beamPosition={0.52} flare={0.55} spread={0.8} spill={0.6} fog={0.1} dust={0.25} speed={0.45} mouseInteraction dpr={1.5} /><div ref={surfaceRef} style={{ position: 'absolute', left: '18%', right: '18%', top: '52%', minHeight: 140, borderRadius: 20, background: palette.ivory, border: `1px solid ${palette.sage}`, padding: 24, color: palette.ink }}><h3 style={{ margin: '0 0 12px' }}>光沿表面流动</h3><p>实际表面ref决定光束接触与溢出的位置。</p></div></div>
    </div>
  );
}
