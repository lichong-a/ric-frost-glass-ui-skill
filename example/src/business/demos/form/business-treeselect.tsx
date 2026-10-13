import ownedStyles0 from '../../components/Button.module.css';
import ownedStyles1 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { useState, useRef } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { Popover } from '../../components/Popover';
import { TreeRows } from '../../components/TreeRows';
import { workspaceTree } from '../../data';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessTreeSelectDemo() {
  const { props: demoProps } = useDemoConfig();
  const [open,setOpen]=useDemoState('state.open', false); const [selected,setSelected]=useDemoState<string|null>('state.selected', null); const [expanded,setExpanded]=useDemoState('state.expanded', ['workspace']); const anchor=useRef<HTMLButtonElement>(null);
  let selectedLabel = selected;
  const remaining = [...workspaceTree];
  while (remaining.length) {
    const node = remaining.pop();
    if (!node) break;
    if (node.key === selected) { selectedLabel = node.label; break; }
    remaining.push(...(node.children ?? []));
  }
  return <BusinessDemo title="TreeSelect" description="在浮层中展开层级并选择节点，选择后关闭，支持清除。">
    <div data-ui="aw-business-row" className={cn("aw-business-row")}><button data-ui="aw-button" type="button" className={cn("aw-button")} ref={anchor} aria-haspopup="tree" aria-expanded={open} onClick={()=>setOpen(value=>!value)} {...demoProps('t0')}>{selectedLabel??'选择资料节点'}</button><Button variant="secondary" disabled={!selected} onClick={()=>setSelected(null)} {...demoProps('t1')}>清除</Button></div><Popover open={open} onClose={()=>setOpen(false)} anchorRef={anchor} {...demoProps('t2')}><TreeRows nodes={workspaceTree} selected={selected} expanded={expanded} onSelect={key=>{setSelected(key);setOpen(false);}} onToggle={key=>setExpanded(current=>current.includes(key)?current.filter(value=>value!==key):[...current,key])} {...demoProps('t3')} /></Popover>
  </BusinessDemo>;
}
