import { useId, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { AnimatePresence, motion, useIsPresent } from 'motion/react';
import { CheckCircle2, CircleAlert } from 'lucide-react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { Field } from '../../components/Field';
import inputStyles from '../../components/Input.module.css';
import { useBusinessReducedMotion } from '../../motion-preference';
import styles from './business-message.module.css';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

type Message = { text: string; error: boolean };

function MessageNotice({ message, id, reduced, onDismiss }: {
  message: Message;
  id: string;
  reduced: boolean;
  onDismiss: () => void;
}) {
  const present = useIsPresent();
  const Icon = message.error ? CircleAlert : CheckCircle2;

  return (
    <motion.div
      className={styles.message}
      data-tone={message.error ? 'error' : 'success'}
      role={message.error ? 'alert' : 'status'}
      inert={!present}
      aria-hidden={!present || undefined}
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduced ? 0 : -6 }}
      transition={{ duration: reduced ? 0 : 0.18 }}
    >
      <Icon className={styles.icon} size={18} aria-hidden="true" />
      <span id={id} className={styles.messageText}>{message.text}</span>
      <Button variant="ghost" data-size="sm" aria-label="关闭消息" onClick={onDismiss}>关闭</Button>
    </motion.div>
  );
}

export default function BusinessMessageDemo() {
  const { props: demoProps } = useDemoConfig();
  const [value, setValue] = useDemoState('state.value', '');
  const [message, setMessage] = useState<Message | null>(null);
  const reduced = useBusinessReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const messageId = useId();

  function changeValue(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function validate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(value.trim()
      ? { text: '名称已在当前页面校验通过。', error: false }
      : { text: '请先填写名称。', error: true });
  }

  function dismissMessage() {
    setMessage(null);
    inputRef.current?.focus();
  }

  return (
    <BusinessDemo title="Message" description="根据本地表单校验呈现成功或错误信息，关闭后可重新提交。">
      <form className={styles.form} onSubmit={validate}>
        <Field label="名称" {...demoProps('t0')}>
          <input
            ref={inputRef}
            data-ui="aw-business-input"
            className={inputStyles['aw-business-input']}
            value={value}
            aria-invalid={message?.error || undefined}
            aria-describedby={message ? messageId : undefined}
            onChange={changeValue}
          />
        </Field>
        <Button className={styles.submit} type="submit" {...demoProps('t2')}>校验</Button>
      </form>
      <AnimatePresence mode="wait">
        {message ? (
          <MessageNotice
            key={message.error ? 'error' : 'success'}
            message={message}
            id={messageId}
            reduced={reduced}
            onDismiss={dismissMessage}
          />
        ) : null}
      </AnimatePresence>
    </BusinessDemo>
  );
}
