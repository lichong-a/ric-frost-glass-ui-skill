// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button, Dialog } from '../support';


export default function BusinessBackdropDemo() {
  const [open,setOpen]=useState(false);
  return <BusinessDemo title="Backdrop" description="遮罩将注意力集中到本地弹窗，点击遮罩或按Escape关闭。">
    <Button onClick={()=>setOpen(true)}>显示遮罩与内容</Button><Dialog open={open} title="聚焦当前操作" onClose={()=>setOpen(false)}><p>当前弹窗处于浏览器顶层。可点击遮罩、按Escape或关闭按钮返回。</p><Button onClick={()=>setOpen(false)}>关闭当前操作</Button></Dialog>
  </BusinessDemo>;
}
