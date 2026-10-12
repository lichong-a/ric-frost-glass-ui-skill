// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button, Field } from '../support';


export default function BusinessStepperDemo() {
  const [step,setStep]=useState(0); const [name,setName]=useState(''); const steps=['填写资料','确认范围','完成'];
  return <BusinessDemo title="Stepper" description="按顺序填写名称、确认范围并完成本地示例，返回上一步时保留内容。">
    <ol className="aw-business-row">{steps.map((label,index)=><li key={label} aria-current={index===step?'step':undefined}>{index+1}. {label}</li>)}</ol><section className="aw-business-item">{step===0?<Field label="任务名称"><input className="aw-business-input" value={name} onChange={event=>setName(event.target.value)} /></Field>:step===1?<p>将为“{name}”保存当前页面的本地示例状态。</p>:<p role="status">“{name}”的本地流程已完成。</p>}</section><div className="aw-business-row"><Button variant="secondary" disabled={step===0} onClick={()=>setStep(value=>value-1)}>上一步</Button><Button disabled={step===2||!name.trim()} onClick={()=>setStep(value=>value+1)}>下一步</Button><Button variant="secondary" onClick={()=>{setStep(0);setName('');}}>重置</Button></div>
  </BusinessDemo>;
}
