import ownedStyles0 from './ScreenReaderText.module.css';
import { componentClasses } from '../class-names';
import { type ReactNode } from 'react';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export function ScreenReaderText({ children }: { children: ReactNode }) {
  return <span data-ui="aw-business-visually-hidden" className={cn("aw-business-visually-hidden")}>{children}</span>;
}
