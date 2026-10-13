import ownedStyles0 from './SpringRadio.module.css';
import { componentClasses } from '../class-names';
import { type InputHTMLAttributes } from 'react';
import { motion } from 'motion/react';
import { controlSpring, useBusinessReducedMotion } from '../motion-preference';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export function SpringRadio({ checked, onChange, ...props }: Omit<InputHTMLAttributes<HTMLInputElement>, 'checked' | 'defaultChecked'> & { checked: boolean }) {
  const reduced = useBusinessReducedMotion();
  return <span data-ui="aw-business-spring-radio" className={cn("aw-business-spring-radio")}><input {...props} type="radio" checked={checked} onChange={onChange} />
    <span data-ui="aw-business-radio-ring" className={cn("aw-business-radio-ring")} aria-hidden="true"><motion.span initial={false} animate={{ scale: checked ? 1 : 0 }} transition={reduced ? { duration: 0 } : controlSpring} /></span>
  </span>;
}
