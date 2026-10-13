import { useState } from 'react';
import LatticeLoader, { type LatticeStatus, type LatticePatternName } from '../../../.upstream/src/ts-default/Micro/LatticeLoader/LatticeLoader';
import { palette, DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
import { useDemoConfig, useDemoState } from '../../parameters/DemoConfig';
const cn=(names:string)=>componentClasses(styles,names);

const states: { value: LatticeStatus; label: string }[] = [{ value: 'working', label: '加载中' }, { value: 'done', label: '完成' }, { value: 'error', label: '失败' }];
export default function LatticeLoaderDemo() {
  const { props: demoProps } = useDemoConfig();
  const [status, setStatus] = useState<LatticeStatus>('working');
  const [pattern, setPattern] = useDemoState<LatticePatternName>('state.pattern', 'sweep');
  return <DemoPanel title="Lattice Loader · 点阵加载"><div className={cn("aw-micro-stack")}>
    <LatticeLoader label="正在整理示例资料" doneLabel="整理完成" errorLabel="加载失败" status={status} pattern={pattern} grid={4} color={palette.primary} doneColor={palette.primary} errorColor={palette.terra} cellSize={7} gap={3} glow={false} {...demoProps('t0')} />
    <div className={cn("aw-micro-controls")}>{states.map(item => <button className={styles['aw-micro-action']} key={item.value} type="button" aria-pressed={status === item.value} onClick={() => setStatus(item.value)} {...demoProps('t1')}>{item.label}</button>)}<label className={styles['aw-micro-label']}>点阵形态<select className={styles['aw-micro-select']} value={pattern} onChange={event => setPattern(event.target.value as LatticePatternName)}><option value="sweep" {...demoProps('t3')}>扫过</option><option value="orbit" {...demoProps('t4')}>环绕</option><option value="snake" {...demoProps('t5')}>蛇形</option><option value="pulse" {...demoProps('t6')}>脉冲</option></select></label></div>
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">模拟任务状态：{states.find(item => item.value === status)?.label}</p>
  </div></DemoPanel>;
}
