// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Components/InfiniteMenu/InfiniteMenu';
import { LABELS, MEDIA, palette } from '../../shared/demo-support';
import { useState } from "react";
import { useDemoConfig } from '../../parameters/DemoConfig';
// 保留真实可旋转球面图片网格，减少贴片数量以控制预览负担。
// 此演示需要可用WebGL上下文；不支持时应显示能力提示，不声称效果已运行。

export default function InfiniteMenuDemo() {
  const { props: demoProps } = useDemoConfig();
  const [status, setStatus] = useState("拖动球面网格，选择正前方素材");

  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 440, position: 'relative', overflow: 'hidden' }}>
      <div style={{ width: '100%', height: '100%' }}><div style={{ height: 380, position: 'relative', overflow: 'hidden' }}><Component items={MEDIA.map((image, index) => ({ image, title: LABELS[index], description: '自然色图形 ' + (index + 1) }))}
count={60} tileSize={0.55} roundness={0.22} zoom={1.6} pullBack={0.8}
stretch={0.35} inertia={0.5} autoplay={0.8} grayscale={false} dim={0.2}
showInfo theme="light" accentColor={palette.primary} backgroundColor={palette.canvas}
onActiveChange={(_item, index) => setStatus('当前素材：' + LABELS[index % LABELS.length])}
onItemClick={(_item, index) => setStatus('选择素材：' + LABELS[index % LABELS.length])} {...demoProps('t0')} /></div><p role="status" aria-live="polite" style={{ margin: '12px 20px', fontSize: 14, color: palette.muted }}>{status}</p></div>
    </div>
  );
}
