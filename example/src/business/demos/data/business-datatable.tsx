import ownedStyles0 from '../../components/DemoLayout.module.css';
import ownedStyles1 from '../../components/Input.module.css';
import { componentClasses } from '../../class-names';
import { SpringCheckbox } from '../../components/SpringCheckbox';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { Field } from '../../components/Field';
import { workItems } from '../../data';
import { Pager } from '../../components/Pager';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessDataTableDemo() {
  const { props: demoProps } = useDemoConfig();
  const [query,setQuery]=useDemoState('state.query', '');
  const [sort,setSort]=useState<'title'|'quantity'>('title');
  const [ascending,setAscending]=useState(true);
  const [page,setPage]=useDemoState('state.page', 0);
  const [selected,setSelected]=useDemoState<string[]>('state.selected', []);
  const filtered=workItems.filter(item=>item.title.includes(query)||item.category.includes(query)).sort((a,b)=>(sort==='title'?a.title.localeCompare(b.title,'zh-CN'):a.quantity-b.quantity)*(ascending?1:-1));
  function order(field:'title'|'quantity'){setAscending(field===sort?!ascending:true);setSort(field);setPage(0);}
  return <BusinessDemo title="DataTable" description="在本地任务表中搜索、排序、勾选和分页；没有网络写入。">
    <Field label="搜索任务" {...demoProps('t0')}><input data-ui="aw-business-input" className={cn("aw-business-input")} value={query} onChange={event=>{setQuery(event.target.value);setPage(0);}} /></Field>
    <div style={{overflowX:'auto'}}><table data-ui="aw-business-table" className={cn("aw-business-table")}><thead><tr><th scope="col">选择</th><th scope="col" aria-sort={sort==='title'?(ascending?'ascending':'descending'):'none'}><Button variant="secondary" onClick={()=>order('title')} {...demoProps('t2')}>任务 ↕</Button></th><th scope="col">类别</th><th scope="col" aria-sort={sort==='quantity'?(ascending?'ascending':'descending'):'none'}><Button variant="secondary" onClick={()=>order('quantity')} {...demoProps('t3')}>数量 ↕</Button></th></tr></thead><tbody>{filtered.slice(page*3,page*3+3).map(item=><tr key={item.id}><td><SpringCheckbox aria-label={'选择'+item.title} checked={selected.includes(item.id)} onChange={event=>setSelected(current=>event.target.checked?[...current,item.id]:current.filter(id=>id!==item.id))} /></td><td>{item.title}</td><td>{item.category}</td><td>{item.quantity}</td></tr>)}{!filtered.length?<tr><td colSpan={4}>没有符合条件的任务。</td></tr>:null}</tbody></table></div>
    <Pager page={page} pageSize={3} total={filtered.length} onChange={setPage} {...demoProps('t5')} /><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">已选择 {selected.length} 项。</p>
  </BusinessDemo>;
}
