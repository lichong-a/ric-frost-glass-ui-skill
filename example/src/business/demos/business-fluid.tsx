// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button, Field } from '../support';


export default function BusinessFluidDemo() {
  const [width,setWidth]=useState(100); const [query,setQuery]=useState(''); const [message,setMessage]=useState('等待查询。');
  return <BusinessDemo title="Fluid" description="调整容器宽度，输入与操作按钮随容器伸缩，保持可读布局。">
    <Field label={`容器宽度：${width}%`}><input type="range" min="45" max="100" value={width} onChange={event=>setWidth(Number(event.target.value))} /></Field><form style={{width:`${width}%`,display:'grid',gap:12}} onSubmit={event=>{event.preventDefault();setMessage(query.trim()?'当前本地查询：'+query.trim():'请输入查询内容。');}}><Field label="查询内容"><input className="aw-business-input" style={{width:'100%'}} value={query} onChange={event=>setQuery(event.target.value)} /></Field><Button type="submit">查询</Button></form><p className="aw-business-status" role="status">{message}</p>
  </BusinessDemo>;
}
