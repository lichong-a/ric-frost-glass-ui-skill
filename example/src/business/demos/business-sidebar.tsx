// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button } from '../support';


export default function BusinessSidebarDemo() {
  const [collapsed,setCollapsed]=useState(false); const [page,setPage]=useState('概览');
  return <BusinessDemo title="Sidebar" description="折叠侧边导航并切换内容页，选择状态与折叠状态独立保存。">
    <Button variant="secondary" aria-expanded={!collapsed} onClick={()=>setCollapsed(value=>!value)}>{collapsed?'展开侧栏':'折叠侧栏'}</Button><div className="aw-business-row" style={{alignItems:'stretch'}}><aside className="aw-business-item" style={{width:collapsed?64:180}} aria-label="工作空间侧栏"><nav aria-label="工作区导航">{['概览','资料','设置'].map((label,index)=><Button variant="secondary" key={label} aria-label={label} aria-current={page===label?'page':undefined} onClick={()=>setPage(label)}>{collapsed?index+1:label}</Button>)}</nav></aside><section className="aw-business-item" style={{flex:1}}><h3>{page}</h3><p>当前示例中的{page}内容。</p></section></div>
  </BusinessDemo>;
}
