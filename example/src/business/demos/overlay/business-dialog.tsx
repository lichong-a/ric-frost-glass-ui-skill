import ownedStyles0 from '../../components/DemoLayout.module.css';
import ownedStyles1 from '../../components/Input.module.css';
import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { Field } from '../../components/Field';
import { Dialog } from '../../components/Dialog';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessDialogDemo() {
  const { props: demoProps } = useDemoConfig();
  const [open,setOpen]=useDemoState('state.open', false); const [saved,setSaved]=useState('资料整理'); const [draft,setDraft]=useState(saved);
  return <BusinessDemo title="Dialog" description="在模态弹窗中编辑本地任务名称，确认后才更新已保存值。">
    <Button onClick={()=>{setDraft(saved);setOpen(true);}} {...demoProps('t0')}>编辑任务</Button><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">已保存名称：{saved}</p><Dialog open={open} title="编辑本地任务" onClose={()=>setOpen(false)} {...demoProps('t1')}><Field label="任务名称" {...demoProps('t2')}><input data-ui="aw-business-input" className={cn("aw-business-input")} value={draft} onChange={event=>setDraft(event.target.value)} /></Field><div data-ui="aw-business-row" className={cn("aw-business-row")}><Button disabled={!draft.trim()} onClick={()=>{setSaved(draft.trim());setOpen(false);}} {...demoProps('t4')}>确认</Button><Button variant="secondary" onClick={()=>setOpen(false)} {...demoProps('t5')}>取消</Button></div></Dialog>
  </BusinessDemo>;
}
