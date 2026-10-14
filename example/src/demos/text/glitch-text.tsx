// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/TextAnimations/GlitchText/GlitchText';
import styles from './glitch-text.module.css';
import { useDemoConfig } from '../../parameters/DemoConfig';

export default function GlitchTextDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className={styles.stage}>
      <Component speed={1} enableShadows={true} enableOnHover={false} className={styles.text} {...demoProps('t0')}>AGENT RIC</Component>
      <p className={styles.guide}>观察红蓝重影与文字切片的循环错位。</p>
    </div>
  );
}
