import styles from './MenuSurface.module.css';
import { useEffect, useRef, type ReactNode } from 'react';

export function MenuSurface({ label, children }: { label: string; children: ReactNode }) {
  const menu = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    menu.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();
    return () => { if (previous?.isConnected) previous.focus(); };
  }, []);
  return <div data-ui="aw-business-list" ref={menu} role="menu" aria-label={label} className={styles.menu} onKeyDown={event => {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const buttons = [...event.currentTarget.querySelectorAll<HTMLElement>('[role="menuitem"]:not(:disabled)')];
    if (!buttons.length) return;
    const index = buttons.findIndex(button => button === document.activeElement);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + buttons.length) % buttons.length;
    buttons[next]?.focus();
  }}>{children}</div>;
}
