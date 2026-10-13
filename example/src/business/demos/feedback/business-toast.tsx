import { useCallback, useEffect, useRef, useState, type MouseEvent, type Ref } from 'react';
import { AnimatePresence, motion, useIsPresent } from 'motion/react';
import { CheckCircle2, Info } from 'lucide-react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { useBusinessReducedMotion } from '../../motion-preference';
import styles from './business-toast.module.css';
import { useDemoConfig } from '../../../parameters/DemoConfig';

function ToastNotice({ notice, reduced, innerRef, onDismiss }: {
  notice: string;
  reduced: boolean;
  innerRef: Ref<HTMLDivElement>;
  onDismiss: () => void;
}) {
  const present = useIsPresent();
  const success = notice === '本地草稿已保存。';
  const Icon = success ? CheckCircle2 : Info;

  return (
    <motion.div
      ref={innerRef}
      className={styles.toast}
      data-tone={success ? 'success' : 'info'}
      role="status"
      aria-atomic="true"
      inert={!present}
      aria-hidden={!present || undefined}
      initial={reduced ? false : { opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: reduced ? 0 : 12, scale: reduced ? 1 : 0.97 }}
      transition={{ duration: reduced ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className={styles.icon} aria-hidden="true"><Icon size={20} /></span>
      <span className={styles.text}>{notice}</span>
      <Button variant="ghost" data-size="sm" aria-label="关闭提示" onClick={onDismiss}>关闭</Button>
    </motion.div>
  );
}

export default function BusinessToastDemo() {
  const { props: demoProps } = useDemoConfig();
  const [notice, setNotice] = useState<string | null>(null);
  const [sequence, setSequence] = useState(0);
  const reduced = useBusinessReducedMotion();
  const noticeRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const dismissNotice = useCallback(() => {
    // Return keyboard focus before the departing notification becomes inert.
    if (noticeRef.current?.contains(document.activeElement)) triggerRef.current?.focus();
    setNotice(null);
  }, []);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(dismissNotice, 4000);
    return () => window.clearTimeout(timer);
  }, [notice, sequence, dismissNotice]);

  function showSuccess(event: MouseEvent<HTMLButtonElement>) {
    triggerRef.current = event.currentTarget;
    setSequence(value => value + 1);
    setNotice('本地草稿已保存。');
  }

  function showInfo(event: MouseEvent<HTMLButtonElement>) {
    triggerRef.current = event.currentTarget;
    setSequence(value => value + 1);
    setNotice('可以继续完善草稿内容。');
  }

  return (
    <BusinessDemo title="Toast" description="短消息在本地出现，可手动关闭，4秒后自动移除；卸载时清理计时器。">
      <div className={styles.controls}>
        <Button onClick={showSuccess} {...demoProps('t0')}>显示成功提示</Button>
        <Button variant="secondary" onClick={showInfo} {...demoProps('t1')}>显示普通提示</Button>
      </div>
      <div className={styles.viewport}>
        <AnimatePresence mode="wait">
          {notice ? (
            <ToastNotice
              key={sequence}
              notice={notice}
              reduced={reduced}
              innerRef={noticeRef}
              onDismiss={dismissNotice}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </BusinessDemo>
  );
}
