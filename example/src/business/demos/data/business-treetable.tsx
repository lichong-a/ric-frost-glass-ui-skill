import ownedStyles0 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { workspaceTree } from '../../data';
import { type TreeItem } from '../../data';
import { useDemoConfig } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessTreeTableDemo() {
  const { props: demoProps } = useDemoConfig();
  const [expanded,setExpanded]=useState(['workspace']); const [selected,setSelected]=useState<string|null>(null); const rows: {key:string;label:string;depth:number;children?:TreeItem[]}[]=[]; function visit(nodes:TreeItem[],depth:number){nodes.forEach(node=>{rows.push({...node,depth});if(node.children&&expanded.includes(node.key))visit(node.children,depth+1);});} visit(workspaceTree,0);
  return <BusinessDemo title="TreeTable" description="将层级资料展开为表格，查看子项数量并选择节点。">
    <table data-ui="aw-business-table" className={cn("aw-business-table")}><thead><tr><th scope="col">资料节点</th><th scope="col">子项</th><th scope="col">操作</th></tr></thead><tbody>{rows.map(node=><tr key={node.key}><td style={{paddingLeft:12+node.depth*20}}>{node.children?<Button variant="secondary" aria-label={(expanded.includes(node.key)?'收起':'展开')+node.label} onClick={()=>setExpanded(current=>current.includes(node.key)?current.filter(key=>key!==node.key):[...current,node.key])} {...demoProps('t0')}>{expanded.includes(node.key)?'−':'+'}</Button>:null} {node.label}</td><td>{node.children?.length??0}</td><td><Button variant="secondary" onClick={()=>setSelected(node.key)} {...demoProps('t1')}>选择</Button></td></tr>)}</tbody></table><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">{selected?'已选择：'+selected:'请选择资料节点。'}</p>
  </BusinessDemo>;
}
