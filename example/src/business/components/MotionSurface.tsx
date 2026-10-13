import ownedStyles0 from './MotionSurface.module.css';
import { componentClasses } from '../class-names';
import { type ReactNode } from 'react';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export function MotionSurface({ children }: { children: ReactNode }) {
  return <div data-ui="aw-business-motion-surface" className={cn("aw-business-motion-surface")}>{children}</div>;
}
