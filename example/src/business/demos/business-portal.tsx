// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button } from '../support';
import { LocalPortal } from '../primitives';


export default function BusinessPortalDemo() {
  const [visible,setVisible]=useState(false); const [target,setTarget]=useState<HTMLDivElement|null>(null); const [count,setCount]=useState(0);
  return <BusinessDemo title="Portal" description="将内容从源位置渲染到独立目标容器，目标切换后仍由React管理。">
    <div className="aw-business-item"><p>内容来源区域</p><Button onClick={()=>setVisible(value=>!value)}>{visible?'移除目标中的内容':'将内容渲染到目标'}</Button></div><div className="aw-business-item" ref={setTarget} aria-label="Portal目标区域"><h3>独立渲染目标</h3>{!visible?<p>目标中尚未挂载内容。</p>:null}</div>{visible?<LocalPortal target={target}><div className="aw-business-row"><p>内容来自上方源区域，计数 {count}</p><Button variant="secondary" onClick={()=>setCount(value=>value+1)}>增加计数</Button></div></LocalPortal>:null}
  </BusinessDemo>;
}
