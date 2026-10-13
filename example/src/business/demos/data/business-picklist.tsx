import ownedStyles0 from '../../components/DemoLayout.module.css';
import ownedStyles1 from '../../components/Input.module.css';
import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { Field } from '../../components/Field';
import { workItems } from '../../data';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessPickListDemo() {
  const { props: demoProps } = useDemoConfig();
  const [chosen,setChosen]=useState<string[]>([]); const [query,setQuery]=useDemoState('state.query', '');
  return <BusinessDemo title="PickList" description="在候选任务与已选任务之间移动条目，保留每项唯一身份。">
    <Field label="搜索候选" {...demoProps('t0')}><input data-ui="aw-business-input" className={cn("aw-business-input")} value={query} onChange={event=>setQuery(event.target.value)} /></Field><div data-ui="aw-business-grid" className={cn("aw-business-grid")}><section data-ui="aw-business-item" className={cn("aw-business-item")}><h3>候选任务</h3>{workItems.filter(item=>!chosen.includes(item.id)&&item.title.includes(query)).map(item=><div data-ui="aw-business-row" className={cn("aw-business-row")} key={item.id}><span>{item.title}</span><Button aria-label={'加入'+item.title} onClick={()=>setChosen(current=>[...current,item.id])} {...demoProps('t2')}>加入 →</Button></div>)}{!workItems.some(item=>!chosen.includes(item.id)&&item.title.includes(query))?<p>没有候选项。</p>:null}</section><section data-ui="aw-business-item" className={cn("aw-business-item")}><h3>已选任务</h3>{chosen.map(id=>{const item=workItems.find(item=>item.id===id)!;return <div data-ui="aw-business-row" className={cn("aw-business-row")} key={id}><span>{item.title}</span><Button variant="secondary" aria-label={'移除'+item.title} onClick={()=>setChosen(current=>current.filter(value=>value!==id))} {...demoProps('t3')}>← 移除</Button></div>;})}{!chosen.length?<p>尚未选择任务。</p>:null}</section></div><Button variant="secondary" disabled={!chosen.length} onClick={()=>setChosen([])} {...demoProps('t4')}>移除全部</Button>
  </BusinessDemo>;
}
