import ownedStyles0 from './AnimatedCollapse.module.css';
import { componentClasses } from '../class-names';
import { type ReactNode } from 'react';
import { motion } from 'motion/react';
import { useBusinessReducedMotion } from '../motion-preference';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export function AnimatedCollapse({ open, children, id, className = '' }: { open: boolean; children: ReactNode; id?: string; className?: string }) {
  const reduced = useBusinessReducedMotion();
  return <motion.div data-ui="aw-business-collapse" id={id} className={cn(`aw-business-collapse ${className}`)} inert={!open} aria-hidden={!open} initial={false}
    animate={{ height: open ? 'auto' : 0 }} transition={reduced ? { duration: 0 } : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
    <div data-ui="aw-business-collapse-inner" className={cn("aw-business-collapse-inner")}>{children}</div>
  </motion.div>;
}
