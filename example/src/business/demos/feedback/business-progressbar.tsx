import ownedStyles0 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessProgressBarDemo() {
  const { props: demoProps } = useDemoConfig();
  const [progress,setProgress]=useDemoState('state.progress', 20);
  return <BusinessDemo title="ProgressBar" description="本地步骤完成度由按钮驱动，终值限制在100%，可重置。">
    <label>资料整理完成度<progress max="100" value={progress} style={{display:'block',width:'100%',height:24}} {...demoProps('t0')}>{progress}%</progress></label><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">{progress}% {progress===100?'已完成':'处理中'}</p><div data-ui="aw-business-row" className={cn("aw-business-row")}><Button disabled={progress===100} onClick={()=>setProgress(value=>Math.min(100,value+20))} {...demoProps('t1')}>完成下一步</Button><Button variant="secondary" onClick={()=>setProgress(0)} {...demoProps('t2')}>重置</Button></div>
  </BusinessDemo>;
}
