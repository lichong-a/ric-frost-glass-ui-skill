import { MenuSurface } from '../primitives';
// Original Agent Wan demonstration using React and native browser controls.
import { useState, useRef } from 'react';
import { BusinessDemo, Button, Popover } from '../support';


export default function BusinessSplitButtonDemo() {
  const [open,setOpen]=useState(false); const [action,setAction]=useState('保存草稿'); const [message,setMessage]=useState('尚未执行'); const anchor=useRef<HTMLButtonElement>(null);
  return <BusinessDemo title="SplitButton" description="主按钮执行当前动作，独立下拉按钮允许选择其他动作。">
    <div className="aw-business-row"><Button onClick={()=>setMessage('已选择本地动作：'+action)}>{action}</Button><button type="button" className="aw-button" ref={anchor} aria-label="选择其他动作" aria-haspopup="menu" aria-expanded={open} onClick={()=>setOpen(value=>!value)}>⌄</button></div><Popover open={open} onClose={()=>setOpen(false)} anchorRef={anchor}><MenuSurface label="其他动作">{['保存草稿','复制为新草稿','归档记录'].map(label=><button type="button" className="aw-button" role="menuitem" key={label} onClick={()=>{setAction(label);setOpen(false);}}>{label}</button>)}</MenuSurface></Popover><p className="aw-business-status" role="status">{message}</p>
  </BusinessDemo>;
}
