// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/TextAnimations/ScrambledText/ScrambledText';
import styles from './scrambled-text.module.css';
import { useDemoConfig } from '../../parameters/DemoConfig';

export default function ScrambledTextDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className={styles.stage}>
      <Component
        className={styles.text}
        radius={200}
        duration={1.4}
        speed={0.5}
        scrambleChars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*" {...demoProps('t0')}
      >Move through the words. A quiet signal becomes clear.</Component>
      <p className={styles.guide}>在文字上移动指针，观察字母、数字与符号扰动后恢复原文。</p>
    </div>
  );
}
