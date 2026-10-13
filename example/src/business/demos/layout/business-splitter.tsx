import ownedStyles0 from '../../components/DemoLayout.module.css';
import ownedStyles1 from '../../components/Splitter.module.css';
import { componentClasses } from '../../class-names';
import { useState, useRef } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessSplitterDemo() {
  const { props: demoProps } = useDemoConfig();
  const [ratio,setRatio]=useDemoState('state.ratio', 50); const container=useRef<HTMLDivElement>(null); const dragging=useRef(false); const [isDragging,setIsDragging]=useState(false);
  return <BusinessDemo title="Splitter" description="拖动分隔条或用键盘调整两个工作区的宽度，限制在20%到80%。">
    <div data-ui="aw-business-splitter" ref={container} className={cn("aw-business-splitter")} data-dragging={isDragging} style={{display:'grid',gridTemplateColumns:`minmax(0, ${ratio}fr) 16px minmax(0, ${100-ratio}fr)`,minHeight:180}}><section data-ui="aw-business-item" className={cn("aw-business-item")}><h3>资料</h3><p>左侧工作区</p></section><div role="separator" aria-label="调整工作区宽度" aria-orientation="vertical" aria-valuemin={20} aria-valuemax={80} aria-valuenow={ratio} tabIndex={0} style={{cursor:'col-resize',background:'var(--aw-color-border-control)',touchAction:'none'}} onPointerDown={event=>{dragging.current=true;setIsDragging(true);event.currentTarget.setPointerCapture(event.pointerId);}} onPointerMove={event=>{if(!dragging.current||!container.current)return;const box=container.current.getBoundingClientRect();setRatio(Math.min(80,Math.max(20,Math.round((event.clientX-box.left)/box.width*100))));}} onPointerUp={()=>{dragging.current=false;setIsDragging(false);}} onPointerCancel={()=>{dragging.current=false;setIsDragging(false);}} onLostPointerCapture={()=>{dragging.current=false;setIsDragging(false);}} onKeyDown={event=>{if(['ArrowLeft','ArrowRight'].includes(event.key)){event.preventDefault();setRatio(value=>Math.min(80,Math.max(20,value+(event.key==='ArrowLeft'?-5:5))));}}} {...demoProps('t0')} /><section data-ui="aw-business-item" className={cn("aw-business-item")}><h3>结果</h3><p>右侧工作区</p></section></div><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">左侧 {ratio}% · 右侧 {100-ratio}%</p>
  </BusinessDemo>;
}
