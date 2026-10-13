import ownedStyles0 from './FocusRegion.module.css';
import { componentClasses } from '../class-names';
import { useEffect, useRef, type ReactNode, type RefObject, type KeyboardEvent } from 'react';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export function FocusRegion({ active, onExit, children, returnFocusRef }: { active: boolean; onExit?: () => void; children: ReactNode; returnFocusRef?: RefObject<HTMLElement | null> }) {
  const region = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!active || !region.current) return;
    const previous = returnFocusRef?.current ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    const first = region.current.querySelector<HTMLElement>('button:not(:disabled), input:not(:disabled), [tabindex="0"]');
    first?.focus();
    return () => { if (previous?.isConnected) previous.focus(); };
  }, [active, returnFocusRef]);
  const trap = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!active || !region.current) return;
    if (event.key === 'Escape') { event.preventDefault(); onExit?.(); return; }
    if (event.key !== 'Tab') return;
    const controls = [...region.current.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex="0"]')].filter(element => !element.closest('[hidden], [inert]') && element.getClientRects().length > 0);
    const first = controls[0], last = controls.at(-1);
    if (!first) { event.preventDefault(); region.current.focus(); return; }
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  };
  return <div data-ui="aw-business-focus-region" className={cn("aw-business-focus-region")} data-active={active} ref={region} tabIndex={-1} onKeyDown={trap}>{children}</div>;
}
