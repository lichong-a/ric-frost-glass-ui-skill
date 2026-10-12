import { MenuSurface } from '../primitives';
// Original Agent Wan demonstration using React and native browser controls.
import { useState, useRef } from 'react';
import { BusinessDemo, Popover } from '../support';


export default function BusinessMenuDemo() {
  const [open,setOpen]=useState(false); const [message,setMessage]=useState('等待选择'); const anchor=useRef<HTMLButtonElement>(null);
  return <BusinessDemo title="Menu" description="使用按钮展开操作菜单，选择动作会记录本地结果。">
    <button type="button" className="aw-button" ref={anchor} aria-haspopup="menu" aria-expanded={open} onClick={()=>setOpen(value=>!value)}>任务菜单</button><Popover open={open} onClose={()=>setOpen(false)} anchorRef={anchor}><MenuSurface label="任务菜单">{['新建草稿','保存记录','归档资料'].map(label=><button type="button" role="menuitem" className="aw-button" key={label} onClick={()=>{setMessage(label+'：已更新当前示例状态。');setOpen(false);}}>{label}</button>)}</MenuSurface></Popover><p className="aw-business-status" role="status">{message}</p>
  </BusinessDemo>;
}
