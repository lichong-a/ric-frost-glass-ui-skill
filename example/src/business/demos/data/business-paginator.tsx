import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Field } from '../../components/Field';
import { Pager } from '../../components/Pager';
import { pagerState } from '../../components/pager-state';
import { AnimatedSelect } from '../../components/AnimatedSelect';
import { useBusinessReducedMotion } from '../../motion-preference';
import { workItems } from '../../data';
import styles from './business-paginator.module.css';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

export default function BusinessPaginatorDemo() {
  const { props: demoProps } = useDemoConfig();
  const [page, setPage] = useDemoState('state.page', 0);
  const [size, setSize] = useDemoState('state.size', 2);
  const reduced = useBusinessReducedMotion();
  const pagination = pagerState(page, size, workItems.length);
  const visible = workItems.slice(pagination.start, pagination.end);
  const sizes = [...new Set([1, 2, 3, pagination.pageSize])].sort((a, b) => a - b);
  useEffect(() => {
    if (page !== pagination.current) setPage(pagination.current);
    if (size !== pagination.pageSize) setSize(pagination.pageSize);
  }, [page, size, pagination.current, pagination.pageSize, setPage, setSize]);
  return (
    <BusinessDemo title="Paginator" description="分页浏览本地记录，页容量改变时回到第一页。">
      <div className={styles.toolbar}>
        <Field label="每页数量" {...demoProps('t0')}><AnimatedSelect label="每页数量" value={String(pagination.pageSize)} onChange={value => { setSize(Number(value)); setPage(0); }} options={sizes.map(value => ({ value: String(value), label: `${value} 项` }))} {...demoProps('t1')} /></Field>
        <p className={styles.range}>{pagination.total ? `正在浏览第 ${pagination.first}–${pagination.end} 项` : '没有可浏览的记录。'}</p>
      </div>
      <ul className={styles.list} aria-label="当前页任务">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map(item => (
            <motion.li key={item.id} className={styles.item} layout={!reduced} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: reduced ? 0 : 0.18 }}>
              <span className={styles.index}>{String(workItems.indexOf(item) + 1).padStart(2, '0')}</span>
              <span className={styles.title}>{item.title}<span className={styles.category}>{item.category}</span></span>
              <span className={styles.quantity}>{item.quantity} 项</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <Pager page={page} pageSize={size} total={workItems.length} onChange={setPage} />
    </BusinessDemo>
  );
}
