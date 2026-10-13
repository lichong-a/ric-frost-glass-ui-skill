import ownedStyles0 from '../../components/DemoLayout.module.css';
import ownedStyles1 from '../../components/Input.module.css';
import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { Field } from '../../components/Field';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessMessageDemo() {
  const { props: demoProps } = useDemoConfig();
  const [value,setValue]=useDemoState('state.value', ''); const [message,setMessage]=useState<{text:string;error:boolean}|null>(null);
  return <BusinessDemo title="Message" description="根据本地表单校验呈现成功或错误信息，关闭后可重新提交。">
    <form onSubmit={event=>{event.preventDefault();setMessage(value.trim()?{text:'名称已在当前页面校验通过。',error:false}:{text:'请先填写名称。',error:true});}}><Field label="名称" {...demoProps('t0')}><input data-ui="aw-business-input" className={cn("aw-business-input")} value={value} onChange={event=>setValue(event.target.value)} /></Field><Button type="submit" {...demoProps('t2')}>校验</Button></form>{message?<div data-ui="aw-business-item" className={cn("aw-business-item aw-business-row")} role={message.error?'alert':'status'} style={{borderLeft:`4px solid var(${message.error?'--aw-palette-terra':'--aw-color-action-primary'})`}}><span>{message.text}</span><Button variant="secondary" aria-label="关闭消息" onClick={()=>setMessage(null)} {...demoProps('t3')}>关闭</Button></div>:null}
  </BusinessDemo>;
}
