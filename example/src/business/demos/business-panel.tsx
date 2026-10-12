// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button, Field } from '../support';


export default function BusinessPanelDemo() {
  const [open,setOpen]=useState(true); const [note,setNote]=useState('记录当前任务的关键结果。');
  return <BusinessDemo title="Panel" description="带标题的工作面板可以折叠；展开后保留此前输入。">
    <section className="aw-business-item"><h3><Button variant="secondary" aria-expanded={open} aria-controls="panel-note" onClick={()=>setOpen(value=>!value)}>工作记录 {open?'−':'+'}</Button></h3><div id="panel-note" hidden={!open}><Field label="记录内容"><textarea className="aw-business-input" value={note} onChange={event=>setNote(event.target.value)} /></Field></div></section>
  </BusinessDemo>;
}
