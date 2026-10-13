import { useId, useState } from 'react';
import { LayoutGroup } from 'motion/react';
import { Activity, LayoutDashboard, Settings } from 'lucide-react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { AnimatedSwap } from '../../components/AnimatedSwap';
import { SelectionIndicator } from '../../components/SelectionIndicator';
import { useBusinessReducedMotion } from '../../motion-preference';
import styles from './business-tabs.module.css';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

export default function BusinessTabsDemo() {
  const { props: demoProps } = useDemoConfig();
  const [active, setActive] = useDemoState('state.active', 0);
  const tabs = ['概览', '活动', '设置'];
  const icons = [LayoutDashboard, Activity, Settings];
  const prefix = useId();
  const reduced = useBusinessReducedMotion();

  return <BusinessDemo title="Tabs" description="选中背景弹性滑动，面板轻盈切换；方向键同步标签和焦点。">
    <LayoutGroup id={prefix}>
      <div data-ui="aw-business-animated-tabs" data-motion={reduced ? 'reduce' : 'allow'} role="tablist" aria-label="工作空间内容" className={styles.tabList}>
        {tabs.map((label, index) => {
          const Icon = icons[index];
          return <button className={styles.tab} type="button" key={label} id={`${prefix}-tab-${index}`} role="tab" aria-selected={active === index} aria-controls={`${prefix}-panel-${index}`} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => {
            if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
            event.preventDefault();
            const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowLeft' ? -1 : 1) + tabs.length) % tabs.length;
            setActive(next);
            document.getElementById(`${prefix}-tab-${next}`)?.focus();
          }} {...demoProps('t0')}>
            {active === index ? <SelectionIndicator identity={`${prefix}-selected`} /> : null}
            <Icon className={styles.tabIcon} size={16} aria-hidden="true" /><span className={styles.tabLabel}>{label}</span>
          </button>;
        })}
      </div>
    </LayoutGroup>
    {tabs.map((label, index) => <section id={`${prefix}-panel-${index}`} role="tabpanel" aria-labelledby={`${prefix}-tab-${index}`} tabIndex={0} hidden={active !== index} key={label}>
      {active === index ? <AnimatedSwap value={active}><div data-ui="aw-business-item" className={styles.panel}><h3 className={styles.panelTitle}>{label}</h3><p className={styles.panelCopy}>{index === 0 ? '当前空间有6项本地任务。' : index === 1 ? '这里显示当前示例的活动摘要。' : '工作空间设置可按业务权限接入。'}</p></div></AnimatedSwap> : null}
    </section>)}
  </BusinessDemo>;
}
