// Original Agent Wan demonstration using React and native browser controls.
import { useState, useRef } from 'react';
import { BusinessDemo, Button } from '../support';


export default function BusinessScrollAreaDemo() {
  const scroller=useRef<HTMLDivElement>(null); const [position,setPosition]=useState(0);
  return <BusinessDemo title="ScrollArea" description="在有限高度的资料区滚动，记录当前位置并可返回顶部。">
    <div ref={scroller} className="aw-business-item" style={{height:250,overflow:'auto'}} tabIndex={0} aria-label="可滚动资料列表" onScroll={event=>setPosition(Math.round(event.currentTarget.scrollTop))}>{Array.from({length:16},(_,index)=><p key={index} style={{padding:12}}>第 {index+1} 条资料：保持内容、来源与结果有序。</p>)}</div><div className="aw-business-row"><Button variant="secondary" onClick={()=>scroller.current?.scrollTo({top:0,behavior:'auto'})}>回到顶部</Button><p className="aw-business-status" role="status">已滚动 {position}px</p></div>
  </BusinessDemo>;
}
