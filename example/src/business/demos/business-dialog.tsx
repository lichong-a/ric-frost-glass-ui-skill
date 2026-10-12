// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button, Field, Dialog } from '../support';


export default function BusinessDialogDemo() {
  const [open,setOpen]=useState(false); const [saved,setSaved]=useState('资料整理'); const [draft,setDraft]=useState(saved);
  return <BusinessDemo title="Dialog" description="在模态弹窗中编辑本地任务名称，确认后才更新已保存值。">
    <Button onClick={()=>{setDraft(saved);setOpen(true);}}>编辑任务</Button><p className="aw-business-status" role="status">已保存名称：{saved}</p><Dialog open={open} title="编辑本地任务" onClose={()=>setOpen(false)}><Field label="任务名称"><input className="aw-business-input" value={draft} onChange={event=>setDraft(event.target.value)} /></Field><div className="aw-business-row"><Button disabled={!draft.trim()} onClick={()=>{setSaved(draft.trim());setOpen(false);}}>确认</Button><Button variant="secondary" onClick={()=>setOpen(false)}>取消</Button></div></Dialog>
  </BusinessDemo>;
}
