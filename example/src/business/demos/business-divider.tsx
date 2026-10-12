// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button } from '../support';


export default function BusinessDividerDemo() {
  const [vertical,setVertical]=useState(false);
  return <BusinessDemo title="Divider" description="切换水平与垂直分隔，比较同一组内容的布局。">
    <Button variant="secondary" onClick={()=>setVertical(value=>!value)}>{vertical?'改为水平分隔':'改为垂直分隔'}</Button><div style={{display:'flex',flexDirection:vertical?'row':'column',gap:16,alignItems:'stretch'}}><p>内容区</p><div role="separator" aria-orientation={vertical?'vertical':'horizontal'} style={{borderLeft:vertical?'1px solid var(--aw-color-border-control)':undefined,borderTop:vertical?undefined:'1px solid var(--aw-color-border-control)',minHeight:vertical?100:0}} /><p>操作区</p></div>
  </BusinessDemo>;
}
