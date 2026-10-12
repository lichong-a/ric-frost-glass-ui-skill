// Original Agent Wan demonstration using React and native browser controls.
import { useState, useRef } from 'react';
import { BusinessDemo } from '../support';


export default function BusinessSplitterDemo() {
  const [ratio,setRatio]=useState(50); const container=useRef<HTMLDivElement>(null); const dragging=useRef(false);
  return <BusinessDemo title="Splitter" description="拖动分隔条或用键盘调整两个工作区的宽度，限制在20%到80%。">
    <div ref={container} className="aw-business-splitter" style={{display:'grid',gridTemplateColumns:`${ratio}fr 16px ${100-ratio}fr`,minHeight:180}}><section className="aw-business-item"><h3>资料</h3><p>左侧工作区</p></section><div role="separator" aria-label="调整工作区宽度" aria-orientation="vertical" aria-valuemin={20} aria-valuemax={80} aria-valuenow={ratio} tabIndex={0} style={{cursor:'col-resize',background:'var(--aw-color-border-control)',touchAction:'none'}} onPointerDown={event=>{dragging.current=true;event.currentTarget.setPointerCapture(event.pointerId);}} onPointerMove={event=>{if(!dragging.current||!container.current)return;const box=container.current.getBoundingClientRect();setRatio(Math.min(80,Math.max(20,Math.round((event.clientX-box.left)/box.width*100))));}} onPointerUp={()=>{dragging.current=false;}} onPointerCancel={()=>{dragging.current=false;}} onKeyDown={event=>{if(['ArrowLeft','ArrowRight'].includes(event.key)){event.preventDefault();setRatio(value=>Math.min(80,Math.max(20,value+(event.key==='ArrowLeft'?-5:5))));}}} /><section className="aw-business-item"><h3>结果</h3><p>右侧工作区</p></section></div><p className="aw-business-status" role="status">左侧 {ratio}% · 右侧 {100-ratio}%</p>
  </BusinessDemo>;
}
