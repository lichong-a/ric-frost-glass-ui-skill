import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useIsPresent } from 'motion/react';
import { ArrowUpRight, Bot, ChevronRight, FileText, House } from 'lucide-react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { controlSpring, useBusinessReducedMotion } from '../../motion-preference';
import styles from './business-breadcrumb.module.css';
import { useDemoConfig } from '../../../parameters/DemoConfig';

function BreadcrumbStep({ children, reduced }: { children: ReactNode; reduced: boolean }) {
  const present = useIsPresent();
  return <motion.li className={styles.step} inert={!present} aria-hidden={!present || undefined} layout={reduced ? false : 'position'} initial={reduced ? false : { opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={reduced ? { opacity: 0 } : { opacity: 0, x: -6 }} transition={reduced ? { duration: 0 } : controlSpring}>{children}</motion.li>;
}

export default function BusinessBreadcrumbDemo() {
  const { props: demoProps } = useDemoConfig();
  const [level, setLevel] = useState(2);
  const currentCrumb = useRef<HTMLSpanElement>(null);
  const moveFocus = useRef(false);
  const path = ['工作空间', '智能体', '资料助理'];
  const icons = [House, Bot, FileText];
  const reduced = useBusinessReducedMotion();

  useEffect(() => {
    if (!moveFocus.current) return;
    currentCrumb.current?.focus();
    moveFocus.current = false;
  }, [level]);

  return <BusinessDemo title="Breadcrumb" description="沿工作空间层级返回父节点，当前节点保持明确语义。">
    <nav aria-label="面包屑" className={styles.navigation} data-motion={reduced ? 'reduce' : 'allow'}>
      <ol data-ui="aw-business-row" className={styles.trail}>
        <AnimatePresence initial={false}>{path.slice(0, level + 1).map((label, index) => {
          const Icon = icons[index];
          return <BreadcrumbStep key={label} reduced={reduced}>
            {index ? <ChevronRight className={styles.separator} size={13} aria-hidden="true" /> : null}
            {index === level ? <span ref={currentCrumb} tabIndex={-1} className={styles.current} aria-current="page"><Icon size={14} aria-hidden="true" /><span>{label}</span></span> : <Button variant="ghost" data-size="sm" className={styles.crumb} onClick={() => { moveFocus.current = true; setLevel(index); }} {...demoProps('t0')}><Icon size={14} aria-hidden="true" /><span>{label}</span></Button>}
          </BreadcrumbStep>;
        })}</AnimatePresence>
      </ol>
    </nav>
    <p data-ui="aw-business-status" className={styles.status} role="status">当前节点：{path[level]}</p>
    <Button variant="ghost" data-size="sm" className={styles.returnAction} onClick={() => setLevel(2)} {...demoProps('t1')}>返回资料助理<ArrowUpRight size={14} aria-hidden="true" /></Button>
  </BusinessDemo>;
}
