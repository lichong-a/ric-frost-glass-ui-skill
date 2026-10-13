import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { Dialog } from '../../components/Dialog';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessBackdropDemo() {
  const { props: demoProps } = useDemoConfig();
  const [open,setOpen]=useDemoState('state.open', false);
  return <BusinessDemo title="Backdrop" description="遮罩将注意力集中到本地弹窗，点击遮罩或按Escape关闭。">
    <Button onClick={()=>setOpen(true)} {...demoProps('t0')}>显示遮罩与内容</Button><Dialog open={open} title="聚焦当前操作" onClose={()=>setOpen(false)} {...demoProps('t1')}><p>当前弹窗处于浏览器顶层。可点击遮罩、按Escape或关闭按钮返回。</p><Button onClick={()=>setOpen(false)} {...demoProps('t2')}>关闭当前操作</Button></Dialog>
  </BusinessDemo>;
}
