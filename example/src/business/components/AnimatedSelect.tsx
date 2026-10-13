import ownedStyles0 from './AnimatedSelect.module.css';
import ownedStyles1 from './Button.module.css';
import ownedStyles2 from './SelectOptions.module.css';
import { componentClasses } from '../class-names';
import { useEffect, useId, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, ChevronDown } from 'lucide-react';
import { controlSpring, useBusinessReducedMotion } from '../motion-preference';
import { DropdownSurface } from './DropdownSurface';

const ownedStyles={...ownedStyles0,...ownedStyles1,...ownedStyles2};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export function AnimatedSelect({ id, value, options, onChange, label, placeholder = '请选择', disabled = false }: {
  id?: string; value: string; options: readonly (string | { value: string; label: string })[];
  onChange: (value: string) => void; label: string; placeholder?: string; disabled?: boolean;
}) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const listId = `${controlId}-options`;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const reduced = useBusinessReducedMotion();
  const items = options.map(option => typeof option === 'string' ? { value: option, label: option } : option);
  const choose = (next: string) => { onChange(next); setOpen(false); };
  useEffect(() => { if (disabled) setOpen(false); }, [disabled]);
  useEffect(() => {
    if (open) document.getElementById(`${listId}-${active}`)?.scrollIntoView({ block: 'nearest' });
  }, [active, listId, open]);
  return <div data-ui="aw-business-combo" className={cn("aw-business-combo")} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
    <button data-ui="aw-business-select-trigger" id={controlId} className={cn("aw-business-select-trigger")} type="button" role="combobox" aria-label={label} aria-expanded={open && !disabled} disabled={disabled}
      aria-controls={listId} aria-haspopup="listbox" aria-activedescendant={open && items[active] ? `${listId}-${active}` : undefined}
      onClick={() => { setActive(Math.max(0, items.findIndex(item => item.value === value))); setOpen(current => !current); }}
      onKeyDown={event => {
        if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
          event.preventDefault();
          if (!open) { setOpen(true); setActive(Math.max(0, items.findIndex(item => item.value === value))); }
          else setActive(current => event.key === 'Home' ? 0 : event.key === 'End' ? Math.max(0, items.length - 1) : (current + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % Math.max(1, items.length));
        } else if (open && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); if (items[active]) choose(items[active].value); }
        else if (event.key === 'Escape') { event.preventDefault(); setOpen(false); }
        else if (event.key.length === 1 && event.key !== ' ' && !event.ctrlKey && !event.metaKey) {
          const next = items.findIndex(item => item.label.toLocaleLowerCase().startsWith(event.key.toLocaleLowerCase()));
          if (next >= 0) { setActive(next); if (!open) onChange(items[next].value); }
        }
      }}>
      <span data-placeholder={!value}>{items.find(item => item.value === value)?.label || placeholder}</span>
      <motion.span aria-hidden="true" animate={{ rotate: open ? 180 : 0 }} transition={reduced ? { duration: 0 } : controlSpring}><ChevronDown size={18} /></motion.span>
    </button>
    <AnimatePresence>{open && !disabled ? <DropdownSurface data-ui="aw-business-combo-list" className={cn("aw-business-combo-list")} key="options"><ul data-ui="aw-business-options" id={listId} role="listbox" aria-label={label} className={cn("aw-business-options")}>
      {items.length ? items.map((item, index) => <li id={`${listId}-${index}`} key={item.value} role="option" aria-selected={item.value === value} data-active={active === index}>
        <button className={cn('aw-business-button-feedback')} type="button" tabIndex={-1} onPointerDown={event => event.preventDefault()} onPointerMove={() => setActive(index)} onClick={() => choose(item.value)}><span>{item.label}</span>{item.value === value ? <Check size={16} aria-hidden="true" /> : null}</button>
      </li>) : <li data-ui="aw-business-empty" className={cn("aw-business-empty")}>没有可用选项</li>}
    </ul></DropdownSurface> : null}</AnimatePresence>
  </div>;
}
