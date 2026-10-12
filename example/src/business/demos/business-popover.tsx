// Original Agent Wan demonstration using React and native browser controls.
import { useState, useRef } from 'react';
import { BusinessDemo, Button, Popover } from '../support';


export default function BusinessPopoverDemo() {
  const [open,setOpen]=useState(false); const [choice,setChoice]=useState('未选择'); const anchor=useRef<HTMLButtonElement>(null);
  return <BusinessDemo title="Popover" description="围绕触发按钮定位浮层，选择内容后关闭，外点和Escape也可关闭。">
    <button type="button" className="aw-button" ref={anchor} aria-expanded={open} onClick={()=>setOpen(value=>!value)}>选择视图</button><Popover open={open} onClose={()=>setOpen(false)} anchorRef={anchor}><div className="aw-business-list">{['列表','看板','日历'].map(label=><Button key={label} variant="secondary" onClick={()=>{setChoice(label);setOpen(false);}}>{label}</Button>)}</div></Popover><p className="aw-business-status" role="status">当前视图：{choice}</p>
  </BusinessDemo>;
}
