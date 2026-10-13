import ownedStyles0 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { useDemoConfig } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessNavigationMenuDemo() {
  const { props: demoProps } = useDemoConfig();
  const [selected,setSelected]=useState('工作台'); const [expanded,setExpanded]=useState(false);
  return <BusinessDemo title="NavigationMenu" description="主导航切换工作区，资源菜单可展开并选择二级入口。">
    <nav data-ui="aw-business-row" aria-label="主导航" className={cn("aw-business-row")}>{['工作台','智能体'].map(label=><Button variant="secondary" key={label} aria-current={selected===label?'page':undefined} onClick={()=>{setSelected(label);setExpanded(false);}} {...demoProps('t0')}>{label}</Button>)}<Button variant="secondary" aria-expanded={expanded} aria-controls="business-resource-nav" onClick={()=>setExpanded(value=>!value)} {...demoProps('t1')}>资源 {expanded?'−':'+'}</Button></nav><nav id="business-resource-nav" aria-label="资源导航" hidden={!expanded}>{['技能','知识','连接器'].map(label=><Button variant="secondary" key={label} onClick={()=>{setSelected(label);setExpanded(false);}} {...demoProps('t2')}>{label}</Button>)}</nav><section data-ui="aw-business-item" className={cn("aw-business-item")}><h3>{selected}</h3><p>已切换到当前示例的{selected}工作区。</p></section>
  </BusinessDemo>;
}
