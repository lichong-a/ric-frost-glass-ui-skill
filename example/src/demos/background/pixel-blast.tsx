import Component from '../../../.upstream/src/ts-default/Backgrounds/PixelBlast/PixelBlast';
import styles from './pixel-blast.module.css';
import { useDemoConfig } from '../../parameters/DemoConfig';

/** Visible preset for the locked Pixel Blast component. */
export default function PixelBlastDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className={styles.stage} data-visual-demo="pixel-blast">
      <div className={styles.effect}>
        <Component
          color="#b19eef"
          variant="square"
          pixelSize={5}
          patternScale={2}
          patternDensity={1.35}
          liquid={false}
          liquidStrength={0.12}
          liquidRadius={1.2}
          enableRipples
          rippleIntensityScale={1.5}
          rippleThickness={0.12}
          speed={0.5}
          edgeFade={0.15}
          transparent
          autoPauseOffscreen {...demoProps('t0')}
        />
      </div>
      <p className={styles.hint}>点击触发像素波纹 · 可在参数区启用液体形变</p>
    </div>
  );
}
