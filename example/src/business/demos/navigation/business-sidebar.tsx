import ownedStyles0 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { useDemoConfig } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessSidebarDemo() {
  const { props: demoProps } = useDemoConfig();
  const [collapsed,setCollapsed]=useState(false); const [page,setPage]=useState('概览');
  return <BusinessDemo title="Sidebar" description="折叠侧边导航并切换内容页，选择状态与折叠状态独立保存。">
    <Button variant="secondary" aria-expanded={!collapsed} onClick={()=>setCollapsed(value=>!value)} {...demoProps('t0')}>{collapsed?'展开侧栏':'折叠侧栏'}</Button><div data-ui="aw-business-row" className={cn("aw-business-row")} style={{alignItems:'stretch'}}><aside data-ui="aw-business-item" className={cn("aw-business-item")} style={{width:collapsed?64:180}} aria-label="工作空间侧栏"><nav aria-label="工作区导航">{['概览','资料','设置'].map((label,index)=><Button variant="secondary" key={label} aria-label={label} aria-current={page===label?'page':undefined} onClick={()=>setPage(label)} {...demoProps('t1')}>{collapsed?index+1:label}</Button>)}</nav></aside><section data-ui="aw-business-item" className={cn("aw-business-item")} style={{flex:1}}><h3>{page}</h3><p>当前示例中的{page}内容。</p></section></div>
  </BusinessDemo>;
}
