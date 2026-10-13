import { useState } from 'react';
import Component from '../../../.upstream/src/ts-default/Animations/DitherVeil/DitherVeil';
import artwork from '../../assets/restoration/chromatic-bloom.svg';
import styles from './dither-veil.module.css';
import { useDemoConfig } from '../../parameters/DemoConfig';

export default function DitherVeilDemo() {
  const { props: demoProps } = useDemoConfig();
  const [imageState, setImageState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [attempt, setAttempt] = useState(0);
  return (
    <div className={styles.stage} data-visual-demo="dither-veil">
      <img key={attempt} className={styles.probe} src={String(demoProps('t1').src ?? artwork)} alt="" aria-hidden="true"
        onLoad={() => setImageState('ready')} onError={() => setImageState('error')} {...demoProps('t0')} />
      {imageState === 'ready' ? <Component src={artwork} fit="cover" pattern="floyd" pixelSize={2}
        inkColor="#172a24" paperColor="#f6f3eb" contrast={1.15} revealRadius={180}
        softness={0.6} linger={1} rimColor="#7fd7b9" rim={0.2} clickBurst {...demoProps('t1')} /> :
        <div className={styles.fallback} role="status" aria-live="polite">
          <p>{imageState === 'error' ? '纹理图加载失败，请重试。' : '正在加载纹理图…'}</p>
          {imageState === 'error' && <button className={styles.retry} type="button" onClick={() => { setImageState('loading'); setAttempt(value => value + 1); }} {...demoProps('t2')}>重新加载图片</button>}
        </div>}
      <p className={styles.hint}>移动指针揭示色彩 · 点击扩散 · 离开后网点重新织合</p>
    </div>
  );
}
