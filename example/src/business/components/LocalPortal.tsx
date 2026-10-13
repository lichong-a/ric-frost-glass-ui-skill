import { componentClasses } from '../class-names';
import { type ReactNode } from 'react';
import { createPortal } from 'react-dom';

const ownedStyles={};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export function LocalPortal({ children, target }: { children: ReactNode; target: HTMLElement | null }) {
  return target ? createPortal(children, target) : null;
}
