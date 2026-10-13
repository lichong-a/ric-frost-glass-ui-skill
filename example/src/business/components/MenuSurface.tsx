import ownedStyles0 from './DemoLayout.module.css';
import { componentClasses } from '../class-names';
import { useEffect, useRef, type ReactNode } from 'react';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export function MenuSurface({ label, children }: { label: string; children: ReactNode }) {
  const menu = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    menu.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();
    return () => { if (previous?.isConnected) previous.focus(); };
  }, []);
  return <div data-ui="aw-business-list" ref={menu} role="menu" aria-label={label} className={cn("aw-business-list")} onKeyDown={event => {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const buttons = [...event.currentTarget.querySelectorAll<HTMLElement>('[role="menuitem"]:not(:disabled)')];
    const index = buttons.findIndex(button => button === document.activeElement);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + buttons.length) % buttons.length;
    buttons[next]?.focus();
  }}>{children}</div>;
}
