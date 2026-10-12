import { useState } from 'react';
import CallChip, { type CallChipStatus } from '../../.upstream/src/ts-default/Micro/CallChip/CallChip';
import { palette, DemoPanel } from '../shared/demo-support';
import '../shared/micro-demos.css';

const states: { value: CallChipStatus; label: string }[] = [{ value: 'idle', label: '等待' }, { value: 'running', label: '运行' }, { value: 'done', label: '成功' }, { value: 'error', label: '失败' }];
export default function CallChipDemo() {
  const [status, setStatus] = useState<CallChipStatus>('running');
  return <DemoPanel title="Call Chip · 工具调用状态"><div className="aw-micro-stack">
    <CallChip icon="search" name="search_skills" argument="霜玻璃组件" status={status} size={40} radius={10} color={palette.ink} surfaceColor={palette.surface} progressColor={palette.primary} doneColor={palette.primary} errorColor={palette.terra} onRetry={() => setStatus('running')} />
    <div className="aw-micro-controls">{states.map(item => <button key={item.value} type="button" aria-pressed={status === item.value} onClick={() => setStatus(item.value)}>{item.label}</button>)}</div>
    <p className="aw-micro-status" role="status" aria-live="polite">仅切换演示状态，未执行真实工具调用。当前：{states.find(item => item.value === status)?.label}</p>
  </div></DemoPanel>;
}
