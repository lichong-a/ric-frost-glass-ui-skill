import ownedStyles0 from '../../components/Accordion.module.css';
import ownedStyles1 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { useId, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { AnimatedCollapse } from '../../components/AnimatedCollapse';
import { controlSpring } from '../../motion-preference';
import { useBusinessReducedMotion } from '../../motion-preference';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessAccordionDemo() {
  const { props: demoProps } = useDemoConfig();
  const [open, setOpen] = useDemoState<string[]>('state.open', ['范围']);
  const id = useId();
  const reduced = useBusinessReducedMotion();
  return <BusinessDemo title="Accordion" description="章节以自然高度过渡展开或收起，标题箭头弹性旋转。">
    {['范围', '权限', '交付'].map((label, index) => <section data-ui="aw-business-item" key={label} className={cn("aw-business-item aw-business-accordion-item")}>
      <h3><button data-ui="aw-business-accordion-trigger" type="button" className={cn("aw-business-accordion-trigger")} id={`${id}-trigger-${index}`} aria-expanded={open.includes(label)} aria-controls={`${id}-content-${index}`} onClick={() => setOpen(current => current.includes(label) ? current.filter(item => item !== label) : [...current, label])} {...demoProps('t0')}>{label}<motion.span aria-hidden="true" animate={{ rotate: open.includes(label) ? 180 : 0 }} transition={reduced ? { duration: 0 } : controlSpring}><ChevronDown size={18} /></motion.span></button></h3>
      <AnimatedCollapse id={`${id}-content-${index}`} open={open.includes(label)}><div role="region" aria-labelledby={`${id}-trigger-${index}`}><p>{label === '范围' ? '仅处理当前示例中的本地资料。' : label === '权限' ? '对外写入应由业务服务校验权限。' : '任务结果保持可读，可逐项确认。'}</p></div></AnimatedCollapse>
    </section>)}<Button variant="secondary" onClick={() => setOpen([])} {...demoProps('t2')}>全部收起</Button>
  </BusinessDemo>;
}
