// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo } from '../support';
import { OrganizationNodes, workspaceTree } from '../primitives';


export default function BusinessOrganizationChartDemo() {
  const [selected,setSelected]=useState('workspace'); const [expanded,setExpanded]=useState(['workspace']);
  return <BusinessDemo title="OrganizationChart" description="逐层展开团队结构，点击成员显示当前选择。">
    <div className="aw-business-organization" style={{overflowX:"auto"}}><OrganizationNodes nodes={workspaceTree} selected={selected} expanded={expanded} onSelect={setSelected} onToggle={key=>setExpanded(current=>current.includes(key)?current.filter(value=>value!==key):[...current,key])} /></div><p className="aw-business-status" role="status">已选择节点：{selected}</p>
  </BusinessDemo>;
}
