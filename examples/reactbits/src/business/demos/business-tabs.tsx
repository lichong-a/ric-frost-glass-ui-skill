// Original Agent Wan demonstration using React and native browser controls.
import { useState, useId } from 'react';
import { BusinessDemo } from '../support';


export default function BusinessTabsDemo() {
  const [active,setActive]=useState(0); const tabs=['概览','活动','设置']; const prefix=useId();
  return <BusinessDemo title="Tabs" description="用标签切换概览、活动与设置；左右方向键切换并同步焦点。">
    <div role="tablist" aria-label="工作空间内容" className="aw-business-row">{tabs.map((label,index)=><button type="button" className="aw-button" key={label} id={`${prefix}-tab-${index}`} role="tab" aria-selected={active===index} aria-controls={`${prefix}-panel-${index}`} tabIndex={active===index?0:-1} onClick={()=>setActive(index)} onKeyDown={event=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();const next=event.key==='Home'?0:event.key==='End'?2:(index+(event.key==='ArrowLeft'?-1:1)+3)%3;setActive(next);document.getElementById(`${prefix}-tab-${next}`)?.focus();}}}>{label}</button>)}</div>{tabs.map((label,index)=><section id={`${prefix}-panel-${index}`} role="tabpanel" aria-labelledby={`${prefix}-tab-${index}`} tabIndex={0} hidden={active!==index} className="aw-business-item" key={label}><h3>{label}</h3><p>{index===0?'当前空间有6项本地任务。':index===1?'这里显示当前示例的活动摘要。':'工作空间设置可按业务权限接入。'}</p></section>)}
  </BusinessDemo>;
}
