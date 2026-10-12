// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/TextAnimations/DepthText/DepthText';
import { palette } from '../shared/demo-support';

// 分层字形与指针视差保留，降低纵深和自动旋转速度。

export default function DepthTextDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 300, display: 'grid', placeItems: 'center', color: palette.ink, fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 650, padding: 24 }}>
      <Component text="DEPTH" layers={18} depth={1.2} faceColor={palette.ivory}
depthColor={palette.primary} tilt={5} pointerTracking smoothing={0.13}
perspective={900} autoOrbit orbitSpeed={0.18} fontSize="clamp(60px, 12vw, 112px)"
fontWeight={800} shadow />
    </div>
  );
}
