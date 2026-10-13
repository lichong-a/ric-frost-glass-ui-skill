import ownedStyles0 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { LocalPortal } from '../../components/LocalPortal';
import { useDemoConfig } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessPortalDemo() {
  const { props: demoProps } = useDemoConfig();
  const [visible,setVisible]=useState(false); const [target,setTarget]=useState<HTMLDivElement|null>(null); const [count,setCount]=useState(0);
  return <BusinessDemo title="Portal" description="将内容从源位置渲染到独立目标容器，目标切换后仍由React管理。">
    <div data-ui="aw-business-item" className={cn("aw-business-item")}><p>内容来源区域</p><Button onClick={()=>setVisible(value=>!value)} {...demoProps('t0')}>{visible?'移除目标中的内容':'将内容渲染到目标'}</Button></div><div data-ui="aw-business-item" className={cn("aw-business-item")} ref={setTarget} aria-label="Portal目标区域"><h3>独立渲染目标</h3>{!visible?<p>目标中尚未挂载内容。</p>:null}</div>{visible?<LocalPortal target={target}><div data-ui="aw-business-row" className={cn("aw-business-row")}><p>内容来自上方源区域，计数 {count}</p><Button variant="secondary" onClick={()=>setCount(value=>value+1)} {...demoProps('t2')}>增加计数</Button></div></LocalPortal>:null}
  </BusinessDemo>;
}
