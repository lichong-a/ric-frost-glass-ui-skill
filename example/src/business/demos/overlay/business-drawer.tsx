import ownedStyles0 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { SpringCheckbox } from '../../components/SpringCheckbox';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { Dialog } from '../../components/Dialog';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessDrawerDemo() {
  const { props: demoProps } = useDemoConfig();
  const [open,setOpen]=useDemoState('state.open', false); const [notify,setNotify]=useDemoState('state.notify', false);
  const [side,setSide]=useState<'right'|'left'|'top'|'bottom'>('right');
  const directions = [{side:'right',label:'右侧'}, {side:'left',label:'左侧'}, {side:'top',label:'上方'}, {side:'bottom',label:'下方'}] as const;
  return <BusinessDemo title="Drawer" description="从上下左右打开同一任务抽屉，勾选本地选项后关闭；切换方向或再次打开保留选择。">
    <div data-ui="aw-business-row" className={cn("aw-business-row")} role="group" aria-label="抽屉方向">{directions.map(direction=><Button key={direction.side} variant="secondary" onClick={()=>{setSide(direction.side);setOpen(true);}} {...demoProps('t0')}>{direction.label}抽屉</Button>)}</div><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">本地提醒：{notify?'开启':'关闭'}</p><Dialog open={open} side={side} title="任务选项" onClose={()=>setOpen(false)} {...demoProps('t1')}><label data-ui="aw-business-row" className={cn("aw-business-row")}><SpringCheckbox checked={notify} onChange={event=>setNotify(event.target.checked)} />完成后在界面显示提醒</label><Button onClick={()=>setOpen(false)} {...demoProps('t3')}>完成</Button></Dialog>
  </BusinessDemo>;
}
