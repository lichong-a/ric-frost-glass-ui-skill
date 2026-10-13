import ownedStyles0 from './Dialog.module.css';
import { componentClasses } from '../class-names';
import { useEffect, useId, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useBusinessReducedMotion } from '../motion-preference';
import { Button } from './Button';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export function Dialog({ open, onClose, title, children, side }: { open: boolean; onClose: () => void; title: string; children: ReactNode; side?: 'right' | 'left' | 'top' | 'bottom' }) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const reduced = useBusinessReducedMotion();
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (open || !dialog.open) return;
    if (reduced) { dialog.close(); return; }
    const to = side === 'right' ? 'translateX(100%)' : side === 'left' ? 'translateX(-100%)' : side === 'top' ? 'translateY(-100%)' : side === 'bottom' ? 'translateY(100%)' : 'translateY(10px) scale(.98)';
    const animation = dialog.animate([{ transform: 'none' }, { transform: to }], { duration: 160, easing: 'ease-in', fill: 'forwards' });
    animation.onfinish = () => { dialog.close(); animation.cancel(); };
    return () => { animation.onfinish = null; animation.cancel(); };
  }, [open, reduced, side]);
  useEffect(() => {
    const dialog = ref.current;
    return () => { if (dialog?.open) dialog.close(); };
  }, []);
  if (typeof document === 'undefined') return null;
  return createPortal(<dialog data-ui="aw-business-dialog" ref={ref} className={cn("aw-business-dialog aw-business-overlay")} data-side={side} aria-labelledby={titleId} onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target === event.currentTarget) {
    const rect = event.currentTarget.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
  } }}><header><h2 id={titleId}>{title}</h2><Button variant="secondary" aria-label="关闭" onClick={onClose}>×</Button></header><div data-ui="aw-business-dialog-content" className={cn("aw-business-dialog-content")}>{children}</div></dialog>, document.body);
}
