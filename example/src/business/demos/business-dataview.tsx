// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button, Field } from '../support';
import { workItems } from '../primitives';


export default function BusinessDataViewDemo() {
  const [grid,setGrid]=useState(false); const [query,setQuery]=useState(''); const visible=workItems.filter(item=>item.title.includes(query));
  return <BusinessDemo title="DataView" description="同一组工作项切换列表和网格，并可按关键词筛选。">
    <div className="aw-business-row"><Button onClick={()=>setGrid(value=>!value)}>{grid?'切换列表':'切换网格'}</Button><Field label="筛选工作项"><input className="aw-business-input" value={query} onChange={event=>setQuery(event.target.value)} /></Field></div><div className={grid?'aw-business-grid':'aw-business-list'}>{visible.map(item=><article key={item.id} className="aw-business-item"><strong>{item.title}</strong><p>{item.category} · {item.quantity} 条记录</p></article>)}</div>{!visible.length?<p role="status">没有匹配的工作项。</p>:null}
  </BusinessDemo>;
}
