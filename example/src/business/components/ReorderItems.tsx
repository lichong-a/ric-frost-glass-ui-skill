import ownedStyles0 from './Button.module.css';
import ownedStyles1 from './DemoLayout.module.css';
import ownedStyles2 from './ReorderItems.module.css';
import { componentClasses } from '../class-names';
import { AnimatePresence, motion } from 'motion/react';
import { controlSpring, useBusinessReducedMotion } from '../motion-preference';
import type { WorkItem } from '../data';

const ownedStyles={...ownedStyles0,...ownedStyles1,...ownedStyles2};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export function ReorderItems({ items, onChange }: { items: WorkItem[]; onChange: (items: WorkItem[]) => void }) {
  const reduced = useBusinessReducedMotion();
  function move(index: number, direction: number) {
    const next = [...items];
    [next[index], next[index + direction]] = [next[index + direction], next[index]];
    onChange(next);
  }
  return <ol data-ui="aw-business-reorder" className={cn("aw-business-reorder")}><AnimatePresence initial={false}>{items.map((item, index) => <motion.li data-ui="aw-business-item" layout={!reduced} transition={reduced ? { duration: 0 } : controlSpring} key={item.id} className={cn("aw-business-item")}>
    <span>{item.title}</span><div data-ui="aw-business-row" className={cn("aw-business-row")}><button data-ui="aw-button" type="button" className={cn("aw-button")} aria-label={`上移${item.title}`} disabled={index === 0} onClick={() => move(index, -1)}>↑</button><button data-ui="aw-button" type="button" className={cn("aw-button")} aria-label={`下移${item.title}`} disabled={index === items.length - 1} onClick={() => move(index, 1)}>↓</button></div>
  </motion.li>)}</AnimatePresence></ol>;
}
