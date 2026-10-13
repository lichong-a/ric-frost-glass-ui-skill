import { useState } from 'react';
import RefineFrame, { type RefineFrameStatus } from '../../../.upstream/src/ts-default/Micro/RefineFrame/RefineFrame';
import { palette, DemoPanel } from '../../shared/demo-support';
import { microPaperArtwork } from '../../shared/micro-assets';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
import { useDemoConfig } from '../../parameters/DemoConfig';
const cn=(names:string)=>componentClasses(styles,names);

const labels: Record<RefineFrameStatus, string> = { queued: '等待中', generating: '正在生成', refining: '正在精修', complete: '完成', error: '生成失败' };
const states: RefineFrameStatus[] = ['queued', 'generating', 'refining', 'complete', 'error'];
export default function RefineFrameDemo() {
  const { props: demoProps } = useDemoConfig();
  const [status, setStatus] = useState<RefineFrameStatus>('generating');
  return <DemoPanel title="Refine Frame · 渐进生成框"><div className={cn("aw-micro-stack")}>
    <RefineFrame status={status} aspectRatio="4/3" width={380} radius={20} background={palette.surface} color={palette.ink} labels={labels} retryLabel="重试示例" onRetry={() => setStatus('generating')} {...demoProps('t0')}><img src={microPaperArtwork} alt="本地自然色示例图" className={cn("aw-micro-image")} {...demoProps('t1')} /></RefineFrame>
    <div className={cn("aw-micro-controls")}>{states.map(value => <button className={styles['aw-micro-action']} key={value} type="button" aria-pressed={status === value} onClick={() => setStatus(value)} {...demoProps('t2')}>{labels[value]}</button>)}</div>
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">当前仅模拟生成阶段：{labels[status]}</p>
  </div></DemoPanel>;
}
