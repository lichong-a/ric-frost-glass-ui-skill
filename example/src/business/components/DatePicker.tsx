import ownedStyles0 from './AnimatedSelect.module.css';
import ownedStyles1 from './DatePicker.module.css';
import { componentClasses } from '../class-names';
import { useEffect, useId, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { CalendarDays, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { controlSpring, useBusinessReducedMotion } from '../motion-preference';
import { Button } from './Button';
import { Popover } from './Popover';
import { AnimatedSwap } from './AnimatedSwap';
import { calendarDateValue, calendarMonthDays, constrainCalendarDate, isCalendarDateDisabled, moveCalendarDays, moveCalendarMonths, parseCalendarDate } from '../date-utils';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
const week = ['一', '二', '三', '四', '五', '六', '日'];
const describeDate = (date: Date) => `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 星期${week[(date.getDay() + 6) % 7]}`;
function Calendar({ value, onChange, onClose, label, min, max, rangeStart, rangeEnd, today }: {
  value: string; onChange: (value: string) => void; onClose: () => void; label: string;
  min?: string; max?: string; rangeStart?: string; rangeEnd?: string; today: string;
}) {
  const initial = constrainCalendarDate(parseCalendarDate(value) ?? parseCalendarDate(today)!, min, max);
  const [month, setMonth] = useState(initial);
  const [focused, setFocused] = useState(calendarDateValue(initial));
  const grid = useRef<HTMLDivElement>(null);
  const shouldFocus = useRef(true);
  const reduced = useBusinessReducedMotion();
  const prefix = useId();
  const days = calendarMonthDays(month);
  const monthKey = `${month.getFullYear()}-${month.getMonth()}`;

  useEffect(() => {
    if (!shouldFocus.current) return;
    const frame = requestAnimationFrame(() => {
      grid.current?.querySelector<HTMLButtonElement>(`[data-animated-swap]:not([inert]) [data-date="${focused}"]`)?.focus({ preventScroll: true });
      shouldFocus.current = false;
    });
    return () => cancelAnimationFrame(frame);
  }, [focused, monthKey]);

  const moveFocus = (next: Date) => {
    const date = constrainCalendarDate(next, min, max);
    shouldFocus.current = true;
    setFocused(calendarDateValue(date));
    setMonth(date);
  };
  const changeMonth = (direction: number) => {
    const next = constrainCalendarDate(moveCalendarMonths(parseCalendarDate(focused) ?? month, direction), min, max);
    setFocused(calendarDateValue(next));
    setMonth(next);
  };
  const select = (next: string) => { onChange(next); onClose(); };
  const previousMonth = moveCalendarMonths(month, -1);
  const lastPrevious = new Date(previousMonth);
  lastPrevious.setMonth(lastPrevious.getMonth() + 1, 0);
  const nextMonth = moveCalendarMonths(month, 1);
  nextMonth.setDate(1);

  return <div data-ui="aw-business-calendar" className={cn("aw-business-calendar")} role="dialog" aria-label={`${label}日历`}>
    <header data-ui="aw-business-calendar-header" className={cn("aw-business-calendar-header")}>
      <div><span data-ui="aw-business-calendar-eyebrow" className={cn("aw-business-calendar-eyebrow")}>选择日期</span><h3 id={`${prefix}-month`} aria-live="polite">{month.getFullYear()} 年 <strong>{String(month.getMonth() + 1).padStart(2, '0')}</strong> 月</h3></div>
      <div data-ui="aw-business-calendar-nav" className={cn("aw-business-calendar-nav")}><Button className={cn("aw-business-calendar-nav-button")} variant="secondary" aria-label="上个月" disabled={!!min && calendarDateValue(lastPrevious) < min} onClick={() => changeMonth(-1)}><ChevronLeft size={17} /></Button><Button className={cn("aw-business-calendar-nav-button")} variant="secondary" aria-label="下个月" disabled={!!max && calendarDateValue(nextMonth) > max} onClick={() => changeMonth(1)}><ChevronRight size={17} /></Button></div>
    </header>
    <div data-ui="aw-business-calendar-grid" ref={grid} role="grid" aria-labelledby={`${prefix}-month`} className={cn("aw-business-calendar-grid")} onKeyDown={event => {
      const date = parseCalendarDate(focused);
      if (!date) return;
      let next: Date | null = null;
      if (event.key === 'ArrowLeft') next = moveCalendarDays(date, -1);
      else if (event.key === 'ArrowRight') next = moveCalendarDays(date, 1);
      else if (event.key === 'ArrowUp') next = moveCalendarDays(date, -7);
      else if (event.key === 'ArrowDown') next = moveCalendarDays(date, 7);
      else if (event.key === 'Home') next = moveCalendarDays(date, -((date.getDay() + 6) % 7));
      else if (event.key === 'End') next = moveCalendarDays(date, 6 - ((date.getDay() + 6) % 7));
      else if (event.key === 'PageUp') next = moveCalendarMonths(date, event.shiftKey ? -12 : -1);
      else if (event.key === 'PageDown') next = moveCalendarMonths(date, event.shiftKey ? 12 : 1);
      if (next) { event.preventDefault(); moveFocus(next); }
    }}>
      <div data-ui="aw-business-calendar-week" role="row" className={cn("aw-business-calendar-week")}>{week.map(day => <span role="columnheader" key={day}>{day}</span>)}</div>
      <AnimatedSwap data-ui="aw-business-calendar-month" value={monthKey} className={cn("aw-business-calendar-month")}><div role="rowgroup">{Array.from({ length: 6 }, (_, row) => <div data-ui="aw-business-calendar-row" role="row" className={cn("aw-business-calendar-row")} key={row}>
        {days.slice(row * 7, row * 7 + 7).map(date => {
          const dateValue = calendarDateValue(date);
          const selected = dateValue === value;
          const inRange = !!rangeStart && !!rangeEnd && dateValue >= rangeStart && dateValue <= rangeEnd;
          return <div role="gridcell" aria-selected={selected} key={dateValue} data-range={inRange} data-edge={inRange && (dateValue === rangeStart || dateValue === rangeEnd)}>
            <motion.button type="button" data-date={dateValue} data-outside={date.getMonth() !== month.getMonth()} aria-label={describeDate(date)}
              aria-current={dateValue === today ? 'date' : undefined} disabled={isCalendarDateDisabled(dateValue, min, max)}
              tabIndex={dateValue === focused ? 0 : -1} data-selected={selected} onFocus={() => setFocused(dateValue)} onClick={() => select(dateValue)}
              whileTap={reduced ? undefined : { scale: 0.88 }} transition={reduced ? { duration: 0 } : controlSpring}>{date.getDate()}</motion.button>
          </div>;
        })}
      </div>)}</div></AnimatedSwap>
    </div>
    <footer data-ui="aw-business-calendar-footer" className={cn("aw-business-calendar-footer")}><Button className={cn("aw-business-calendar-footer-button")} variant="secondary" disabled={isCalendarDateDisabled(today, min, max)} onClick={() => select(today)}>今天</Button><span>{value ? `${value.slice(5).replace('-', ' / ')}` : '尚未选择'}</span><Button className={cn("aw-business-calendar-footer-button")} variant="secondary" disabled={!value} onClick={() => select('')}><X size={14} />清除</Button></footer>
  </div>;
}
export function DatePicker({ id, value, onChange, label, min, max, rangeStart, rangeEnd }: {
  id?: string; value: string; onChange: (value: string) => void; label: string;
  min?: string; max?: string; rangeStart?: string; rangeEnd?: string;
}) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const anchor = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [today] = useState(() => calendarDateValue(new Date()));
  const close = () => { setOpen(false); anchor.current?.focus({ preventScroll: true }); };
  return <>
    <button data-ui="aw-business-select-trigger" type="button" ref={anchor} id={controlId} className={cn("aw-business-select-trigger aw-business-date-trigger")} aria-label={`${label}：${value || '未选择'}`}
      aria-haspopup="dialog" aria-expanded={open} aria-controls={`${controlId}-calendar`} onClick={() => setOpen(current => !current)}
      onKeyDown={event => { if (event.key === 'ArrowDown') { event.preventDefault(); setOpen(true); } }}>
      <span data-ui="aw-business-date-label" className={cn("aw-business-date-label")}><CalendarDays size={19} aria-hidden="true" /><span data-placeholder={!value}>{value ? value.replaceAll('-', ' / ') : '选择日期'}</span></span>
      <span data-ui="aw-business-date-open" className={cn("aw-business-date-open")} aria-hidden="true">{open ? '−' : '+'}</span>
    </button>
    <Popover open={open} onClose={close} anchorRef={anchor} minWidth={336}><div id={`${controlId}-calendar`}><Calendar value={value} onChange={onChange} onClose={close} label={label} min={min} max={max} rangeStart={rangeStart} rangeEnd={rangeEnd} today={today} /></div></Popover>
  </>;
}
