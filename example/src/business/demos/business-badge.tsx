// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button } from '../support';


export default function BusinessBadgeDemo() {
  const [count,setCount]=useState(3);
  return <BusinessDemo title="Badge" description="用数量标记当前待办，新增和清空会同步标记与可访问名称。">
    <div className="aw-business-row"><span className="aw-business-item" aria-label={`待办${count}项`}>待办 <strong style={{display:'inline-grid',placeItems:'center',minWidth:28,height:28,borderRadius:16,background:'var(--aw-color-action-primary)',color:'var(--aw-palette-ivory)'}}>{count>99?'99+':count}</strong></span><Button onClick={()=>setCount(value=>value+1)}>新增待办</Button><Button variant="secondary" disabled={!count} onClick={()=>setCount(0)}>清空</Button></div><p className="aw-business-status" role="status">当前待办：{count} 项</p>
  </BusinessDemo>;
}
