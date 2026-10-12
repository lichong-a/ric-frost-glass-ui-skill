// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Field } from '../support';
import { workItems, Pager } from '../primitives';


export default function BusinessPaginatorDemo() {
  const [page,setPage]=useState(0); const [size,setSize]=useState(2);
  return <BusinessDemo title="Paginator" description="分页浏览本地记录，页容量改变时回到第一页。">
    <Field label="每页数量"><select className="aw-business-input" value={size} onChange={event=>{setSize(Number(event.target.value));setPage(0);}}><option value="2">2 项</option><option value="3">3 项</option></select></Field><ul>{workItems.slice(page*size,page*size+size).map(item=><li key={item.id}>{item.title}</li>)}</ul><Pager page={page} pageSize={size} total={workItems.length} onChange={setPage} />
  </BusinessDemo>;
}
