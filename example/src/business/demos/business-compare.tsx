// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button } from '../support';
import { ImageCompare } from '../primitives';
import { MEDIA } from '../../shared/demo-support';


export default function BusinessCompareDemo() {
  const [position,setPosition]=useState(50);
  return <BusinessDemo title="Compare" description="拖动或键盘调整滑块，比较两张本地图片的覆盖比例。">
    <ImageCompare before={MEDIA[0]} after={MEDIA[3]} value={position} onChange={setPosition} /><Button variant="secondary" onClick={()=>setPosition(50)}>回到中间</Button>
  </BusinessDemo>;
}
