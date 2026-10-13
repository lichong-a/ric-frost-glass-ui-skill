import ownedStyles0 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { useState, useRef } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { useBusinessReducedMotion } from '../../motion-preference';
import { useDemoConfig } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessScrollAreaDemo() {
  const { props: demoProps } = useDemoConfig();
  const reduced=useBusinessReducedMotion(); const scroller=useRef<HTMLDivElement>(null); const [position,setPosition]=useState(0);
  return <BusinessDemo title="ScrollArea" description="在有限高度的资料区滚动，记录当前位置并可返回顶部。">
    <div data-ui="aw-business-item" ref={scroller} className={cn("aw-business-item")} style={{height:250,overflow:'auto'}} tabIndex={0} aria-label="可滚动资料列表" onScroll={event=>setPosition(Math.round(event.currentTarget.scrollTop))}>{Array.from({length:16},(_,index)=><p key={index} style={{padding:12}}>第 {index+1} 条资料：保持内容、来源与结果有序。</p>)}</div><div data-ui="aw-business-row" className={cn("aw-business-row")}><Button variant="secondary" onClick={()=>scroller.current?.scrollTo({top:0,behavior:reduced?'auto':'smooth'})} {...demoProps('t0')}>回到顶部</Button><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">已滚动 {position}px</p></div>
  </BusinessDemo>;
}
