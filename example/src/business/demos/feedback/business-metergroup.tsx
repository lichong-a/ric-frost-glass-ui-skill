import { useState, type ChangeEvent } from 'react';
import { motion } from 'motion/react';
import { RangeSlider } from '../../components/RangeSlider';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Field } from '../../components/Field';
import { useBusinessReducedMotion } from '../../motion-preference';
import styles from './business-metergroup.module.css';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

export default function BusinessMeterGroupDemo() {
  const { props: demoProps } = useDemoConfig();
  const [knowledge, setKnowledge] = useDemoState('state.knowledge', 45);
  const reduced = useBusinessReducedMotion();
  const groups = [
    { label: '知识', value: knowledge, color: 'var(--aw-palette-primary)' },
    { label: '文档', value: Math.round((100 - knowledge) * 0.6), color: 'var(--aw-palette-scene-sand)' },
    { label: '服务', value: 100 - knowledge - Math.round((100 - knowledge) * 0.6), color: 'var(--aw-palette-effect-terra)' },
  ];
  const transition = { duration: reduced ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] as const };

  function changeKnowledge(event: ChangeEvent<HTMLInputElement>) {
    setKnowledge(Number(event.target.value));
  }

  return (
    <BusinessDemo title="MeterGroup" description="分组展示资料容量分配，调整知识占比后其他类别自动保持总和100%。">
      <Field control label={`知识占比：${knowledge}%`} {...demoProps('t0')}>
        <RangeSlider min="0" max="100" value={knowledge} onChange={changeKnowledge} {...demoProps('t1')} />
      </Field>
      <div className={styles.allocation} aria-hidden="true">
        {groups.map(group => (
          <motion.div
            key={group.label}
            className={styles.segment}
            style={{ background: group.color }}
            initial={false}
            animate={{ width: `${group.value}%` }}
            transition={transition}
          />
        ))}
      </div>
      <ul className={styles.legend} aria-label="资料容量分配">
        {groups.map(group => (
          <li key={group.label} className={styles.item}>
            <div className={styles.heading}>
              <span className={styles.dot} style={{ background: group.color }} aria-hidden="true" />
              <span>{group.label}</span>
              <span className={styles.value} aria-hidden="true">{group.value}%</span>
            </div>
            <meter className={styles.meterSemantics} min="0" max="100" value={group.value} aria-label={group.label + '占比'} {...demoProps('t2')}>{group.value}%</meter>
            <div className={styles.track} aria-hidden="true">
              <motion.span
                className={styles.fill}
                style={{ background: group.color }}
                initial={false}
                animate={{ scaleX: group.value / 100 }}
                transition={transition}
              />
            </div>
          </li>
        ))}
      </ul>
    </BusinessDemo>
  );
}
