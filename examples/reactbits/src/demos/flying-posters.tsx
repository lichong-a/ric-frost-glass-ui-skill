// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Components/FlyingPosters/FlyingPosters';
import { LABELS, MEDIA, palette } from '../shared/demo-support';
import { useState } from "react";
// 真实3D海报弯折与流动保留；限制扭曲与移动速度。
// 此演示需要可用WebGL上下文；不支持时应显示能力提示，不声称效果已运行。

export default function FlyingPostersDemo() {
  const [status, setStatus] = useState("拖动或滚动真实3D海报列，点击海报");

  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 440, position: 'relative', overflow: 'hidden' }}>
      <div style={{ width: '100%', height: '100%' }}><div style={{ height: 380, width: '100%', position: 'relative', overflow: 'hidden' }}><Component items={MEDIA.map((image, index) => ({ image, alt: LABELS[index] }))}
planeWidth={210} planeHeight={165} distortion={1.5} scrollEase={0.035}
cameraFov={45} cameraZ={20} gap={1.3} columns={2} radius={0.06}
speed={0.2} lean={0.15} fade={0.2} shading={0.3} wheel drag
onItemClick={(_item, index) => setStatus('点击海报：' + LABELS[index % LABELS.length])} /></div><p role="status" aria-live="polite" style={{ margin: '12px 20px', fontSize: 14, color: palette.muted }}>{status}</p></div>
    </div>
  );
}
