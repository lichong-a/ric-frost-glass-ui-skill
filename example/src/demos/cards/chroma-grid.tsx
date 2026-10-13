// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Components/ChromaGrid/ChromaGrid';
import { LABELS, MEDIA, palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

// 光斑局部恢复图片颜色与边缘高光，六张真实图片构成网格。

export default function ChromaGridDemo() {
  const { props: demoProps } = useDemoConfig();
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 500, position: 'relative', overflow: 'auto', padding: 20 }}>
      <Component items={MEDIA.map((image, index) => ({ image, alt: LABELS[index], title: LABELS[index], subtitle: '自然色图形', accent: [palette.primary, palette.sage, palette.sand][index % 3] }))}
columns={3} minCardWidth={150} gap={14} radius={180} softness={0.7}
damping={0.3} fadeOut={0.45} grayscale={0.75} dim={0.1} glow={0.2}
borderGlow={0.2} reveal="spotlight" aspectRatio="4 / 3" cardRadius={20}
showInfo frame theme="light" {...demoProps('t0')} />
    </div>
  );
}
