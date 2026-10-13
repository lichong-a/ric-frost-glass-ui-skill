import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { Field } from '../../components/Field';
import { controlSpring, useBusinessReducedMotion } from '../../motion-preference';
import { workItems } from '../../data';
import inputStyles from '../../components/Input.module.css';
import styles from './business-picklist.module.css';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

export default function BusinessPickListDemo() {
  const { props: demoProps } = useDemoConfig();
  const [chosen, setChosen] = useState<string[]>([]);
  const [query, setQuery] = useDemoState('state.query', '');
  const reduced = useBusinessReducedMotion();
  const available = workItems.filter(item => !chosen.includes(item.id) && item.title.includes(query));
  const selected = chosen.flatMap(id => workItems.filter(item => item.id === id));
  const transition = reduced ? { duration: 0 } : controlSpring;
  return (
    <BusinessDemo title="PickList" description="在候选任务与已选任务之间移动条目，保留每项唯一身份。">
      <Field label="搜索候选" {...demoProps('t0')}><input data-ui="aw-business-input" className={inputStyles['aw-business-input']} value={query} placeholder="输入任务名称" onChange={event => setQuery(event.target.value)} {...demoProps('t1')} /></Field>
      <div className={styles.columns}>
        <section className={styles.panel} aria-label="候选任务">
          <div className={styles.panelHeader}><h3 className={styles.heading}>候选任务</h3><span className={styles.count}>{available.length} 项</span></div>
          <ul className={styles.list}>
            <AnimatePresence initial={false} mode="popLayout">
              {available.map(item => (
                <motion.li data-ui="aw-business-row" className={styles.card} key={item.id} layout={!reduced} initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduced ? { opacity: 1 } : { opacity: 0 }} transition={transition}>
                  <span className={styles.task}>{item.title}<span className={styles.category}>{item.category} · {item.quantity} 项</span></span>
                  <Button data-size="sm" aria-label={'加入' + item.title} onClick={() => setChosen(current => current.includes(item.id) ? current : [...current, item.id])} {...demoProps('t2')}>加入<ArrowRight size={14} aria-hidden="true" /></Button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          {!available.length ? <p className={styles.empty}>没有候选项。</p> : null}
        </section>
        <section className={styles.panel} data-selected="true" aria-label="已选任务">
          <div className={styles.panelHeader}><h3 className={styles.heading}>已选任务</h3><span className={styles.count}>{chosen.length} 项</span></div>
          <ul className={styles.list}>
            <AnimatePresence initial={false} mode="popLayout">
              {selected.map(item => (
                <motion.li data-ui="aw-business-row" className={styles.card} key={item.id} layout={!reduced} initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduced ? { opacity: 1 } : { opacity: 0 }} transition={transition}>
                  <span className={styles.task}>{item.title}<span className={styles.category}>{item.category} · {item.quantity} 项</span></span>
                  <Button variant="ghost" data-size="sm" aria-label={'移除' + item.title} onClick={() => setChosen(current => current.filter(value => value !== item.id))} {...demoProps('t3')}><ArrowLeft size={14} aria-hidden="true" />移除</Button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          {!chosen.length ? <p className={styles.empty}>尚未选择任务。</p> : null}
        </section>
      </div>
      <div className={styles.footer}>
        <Button variant="secondary" data-size="sm" disabled={!chosen.length} onClick={() => setChosen([])} {...demoProps('t4')}>移除全部</Button>
        <p className={styles.status} role="status">已选择 {chosen.length} 项任务。</p>
      </div>
    </BusinessDemo>
  );
}
