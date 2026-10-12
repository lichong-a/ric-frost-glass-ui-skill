// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button } from '../support';
import { workItems, ReorderItems } from '../primitives';


export default function BusinessOrderListDemo() {
  const [items,setItems]=useState(workItems);
  return <BusinessDemo title="OrderList" description="用上下移按钮重新排列本地任务，排序结果即时保存到当前示例状态。">
    <ReorderItems items={items} onChange={setItems} /><Button variant="secondary" onClick={()=>setItems(workItems)}>恢复初始顺序</Button><p className="aw-business-status" role="status">当前顺序：{items.map(item=>item.title).join('、')}</p>
  </BusinessDemo>;
}
