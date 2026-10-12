// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button } from '../support';
import { TreeRows, workspaceTree } from '../primitives';


export default function BusinessTreeDemo() {
  const [selected,setSelected]=useState<string|null>(null); const [expanded,setExpanded]=useState(['workspace']);
  return <BusinessDemo title="Tree" description="展开工作空间层级并选择单个节点，支持左右方向键展开或收起。">
    <TreeRows nodes={workspaceTree} selected={selected} expanded={expanded} onSelect={setSelected} onToggle={key=>setExpanded(current=>current.includes(key)?current.filter(value=>value!==key):[...current,key])} /><p className="aw-business-status" role="status">{selected?'已选择：'+selected:'尚未选择节点。'}</p><Button variant="secondary" onClick={()=>{setSelected(null);setExpanded([]);}}>收起并清除选择</Button>
  </BusinessDemo>;
}
