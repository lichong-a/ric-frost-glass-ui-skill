// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button } from '../support';


export default function BusinessToolbarDemo() {
  const [count,setCount]=useState(3);
  return <BusinessDemo title="Toolbar" description="常用操作集中在工具栏，可新建本地条目、移除最后一项并恢复。">
    <div role="toolbar" aria-label="任务操作" className="aw-business-row"><Button disabled={count>=20} onClick={()=>setCount(value=>Math.min(20,value+1))}>新建任务</Button><Button variant="danger" disabled={!count} onClick={()=>setCount(value=>value-1)}>移除末项</Button><Button variant="secondary" onClick={()=>setCount(3)}>恢复</Button></div><p className="aw-business-status" role="status">当前本地任务数：{count}</p><ul>{Array.from({length:count},(_,index)=><li key={index}>本地任务 {index+1}</li>)}</ul>
  </BusinessDemo>;
}
