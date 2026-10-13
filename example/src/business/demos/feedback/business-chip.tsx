import { useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion, useIsPresent } from 'motion/react';
import { X } from 'lucide-react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { useBusinessReducedMotion } from '../../motion-preference';
import styles from './business-chip.module.css';
import { useDemoConfig } from '../../../parameters/DemoConfig';

function KeywordChip({ label, reduced, onRemove, registerButton }: {
  label: string;
  reduced: boolean;
  onRemove: (label: string) => void;
  registerButton: (label: string, node: HTMLButtonElement | null) => void;
}) {
  const present = useIsPresent();

  function remove() {
    onRemove(label);
  }

  const buttonRef = useCallback((node: HTMLButtonElement | null) => {
    registerButton(label, node);
  }, [label, registerButton]);

  return (
    <motion.li
      className={styles.chip}
      data-motion={reduced ? 'reduce' : 'allow'}
      layout={reduced ? false : 'position'}
      inert={!present}
      aria-hidden={!present || undefined}
      initial={reduced ? false : { opacity: 0, y: 6, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: reduced ? 0 : -4, scale: reduced ? 1 : 0.88 }}
      transition={{ duration: reduced ? 0 : 0.18 }}
    >
      <span className={styles.label}>{label}</span>
      <button ref={buttonRef} className={styles.remove} type="button" aria-label={'移除' + label} onClick={remove}>
        <X size={12} aria-hidden="true" />
      </button>
    </motion.li>
  );
}

export default function BusinessChipDemo() {
  const { props: demoProps } = useDemoConfig();
  const initial = ['知识', '文档', '服务'];
  const [chips, setChips] = useState(initial);
  const reduced = useBusinessReducedMotion();
  const chipButtons = useRef(new Map<string, HTMLButtonElement>());
  const restoreRef = useRef<HTMLButtonElement>(null);

  const registerButton = useCallback((label: string, node: HTMLButtonElement | null) => {
    if (node) chipButtons.current.set(label, node);
    else chipButtons.current.delete(label);
  }, []);

  function removeChip(label: string) {
    const index = chips.indexOf(label);
    const next = chips.filter(item => item !== label);
    const moveFocus = chipButtons.current.get(label) === document.activeElement;
    setChips(next);
    if (moveFocus) {
      const nextLabel = next[Math.min(index, next.length - 1)];
      const nextButton = nextLabel ? chipButtons.current.get(nextLabel) : restoreRef.current;
      nextButton?.focus();
    }
  }

  function restoreChips() {
    setChips(initial);
  }

  return (
    <BusinessDemo title="Chip" description="移除已选关键词，空状态保留恢复入口。">
      <ul className={styles.list} aria-label="已选关键词">
        <AnimatePresence initial={false}>
          {chips.map(label => (
            <KeywordChip key={label} label={label} reduced={reduced} onRemove={removeChip} registerButton={registerButton} />
          ))}
        </AnimatePresence>
      </ul>
      <AnimatePresence>
        {!chips.length ? (
          <motion.p
            className={styles.empty}
            role="status"
            initial={reduced ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.16 }}
          >所有关键词已移除。</motion.p>
        ) : null}
      </AnimatePresence>
      <Button ref={restoreRef} variant="secondary" data-size="sm" onClick={restoreChips} {...demoProps('t0')}>恢复关键词</Button>
    </BusinessDemo>
  );
}
