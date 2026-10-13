import ownedStyles0 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { OrganizationNodes } from '../../components/OrganizationNodes';
import { workspaceTree } from '../../data';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessOrganizationChartDemo() {
  const { props: demoProps } = useDemoConfig();
  const [selected,setSelected]=useDemoState('state.selected', 'workspace'); const [expanded,setExpanded]=useDemoState('state.expanded', ['workspace']);
  return <BusinessDemo title="OrganizationChart" description="逐层展开团队结构，点击成员显示当前选择。">
    <div data-ui="aw-business-organization" className={cn("aw-business-organization")} style={{overflowX:"auto"}}><OrganizationNodes nodes={workspaceTree} selected={selected} expanded={expanded} onSelect={setSelected} onToggle={key=>setExpanded(current=>current.includes(key)?current.filter(value=>value!==key):[...current,key])} {...demoProps('t0')} /></div><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">已选择节点：{selected}</p>
  </BusinessDemo>;
}
