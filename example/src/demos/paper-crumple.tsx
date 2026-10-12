import { useState } from 'react';
import PaperCrumple, { type PaperCrumpleState, type PaperCrumpleRelease } from '../../.upstream/src/ts-default/Micro/PaperCrumple/PaperCrumple';
import { palette, DemoPanel } from '../shared/demo-support';
import { microPaperArtwork } from '../shared/micro-assets';
import '../shared/micro-demos.css';

export default function PaperCrumpleDemo() {
  const [state, setState] = useState<PaperCrumpleState>('flat');
  const [release, setRelease] = useState<PaperCrumpleRelease>('creased');
  const [revision, setRevision] = useState(0);
  const [error, setError] = useState('');
  return <DemoPanel title="Paper Crumple · 纸张揉皱"><div className="aw-micro-stack">
    <PaperCrumple src={microPaperArtwork} alt="自然色示例海报" width={260} height={325} sceneHeight={430} releaseBehavior={release} paperColor={palette.ivory} shadowOpacity={0.16} resetKey={revision} seed={12} onStateChange={setState} onError={reason => setError(reason.message)} />
    <div className="aw-micro-controls"><label>松开后<select value={release} onChange={event => setRelease(event.target.value as PaperCrumpleRelease)}><option value="creased">保留折痕</option><option value="restore">恢复平整</option><option value="stay">保持揉皱</option></select></label><button type="button" onClick={() => { setRevision(value => value + 1); setError(''); }}>重置纸张</button></div>
    <p className="aw-micro-status" role="status" aria-live="polite">{error || `纸张状态：${state}。按住揉皱，拖动调整位置。`}</p>
  </div></DemoPanel>;
}
