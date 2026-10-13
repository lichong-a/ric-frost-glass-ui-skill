import ownedStyles0 from './ImageCompare.module.css';
import { componentClasses } from '../class-names';
import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronsLeftRight } from 'lucide-react';
import { controlSpring, useBusinessReducedMotion } from '../motion-preference';
import { RangeSlider } from './RangeSlider';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export function ImageCompare({ before, after, value, onChange }: { before: string; after: string; value: number; onChange: (value: number) => void }) {
  const frame = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const reduced = useBusinessReducedMotion();
  const transition = reduced || dragging ? { duration: 0 } : controlSpring;
  return <div data-ui="aw-business-comparison" className={cn("aw-business-comparison")}>
    <div data-ui="aw-business-comparison-images" ref={frame} className={cn("aw-business-comparison-images")}><img src={before} alt="调整前的自然色示意图" draggable={false} /><motion.img src={after} alt="调整后的自然色示意图" draggable={false} initial={false} animate={{ clipPath: `inset(0 ${100 - value}% 0 0)` }} transition={transition} /><motion.div data-ui="aw-business-comparison-line" className={cn("aw-business-comparison-line")} initial={false} animate={{ left: `${value}%` }} transition={transition}>
      <button data-ui="aw-business-comparison-handle" type="button" className={cn("aw-business-comparison-handle")} role="slider" aria-label="拖动图片对比线" aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}
        onPointerDown={event => { setDragging(true); event.currentTarget.setPointerCapture(event.pointerId); }} onPointerMove={event => {
          if (!dragging || !frame.current) return;
          const rect = frame.current.getBoundingClientRect();
          onChange(Math.round(Math.max(0, Math.min(100, (event.clientX - rect.left) / rect.width * 100))));
        }} onPointerUp={() => setDragging(false)} onPointerCancel={() => setDragging(false)} onLostPointerCapture={() => setDragging(false)} onKeyDown={event => {
          if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
          event.preventDefault();
          onChange(event.key === 'Home' ? 0 : event.key === 'End' ? 100 : Math.max(0, Math.min(100, value + (event.key === 'ArrowLeft' || event.key === 'ArrowDown' ? -1 : 1))));
        }}><ChevronsLeftRight size={20} aria-hidden="true" /></button>
    </motion.div></div>
    <label>对比位置：{value}%<RangeSlider min="0" max="100" value={value} onChange={event => onChange(Number(event.target.value))} aria-label="调整前后图片对比位置" /></label>
  </div>;
}
