import ownedStyles0 from '../../components/Button.module.css';
import ownedStyles1 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { useState, useRef } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { Popover } from '../../components/Popover';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessPopoverDemo() {
  const { props: demoProps } = useDemoConfig();
  const [open,setOpen]=useDemoState('state.open', false); const [choice,setChoice]=useState('未选择'); const anchor=useRef<HTMLButtonElement>(null);
  return <BusinessDemo title="Popover" description="围绕触发按钮定位浮层，选择内容后关闭，外点和Escape也可关闭。">
    <button data-ui="aw-button" type="button" className={cn("aw-button")} ref={anchor} aria-expanded={open} onClick={()=>setOpen(value=>!value)} {...demoProps('t0')}>选择视图</button><Popover open={open} onClose={()=>setOpen(false)} anchorRef={anchor} {...demoProps('t1')}><div data-ui="aw-business-list" className={cn("aw-business-list")}>{['列表','看板','日历'].map(label=><Button key={label} variant="secondary" onClick={()=>{setChoice(label);setOpen(false);}} {...demoProps('t2')}>{label}</Button>)}</div></Popover><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">当前视图：{choice}</p>
  </BusinessDemo>;
}
