import Component from '../../../.upstream/src/ts-default/Animations/ElectricBorder/ElectricBorder';
import styles from './electric-border.module.css';
import { useDemoConfig } from '../../parameters/DemoConfig';

export default function ElectricBorderDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className={styles.stage} data-visual-demo="electric-border">
      <Component color="#7df3c8" speed={1} chaos={0.12} borderRadius={24}
        style={{ width: 'min(100%, 380px)', borderRadius: 24 }} {...demoProps('t0')}>
        <article className={styles.card}>
          <span className={styles.tag}>LIVE CONNECTION</span>
          <h3 className={styles.title}>连接已建立</h3>
          <p className={styles.description}>细密的电弧沿圆角边缘流动，外侧保留完整的柔光。</p>
          <span className={styles.state}><span className={styles.dot} /> 系统在线</span>
        </article>
      </Component>
    </div>
  );
}
