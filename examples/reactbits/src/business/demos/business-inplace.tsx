// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button, Field } from '../support';


export default function BusinessInplaceDemo() {
  const [editing,setEditing]=useState(false); const [value,setValue]=useState('资料整理'); const [draft,setDraft]=useState(value);
  return <BusinessDemo title="Inplace" description="点击名称就地编辑，保存校验非空，取消恢复此前值。">
    {editing?<form className="aw-business-row" onSubmit={event=>{event.preventDefault();if(!draft.trim())return;setValue(draft.trim());setEditing(false);}}><Field label="编辑名称"><input className="aw-business-input" autoFocus value={draft} onChange={event=>setDraft(event.target.value)} onKeyDown={event=>{if(event.key==='Escape')setEditing(false);}} /></Field><Button type="submit" disabled={!draft.trim()}>保存</Button><Button variant="secondary" onClick={()=>setEditing(false)}>取消</Button></form>:<Button variant="secondary" onClick={()=>{setDraft(value);setEditing(true);}}>{value} · 点击编辑</Button>}
  </BusinessDemo>;
}
