// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button } from '../support';


export default function BusinessNavigationMenuDemo() {
  const [selected,setSelected]=useState('工作台'); const [expanded,setExpanded]=useState(false);
  return <BusinessDemo title="NavigationMenu" description="主导航切换工作区，资源菜单可展开并选择二级入口。">
    <nav aria-label="主导航" className="aw-business-row">{['工作台','智能体'].map(label=><Button variant="secondary" key={label} aria-current={selected===label?'page':undefined} onClick={()=>{setSelected(label);setExpanded(false);}}>{label}</Button>)}<Button variant="secondary" aria-expanded={expanded} aria-controls="business-resource-nav" onClick={()=>setExpanded(value=>!value)}>资源 {expanded?'−':'+'}</Button></nav><nav id="business-resource-nav" aria-label="资源导航" hidden={!expanded}>{['技能','知识','连接器'].map(label=><Button variant="secondary" key={label} onClick={()=>{setSelected(label);setExpanded(false);}}>{label}</Button>)}</nav><section className="aw-business-item"><h3>{selected}</h3><p>已切换到当前示例的{selected}工作区。</p></section>
  </BusinessDemo>;
}
