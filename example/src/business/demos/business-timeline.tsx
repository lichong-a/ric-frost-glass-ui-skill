// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button } from '../support';


export default function BusinessTimelineDemo() {
  const stages=['准备资料','确认范围','完成处理']; const [step,setStep]=useState(0);
  return <BusinessDemo title="Timeline" description="记录本地流程阶段；下一步追加真实状态事件，重置后重新开始。">
    <ol className="aw-business-timeline">{stages.slice(0,step+1).map((label,index)=><li key={label} className="aw-business-item"><strong>{index+1}. {label}</strong><p>{index===step?'当前阶段':'已完成'}</p></li>)}</ol><div className="aw-business-row"><Button disabled={step===stages.length-1} onClick={()=>setStep(current=>current+1)}>下一步</Button><Button variant="secondary" onClick={()=>setStep(0)}>重置流程</Button></div>
  </BusinessDemo>;
}
