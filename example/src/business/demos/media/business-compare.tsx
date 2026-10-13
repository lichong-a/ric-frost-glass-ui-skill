import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { ImageCompare } from '../../components/ImageCompare';
import { MEDIA } from '../../../shared/demo-support';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessCompareDemo() {
  const { props: demoProps } = useDemoConfig();
  const [position,setPosition]=useDemoState('state.position', 50);
  return <BusinessDemo title="Compare" description="拖动或键盘调整滑块，比较两张本地图片的覆盖比例。">
    <ImageCompare before={MEDIA[0]} after={MEDIA[3]} value={position} onChange={setPosition} {...demoProps('t0')} /><Button variant="secondary" onClick={()=>setPosition(50)} {...demoProps('t1')}>回到中间</Button>
  </BusinessDemo>;
}
