// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button, Field } from '../support';
import { workItems, Pager } from '../primitives';


export default function BusinessDataTableDemo() {
  const [query,setQuery]=useState('');
  const [sort,setSort]=useState<'title'|'quantity'>('title');
  const [ascending,setAscending]=useState(true);
  const [page,setPage]=useState(0);
  const [selected,setSelected]=useState<string[]>([]);
  const filtered=workItems.filter(item=>item.title.includes(query)||item.category.includes(query)).sort((a,b)=>(sort==='title'?a.title.localeCompare(b.title,'zh-CN'):a.quantity-b.quantity)*(ascending?1:-1));
  function order(field:'title'|'quantity'){setAscending(field===sort?!ascending:true);setSort(field);setPage(0);}
  return <BusinessDemo title="DataTable" description="在本地任务表中搜索、排序、勾选和分页；没有网络写入。">
    <Field label="搜索任务"><input className="aw-business-input" value={query} onChange={event=>{setQuery(event.target.value);setPage(0);}} /></Field>
    <div style={{overflowX:'auto'}}><table className="aw-business-table"><thead><tr><th scope="col">选择</th><th scope="col" aria-sort={sort==='title'?(ascending?'ascending':'descending'):'none'}><Button variant="secondary" onClick={()=>order('title')}>任务 ↕</Button></th><th scope="col">类别</th><th scope="col" aria-sort={sort==='quantity'?(ascending?'ascending':'descending'):'none'}><Button variant="secondary" onClick={()=>order('quantity')}>数量 ↕</Button></th></tr></thead><tbody>{filtered.slice(page*3,page*3+3).map(item=><tr key={item.id}><td><input type="checkbox" aria-label={'选择'+item.title} checked={selected.includes(item.id)} onChange={event=>setSelected(current=>event.target.checked?[...current,item.id]:current.filter(id=>id!==item.id))} /></td><td>{item.title}</td><td>{item.category}</td><td>{item.quantity}</td></tr>)}{!filtered.length?<tr><td colSpan={4}>没有符合条件的任务。</td></tr>:null}</tbody></table></div>
    <Pager page={page} pageSize={3} total={filtered.length} onChange={setPage} /><p className="aw-business-status" role="status">已选择 {selected.length} 项。</p>
  </BusinessDemo>;
}
