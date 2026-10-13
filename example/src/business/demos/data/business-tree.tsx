import ownedStyles0 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { TreeRows } from '../../components/TreeRows';
import { workspaceTree } from '../../data';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessTreeDemo() {
  const { props: demoProps } = useDemoConfig();
  const [selected,setSelected]=useDemoState<string|null>('state.selected', null); const [expanded,setExpanded]=useDemoState('state.expanded', ['workspace']);
  return <BusinessDemo title="Tree" description="展开工作空间层级并选择单个节点，支持左右方向键展开或收起。">
    <TreeRows nodes={workspaceTree} selected={selected} expanded={expanded} onSelect={setSelected} onToggle={key=>setExpanded(current=>current.includes(key)?current.filter(value=>value!==key):[...current,key])} {...demoProps('t0')} /><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">{selected?'已选择：'+selected:'尚未选择节点。'}</p><Button variant="secondary" onClick={()=>{setSelected(null);setExpanded([]);}} {...demoProps('t1')}>收起并清除选择</Button>
  </BusinessDemo>;
}
