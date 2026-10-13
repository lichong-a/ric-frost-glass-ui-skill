import ownedStyles0 from './Button.module.css';
import { componentClasses } from '../class-names';
import { type Ref, type ButtonHTMLAttributes } from 'react';
import {useBusinessReducedMotion} from '../motion-preference';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export function Button({ variant = 'primary', className = '', type = 'button', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger'; ref?: Ref<HTMLButtonElement> }) {
  const reduced = useBusinessReducedMotion();
  return <button data-motion={reduced ? "reduce" : "allow"} data-ui="aw-button" {...props} type={type} className={cn(`aw-button ${className}`)} data-variant={variant} />;
}
