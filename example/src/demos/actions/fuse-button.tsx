import { useState } from 'react';
import FuseButton, { type FusePhase } from '../../../.upstream/src/ts-default/Micro/FuseButton/FuseButton';
import { palette, DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
import { useDemoConfig } from '../../parameters/DemoConfig';
const cn=(names:string)=>componentClasses(styles,names);

export default function FuseButtonDemo() {
  const { props: demoProps } = useDemoConfig();
  const [message, setMessage] = useState('尚未提交。');
  const [phase, setPhase] = useState<FusePhase>('idle');
  return <DemoPanel title="Fuse Button · 延迟确认"><div className={cn("aw-micro-stack")}>
    <FuseButton label="归档演示项" undoLabel="撤销归档" doneLabel="已归档" commitOn="fuseEnd" undoWindow={3500} settle="reset" color={palette.ivory} background={palette.primary} fuseColor={palette.sand} radius={10} onPhaseChange={setPhase} onCommit={() => setMessage('演示项已归档。')} onUndo={() => setMessage('已撤销，本地演示项保留。')} {...demoProps('t0')} />
    <p className={cn("aw-micro-hint")}>点击后有 3.5 秒撤销窗口；倒计时结束才提交本地模拟动作。</p>
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">阶段：{phase}。{message}</p>
  </div></DemoPanel>;
}
