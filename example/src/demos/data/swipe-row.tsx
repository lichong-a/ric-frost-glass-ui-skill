import { useState } from 'react';
import SwipeRow from '../../../.upstream/src/ts-default/Micro/SwipeRow/SwipeRow';
import { palette, DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
import { useDemoConfig, useDemoState } from '../../parameters/DemoConfig';
const cn=(names:string)=>componentClasses(styles,names);

const actions = [{ id: 'archive', label: '归档', color: '#52604e' }, { id: 'remove', label: '移除', color: '#9c6d56', dismiss: true }];
export default function SwipeRowDemo() {
  const { props: demoProps } = useDemoConfig();
  const [message, setMessage] = useState('向左滑动条目，展开操作。');
  const [open, setOpen] = useDemoState('state.open', false);
  const [removed, setRemoved] = useState(false);
  const [revision, setRevision] = useState(0);
  return <DemoPanel title="Swipe Row · 行滑动操作"><div className={cn("aw-micro-stack")}>
    <div className={cn("aw-micro-wide")}>{removed ? <p className={cn("aw-micro-hint")}>本地演示行已移除。</p> : <SwipeRow key={revision} actions={actions} open={open} onOpenChange={setOpen} rowColor={palette.surface} textColor={palette.ink} drawerColor={palette.sage} height={72} radius={16} label="演示技能草稿" haptic={false} onAction={action => { setMessage(`已选择：${action.label}`); if (action.dismiss) setRemoved(true); }} onCommit={action => { setRemoved(true); setMessage(`滑动已确认：${action.label}`); }} {...demoProps('t0')}><div style={{ padding: '16px 20px' }}><strong>技能配置草稿</strong><p style={{ margin: '4px 0 0', fontSize: 13 }}>仅在本地示例中归档或移除</p></div></SwipeRow>}</div>
    <div className={cn("aw-micro-controls")}><button className={styles['aw-micro-action']} type="button" onClick={() => setOpen(value => !value)} disabled={removed} {...demoProps('t1')}>{open ? '关闭行操作' : '展开行操作'}</button><button className={styles['aw-micro-action']} type="button" onClick={() => { setOpen(false); setRemoved(false); setRevision(value => value + 1); setMessage('示例行已恢复。'); }} {...demoProps('t2')}>恢复示例行</button></div>
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">{message}</p>
  </div></DemoPanel>;
}
