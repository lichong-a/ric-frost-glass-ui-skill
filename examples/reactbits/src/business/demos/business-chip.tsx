// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button } from '../support';


export default function BusinessChipDemo() {
  const initial=['知识','文档','服务']; const [chips,setChips]=useState(initial);
  return <BusinessDemo title="Chip" description="移除已选关键词，空状态保留恢复入口。">
    <div className="aw-business-row">{chips.map(label=><span key={label} className="aw-business-item aw-business-row"><span>{label}</span><Button variant="secondary" aria-label={'移除'+label} onClick={()=>setChips(current=>current.filter(item=>item!==label))}>×</Button></span>)}</div>{!chips.length?<p role="status">所有关键词已移除。</p>:null}<Button variant="secondary" onClick={()=>setChips(initial)}>恢复关键词</Button>
  </BusinessDemo>;
}
