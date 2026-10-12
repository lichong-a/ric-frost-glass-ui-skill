// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button } from '../support';
import { MotionSurface } from '../primitives';


export default function BusinessMotionDemo() {
  const [revision,setRevision]=useState(0);
  return <BusinessDemo title="Motion" description="在局部内容切换时播放入场动画，系统减少运动时直接展示终态。">
    <Button onClick={()=>setRevision(value=>value+1)}>切换内容并播放入场</Button><MotionSurface key={revision}><article className="aw-business-item"><h3>内容版本 {revision+1}</h3><p>新的本地内容已经进入阅读区。</p></article></MotionSurface>
  </BusinessDemo>;
}
