import { useState } from 'react';
import FuseButton, { type FusePhase } from '../../.upstream/src/ts-default/Micro/FuseButton/FuseButton';
import { palette, DemoPanel } from '../shared/demo-support';
import '../shared/micro-demos.css';

export default function FuseButtonDemo() {
  const [message, setMessage] = useState('尚未提交。');
  const [phase, setPhase] = useState<FusePhase>('idle');
  return <DemoPanel title="Fuse Button · 延迟确认"><div className="aw-micro-stack">
    <FuseButton label="归档演示项" undoLabel="撤销归档" doneLabel="已归档" commitOn="fuseEnd" undoWindow={3500} settle="reset" color={palette.ivory} background={palette.primary} fuseColor={palette.sand} radius={10} onPhaseChange={setPhase} onCommit={() => setMessage('演示项已归档。')} onUndo={() => setMessage('已撤销，本地演示项保留。')} />
    <p className="aw-micro-hint">点击后有 3.5 秒撤销窗口；倒计时结束才提交本地模拟动作。</p>
    <p className="aw-micro-status" role="status" aria-live="polite">阶段：{phase}。{message}</p>
  </div></DemoPanel>;
}
