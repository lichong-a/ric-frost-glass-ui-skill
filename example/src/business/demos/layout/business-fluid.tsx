import ownedStyles0 from '../../components/DemoLayout.module.css';
import ownedStyles1 from '../../components/Input.module.css';
import { componentClasses } from '../../class-names';
import { RangeSlider } from '../../components/RangeSlider';
import { useBusinessReducedMotion } from '../../motion-preference';
import { motion } from 'motion/react';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { Field } from '../../components/Field';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessFluidDemo() {
  const { props: demoProps } = useDemoConfig();
  const reduced=useBusinessReducedMotion(); const [width,setWidth]=useDemoState('state.width', 100); const [query,setQuery]=useDemoState('state.query', ''); const [message,setMessage]=useState('等待查询。');
  return <BusinessDemo title="Fluid" description="调整容器宽度，输入与操作按钮随容器伸缩，保持可读布局。">
    <Field control label={`容器宽度：${width}%`} {...demoProps('t0')}><RangeSlider min="45" max="100" value={width} onChange={event=>setWidth(Number(event.target.value))} {...demoProps('t1')} /></Field><motion.form animate={{width:`${width}%`}} transition={{duration:reduced?0:0.2}} style={{display:'grid',gap:12}} onSubmit={event=>{event.preventDefault();setMessage(query.trim()?'当前本地查询：'+query.trim():'请输入查询内容。');}}><Field label="查询内容" {...demoProps('t2')}><input data-ui="aw-business-input" className={cn("aw-business-input")} style={{width:'100%'}} value={query} onChange={event=>setQuery(event.target.value)} {...demoProps('t3')} /></Field><Button type="submit" {...demoProps('t4')}>查询</Button></motion.form><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">{message}</p>
  </BusinessDemo>;
}
