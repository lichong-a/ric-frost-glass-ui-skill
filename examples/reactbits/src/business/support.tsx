import { cloneElement, isValidElement, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import type { ButtonHTMLAttributes, ReactNode, RefObject } from 'react';
import { createPortal } from 'react-dom';
import './business.css';

export function BusinessDemo({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return <section className="aw-business" aria-label={`${title} 组件演示`}><header className="aw-business-heading"><span>业务基础组件</span><h2>{title}</h2>{description ? <p>{description}</p> : null}</header><div className="aw-business-content">{children}</div></section>;
}

export function Button({ variant = 'primary', className = '', type = 'button', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger' }) {
  return <button {...props} type={type} className={`aw-button ${className}`} data-variant={variant} />;
}

export function Field({ label, children, hint, htmlFor }: { label: string; children: ReactNode; hint?: string; htmlFor?: string }) {
  const generatedId = useId();
  const hintId = `${generatedId}-hint`;
  const isControl = isValidElement<{ id?: string; 'aria-describedby'?: string }>(children) && typeof children.type === 'string' && ['input', 'select', 'textarea'].includes(children.type);
  const controlId = htmlFor || (isControl ? children.props.id : undefined) || generatedId;
  const content = isControl ? cloneElement(children, {
    id: controlId,
    'aria-describedby': [children.props['aria-describedby'], hint ? hintId : undefined].filter(Boolean).join(' ') || undefined,
  }) : htmlFor ? children : <div role="group" aria-labelledby={`${generatedId}-label`}>{children}</div>;
  return <div className="aw-business-field"><label id={`${generatedId}-label`} htmlFor={isControl || htmlFor ? controlId : undefined}>{label}</label>{content}{hint ? <small id={hintId}>{hint}</small> : null}</div>;
}

export function Dialog({ open, onClose, title, children, side }: { open: boolean; onClose: () => void; title: string; children: ReactNode; side?: 'right' | 'left' }) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
    return () => { if (dialog.open) dialog.close(); };
  }, [open]);
  if (typeof document === 'undefined') return null;
  return createPortal(<dialog ref={ref} className="aw-business-dialog aw-business-overlay" data-side={side} aria-labelledby={titleId} onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target === event.currentTarget) {
    const rect = event.currentTarget.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
  } }}><header><h2 id={titleId}>{title}</h2><Button variant="secondary" aria-label="关闭" onClick={onClose}>×</Button></header><div className="aw-business-dialog-content">{children}</div></dialog>, document.body);
}

export function Popover({ open, onClose, anchorRef, children }: { open: boolean; onClose: () => void; anchorRef: RefObject<HTMLElement | null>; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ left: 16, top: 16, width: 280 });
  useLayoutEffect(() => {
    if (!open) return;
    const update = () => {
      const rect = anchorRef.current?.getBoundingClientRect();
      if (!rect) return;
      const width = Math.min(Math.max(rect.width, 280), window.innerWidth - 32);
      const height = ref.current?.offsetHeight ?? 220;
      const below = rect.bottom + 8;
      const top = below + height <= window.innerHeight ? below : Math.max(8, rect.top - height - 8);
      setPosition({ left: Math.max(16, Math.min(rect.left, window.innerWidth - width - 16)), top, width });
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => { window.removeEventListener('resize', update); window.removeEventListener('scroll', update, true); };
  }, [open, anchorRef]);
  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!ref.current?.contains(target) && !anchorRef.current?.contains(target)) onClose();
    };
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') { onClose(); anchorRef.current?.focus(); } };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('pointerdown', onPointer); document.removeEventListener('keydown', onKey); };
  }, [open, onClose, anchorRef]);
  return open && typeof document !== 'undefined' ? createPortal(<div ref={ref} className="aw-business-popover aw-business-overlay" style={position}>{children}</div>, document.body) : null;
}
