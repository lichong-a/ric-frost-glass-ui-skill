import ownedStyles0 from './Dialog.module.css';
import ownedStyles1 from './Popover.module.css';
import { componentClasses } from '../class-names';
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
import { AnimatePresence } from 'motion/react';
import { createPortal } from 'react-dom';
import { DropdownSurface } from './DropdownSurface';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export function Popover({ open, onClose, anchorRef, children, minWidth = 280 }: { open: boolean; onClose: () => void; anchorRef: RefObject<HTMLElement | null>; children: ReactNode; minWidth?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ left: 16, top: 16, width: 280 });
  useLayoutEffect(() => {
    if (!open) return;
    const update = () => {
      const rect = anchorRef.current?.getBoundingClientRect();
      if (!rect) return;
      const width = Math.min(Math.max(rect.width, minWidth), window.innerWidth - 32);
      const height = ref.current?.offsetHeight ?? 220;
      const below = rect.bottom + 8;
      const top = below + height <= window.innerHeight ? below : Math.max(8, rect.top - height - 8);
      setPosition({ left: Math.max(16, Math.min(rect.left, window.innerWidth - width - 16)), top, width });
    };
    update();
    const observer = new ResizeObserver(update);
    if (ref.current) observer.observe(ref.current);
    if (anchorRef.current) observer.observe(anchorRef.current);
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => { observer.disconnect(); window.removeEventListener('resize', update); window.removeEventListener('scroll', update, true); };
  }, [open, anchorRef, minWidth]);
  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!ref.current?.contains(target) && !anchorRef.current?.contains(target)) onClose();
    };
    const onKey = (event: globalThis.KeyboardEvent) => { if (event.key === 'Escape') { onClose(); anchorRef.current?.focus(); } };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('pointerdown', onPointer); document.removeEventListener('keydown', onKey); };
  }, [open, onClose, anchorRef]);
  return typeof document !== 'undefined' ? createPortal(<AnimatePresence>{open ? <DropdownSurface data-ui="aw-business-popover" key="popover" surfaceRef={ref} className={cn("aw-business-popover")} style={position}>{children}</DropdownSurface> : null}</AnimatePresence>, document.body) : null;
}
