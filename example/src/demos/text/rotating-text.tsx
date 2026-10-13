// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/TextAnimations/RotatingText/RotatingText';
import styles from './rotating-text.module.css';
import { useDemoConfig } from '../../parameters/DemoConfig';

export default function RotatingTextDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className={styles.stage}>
      <div className={styles.line}>
        <span className={styles.prefix}>Creative</span>
        <Component
          texts={['thinking', 'coding', 'components!']}
          mainClassName={styles.rotating}
          splitLevelClassName={styles.wordClip}
          elementLevelClassName={styles.character}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-120%', opacity: 0 }}
          staggerDuration={0.025}
          staggerFrom="last"
          transition={{ type: 'spring', damping: 30, stiffness: 400 }}
          rotationInterval={2000}
          splitBy="characters"
          animatePresenceMode="wait"
          auto={true}
          loop={true} {...demoProps('t0')}
        />
      </div>
      <p className={styles.guide}>每两秒切换文字，逐字离开并从下方进入。</p>
    </div>
  );
}
