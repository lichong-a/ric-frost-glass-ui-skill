import ownedStyles0 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { useState, useEffect } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { useDemoConfig } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessToastDemo() {
  const { props: demoProps } = useDemoConfig();
  const [notice,setNotice]=useState<string|null>(null); const [sequence,setSequence]=useState(0); useEffect(()=>{if(!notice)return;const timer=window.setTimeout(()=>setNotice(null),4000);return()=>window.clearTimeout(timer);},[notice,sequence]);
  return <BusinessDemo title="Toast" description="短消息在本地出现，可手动关闭，4秒后自动移除；卸载时清理计时器。">
    <div data-ui="aw-business-row" className={cn("aw-business-row")}><Button onClick={()=>{setSequence(value=>value+1);setNotice('本地草稿已保存。');}} {...demoProps('t0')}>显示成功提示</Button><Button variant="secondary" onClick={()=>{setSequence(value=>value+1);setNotice('可以继续完善草稿内容。');}} {...demoProps('t1')}>显示普通提示</Button></div>{notice?<div data-ui="aw-business-item" className={cn("aw-business-item aw-business-row")} role="status" style={{position:'fixed',right:20,bottom:20,zIndex:100,maxWidth:'calc(100% - 40px)'}}><span>{notice}</span><Button variant="secondary" aria-label="关闭提示" onClick={()=>setNotice(null)} {...demoProps('t2')}>关闭</Button></div>:null}
  </BusinessDemo>;
}
