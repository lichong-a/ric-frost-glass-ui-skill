// Original Agent Wan demonstration using React and native browser controls.
import { useState, useRef } from 'react';
import { BusinessDemo, Button, Popover } from '../support';
import { TreeRows, workspaceTree } from '../primitives';


export default function BusinessTreeSelectDemo() {
  const [open,setOpen]=useState(false); const [selected,setSelected]=useState<string|null>(null); const [expanded,setExpanded]=useState(['workspace']); const anchor=useRef<HTMLButtonElement>(null);
  let selectedLabel = selected;
  const remaining = [...workspaceTree];
  while (remaining.length) {
    const node = remaining.pop();
    if (!node) break;
    if (node.key === selected) { selectedLabel = node.label; break; }
    remaining.push(...(node.children ?? []));
  }
  return <BusinessDemo title="TreeSelect" description="在浮层中展开层级并选择节点，选择后关闭，支持清除。">
    <div className="aw-business-row"><button type="button" className="aw-button" ref={anchor} aria-haspopup="tree" aria-expanded={open} onClick={()=>setOpen(value=>!value)}>{selectedLabel??'选择资料节点'}</button><Button variant="secondary" disabled={!selected} onClick={()=>setSelected(null)}>清除</Button></div><Popover open={open} onClose={()=>setOpen(false)} anchorRef={anchor}><TreeRows nodes={workspaceTree} selected={selected} expanded={expanded} onSelect={key=>{setSelected(key);setOpen(false);}} onToggle={key=>setExpanded(current=>current.includes(key)?current.filter(value=>value!==key):[...current,key])} /></Popover>
  </BusinessDemo>;
}
