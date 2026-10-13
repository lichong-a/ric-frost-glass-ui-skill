import ownedStyles0 from '../../components/DemoLayout.module.css';
import ownedStyles1 from '../../components/Input.module.css';
import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { Field } from '../../components/Field';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessTerminalDemo() {
  const { props: demoProps } = useDemoConfig();
  const [command,setCommand]=useDemoState('state.command', ''); const [history,setHistory]=useState<{command:string;output:string}[]>([]); function run(){const input=command.trim();if(!input)return;setCommand('');if(input==='clear'){setHistory([]);return;} const output=input==='help'?'可用命令：help、status、time、clear；仅在页面内运行。':input==='status'?'本地演示已就绪；没有执行系统命令。':input==='time'?new Date().toLocaleTimeString('zh-CN'):'未知命令，请输入help。';setHistory(current=>[...current.slice(-29),{command:input,output}]);}
  return <BusinessDemo title="Terminal" description="只处理help、status、time和clear四个本地示例命令，保留命令历史和未知命令错误。">
    <div data-ui="aw-business-terminal" className={cn("aw-business-terminal")} role="log" aria-label="本地命令历史" style={{maxHeight:250,overflow:'auto',fontFamily:'var(--aw-font-family-mono)'}}>{history.map((entry,index)=><div key={index}><p>demo&gt; {entry.command}</p><p>{entry.output}</p></div>)}{!history.length?<p>输入 help 查看命令。</p>:null}</div><form data-ui="aw-business-row" className={cn("aw-business-row")} onSubmit={event=>{event.preventDefault();run();}}><Field label="本地示例命令" {...demoProps('t0')}><input data-ui="aw-business-input" className={cn("aw-business-input")} value={command} onChange={event=>setCommand(event.target.value)} autoComplete="off" spellCheck={false} {...demoProps('t1')} /></Field><Button type="submit" {...demoProps('t2')}>运行本地命令</Button></form>
  </BusinessDemo>;
}
