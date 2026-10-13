import ownedStyles0 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { useDemoConfig } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessTagDemo() {
  const { props: demoProps } = useDemoConfig();
  const [status,setStatus]=useState('全部'); const records=[{id:1,title:'资料整理',status:'进行中'},{id:2,title:'合同校对',status:'已完成'},{id:3,title:'客户跟进',status:'待开始'}];
  return <BusinessDemo title="Tag" description="筛选任务状态，标签与本地记录列表保持一致。">
    <div data-ui="aw-business-row" className={cn("aw-business-row")}>{['全部','待开始','进行中','已完成'].map(label=><Button key={label} variant="secondary" aria-pressed={status===label} onClick={()=>setStatus(label)} {...demoProps('t0')}>{label}</Button>)}</div><ul>{records.filter(item=>status==='全部'||item.status===status).map(item=><li data-ui="aw-business-row" key={item.id} className={cn("aw-business-row")}><span>{item.title}</span><span data-ui="aw-business-tag" className={cn("aw-business-tag")} data-status={item.status}>{item.status}</span></li>)}</ul>
  </BusinessDemo>;
}
