// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button } from '../support';


export default function BusinessTagDemo() {
  const [status,setStatus]=useState('全部'); const records=[{id:1,title:'资料整理',status:'进行中'},{id:2,title:'合同校对',status:'已完成'},{id:3,title:'客户跟进',status:'待开始'}];
  return <BusinessDemo title="Tag" description="筛选任务状态，标签与本地记录列表保持一致。">
    <div className="aw-business-row">{['全部','待开始','进行中','已完成'].map(label=><Button key={label} variant="secondary" aria-pressed={status===label} onClick={()=>setStatus(label)}>{label}</Button>)}</div><ul>{records.filter(item=>status==='全部'||item.status===status).map(item=><li key={item.id} className="aw-business-row"><span>{item.title}</span><span className="aw-business-tag" data-status={item.status}>{item.status}</span></li>)}</ul>
  </BusinessDemo>;
}
