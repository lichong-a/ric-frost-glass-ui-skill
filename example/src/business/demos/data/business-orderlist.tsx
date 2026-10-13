import ownedStyles0 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { workItems } from '../../data';
import { ReorderItems } from '../../components/ReorderItems';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessOrderListDemo() {
  const { props: demoProps } = useDemoConfig();
  const [items,setItems]=useDemoState('state.items', workItems);
  return <BusinessDemo title="OrderList" description="用上下移按钮重新排列本地任务，排序结果即时保存到当前示例状态。">
    <ReorderItems items={items} onChange={setItems} /><Button variant="secondary" onClick={()=>setItems(workItems)} {...demoProps('t1')}>恢复初始顺序</Button><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">当前顺序：{items.map(item=>item.title).join('、')}</p>
  </BusinessDemo>;
}
