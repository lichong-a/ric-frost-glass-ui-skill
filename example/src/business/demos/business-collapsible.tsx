// Original Agent Wan demonstration using React and native browser controls.
import { useState, useId } from 'react';
import { BusinessDemo, Button } from '../support';


export default function BusinessCollapsibleDemo() {
  const [expanded,setExpanded]=useState(false); const id=useId();
  return <BusinessDemo title="Collapsible" description="折叠附加说明，文本内容和展开状态保持一致。">
    <Button variant="secondary" aria-expanded={expanded} aria-controls={id} onClick={()=>setExpanded(value=>!value)}>{expanded?'收起说明':'展开说明'}</Button><section id={id} hidden={!expanded} className="aw-business-item"><h3>附加说明</h3><p>资料来源、操作边界和恢复方式应随业务场景提供。</p></section>
  </BusinessDemo>;
}
