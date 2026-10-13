import ownedStyles0 from '../../components/DemoLayout.module.css';
import ownedStyles1 from '../../components/Input.module.css';
import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { Field } from '../../components/Field';
import { Dialog } from '../../components/Dialog';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessCommandMenuDemo() {
  const { props: demoProps } = useDemoConfig();
  const [open,setOpen]=useDemoState('state.open', false); const [query,setQuery]=useDemoState('state.query', ''); const [active,setActive]=useState(0); const [message,setMessage]=useState('尚未选择命令'); const commands=['查看任务','查看资料','查看设置']; const visible=commands.filter(label=>label.includes(query)); function execute(label:string){setMessage('当前入口：'+label);setOpen(false);}
  return <BusinessDemo title="CommandMenu" description="打开命令面板搜索当前页面动作；支持上下键选择、Enter执行与Escape关闭。">
    <Button onClick={()=>{setQuery('');setActive(0);setOpen(true);}} {...demoProps('t0')}>打开命令面板</Button><Dialog open={open} title="命令面板" onClose={()=>setOpen(false)} {...demoProps('t1')}><Field label="搜索页面命令" {...demoProps('t2')}><input data-ui="aw-business-input" className={cn("aw-business-input")} autoFocus value={query} aria-controls="business-command-results" onChange={event=>{setQuery(event.target.value);setActive(0);}} onKeyDown={event=>{if(!visible.length)return;if(['ArrowDown','ArrowUp'].includes(event.key)){event.preventDefault();setActive(value=>(value+(event.key==='ArrowDown'?1:-1)+visible.length)%visible.length);}if(event.key==='Enter'){event.preventDefault();execute(visible[active]);}}} {...demoProps('t3')} /></Field><ul id="business-command-results">{visible.map((label,index)=><li key={label}><Button variant={active===index?'primary':'secondary'} onClick={()=>execute(label)} {...demoProps('t4')}>{label}</Button></li>)}</ul>{!visible.length?<p role="status">没有匹配的命令。</p>:null}</Dialog><section data-ui="aw-business-item" className={cn("aw-business-item")} role="status">{message}</section>
  </BusinessDemo>;
}
