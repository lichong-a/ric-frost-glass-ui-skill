import Component from '../../../.upstream/src/ts-default/Animations/GhostCursor/GhostCursor';
import styles from './ghost-cursor.module.css';
import { useDemoConfig } from '../../parameters/DemoConfig';

export default function GhostCursorDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className={styles.stage} data-visual-demo="ghost-cursor">
      <div className={styles.content}><span className={styles.eyebrow}>GHOST CURSOR</span><h2 className={styles.title}>如烟，如影</h2><p className={styles.description}>移动指针，留下柔和的发光烟雾。</p></div>
      <Component color="#b8e3c5" brightness={1.15} edgeIntensity={0.15}
        trailLength={50} inertia={0.5} grainIntensity={0.04} bloomStrength={0.22}
        bloomRadius={1} bloomThreshold={0.025} fadeDelayMs={700} fadeDurationMs={1400}
        mixBlendMode="screen" maxDevicePixelRatio={1.5} targetPixels={500000} zIndex={2} {...demoProps('t0')} />
      <p className={styles.hint}>快速划过或缓慢游走，观察拖影逐渐散开。</p>
    </div>
  );
}
