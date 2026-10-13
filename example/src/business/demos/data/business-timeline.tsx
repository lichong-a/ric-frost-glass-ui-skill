import ownedStyles0 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { controlSpring } from '../../motion-preference';
import { useBusinessReducedMotion } from '../../motion-preference';
import { useDemoConfig } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessTimelineDemo() {
  const { props: demoProps } = useDemoConfig();
  const stages = ['准备资料', '确认范围', '完成处理'];
  const [step, setStep] = useState(0);
  const reduced = useBusinessReducedMotion();
  return <BusinessDemo title="Timeline" description="流程事件依次滑入，重置时自然收起，当前阶段与完成状态同步更新。">
    <ol data-ui="aw-business-timeline" className={cn("aw-business-timeline")}><AnimatePresence initial={false}>{stages.slice(0, step + 1).map((label, index) => <motion.li data-ui="aw-business-item" layout={!reduced} key={label} className={cn("aw-business-item")} initial={reduced ? false : { x: -14, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={reduced ? undefined : { x: 10, opacity: 0 }} transition={reduced ? { duration: 0 } : controlSpring}><strong>{index + 1}. {label}</strong><p>{index === step ? '当前阶段' : '已完成'}</p></motion.li>)}</AnimatePresence></ol>
    <div data-ui="aw-business-row" className={cn("aw-business-row")}><Button disabled={step === stages.length - 1} onClick={() => setStep(current => current + 1)} {...demoProps('t0')}>下一步</Button><Button variant="secondary" onClick={() => setStep(0)} {...demoProps('t1')}>重置流程</Button></div>
  </BusinessDemo>;
}
