// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button } from '../support';


export default function BusinessBreadcrumbDemo() {
  const [level,setLevel]=useState(2); const path=['工作空间','智能体','资料助理'];
  return <BusinessDemo title="Breadcrumb" description="沿工作空间层级返回父节点，当前节点保持明确语义。">
    <nav aria-label="面包屑"><ol className="aw-business-row">{path.slice(0,level+1).map((label,index)=><li key={label}>{index===level?<span aria-current="page">{label}</span>:<Button variant="secondary" onClick={()=>setLevel(index)}>{label}</Button>}</li>)}</ol></nav><p className="aw-business-status" role="status">当前节点：{path[level]}</p><Button variant="secondary" onClick={()=>setLevel(2)}>返回资料助理</Button>
  </BusinessDemo>;
}
