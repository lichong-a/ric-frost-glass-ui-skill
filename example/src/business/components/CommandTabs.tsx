import { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { controlSpring, useBusinessReducedMotion } from '../motion-preference';
import { commandIndexForKey, commandSelectionIndex } from './command-menu-state';
import styles from './CommandTabs.module.css';

export interface CommandTabItem {
  value: string;
  label: string;
  count: number;
}

interface LiquidMarker { x: number; width: number; from: number; }

/** Controlled command categories; the liquid layer never handles input or focus. */
export function CommandTabs({ items, value, onValueChange, idPrefix, panelId }: { items: readonly CommandTabItem[]; value: string; onValueChange: (value: string) => void; idPrefix: string; panelId: string }) {
  const reduced = useBusinessReducedMotion();
  const tabList = useRef<HTMLDivElement>(null);
  const buttons = useRef(new Map<string, HTMLButtonElement>());
  const previousCenter = useRef<number | null>(null);
  const [marker, setMarker] = useState<LiquidMarker | null>(null);
  const filterId = `${idPrefix.replace(/:/g, '')}-command-liquid`;
  const selectedIndex = commandSelectionIndex(items.findIndex(item => item.value === value), items.length);
  const selectedValue = selectedIndex === null ? undefined : items[selectedIndex].value;

  useLayoutEffect(() => {
    const container = tabList.current;
    if (!container) return;
    const measure = () => {
      const selected = selectedValue === undefined ? undefined : buttons.current.get(selectedValue);
      if (!selected?.offsetWidth) return;
      const x = selected.offsetLeft;
      const width = selected.offsetWidth;
      const center = x + width / 2;
      const from = previousCenter.current ?? center;
      setMarker(current => current?.x === x && current.width === width ? current : { x, width, from });
      previousCenter.current = center;
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    for (const button of buttons.current.values()) observer.observe(button);
    return () => observer.disconnect();
  }, [items, selectedValue]);

  const targetCenter = marker ? marker.x + marker.width / 2 : 0;
  return <div ref={tabList} role="tablist" aria-label="命令分类" className={styles.tabList} data-motion={reduced ? 'reduce' : 'allow'} data-ready={selectedIndex !== null && Boolean(marker)}>
    <svg className={styles.filterDefinitions} aria-hidden="true" focusable="false"><defs><filter id={filterId} x="-30%" y="-70%" width="160%" height="240%" colorInterpolationFilters="sRGB"><feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" /><feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" /></filter></defs></svg>
    {marker && selectedIndex !== null ? <span className={styles.liquidLayer} aria-hidden="true" style={{ filter: reduced ? 'none' : `url(#${filterId})` }}>
      <motion.span className={styles.selection} initial={false} animate={{ x: marker.x, width: marker.width }} transition={reduced ? { duration: 0 } : controlSpring} />
      {!reduced && Math.abs(marker.from - targetCenter) > 1 ? [-1, 1].map(direction => <motion.span className={styles.drop} key={`${marker.x}-${direction}`} initial={{ x: marker.from - 9, y: 0, scale: .5 }} animate={{ x: [marker.from - 9, (marker.from + targetCenter) / 2 - 9, targetCenter - 9], y: [0, direction * 10, 0], scale: [.5, 1.1, 0] }} transition={{ duration: .44, delay: direction === 1 ? .035 : 0, ease: 'easeOut', times: [0, .5, 1] }} />) : null}
    </span> : null}
    {items.map((item, index) => <button key={item.value} ref={button => { if (button) buttons.current.set(item.value, button); else buttons.current.delete(item.value); }} id={`${idPrefix}-category-${item.value}`} type="button" role="tab" aria-selected={selectedIndex === index} aria-controls={panelId} tabIndex={selectedIndex === index ? 0 : -1} className={styles.tab} onClick={() => onValueChange(item.value)} onKeyDown={event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      const next = commandIndexForKey(index, items.length, event.key);
      if (next === null) return;
      event.preventDefault();
      onValueChange(items[next].value);
      buttons.current.get(items[next].value)?.focus();
    }}><span>{item.label}</span><span className={styles.count} aria-label={`${item.count} 条命令`}>{item.count}</span></button>)}
  </div>;
}
