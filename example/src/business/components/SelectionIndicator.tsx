import ownedStyles0 from './SelectionIndicator.module.css';
import { componentClasses } from '../class-names';
import { motion } from 'motion/react';
import { controlSpring, useBusinessReducedMotion } from '../motion-preference';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export function SelectionIndicator({ identity, className = '' }: { identity: string; className?: string }) {
  const reduced = useBusinessReducedMotion();
  return <motion.span data-ui="aw-business-selection" aria-hidden="true" className={cn(`aw-business-selection ${className}`)} layoutId={reduced ? undefined : identity}
    initial={false} transition={reduced ? { duration: 0 } : controlSpring} />;
}
