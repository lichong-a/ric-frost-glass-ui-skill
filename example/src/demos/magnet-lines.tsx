// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Animations/MagnetLines/MagnetLines';
import { palette } from '../shared/demo-support';

// 线段朝向由指针距离计算，保持低密度细线。

export default function MagnetLinesDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component rows={8} columns={12} containerSize="100%" lineColor={palette.primary}
lineWidth="2px" lineHeight="20px" baseAngle={0}
style={{ width: '100%', height: 320, margin: '0 auto' }} />
    </div>
  );
}
