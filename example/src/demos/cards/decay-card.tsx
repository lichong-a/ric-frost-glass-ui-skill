import Component from '../../../.upstream/src/ts-default/Components/DecayCard/DecayCard';
import artwork from '../../assets/restoration/mineral-tide.svg';
import styles from './decay-card.module.css';
import { useDemoConfig } from '../../parameters/DemoConfig';

export default function DecayCardDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className={styles.stage} data-visual-demo="decay-card">
      <Component image={artwork} width={300} height={375} intensity={0.85}
        sensitivity={0.7} hoverDecay={0.18} recovery={0.75} idle={0.18}
        grain={0.35} detail={6} pattern={3} flow={0.3} chroma={0.12} travel={18}
        tilt={4} scope="card" radius={12} grayscale={false} {...demoProps('t0')}>
        <div className={styles.caption}><span className={styles.eyebrow}>MINERAL TIDE</span><h3 className={styles.title}>形态与回归</h3></div>
      </Component>
      <p className={styles.hint}>在卡片上快速移动指针，观察边缘侵蚀与复原。</p>
    </div>
  );
}
