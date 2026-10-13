import ownedStyles0 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { useDemoConfig } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessChipDemo() {
  const { props: demoProps } = useDemoConfig();
  const initial=['知识','文档','服务']; const [chips,setChips]=useState(initial);
  return <BusinessDemo title="Chip" description="移除已选关键词，空状态保留恢复入口。">
    <div data-ui="aw-business-row" className={cn("aw-business-row")}>{chips.map(label=><span data-ui="aw-business-item" key={label} className={cn("aw-business-item aw-business-row")}><span>{label}</span><Button variant="secondary" aria-label={'移除'+label} onClick={()=>setChips(current=>current.filter(item=>item!==label))} {...demoProps('t0')}>×</Button></span>)}</div>{!chips.length?<p role="status">所有关键词已移除。</p>:null}<Button variant="secondary" onClick={()=>setChips(initial)} {...demoProps('t1')}>恢复关键词</Button>
  </BusinessDemo>;
}
