import ownedStyles0 from '../../components/DemoLayout.module.css';
import ownedStyles1 from '../../components/Input.module.css';
import { componentClasses } from '../../class-names';
import { useId, useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { Field } from '../../components/Field';
import { AnimatedCollapse } from '../../components/AnimatedCollapse';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessPanelDemo() {
  const { props: demoProps } = useDemoConfig();
  const [open, setOpen] = useDemoState('state.open', true);
  const [note, setNote] = useDemoState('state.note', '记录当前任务的关键结果。');
  const id = useId();
  return <BusinessDemo title="Panel" description="工作面板自然展开或折叠，内容高度连续变化，并保留此前输入。">
    <section data-ui="aw-business-item" className={cn("aw-business-item")}><h3><Button variant="secondary" aria-expanded={open} aria-controls={id} onClick={() => setOpen(value => !value)} {...demoProps('t0')}>工作记录 {open ? '−' : '+'}</Button></h3>
      <AnimatedCollapse id={id} open={open}><Field label="记录内容" {...demoProps('t2')}><textarea data-ui="aw-business-input" className={cn("aw-business-input")} value={note} onChange={event => setNote(event.target.value)} /></Field></AnimatedCollapse>
    </section>
  </BusinessDemo>;
}
