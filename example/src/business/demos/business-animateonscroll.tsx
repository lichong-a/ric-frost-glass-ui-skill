// Original Agent Wan demonstration using React and native browser controls.
import { useState, useEffect, useRef } from 'react';
import { BusinessDemo } from '../support';
import { MotionSurface } from '../primitives';


export default function BusinessAnimateOnScrollDemo() {
  const scroller=useRef<HTMLDivElement>(null); const target=useRef<HTMLDivElement>(null); const [visible,setVisible]=useState(false); useEffect(()=>{if(!target.current||!scroller.current)return;const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{root:scroller.current,threshold:0.25});observer.observe(target.current);return()=>observer.disconnect();},[]);
  return <BusinessDemo title="AnimateOnScroll" description="滚动到资料卡后触发真实入场动画，离开时恢复；减少运动偏好使用静态显示。">
    <div className="aw-business-item" ref={scroller} tabIndex={0} aria-label="滚动触发动画的资料区" style={{height:260,overflow:'auto'}}><p style={{height:280}}>向下滚动查看入场资料卡。</p><div ref={target} style={{minHeight:100}}>{visible?<MotionSurface><article className="aw-business-item"><h3>资料已进入视野</h3><p>动画由实际可见性驱动。</p></article></MotionSurface>:<p>资料卡将在进入视野时显示。</p>}</div><p style={{height:180}}>向上滚动可再次触发。</p></div>
  </BusinessDemo>;
}
