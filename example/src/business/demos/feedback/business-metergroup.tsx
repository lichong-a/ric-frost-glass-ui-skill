import { componentClasses } from '../../class-names';
import { RangeSlider } from '../../components/RangeSlider';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Field } from '../../components/Field';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessMeterGroupDemo() {
  const { props: demoProps } = useDemoConfig();
  const [knowledge,setKnowledge]=useDemoState('state.knowledge', 45); const groups=[{label:'知识',value:knowledge,color:'var(--aw-palette-primary)'},{label:'文档',value:Math.round((100-knowledge)*0.6),color:'var(--aw-palette-sand)'},{label:'服务',value:100-knowledge-Math.round((100-knowledge)*0.6),color:'var(--aw-palette-terra)'}];
  return <BusinessDemo title="MeterGroup" description="分组展示资料容量分配，调整知识占比后其他类别自动保持总和100%。">
    <Field control label={`知识占比：${knowledge}%`} {...demoProps('t0')}><RangeSlider min="0" max="100" value={knowledge} onChange={event=>setKnowledge(Number(event.target.value))} {...demoProps('t1')} /></Field><div style={{display:'flex',height:24,borderRadius:12,overflow:'hidden'}} aria-hidden="true">{groups.map(group=><div key={group.label} style={{width:`${group.value}%`,background:group.color}} />)}</div><ul>{groups.map(group=><li key={group.label}>{group.label}：<meter min="0" max="100" value={group.value} aria-label={group.label+'占比'} {...demoProps('t2')} /> {group.value}%</li>)}</ul>
  </BusinessDemo>;
}
