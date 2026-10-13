import ownedStyles0 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { useState, useRef } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { useDemoConfig } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
// 场景：可视化调整有界数值，适合比例或配置；保留键盘和常规增减入口。
export default function KnobDemo() {
  const { props: demoProps } = useDemoConfig();
  const [value, setValue] = useState(65); const ref = useRef<SVGSVGElement>(null);
  function point(x: number,y: number) { const rect = ref.current?.getBoundingClientRect(); if (!rect) return; const angle = (Math.atan2(y-rect.top-rect.height/2,x-rect.left-rect.width/2)*180/Math.PI-135+720)%360; setValue(Math.round(Math.min(270,angle)/270*100)); }
  return <BusinessDemo title="Knob · 数值旋钮" description="拖动旋钮或使用方向键调整 0–100。"><div data-ui="aw-business-row" className={cn("aw-business-row")}><svg data-ui="aw-business-knob" ref={ref} className={cn("aw-business-knob")} viewBox="0 0 120 120" role="slider" tabIndex={0} aria-label="运行配额比例" aria-valuemin={0} aria-valuemax={100} aria-valuenow={value} onPointerDown={event => { event.currentTarget.setPointerCapture(event.pointerId); point(event.clientX,event.clientY); }} onPointerMove={event => { if (event.currentTarget.hasPointerCapture(event.pointerId)) point(event.clientX,event.clientY); }} onPointerUp={event => { if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }} onKeyDown={event => { if (['ArrowLeft','ArrowDown','ArrowRight','ArrowUp','Home','End'].includes(event.key)) { event.preventDefault(); setValue(current => event.key === 'Home' ? 0 : event.key === 'End' ? 100 : Math.min(100,Math.max(0,current + (['ArrowRight','ArrowUp'].includes(event.key) ? 1 : -1)))); } }}><circle cx="60" cy="60" r="46" fill="none" stroke="var(--aw-color-border-decorative)" strokeWidth="9" strokeDasharray="217 289" transform="rotate(135 60 60)" /><circle cx="60" cy="60" r="46" fill="none" stroke="var(--aw-color-action-primary)" strokeWidth="9" strokeDasharray={`${217*value/100} 289`} transform="rotate(135 60 60)" /><text x="60" y="66" textAnchor="middle" fill="currentColor" fontSize="23">{value}%</text></svg><Button variant="secondary" onClick={() => setValue(current => Math.max(0,current-5))} {...demoProps('t0')}>−5</Button><Button variant="secondary" onClick={() => setValue(current => Math.min(100,current+5))} {...demoProps('t1')}>+5</Button></div></BusinessDemo>;
}
