// Original Agent Wan demonstration using React and native browser controls.
import { useState, useId } from 'react';
import { BusinessDemo } from '../support';


export default function BusinessTooltipDemo() {
  const [visible,setVisible]=useState(false); const tooltipId=useId();
  return <BusinessDemo title="Tooltip" description="悬停或键盘聚焦图标时显示说明，离开或按Escape后隐藏。">
    <div style={{position:'relative',width:'fit-content'}}><button type="button" className="aw-button" aria-label="帮助" aria-describedby={visible?tooltipId:undefined} onMouseEnter={()=>setVisible(true)} onMouseLeave={()=>setVisible(false)} onFocus={()=>setVisible(true)} onBlur={()=>setVisible(false)} onKeyDown={event=>{if(event.key==='Escape')setVisible(false);}}>?</button>{visible?<div id={tooltipId} role="tooltip" className="aw-business-item" style={{position:'absolute',top:'calc(100% + 8px)',left:0,width:220,zIndex:2}}>这里查看当前操作的说明。</div>:null}</div><p>使用 Tab 聚焦帮助按钮也能阅读提示。</p>
  </BusinessDemo>;
}
