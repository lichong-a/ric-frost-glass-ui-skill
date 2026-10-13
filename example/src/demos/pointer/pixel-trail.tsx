import Component from '../../../.upstream/src/ts-default/Animations/PixelTrail/PixelTrail';
import styles from './pixel-trail.module.css';
import { useDemoConfig } from '../../parameters/DemoConfig';

export default function PixelTrailDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className={styles.stage} data-visual-demo="pixel-trail">
      <Component gridSize={40} trailSize={0.04} maxAge={900} interpolate={5}
        color="#b6f2cf" trailColor="#46bfc0" shape="square" gap={0.08}
        decay="shrink" flow={0.65} gravity={0.25} sparkle={0.12} glow={0.5}
        shine={0.65} clickBurst dpr={1.5} {...demoProps('t0')} />
      <div className={styles.caption}><span className={styles.eyebrow}>PIXEL TRAIL</span><h2 className={styles.title}>留下流动的像素</h2><p className={styles.hint}>移动指针绘制拖尾，点击释放像素。</p></div>
    </div>
  );
}
