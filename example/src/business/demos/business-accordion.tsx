// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button } from '../support';


export default function BusinessAccordionDemo() {
  const [open,setOpen]=useState<string[]>(['范围']);
  return <BusinessDemo title="Accordion" description="多个章节可以独立展开和收起，保留原生键盘操作。">
    {['范围','权限','交付'].map(label=><details key={label} open={open.includes(label)} onToggle={event=>{const opened=event.currentTarget.open;setOpen(current=>opened?[...new Set([...current,label])]:current.filter(value=>value!==label));}} className="aw-business-item"><summary>{label}</summary><p>{label==='范围'?'仅处理当前示例中的本地资料。':label==='权限'?'对外写入应由业务服务校验权限。':'任务结果保持可读，可逐项确认。'}</p></details>)}<Button variant="secondary" onClick={()=>setOpen([])}>全部收起</Button>
  </BusinessDemo>;
}
