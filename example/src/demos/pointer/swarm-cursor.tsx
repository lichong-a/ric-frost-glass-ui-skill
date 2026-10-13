import { useState } from 'react';
import Component from '../../../.upstream/src/ts-default/Animations/SwarmCursor/SwarmCursor';
import styles from './swarm-cursor.module.css';
import { useDemoConfig } from '../../parameters/DemoConfig';

export default function SwarmCursorDemo() {
  const { props: demoProps } = useDemoConfig();
  const [status, setStatus] = useState('移动指针聚集粒子，点击使它们散开。');
  return (
    <div className={styles.stage} data-visual-demo="swarm-cursor">
      <Component color="#c5efd9" accentColor="#ffffff" count={12} size={3}
        speed={2.5} spread={90} wander={0.25} trail={0.8} glow={0.8} opacity={1}
        scatterOnClick style={{ width: '100%', height: '100%' }} {...demoProps('t0')}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>SWARM CURSOR</span>
          <h2 className={styles.title}>随指针流动</h2>
          <p className={styles.description}>粒子围绕按钮流动，点击后重新聚拢。</p>
          <div className={styles.actions}>
            <button type="button" className={styles.action} onClick={() => setStatus('粒子已散开，移动指针继续探索。')} {...demoProps('t1')}>探索粒子</button>
            <button type="button" className={styles.secondary} onClick={() => setStatus('再次点击会释放粒子。')} {...demoProps('t2')}>再次散开 ↗</button>
          </div>
        </div>
        <p className={styles.hint} role="status" aria-live="polite">{status}</p>
      </Component>
    </div>
  );
}
