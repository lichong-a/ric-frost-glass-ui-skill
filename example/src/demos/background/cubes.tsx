import Component from '../../../.upstream/src/ts-default/Animations/Cubes/Cubes';
import styles from './cubes.module.css';
import { useDemoConfig } from '../../parameters/DemoConfig';

export default function CubesDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className={styles.stage} data-visual-demo="cubes">
      <div className={styles.field}>
        <Component gridSize={8} gap={0.18} faceColor="#10171a" edgeColor="#e2f1eb"
          edgeWidth={1} faceOpacity={1} shading={0.6} maxAngle={45} radius={3}
          speed={1} bounce={0.4} autoAnimate rippleOnClick
          rippleColor="#90e7c6" dpr={1.5} {...demoProps('t0')} />
      </div>
      <p className={styles.hint}>移动指针翻转立方体 · 点击扩散涟漪</p>
    </div>
  );
}
