import { MenuSurface } from '../primitives';
// Original Agent Wan demonstration using React and native browser controls.
import { useState, useRef } from 'react';
import { BusinessDemo, Popover } from '../support';


export default function BusinessContextMenuDemo() {
  const [open,setOpen]=useState(false); const [message,setMessage]=useState('请选择卡片动作。'); const anchor=useRef<HTMLElement>(null);
  return <BusinessDemo title="ContextMenu" description="在资料卡上右键打开菜单；键盘菜单键或Shift+F10也可打开。">
    <article ref={anchor} className="aw-business-item" tabIndex={0} onContextMenu={event=>{event.preventDefault();setOpen(true);}} onKeyDown={event=>{if(event.key==='ContextMenu'||(event.shiftKey&&event.key==='F10')){event.preventDefault();setOpen(true);}}}><h3>资料整理</h3><p>右键或使用 Shift+F10 打开操作菜单。</p></article><Popover open={open} onClose={()=>setOpen(false)} anchorRef={anchor}><MenuSurface label="资料操作">{['查看详情','复制名称','加入收藏'].map(label=><button type="button" role="menuitem" className="aw-button" key={label} onClick={async()=>{setOpen(false);if(label==='复制名称'){try{await navigator.clipboard.writeText('资料整理');setMessage('任务名称已复制。');}catch{setMessage('无法自动复制，请手动复制名称：资料整理。');}}else{setMessage('已选择本地动作：'+label);}}}>{label}</button>)}</MenuSurface></Popover><p className="aw-business-status" role="status">{message}</p>
  </BusinessDemo>;
}
