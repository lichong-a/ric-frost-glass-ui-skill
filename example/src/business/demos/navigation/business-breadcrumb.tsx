import ownedStyles0 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { useDemoConfig } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessBreadcrumbDemo() {
  const { props: demoProps } = useDemoConfig();
  const [level,setLevel]=useState(2); const path=['工作空间','智能体','资料助理'];
  return <BusinessDemo title="Breadcrumb" description="沿工作空间层级返回父节点，当前节点保持明确语义。">
    <nav aria-label="面包屑"><ol data-ui="aw-business-row" className={cn("aw-business-row")}>{path.slice(0,level+1).map((label,index)=><li key={label}>{index===level?<span aria-current="page">{label}</span>:<Button variant="secondary" onClick={()=>setLevel(index)} {...demoProps('t0')}>{label}</Button>}</li>)}</ol></nav><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">当前节点：{path[level]}</p><Button variant="secondary" onClick={()=>setLevel(2)} {...demoProps('t1')}>返回资料助理</Button>
  </BusinessDemo>;
}
