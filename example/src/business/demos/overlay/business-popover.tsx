import { useId, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { CalendarDays, Check, ChevronDown, Columns3, List } from 'lucide-react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { MenuSurface } from '../../components/MenuSurface';
import { Popover } from '../../components/Popover';
import { controlSpring, useBusinessReducedMotion } from '../../motion-preference';
import styles from './business-popover.module.css';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const views = [
  { label: '列表', description: '逐项浏览资料与任务', icon: List },
  { label: '看板', description: '按阶段组织当前工作', icon: Columns3 },
  { label: '日历', description: '按日期查看计划安排', icon: CalendarDays }
];

export default function BusinessPopoverDemo() {
  const { props: demoProps } = useDemoConfig();
  const [open, setOpen] = useDemoState('state.open', false);
  const [choice, setChoice] = useState('未选择');
  const anchor = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const reduced = useBusinessReducedMotion();

  return <BusinessDemo title="Popover" description="围绕触发按钮定位浮层，选择内容后关闭，外点和Escape也可关闭。">
    <Button variant="secondary" className={styles.trigger} ref={anchor} aria-haspopup="menu" aria-controls={open ? menuId : undefined} aria-expanded={open} onClick={() => setOpen(value => !value)} {...demoProps('t0')}>
      <List size={17} aria-hidden="true" />选择视图
      <motion.span className={styles.chevron} aria-hidden="true" animate={{ rotate: open ? 180 : 0 }} transition={reduced ? { duration: 0 } : controlSpring}><ChevronDown size={16} /></motion.span>
    </Button>
    <Popover open={open} onClose={() => setOpen(false)} anchorRef={anchor} minWidth={264} {...demoProps('t1')}>
      <div id={menuId} className={styles.panel}>
        <p className={styles.heading}>视图模式</p>
        <MenuSurface label="视图模式" {...demoProps('t2')}>{views.map(({ label, description, icon: Icon }) => <Button key={label} variant="ghost" className={styles.option} role="menuitem" tabIndex={-1} data-selected={choice === label} onClick={() => { setChoice(label); setOpen(false); }} {...demoProps('t3')}>
          <Icon className={styles.optionIcon} size={18} aria-hidden="true" />
          <span className={styles.optionCopy}><span className={styles.optionLabel}>{label}</span><span className={styles.optionDescription}>{description}</span></span>
          {choice === label ? <Check className={styles.check} size={16} aria-hidden="true" /> : null}
        </Button>)}</MenuSurface>
      </div>
    </Popover>
    <p data-ui="aw-business-status" className={styles.status} role="status">当前视图：{choice}</p>
  </BusinessDemo>;
}
