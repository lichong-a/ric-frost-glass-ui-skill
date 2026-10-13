import Component from '../../../.upstream/src/ts-default/Animations/MagicRings/MagicRings';
import styles from './magic-rings.module.css';
import { useDemoConfig } from '../../parameters/DemoConfig';

export default function MagicRingsDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className={styles.stage} data-visual-demo="magic-rings">
      <Component color="#cbe3a5" colorTwo="#92dce5" ringCount={6} speed={1}
        attenuation={10} lineThickness={2} baseRadius={0.3} radiusStep={0.1}
        scaleRate={0.1} opacity={1} noiseAmount={0.08} ringGap={1.5}
        followMouse mouseInfluence={0.18} hoverScale={1.15} parallax={0.04} clickBurst {...demoProps('t0')} />
      <p className={styles.hint}>移动指针牵引光环 · 点击触发脉冲</p>
    </div>
  );
}
