import { useId, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { useBusinessReducedMotion } from '../../motion-preference';
import styles from './business-progressbar.module.css';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

export default function BusinessProgressBarDemo() {
  const { props: demoProps } = useDemoConfig();
  const [progress, setProgress] = useDemoState('state.progress', 20);
  const reduced = useBusinessReducedMotion();
  const progressId = useId();
  const complete = progress === 100;

  function advance() {
    setProgress(value => Math.min(100, value + 20));
  }

  function reset() {
    setProgress(0);
  }

  return (
    <BusinessDemo title="ProgressBar" description="本地步骤完成度由按钮驱动，终值限制在100%，可重置。">
      <div className={styles.card}>
        <div className={styles.heading}>
          <label className={styles.label} htmlFor={progressId}>资料整理完成度</label>
          <span className={styles.value} aria-hidden="true">{progress}%</span>
        </div>
        <progress id={progressId} className={styles.progressSemantics} max="100" value={progress} {...demoProps('t0')}>{progress}%</progress>
        <div className={styles.track} aria-hidden="true">
          <motion.div
            className={styles.fill}
            data-complete={complete}
            initial={false}
            animate={{ scaleX: progress / 100 }}
            transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <p className={styles.status} data-complete={complete} role="status" aria-atomic="true">
          {complete ? <CheckCircle2 size={16} aria-hidden="true" /> : <span className={styles.statusDot} aria-hidden="true" />}
          {progress}% {complete ? '已完成' : '处理中'}
        </p>
      </div>
      <div className={styles.controls}>
        <Button disabled={complete} onClick={advance} {...demoProps('t1')}>完成下一步</Button>
        <Button variant="secondary" onClick={reset} {...demoProps('t2')}>重置</Button>
      </div>
    </BusinessDemo>
  );
}
