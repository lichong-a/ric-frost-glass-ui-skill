import { useId, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Archive, Check, ChevronDown, Copy, Save } from 'lucide-react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { MenuSurface } from '../../components/MenuSurface';
import { Popover } from '../../components/Popover';
import { controlSpring, useBusinessReducedMotion } from '../../motion-preference';
import styles from './business-splitbutton.module.css';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const actions = [
  { label: '保存草稿', icon: Save },
  { label: '复制为新草稿', icon: Copy },
  { label: '归档记录', icon: Archive }
];

export default function BusinessSplitButtonDemo() {
  const { props: demoProps } = useDemoConfig();
  const [open, setOpen] = useDemoState('state.open', false);
  const [action, setAction] = useState('保存草稿');
  const [message, setMessage] = useState('尚未执行');
  const anchor = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const reduced = useBusinessReducedMotion();

  return <BusinessDemo title="SplitButton" description="主按钮执行当前动作，独立下拉按钮允许选择其他动作。">
    <div data-ui="aw-business-row" className={styles.splitControl} role="group" aria-label="执行或选择草稿动作">
      <Button className={styles.mainAction} onClick={() => setMessage('已选择本地动作：' + action)} {...demoProps('t0')}><Save size={17} aria-hidden="true" />{action}</Button>
      <Button variant="secondary" className={styles.toggleAction} ref={anchor} aria-label="选择其他动作" aria-haspopup="menu" aria-controls={open ? menuId : undefined} aria-expanded={open} onClick={() => setOpen(value => !value)} {...demoProps('t1')}>
        <motion.span className={styles.chevron} aria-hidden="true" animate={{ rotate: open ? 180 : 0 }} transition={reduced ? { duration: 0 } : controlSpring}><ChevronDown size={17} /></motion.span>
      </Button>
    </div>
    <Popover open={open} onClose={() => setOpen(false)} anchorRef={anchor} minWidth={236} {...demoProps('t2')}>
      <div id={menuId} className={styles.panel}>
        <p className={styles.heading}>选择执行动作</p>
        <MenuSurface label="其他动作" {...demoProps('t3')}>{actions.map(({ label, icon: Icon }) => <Button key={label} variant="ghost" className={styles.option} role="menuitem" tabIndex={-1} data-selected={action === label} onClick={() => { setAction(label); setOpen(false); }} {...demoProps('t4')}>
          <Icon className={styles.optionIcon} size={17} aria-hidden="true" /><span>{label}</span>{action === label ? <Check className={styles.check} size={16} aria-hidden="true" /> : null}
        </Button>)}</MenuSurface>
      </div>
    </Popover>
    <p data-ui="aw-business-status" className={styles.status} role="status">{message}</p>
  </BusinessDemo>;
}
