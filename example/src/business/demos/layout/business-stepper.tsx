import ownedStyles0 from '../../components/DemoLayout.module.css';
import ownedStyles1 from '../../components/Input.module.css';
import ownedStyles2 from '../../components/Stepper.module.css';
import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { Field } from '../../components/Field';
import { AnimatedSwap } from '../../components/AnimatedSwap';
import { controlSpring } from '../../motion-preference';
import { useBusinessReducedMotion } from '../../motion-preference';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0,...ownedStyles1,...ownedStyles2};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessStepperDemo() {
  const { props: demoProps } = useDemoConfig();
  const [step, setStep] = useDemoState('state.step', 0);
  const [name, setName] = useDemoState('state.name', '');
  const steps = ['填写资料', '确认范围', '完成'];
  const reduced = useBusinessReducedMotion();
  return <BusinessDemo title="Stepper" description="阶段标记、进度与内容同步过渡，返回上一步时保留输入。">
    <ol data-ui="aw-business-flow-steps" className={cn("aw-business-flow-steps")}>{steps.map((label, index) => <li key={label} aria-current={index === step ? 'step' : undefined} data-complete={index < step}><motion.span data-ui="aw-business-step-number" className={cn("aw-business-step-number")} animate={{ scale: index === step && !reduced ? 1.08 : 1 }} transition={reduced ? { duration: 0 } : controlSpring}>{index < step ? <Check size={16} aria-hidden="true" /> : index + 1}</motion.span><span>{label}</span></li>)}</ol>
    <div data-ui="aw-business-flow-progress" className={cn("aw-business-flow-progress")} aria-hidden="true"><motion.div initial={false} animate={{ width: `${step / (steps.length - 1) * 100}%` }} transition={reduced ? { duration: 0 } : controlSpring} /></div>
    <AnimatedSwap value={step}><section data-ui="aw-business-item" className={cn("aw-business-item")}>{step === 0 ? <Field label="任务名称" {...demoProps('t1')}><input data-ui="aw-business-input" className={cn("aw-business-input")} value={name} onChange={event => setName(event.target.value)} /></Field> : step === 1 ? <p>将为“{name}”保存当前页面的本地示例状态。</p> : <p role="status">“{name}”的本地流程已完成。</p>}</section></AnimatedSwap>
    <div data-ui="aw-business-row" className={cn("aw-business-row")}><Button variant="secondary" disabled={step === 0} onClick={() => setStep(value => value - 1)} {...demoProps('t3')}>上一步</Button><Button disabled={step === 2 || !name.trim()} onClick={() => setStep(value => value + 1)} {...demoProps('t4')}>下一步</Button><Button variant="secondary" onClick={() => { setStep(0); setName(''); }} {...demoProps('t5')}>重置</Button></div>
  </BusinessDemo>;
}
