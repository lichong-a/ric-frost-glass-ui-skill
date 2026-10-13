import ownedStyles0 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { useId, useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { AnimatedCollapse } from '../../components/AnimatedCollapse';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessCollapsibleDemo() {
  const { props: demoProps } = useDemoConfig();
  const [expanded, setExpanded] = useDemoState('state.expanded', false);
  const id = useId();
  return <BusinessDemo title="Collapsible" description="附加说明以高度过渡展开或折叠，收起内容退出键盘与辅助技术的访问路径。">
    <Button variant="secondary" aria-expanded={expanded} aria-controls={id} onClick={() => setExpanded(value => !value)} {...demoProps('t0')}>{expanded ? '收起说明' : '展开说明'}</Button>
    <AnimatedCollapse open={expanded} id={id}><section data-ui="aw-business-item" className={cn("aw-business-item")}><h3>附加说明</h3><p>资料来源、操作边界和恢复方式应随业务场景提供。</p></section></AnimatedCollapse>
  </BusinessDemo>;
}
