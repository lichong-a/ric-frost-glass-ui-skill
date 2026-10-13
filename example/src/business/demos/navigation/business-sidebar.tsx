import { useState } from 'react';
import { Files, LayoutDashboard, PanelLeftClose, PanelLeftOpen, Settings } from 'lucide-react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { AnimatedSwap } from '../../components/AnimatedSwap';
import { useBusinessReducedMotion } from '../../motion-preference';
import styles from './business-sidebar.module.css';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

export default function BusinessSidebarDemo() {
  const { props: demoProps } = useDemoConfig();
  const [collapsed, setCollapsed] = useState(false);
  const [page, setPage] = useDemoState('state.page', '概览');
  const reduced = useBusinessReducedMotion();
  const pages = ['概览', '资料', '设置'];
  const icons = [LayoutDashboard, Files, Settings];

  return <BusinessDemo title="Sidebar" description="折叠侧边导航并切换内容页，选择状态与折叠状态独立保存。">
    <Button variant="secondary" data-size="sm" className={styles.toggle} aria-expanded={!collapsed} aria-controls="business-workspace-sidebar" onClick={() => setCollapsed(value => !value)} {...demoProps('t0')}>
      {collapsed ? <PanelLeftOpen size={16} aria-hidden="true" /> : <PanelLeftClose size={16} aria-hidden="true" />}{collapsed ? '展开侧栏' : '折叠侧栏'}
    </Button>
    <div data-ui="aw-business-row" className={styles.workspace} data-collapsed={collapsed} data-motion={reduced ? 'reduce' : 'allow'}>
      <aside id="business-workspace-sidebar" data-ui="aw-business-item" className={styles.sidebar} aria-label="工作空间侧栏">
        <div className={styles.sidebarHeading}>{collapsed ? 'AW' : '工作空间'}</div>
        <nav className={styles.sidebarNavigation} aria-label="工作区导航">{pages.map((label, index) => {
          const Icon = icons[index];
          return <Button variant="ghost" className={styles.navigationItem} data-collapsed={collapsed} key={label} aria-label={label} aria-current={page === label ? 'page' : undefined} onClick={() => setPage(label)} {...demoProps('t1')}>
            {collapsed ? <span className={styles.pageNumber}>{index + 1}</span> : <><Icon className={styles.pageIcon} size={17} aria-hidden="true" /><span className={styles.pageLabel}>{label}</span></>}
          </Button>;
        })}</nav>
      </aside>
      <section data-ui="aw-business-item" className={styles.content}><AnimatedSwap value={page}><h3 className={styles.contentTitle}>{page}</h3><p className={styles.contentCopy}>当前示例中的{page}内容。</p></AnimatedSwap></section>
    </div>
  </BusinessDemo>;
}
