// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button } from '../support';


export default function BusinessProgressBarDemo() {
  const [progress,setProgress]=useState(20);
  return <BusinessDemo title="ProgressBar" description="本地步骤完成度由按钮驱动，终值限制在100%，可重置。">
    <label>资料整理完成度<progress max="100" value={progress} style={{display:'block',width:'100%',height:24}}>{progress}%</progress></label><p className="aw-business-status" role="status">{progress}% {progress===100?'已完成':'处理中'}</p><div className="aw-business-row"><Button disabled={progress===100} onClick={()=>setProgress(value=>Math.min(100,value+20))}>完成下一步</Button><Button variant="secondary" onClick={()=>setProgress(0)}>重置</Button></div>
  </BusinessDemo>;
}
