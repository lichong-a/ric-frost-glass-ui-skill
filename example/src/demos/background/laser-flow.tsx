import { useRef } from 'react';
import Component from '../../../.upstream/src/ts-default/Animations/LaserFlow/LaserFlow';
import styles from './laser-flow.module.css';
import { useDemoConfig } from '../../parameters/DemoConfig';

export default function LaserFlowDemo() {
  const { props: demoProps } = useDemoConfig();
  const surfaceRef = useRef<HTMLDivElement>(null);
  return (
    <div className={styles.stage} data-visual-demo="laser-flow">
      <div ref={surfaceRef} className={styles.surface}>
        <span className={styles.eyebrow}>LIGHT IN MOTION</span>
        <h3 className={styles.title}>光落在表面</h3>
        <p className={styles.description}>沿着边缘展开，向两侧流动。</p>
      </div>
      <div className={styles.light}>
        <Component surfaceRef={surfaceRef} color="#91c9cc" theme="dark" intensity={1.8}
          beamPosition={0.52} flare={1.5} spread={1.5} spill={1.1} fog={0.2}
          dust={1.1} speed={1.2} mouseInteraction dpr={1.5} {...demoProps('t0')} />
      </div>
      <p className={styles.hint}>移动指针，观察光束与卡片上边缘接触后的流动。</p>
    </div>
  );
}
