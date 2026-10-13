import { useState } from 'react';
import SlideCommit from '../../../.upstream/src/ts-default/Micro/SlideCommit/SlideCommit';
import { SpringCheckbox } from '../../business/components/SpringCheckbox';
import { palette, DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
import { useDemoConfig, useDemoState } from '../../parameters/DemoConfig';
const cn=(names:string)=>componentClasses(styles,names);

export default function SlideCommitDemo() {
  const { props: demoProps } = useDemoConfig();
  const [simulateError, setSimulateError] = useDemoState('state.simulateError', false);
  const [message, setMessage] = useState('拖动滑块至右侧，提交本地模拟操作。');
  const [revision, setRevision] = useState(0);
  return <DemoPanel title="Slide Commit · 滑动确认"><div className={cn("aw-micro-stack")}>
    <SlideCommit key={revision} label="滑动确认" doneLabel="模拟已确认" errorLabel="模拟失败，重试" trackColor={palette.surface} handleColor={palette.primary} successColor={palette.primary} dangerColor={palette.terra} width={300} height={56} radius={14} onConfirm={async () => { if (simulateError) throw new Error('本次示例设置为模拟失败。'); }} onDone={() => setMessage('本地模拟操作成功。')} onError={() => setMessage('已进入错误态，可重试或重置。')} {...demoProps('t0')} />
    <div className={cn("aw-micro-controls")}><label className={styles['aw-micro-option']}><SpringCheckbox aria-label="模拟失败" checked={simulateError} onChange={event => { const checked = event.target.checked; setSimulateError(checked); setRevision(value => value + 1); setMessage(checked ? '已开启模拟失败，拖动滑块可查看错误态。' : '已关闭模拟失败，拖动滑块可完成操作。'); }} />模拟失败</label><button className={styles['aw-micro-action']} type="button" onClick={() => { setRevision(value => value + 1); setMessage('滑块已重置。'); }} {...demoProps('t2')}>重置</button></div>
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">{message}</p>
  </div></DemoPanel>;
}
