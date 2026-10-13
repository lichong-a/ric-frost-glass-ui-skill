import ownedStyles0 from './SpringCheckbox.module.css';
import { componentClasses } from '../class-names';
import { useState, type InputHTMLAttributes } from 'react';
import { motion } from 'motion/react';
import { controlSpring, useBusinessReducedMotion } from '../motion-preference';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export function SpringCheckbox({ checked, defaultChecked = false, onChange, className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  const [inner, setInner] = useState(defaultChecked);
  const selected = checked ?? inner;
  const reduced = useBusinessReducedMotion();
  const transition = reduced ? { duration: 0 } : controlSpring;
  return <span data-ui="aw-business-spring-check" className={cn(`aw-business-spring-check ${className}`)}>
    <input {...props} type="checkbox" checked={selected} onChange={event => {
      if (checked === undefined) setInner(event.target.checked);
      onChange?.(event);
    }} />
    <motion.span data-ui="aw-business-check-box" className={cn("aw-business-check-box")} aria-hidden="true" initial={false}
      animate={{ scale: selected && !reduced ? [1, 1.16, 1] : 1 }} transition={reduced ? { duration: 0 } : { duration: 0.3 }}>
      <motion.span data-ui="aw-business-check-fill" className={cn("aw-business-check-fill")} initial={false} animate={{ scale: selected ? 1 : 0 }} transition={transition} />
      <svg viewBox="0 0 24 24" fill="none"><motion.path d="m5 12 4 4 10-10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        initial={false} animate={{ pathLength: selected ? 1 : 0 }} transition={reduced ? { duration: 0 } : { duration: 0.22, delay: selected ? 0.06 : 0 }} /></svg>
    </motion.span>
  </span>;
}
