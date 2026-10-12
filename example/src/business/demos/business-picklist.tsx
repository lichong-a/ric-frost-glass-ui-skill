// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button, Field } from '../support';
import { workItems } from '../primitives';


export default function BusinessPickListDemo() {
  const [chosen,setChosen]=useState<string[]>([]); const [query,setQuery]=useState('');
  return <BusinessDemo title="PickList" description="在候选任务与已选任务之间移动条目，保留每项唯一身份。">
    <Field label="搜索候选"><input className="aw-business-input" value={query} onChange={event=>setQuery(event.target.value)} /></Field><div className="aw-business-grid"><section className="aw-business-item"><h3>候选任务</h3>{workItems.filter(item=>!chosen.includes(item.id)&&item.title.includes(query)).map(item=><div className="aw-business-row" key={item.id}><span>{item.title}</span><Button aria-label={'加入'+item.title} onClick={()=>setChosen(current=>[...current,item.id])}>加入 →</Button></div>)}{!workItems.some(item=>!chosen.includes(item.id)&&item.title.includes(query))?<p>没有候选项。</p>:null}</section><section className="aw-business-item"><h3>已选任务</h3>{chosen.map(id=>{const item=workItems.find(item=>item.id===id)!;return <div className="aw-business-row" key={id}><span>{item.title}</span><Button variant="secondary" aria-label={'移除'+item.title} onClick={()=>setChosen(current=>current.filter(value=>value!==id))}>← 移除</Button></div>;})}{!chosen.length?<p>尚未选择任务。</p>:null}</section></div><Button variant="secondary" disabled={!chosen.length} onClick={()=>setChosen([])}>移除全部</Button>
  </BusinessDemo>;
}
