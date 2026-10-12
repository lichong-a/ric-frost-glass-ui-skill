// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button, Field, Dialog } from '../support';


export default function BusinessCommandMenuDemo() {
  const [open,setOpen]=useState(false); const [query,setQuery]=useState(''); const [active,setActive]=useState(0); const [message,setMessage]=useState('尚未选择命令'); const commands=['查看任务','查看资料','查看设置']; const visible=commands.filter(label=>label.includes(query)); function execute(label:string){setMessage('当前入口：'+label);setOpen(false);}
  return <BusinessDemo title="CommandMenu" description="打开命令面板搜索当前页面动作；支持上下键选择、Enter执行与Escape关闭。">
    <Button onClick={()=>{setQuery('');setActive(0);setOpen(true);}}>打开命令面板</Button><Dialog open={open} title="命令面板" onClose={()=>setOpen(false)}><Field label="搜索页面命令"><input className="aw-business-input" autoFocus value={query} aria-controls="business-command-results" onChange={event=>{setQuery(event.target.value);setActive(0);}} onKeyDown={event=>{if(!visible.length)return;if(['ArrowDown','ArrowUp'].includes(event.key)){event.preventDefault();setActive(value=>(value+(event.key==='ArrowDown'?1:-1)+visible.length)%visible.length);}if(event.key==='Enter'){event.preventDefault();execute(visible[active]);}}} /></Field><ul id="business-command-results">{visible.map((label,index)=><li key={label}><Button variant={active===index?'primary':'secondary'} onClick={()=>execute(label)}>{label}</Button></li>)}</ul>{!visible.length?<p role="status">没有匹配的命令。</p>:null}</Dialog><section className="aw-business-item" role="status">{message}</section>
  </BusinessDemo>;
}
