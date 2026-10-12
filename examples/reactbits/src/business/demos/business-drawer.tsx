// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button, Dialog } from '../support';


export default function BusinessDrawerDemo() {
  const [open,setOpen]=useState(false); const [notify,setNotify]=useState(false);
  return <BusinessDemo title="Drawer" description="从右侧打开任务抽屉，勾选本地选项后关闭；再次打开保留选择。">
    <Button onClick={()=>setOpen(true)}>打开任务抽屉</Button><p className="aw-business-status" role="status">本地提醒：{notify?'开启':'关闭'}</p><Dialog open={open} side="right" title="任务选项" onClose={()=>setOpen(false)}><label className="aw-business-row"><input type="checkbox" checked={notify} onChange={event=>setNotify(event.target.checked)} />完成后在界面显示提醒</label><Button onClick={()=>setOpen(false)}>完成</Button></Dialog>
  </BusinessDemo>;
}
