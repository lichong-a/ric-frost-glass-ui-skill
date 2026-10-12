// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button, Dialog } from '../support';


export default function BusinessDrawerDemo() {
  const [open,setOpen]=useState(false); const [notify,setNotify]=useState(false);
  const [side,setSide]=useState<'right'|'left'|'top'|'bottom'>('right');
  const directions = [{side:'right',label:'右侧'}, {side:'left',label:'左侧'}, {side:'top',label:'上方'}, {side:'bottom',label:'下方'}] as const;
  return <BusinessDemo title="Drawer" description="从上下左右打开同一任务抽屉，勾选本地选项后关闭；切换方向或再次打开保留选择。">
    <div className="aw-business-row" role="group" aria-label="抽屉方向">{directions.map(direction=><Button key={direction.side} variant="secondary" onClick={()=>{setSide(direction.side);setOpen(true);}}>{direction.label}抽屉</Button>)}</div><p className="aw-business-status" role="status">本地提醒：{notify?'开启':'关闭'}</p><Dialog open={open} side={side} title="任务选项" onClose={()=>setOpen(false)}><label className="aw-business-row"><input type="checkbox" checked={notify} onChange={event=>setNotify(event.target.checked)} />完成后在界面显示提醒</label><Button onClick={()=>setOpen(false)}>完成</Button></Dialog>
  </BusinessDemo>;
}
