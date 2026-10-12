import { useState } from 'react';
import LatticeLoader, { type LatticeStatus, type LatticePatternName } from '../../.upstream/src/ts-default/Micro/LatticeLoader/LatticeLoader';
import { palette, DemoPanel } from '../shared/demo-support';
import '../shared/micro-demos.css';

const states: { value: LatticeStatus; label: string }[] = [{ value: 'working', label: '加载中' }, { value: 'done', label: '完成' }, { value: 'error', label: '失败' }];
export default function LatticeLoaderDemo() {
  const [status, setStatus] = useState<LatticeStatus>('working');
  const [pattern, setPattern] = useState<LatticePatternName>('sweep');
  return <DemoPanel title="Lattice Loader · 点阵加载"><div className="aw-micro-stack">
    <LatticeLoader label="正在整理示例资料" doneLabel="整理完成" errorLabel="加载失败" status={status} pattern={pattern} grid={4} color={palette.primary} doneColor={palette.primary} errorColor={palette.terra} cellSize={7} gap={3} glow={false} />
    <div className="aw-micro-controls">{states.map(item => <button key={item.value} type="button" aria-pressed={status === item.value} onClick={() => setStatus(item.value)}>{item.label}</button>)}<label>点阵形态<select value={pattern} onChange={event => setPattern(event.target.value as LatticePatternName)}><option value="sweep">扫过</option><option value="orbit">环绕</option><option value="snake">蛇形</option><option value="pulse">脉冲</option></select></label></div>
    <p className="aw-micro-status" role="status" aria-live="polite">模拟任务状态：{states.find(item => item.value === status)?.label}</p>
  </div></DemoPanel>;
}
