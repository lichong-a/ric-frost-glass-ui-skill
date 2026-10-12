// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Components/InfiniteSpiral/InfiniteSpiral';
import { LABELS, MEDIA } from '../shared/demo-support';

// 图片在真实3D螺旋上循环，可拖动或滚动改变进度。

export default function InfiniteSpiralDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 440, position: 'relative', overflow: 'hidden' }}>
      <Component items={MEDIA.map((src, index) => ({ src, alt: LABELS[index], label: LABELS[index] }))}
animationMode="all" speed={0.3} radius={140} cardWidth={100} cardHeight={84}
verticalSpacing={60} perspective={1000} cardsPerTurn={7} cardRadius={12}
centerScale={1.05} edgeFade={0.25} edgeBlur={2} pauseOnHover grayscale={0.1} />
    </div>
  );
}
