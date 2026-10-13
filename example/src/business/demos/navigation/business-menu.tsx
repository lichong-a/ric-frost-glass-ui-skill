import ownedStyles0 from '../../components/Button.module.css';
import ownedStyles1 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { MenuSurface } from '../../components/MenuSurface';
import { useState, useRef } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Popover } from '../../components/Popover';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessMenuDemo() {
  const { props: demoProps } = useDemoConfig();
  const [open,setOpen]=useDemoState('state.open', false); const [message,setMessage]=useState('等待选择'); const anchor=useRef<HTMLButtonElement>(null);
  return <BusinessDemo title="Menu" description="使用按钮展开操作菜单，选择动作会记录本地结果。">
    <button data-ui="aw-button" type="button" className={cn("aw-button")} ref={anchor} aria-haspopup="menu" aria-expanded={open} onClick={()=>setOpen(value=>!value)} {...demoProps('t0')}>任务菜单</button><Popover open={open} onClose={()=>setOpen(false)} anchorRef={anchor} {...demoProps('t1')}><MenuSurface label="任务菜单" {...demoProps('t2')}>{['新建草稿','保存记录','归档资料'].map(label=><button data-ui="aw-button" type="button" role="menuitem" className={cn("aw-button")} key={label} onClick={()=>{setMessage(label+'：已更新当前示例状态。');setOpen(false);}} {...demoProps('t3')}>{label}</button>)}</MenuSurface></Popover><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">{message}</p>
  </BusinessDemo>;
}
