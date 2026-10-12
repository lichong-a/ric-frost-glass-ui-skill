// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Components/DriftWall/DriftWall';
import { LABELS, MEDIA, palette } from '../shared/demo-support';

// 真实透视素材墙缓慢流动，悬停暂停并抬起图片。

export default function DriftWallDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 400, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component items={MEDIA.map((image, index) => ({ image, title: LABELS[index] }))}
columns={4} tileWidth={150} tileHeight={108} gap={14} radius={16}
tilt={12} turn={-8} perspective={1200} depth={70} speed={20}
direction="up" variance={0.2} parallax={0.3} lift={30} fade={0.35}
dim={0.2} overlayColor={palette.canvas} pauseOnHover />
    </div>
  );
}
