import ownedStyles0 from './DropdownSurface.module.css';
import { componentClasses } from '../class-names';
import { type CSSProperties, type ReactNode, type Ref } from 'react';
import { motion, useIsPresent } from 'motion/react';
import { controlSpring, useBusinessReducedMotion } from '../motion-preference';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export function DropdownSurface({ children, className = '', style, surfaceRef }: { children: ReactNode; className?: string; style?: CSSProperties; surfaceRef?: Ref<HTMLDivElement> }) {
  const reduced = useBusinessReducedMotion();
  const present = useIsPresent();
  return <motion.div data-ui="aw-business-dropdown" ref={surfaceRef} className={cn(`aw-business-dropdown ${className}`)} style={style} inert={!present} aria-hidden={!present || undefined}
    initial={reduced ? false : { y: -8, scaleY: 0.94 }} animate={{ y: 0, scaleY: 1 }} exit={{ y: reduced ? 0 : -5, scaleY: reduced ? 1 : 0.97 }}
    transition={reduced ? { duration: 0 } : controlSpring}>{children}</motion.div>;
}
