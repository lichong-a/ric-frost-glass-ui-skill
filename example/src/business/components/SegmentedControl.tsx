import ownedStyles0 from './Button.module.css';
import ownedStyles1 from './SegmentedControl.module.css';
import { componentClasses } from '../class-names';
import { useId, useRef, type ReactNode } from 'react';
import { LayoutGroup, motion } from 'motion/react';
import { Check } from 'lucide-react';
import { controlSpring, useBusinessReducedMotion } from '../motion-preference';
import { SelectionIndicator } from './SelectionIndicator';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export function SegmentedControl({ items, value, values, onChange, label }: {
  items: { value: string; label: ReactNode; disabled?: boolean }[];
  value?: string; values?: readonly string[]; onChange: (value: string) => void; label: string;
}) {
  const identity = useId();
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduced = useBusinessReducedMotion();
  return <LayoutGroup id={identity}><div data-ui="aw-business-rubber-segments" className={cn("aw-business-rubber-segments")} role="group" aria-label={label}>
    {items.map((item, index) => {
      const selected = values ? values.includes(item.value) : value === item.value;
      return <button className={cn('aw-business-button-feedback')} key={item.value} ref={element => { refs.current[index] = element; }} type="button" disabled={item.disabled} aria-pressed={selected}
        onClick={() => onChange(item.value)} onKeyDown={event => {
          if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
          event.preventDefault();
          const available = items.map((option, position) => option.disabled ? -1 : position).filter(position => position >= 0);
          const position = available.indexOf(index);
          const next = event.key === 'Home' ? available[0] : event.key === 'End' ? available.at(-1) : available[(position + (event.key === 'ArrowRight' ? 1 : -1) + available.length) % available.length];
          if (next === undefined) return;
          refs.current[next]?.focus();
          if (!values) onChange(items[next].value);
        }}>
        {selected ? <SelectionIndicator identity={values ? `${identity}-${item.value}` : `${identity}-selected`} /> : null}
        <span data-ui="aw-business-segment-label" className={cn("aw-business-segment-label")}>{values ? <motion.span data-ui="aw-business-segment-check" className={cn("aw-business-segment-check")} initial={false} animate={{ width: selected ? 18 : 0, scale: selected ? 1 : 0 }} transition={reduced ? { duration: 0 } : controlSpring}><Check size={14} /></motion.span> : null}{item.label}</span>
      </button>;
    })}
  </div></LayoutGroup>;
}
