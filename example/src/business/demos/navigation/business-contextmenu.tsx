import { useId, useRef, useState } from 'react';
import { Copy, Eye, FileText, MoreHorizontal, Star } from 'lucide-react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { MenuSurface } from '../../components/MenuSurface';
import { Popover } from '../../components/Popover';
import styles from './business-contextmenu.module.css';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const actions = [
  { label: '查看详情', icon: Eye },
  { label: '复制名称', icon: Copy },
  { label: '加入收藏', icon: Star }
];

export default function BusinessContextMenuDemo() {
  const { props: demoProps } = useDemoConfig();
  const [open, setOpen] = useDemoState('state.open', false);
  const [message, setMessage] = useState('请选择卡片动作。');
  const anchor = useRef<HTMLElement>(null);
  const menuId = useId();

  async function selectAction(label: string) {
    setOpen(false);
    if (label !== '复制名称') { setMessage('已选择本地动作：' + label); return; }
    try { await navigator.clipboard.writeText('资料整理'); setMessage('任务名称已复制。'); }
    catch { setMessage('无法自动复制，请手动复制名称：资料整理。'); }
  }

  return <BusinessDemo title="ContextMenu" description="在资料卡上右键打开菜单；键盘菜单键或Shift+F10也可打开。">
    <article data-ui="aw-business-item" ref={anchor} className={styles.card} tabIndex={0} onContextMenu={event => { event.preventDefault(); event.currentTarget.focus(); setOpen(true); }} onKeyDown={event => {
      if (event.key === 'ContextMenu' || (event.shiftKey && event.key === 'F10')) { event.preventDefault(); event.currentTarget.focus(); setOpen(true); }
    }}>
      <span className={styles.cardIcon} aria-hidden="true"><FileText size={22} /></span>
      <div className={styles.cardCopy}><span className={styles.eyebrow}>工作空间资料</span><h3 className={styles.cardTitle}>资料整理</h3><p className={styles.cardDescription}>右键或使用 Shift+F10 打开操作菜单。</p></div>
      <Button variant="ghost" data-size="sm" className={styles.cardAction} aria-label="打开资料操作菜单" aria-haspopup="menu" aria-controls={open ? menuId : undefined} aria-expanded={open} onClick={() => { anchor.current?.focus(); setOpen(value => !value); }} {...demoProps('t0')}><MoreHorizontal size={19} aria-hidden="true" /></Button>
    </article>
    <Popover open={open} onClose={() => setOpen(false)} anchorRef={anchor} minWidth={240} {...demoProps('t1')}>
      <div id={menuId} className={styles.panel}>
        <p className={styles.heading}>资料操作</p>
        <MenuSurface label="资料操作" {...demoProps('t2')}>{actions.map(({ label, icon: Icon }) => <Button key={label} variant="ghost" className={styles.option} role="menuitem" tabIndex={-1} onClick={() => { void selectAction(label); }} {...demoProps('t3')}><Icon className={styles.optionIcon} size={17} aria-hidden="true" /><span>{label}</span></Button>)}</MenuSurface>
      </div>
    </Popover>
    <p data-ui="aw-business-status" className={styles.status} role="status">{message}</p>
  </BusinessDemo>;
}
