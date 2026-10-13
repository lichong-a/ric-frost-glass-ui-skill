import ownedStyles0 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { useDemoConfig } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessBadgeDemo() {
  const { props: demoProps } = useDemoConfig();
  const [count,setCount]=useState(3);
  return <BusinessDemo title="Badge" description="用数量标记当前待办，新增和清空会同步标记与可访问名称。">
    <div data-ui="aw-business-row" className={cn("aw-business-row")}><span data-ui="aw-business-item" className={cn("aw-business-item")} aria-label={`待办${count}项`}>待办 <strong style={{display:'inline-grid',placeItems:'center',minWidth:28,height:28,borderRadius:16,background:'var(--aw-color-action-primary)',color:'var(--aw-palette-ivory)'}}>{count>99?'99+':count}</strong></span><Button onClick={()=>setCount(value=>value+1)} {...demoProps('t0')}>新增待办</Button><Button variant="secondary" disabled={!count} onClick={()=>setCount(0)} {...demoProps('t1')}>清空</Button></div><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">当前待办：{count} 项</p>
  </BusinessDemo>;
}
