import { useState } from 'react';
import Component from '../../../.upstream/src/ts-default/Animations/HalftoneReveal/HalftoneReveal';
import artwork from '../../assets/restoration/prismatic-canopy.svg';
import styles from './halftone-reveal.module.css';
import { useDemoConfig } from '../../parameters/DemoConfig';

export default function HalftoneRevealDemo() {
  const { props: demoProps } = useDemoConfig();
  const [imageState, setImageState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [attempt, setAttempt] = useState(0);
  return (
    <div className={styles.stage} data-visual-demo="halftone-reveal">
      <img key={attempt} className={styles.probe} src={String(demoProps('t1').src ?? artwork)} alt="" aria-hidden="true"
        onLoad={() => setImageState('ready')} onError={() => setImageState('error')} {...demoProps('t0')} />
      {imageState === 'ready' ? <Component src={artwork} fit="cover" mode="mono" shape="dot"
        cellSize={6} angle={45} inkColor="#172a24" accentColor="#d47950" paperColor="#f6f3eb"
        contrast={1.15} revealRadius={175} softness={0.6} linger={1.2} clickBurst intro {...demoProps('t1')} /> :
        <div className={styles.fallback} role="status" aria-live="polite">
          <p>{imageState === 'error' ? '纹理图加载失败，请重试。' : '正在加载纹理图…'}</p>
          {imageState === 'error' && <button className={styles.retry} type="button" onClick={() => { setImageState('loading'); setAttempt(value => value + 1); }} {...demoProps('t2')}>重新加载图片</button>}
        </div>}
      <p className={styles.hint}>移动指针让印刷网点展开为彩色纹理</p>
    </div>
  );
}
