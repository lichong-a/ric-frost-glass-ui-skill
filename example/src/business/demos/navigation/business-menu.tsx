import { useId, useRef, useState } from 'react';
import { Archive, ChevronRight, FilePlus, MoreHorizontal, Save } from 'lucide-react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { MenuSurface } from '../../components/MenuSurface';
import { Popover } from '../../components/Popover';
import styles from './business-menu.module.css';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const actions = [
  { label: '新建草稿', description: '开始整理新的内容', icon: FilePlus },
  { label: '保存记录', description: '记录当前工作进展', icon: Save },
  { label: '归档资料', description: '整理已完成的内容', icon: Archive }
];

export default function BusinessMenuDemo() {
  const { props: demoProps } = useDemoConfig();
  const [open, setOpen] = useDemoState('state.open', false);
  const [message, setMessage] = useState('等待选择');
  const anchor = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  return <BusinessDemo title="Menu" description="使用按钮展开操作菜单，选择动作会记录本地结果。">
    <Button variant="secondary" className={styles.trigger} ref={anchor} aria-haspopup="menu" aria-controls={open ? menuId : undefined} aria-expanded={open} onClick={() => setOpen(value => !value)} {...demoProps('t0')}><MoreHorizontal size={19} aria-hidden="true" />任务菜单</Button>
    <Popover open={open} onClose={() => setOpen(false)} anchorRef={anchor} minWidth={268} {...demoProps('t1')}>
      <div id={menuId} className={styles.panel}>
        <p className={styles.heading}>当前任务</p>
        <MenuSurface label="任务菜单" {...demoProps('t2')}>{actions.map(({ label, description, icon: Icon }) => <Button key={label} variant="ghost" className={styles.option} role="menuitem" tabIndex={-1} onClick={() => { setMessage(label + '：已更新当前示例状态。'); setOpen(false); }} {...demoProps('t3')}>
          <Icon className={styles.optionIcon} size={18} aria-hidden="true" />
          <span className={styles.optionCopy}><span className={styles.optionLabel}>{label}</span><span className={styles.optionDescription}>{description}</span></span>
          <ChevronRight className={styles.arrow} size={15} aria-hidden="true" />
        </Button>)}</MenuSurface>
      </div>
    </Popover>
    <p data-ui="aw-business-status" className={styles.status} role="status">{message}</p>
  </BusinessDemo>;
}
