import { useState } from 'react';
import RefineFrame, { type RefineFrameStatus } from '../../.upstream/src/ts-default/Micro/RefineFrame/RefineFrame';
import { palette, DemoPanel } from '../shared/demo-support';
import { microPaperArtwork } from '../shared/micro-assets';
import '../shared/micro-demos.css';

const labels: Record<RefineFrameStatus, string> = { queued: '等待中', generating: '正在生成', refining: '正在精修', complete: '完成', error: '生成失败' };
const states: RefineFrameStatus[] = ['queued', 'generating', 'refining', 'complete', 'error'];
export default function RefineFrameDemo() {
  const [status, setStatus] = useState<RefineFrameStatus>('generating');
  return <DemoPanel title="Refine Frame · 渐进生成框"><div className="aw-micro-stack">
    <RefineFrame status={status} aspectRatio="4/3" width={380} radius={20} background={palette.surface} color={palette.ink} labels={labels} retryLabel="重试示例" onRetry={() => setStatus('generating')}><img src={microPaperArtwork} alt="本地自然色示例图" className="aw-micro-image" /></RefineFrame>
    <div className="aw-micro-controls">{states.map(value => <button key={value} type="button" aria-pressed={status === value} onClick={() => setStatus(value)}>{labels[value]}</button>)}</div>
    <p className="aw-micro-status" role="status" aria-live="polite">当前仅模拟生成阶段：{labels[status]}</p>
  </div></DemoPanel>;
}
