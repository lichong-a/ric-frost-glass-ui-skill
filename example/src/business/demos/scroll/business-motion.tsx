import ownedStyles0 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { MotionSurface } from '../../components/MotionSurface';
import { useDemoConfig } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessMotionDemo() {
  const { props: demoProps } = useDemoConfig();
  const [revision,setRevision]=useState(0);
  return <BusinessDemo title="Motion" description="在局部内容切换时播放入场动画，系统减少运动时直接展示终态。">
    <Button onClick={()=>setRevision(value=>value+1)} {...demoProps('t0')}>切换内容并播放入场</Button><MotionSurface key={revision}><article data-ui="aw-business-item" className={cn("aw-business-item")}><h3>内容版本 {revision+1}</h3><p>新的本地内容已经进入阅读区。</p></article></MotionSurface>
  </BusinessDemo>;
}
