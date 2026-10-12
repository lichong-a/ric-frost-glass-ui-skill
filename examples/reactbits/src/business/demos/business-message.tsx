// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button, Field } from '../support';


export default function BusinessMessageDemo() {
  const [value,setValue]=useState(''); const [message,setMessage]=useState<{text:string;error:boolean}|null>(null);
  return <BusinessDemo title="Message" description="根据本地表单校验呈现成功或错误信息，关闭后可重新提交。">
    <form onSubmit={event=>{event.preventDefault();setMessage(value.trim()?{text:'名称已在当前页面校验通过。',error:false}:{text:'请先填写名称。',error:true});}}><Field label="名称"><input className="aw-business-input" value={value} onChange={event=>setValue(event.target.value)} /></Field><Button type="submit">校验</Button></form>{message?<div className="aw-business-item aw-business-row" role={message.error?'alert':'status'} style={{borderLeft:`4px solid var(${message.error?'--aw-palette-terra':'--aw-color-action-primary'})`}}><span>{message.text}</span><Button variant="secondary" aria-label="关闭消息" onClick={()=>setMessage(null)}>关闭</Button></div>:null}
  </BusinessDemo>;
}
