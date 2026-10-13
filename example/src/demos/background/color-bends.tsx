import Component from '../../../.upstream/src/ts-default/Backgrounds/ColorBends/ColorBends';
import styles from './color-bends.module.css';
import { useDemoConfig } from '../../parameters/DemoConfig';

/** Visible preset for the locked Color Bends component. */
export default function ColorBendsDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className={styles.stage} data-visual-demo="color-bends">
      <div className={styles.effect}>
        <Component
          colors={["#ff5c7a", "#8a5cff", "#00d4ff"]}
          transparent={false}
          speed={0.2}
          frequency={1}
          warpStrength={1}
          iterations={1}
          noise={0.04}
          intensity={1.5}
          mouseInfluence={1}
          parallax={0.2} {...demoProps('t0')}
        />
      </div>
    </div>
  );
}
