import ownedStyles0 from '../../components/Button.module.css';
import ownedStyles1 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { useState, useId } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { useDemoConfig } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessTooltipDemo() {
  const { props: demoProps } = useDemoConfig();
  const [visible,setVisible]=useState(false); const tooltipId=useId();
  return <BusinessDemo title="Tooltip" description="悬停或键盘聚焦图标时显示说明，离开或按Escape后隐藏。">
    <div style={{position:'relative',width:'fit-content'}}><button data-ui="aw-button" type="button" className={cn("aw-button")} aria-label="帮助" aria-describedby={visible?tooltipId:undefined} onMouseEnter={()=>setVisible(true)} onMouseLeave={()=>setVisible(false)} onFocus={()=>setVisible(true)} onBlur={()=>setVisible(false)} onKeyDown={event=>{if(event.key==='Escape')setVisible(false);}} {...demoProps('t0')}>?</button>{visible?<div data-ui="aw-business-item" id={tooltipId} role="tooltip" className={cn("aw-business-item")} style={{position:'absolute',top:'calc(100% + 8px)',left:0,width:220,zIndex:2}}>这里查看当前操作的说明。</div>:null}</div><p>使用 Tab 聚焦帮助按钮也能阅读提示。</p>
  </BusinessDemo>;
}
