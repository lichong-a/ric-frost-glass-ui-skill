import ownedStyles0 from '../../components/Button.module.css';
import ownedStyles1 from '../../components/DemoLayout.module.css';
import ownedStyles2 from '../../components/Tabs.module.css';
import { componentClasses } from '../../class-names';
import { useId, useState } from 'react';
import { LayoutGroup } from 'motion/react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { AnimatedSwap } from '../../components/AnimatedSwap';
import { SelectionIndicator } from '../../components/SelectionIndicator';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0,...ownedStyles1,...ownedStyles2};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessTabsDemo() {
  const { props: demoProps } = useDemoConfig();
  const [active, setActive] = useDemoState('state.active', 0);
  const tabs = ['概览', '活动', '设置'];
  const prefix = useId();
  return <BusinessDemo title="Tabs" description="选中背景弹性滑动，面板轻盈切换；方向键同步标签和焦点。">
    <LayoutGroup id={prefix}><div data-ui="aw-business-animated-tabs" role="tablist" aria-label="工作空间内容" className={cn("aw-business-animated-tabs")}>{tabs.map((label, index) => <button className={cn('aw-business-button-feedback')} type="button" key={label} id={`${prefix}-tab-${index}`} role="tab" aria-selected={active === index} aria-controls={`${prefix}-panel-${index}`} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowLeft' ? -1 : 1) + tabs.length) % tabs.length;
      setActive(next); document.getElementById(`${prefix}-tab-${next}`)?.focus();
    }} {...demoProps('t0')}>{active === index ? <SelectionIndicator identity={`${prefix}-selected`} /> : null}<span>{label}</span></button>)}</div></LayoutGroup>
    {tabs.map((label, index) => <section id={`${prefix}-panel-${index}`} role="tabpanel" aria-labelledby={`${prefix}-tab-${index}`} tabIndex={0} hidden={active !== index} key={label}>
      {active === index ? <AnimatedSwap value={active}><div data-ui="aw-business-item" className={cn("aw-business-item")}><h3>{label}</h3><p>{index === 0 ? '当前空间有6项本地任务。' : index === 1 ? '这里显示当前示例的活动摘要。' : '工作空间设置可按业务权限接入。'}</p></div></AnimatedSwap> : null}
    </section>)}
  </BusinessDemo>;
}
