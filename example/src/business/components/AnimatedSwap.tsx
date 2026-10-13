import ownedStyles0 from './AnimatedSwap.module.css';
import { componentClasses } from '../class-names';
import { forwardRef, type ReactNode } from 'react';
import { AnimatePresence, motion, useIsPresent } from 'motion/react';
import { useBusinessReducedMotion } from '../motion-preference';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
const SwapLayer = forwardRef<HTMLDivElement, { children: ReactNode; className: string; reduced: boolean }>(function SwapLayer({ children, className, reduced }, ref) {
  const present = useIsPresent();
  return <motion.div data-ui="aw-business-swap" ref={ref} data-animated-swap className={cn(`aw-business-swap ${className}`)} inert={!present} aria-hidden={!present || undefined}
    initial={reduced ? false : { y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={reduced ? undefined : { y: -6, opacity: 0 }}
    transition={{ duration: reduced ? 0 : 0.2 }}>{children}</motion.div>;
});
export function AnimatedSwap({ children, value, className = '' }: { children: ReactNode; value: string | number; className?: string }) {
  const reduced = useBusinessReducedMotion();
  return <AnimatePresence mode="popLayout"><SwapLayer key={value} className={cn(className)} reduced={reduced}>{children}</SwapLayer></AnimatePresence>;
}
