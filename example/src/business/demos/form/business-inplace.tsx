import ownedStyles0 from '../../components/DemoLayout.module.css';
import ownedStyles1 from '../../components/Input.module.css';
import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { Field } from '../../components/Field';
import { AnimatedSwap } from '../../components/AnimatedSwap';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessInplaceDemo() {
  const { props: demoProps } = useDemoConfig();
  const [editing,setEditing]=useDemoState('state.editing', false); const [value,setValue]=useState('资料整理'); const [draft,setDraft]=useState(value);
  return <BusinessDemo title="Inplace" description="点击名称就地编辑，保存校验非空，取消恢复此前值。">
    <AnimatedSwap value={editing?'editing':'reading'}>{editing?<form data-ui="aw-business-row" className={cn("aw-business-row")} onSubmit={event=>{event.preventDefault();if(!draft.trim())return;setValue(draft.trim());setEditing(false);}}><Field label="编辑名称" {...demoProps('t1')}><input data-ui="aw-business-input" className={cn("aw-business-input")} autoFocus value={draft} onChange={event=>setDraft(event.target.value)} onKeyDown={event=>{if(event.key==='Escape')setEditing(false);}} {...demoProps('t2')} /></Field><Button type="submit" disabled={!draft.trim()} {...demoProps('t3')}>保存</Button><Button variant="secondary" onClick={()=>setEditing(false)} {...demoProps('t4')}>取消</Button></form>:<Button variant="secondary" onClick={()=>{setDraft(value);setEditing(true);}} {...demoProps('t5')}>{value} · 点击编辑</Button>}</AnimatedSwap>
  </BusinessDemo>;
}
