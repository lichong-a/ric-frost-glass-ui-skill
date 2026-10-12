import { useState } from 'react';
import StatusMark, { type StatusMarkStatus } from '../../.upstream/src/ts-default/Micro/StatusMark/StatusMark';
import { palette, DemoPanel } from '../shared/demo-support';
import '../shared/micro-demos.css';

const labels: Record<StatusMarkStatus, string> = { pending: '等待中', running: '执行中', done: '已完成', failed: '失败', cancelled: '已取消' };
const states: StatusMarkStatus[] = ['pending', 'running', 'done', 'failed', 'cancelled'];
export default function StatusMarkDemo() {
  const [status, setStatus] = useState<StatusMarkStatus>('running');
  const [progress, setProgress] = useState(0.45);
  const [determinate, setDeterminate] = useState(false);
  return <DemoPanel title="Status Mark · 状态图标"><div className="aw-micro-stack">
    <StatusMark status={status} progress={determinate ? progress : undefined} label={labels[status]} color={palette.primary} doneColor={palette.primary} errorColor={palette.terra} size={24} fontSize={14} />
    <div className="aw-micro-controls">{states.map(value => <button key={value} type="button" aria-pressed={status === value} onClick={() => setStatus(value)}>{labels[value]}</button>)}</div>
    <label className="aw-micro-field">模拟进度 {Math.round(progress * 100)}%<input type="range" min="0" max="100" value={Math.round(progress * 100)} onChange={event => { setDeterminate(true); setProgress(Number(event.target.value) / 100); setStatus('running'); }} /></label>
    <div className="aw-micro-controls"><button type="button" aria-pressed={!determinate} onClick={() => { setDeterminate(value => !value); setStatus('running'); }}>{determinate ? '切换不定进度' : '切换明确进度'}</button></div>
    <p className="aw-micro-status" role="status" aria-live="polite">本地任务状态：{labels[status]}</p>
  </div></DemoPanel>;
}
