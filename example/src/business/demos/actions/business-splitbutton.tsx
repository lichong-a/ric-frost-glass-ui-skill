import ownedStyles0 from '../../components/Button.module.css';
import ownedStyles1 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { MenuSurface } from '../../components/MenuSurface';
import { useState, useRef } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { Popover } from '../../components/Popover';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessSplitButtonDemo() {
  const { props: demoProps } = useDemoConfig();
  const [open,setOpen]=useDemoState('state.open', false); const [action,setAction]=useState('保存草稿'); const [message,setMessage]=useState('尚未执行'); const anchor=useRef<HTMLButtonElement>(null);
  return <BusinessDemo title="SplitButton" description="主按钮执行当前动作，独立下拉按钮允许选择其他动作。">
    <div data-ui="aw-business-row" className={cn("aw-business-row")}><Button onClick={()=>setMessage('已选择本地动作：'+action)} {...demoProps('t0')}>{action}</Button><button data-ui="aw-button" type="button" className={cn("aw-button")} ref={anchor} aria-label="选择其他动作" aria-haspopup="menu" aria-expanded={open} onClick={()=>setOpen(value=>!value)} {...demoProps('t1')}>⌄</button></div><Popover open={open} onClose={()=>setOpen(false)} anchorRef={anchor} {...demoProps('t2')}><MenuSurface label="其他动作" {...demoProps('t3')}>{['保存草稿','复制为新草稿','归档记录'].map(label=><button data-ui="aw-button" type="button" className={cn("aw-button")} role="menuitem" key={label} onClick={()=>{setAction(label);setOpen(false);}} {...demoProps('t4')}>{label}</button>)}</MenuSurface></Popover><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">{message}</p>
  </BusinessDemo>;
}
