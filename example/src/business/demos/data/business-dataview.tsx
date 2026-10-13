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
export default function BusinessDataViewDemo() {
  const { props: demoProps } = useDemoConfig();
  const [grid,setGrid]=useState(false); const [query,setQuery]=useDemoState('state.query', ''); const visible=workItems.filter(item=>item.title.includes(query));
  return <BusinessDemo title="DataView" description="同一组工作项切换列表和网格，并可按关键词筛选。">
    <div data-ui="aw-business-row" className={cn("aw-business-row")}><Button onClick={()=>setGrid(value=>!value)} {...demoProps('t0')}>{grid?'切换列表':'切换网格'}</Button><Field label="筛选工作项" {...demoProps('t1')}><input data-ui="aw-business-input" className={cn("aw-business-input")} value={query} onChange={event=>setQuery(event.target.value)} /></Field></div><div data-ui="aw-business-grid" className={cn(grid?'aw-business-grid':'aw-business-list')}>{visible.map(item=><article data-ui="aw-business-item" key={item.id} className={cn("aw-business-item")}><strong>{item.title}</strong><p>{item.category} · {item.quantity} 条记录</p></article>)}</div>{!visible.length?<p role="status">没有匹配的工作项。</p>:null}
  </BusinessDemo>;
}
