import ownedStyles0 from './ToggleButton.module.css';
import { componentClasses } from '../class-names';
import { type Ref, type ButtonHTMLAttributes } from 'react';
import { motion } from 'motion/react';
import { Check, Plus } from 'lucide-react';
import { controlSpring, useBusinessReducedMotion } from '../motion-preference';
import { Button } from './Button';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export function ToggleButton({ pressed, onPressedChange, children, ...props }: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & { pressed: boolean; onPressedChange: (pressed: boolean) => void; ref?: Ref<HTMLButtonElement> }) {
  const reduced = useBusinessReducedMotion();
  return <Button {...props} variant={pressed ? 'primary' : 'secondary'} aria-pressed={pressed} onClick={() => onPressedChange(!pressed)}>
    <span data-ui="aw-business-toggle-content" className={cn("aw-business-toggle-content")}><motion.span aria-hidden="true" style={{ display: 'flex' }} initial={false} animate={{ rotate: pressed ? 0 : -90, scale: pressed ? 1.08 : 1 }} transition={reduced ? { duration: 0 } : controlSpring}>{pressed ? <Check size={17} /> : <Plus size={17} />}</motion.span>{children}</span>
  </Button>;
}
