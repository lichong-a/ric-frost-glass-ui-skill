import { useState } from 'react';
import PaperCrumple, { type PaperCrumpleState, type PaperCrumpleRelease } from '../../../.upstream/src/ts-default/Micro/PaperCrumple/PaperCrumple';
import { palette, DemoPanel } from '../../shared/demo-support';
import { microPaperArtwork } from '../../shared/micro-assets';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
import { useDemoConfig, useDemoState } from '../../parameters/DemoConfig';
const cn=(names:string)=>componentClasses(styles,names);

export default function PaperCrumpleDemo() {
  const { props: demoProps } = useDemoConfig();
  const [state, setState] = useState<PaperCrumpleState>('flat');
  const [release, setRelease] = useDemoState<PaperCrumpleRelease>('state.release', 'creased');
  const [revision, setRevision] = useState(0);
  const [error, setError] = useState('');
  return <DemoPanel title="Paper Crumple · 纸张揉皱"><div className={cn("aw-micro-stack")}>
    <PaperCrumple src={microPaperArtwork} alt="自然色示例海报" width={260} height={325} sceneHeight={430} releaseBehavior={release} paperColor={palette.ivory} shadowOpacity={0.16} resetKey={revision} seed={12} onStateChange={setState} onError={reason => setError(reason.message)} {...demoProps('t0')} />
    <div className={cn("aw-micro-controls")}><label className={styles['aw-micro-label']}>松开后<select className={styles['aw-micro-select']} value={release} onChange={event => setRelease(event.target.value as PaperCrumpleRelease)}><option value="creased" {...demoProps('t2')}>保留折痕</option><option value="restore" {...demoProps('t3')}>恢复平整</option><option value="stay" {...demoProps('t4')}>保持揉皱</option></select></label><button className={styles['aw-micro-action']} type="button" onClick={() => { setRevision(value => value + 1); setError(''); }} {...demoProps('t5')}>重置纸张</button></div>
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">{error || `纸张状态：${state}。按住揉皱，拖动调整位置。`}</p>
  </div></DemoPanel>;
}
