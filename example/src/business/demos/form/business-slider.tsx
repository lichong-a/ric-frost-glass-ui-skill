import ownedStyles0 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { RangeSlider } from '../../components/RangeSlider';
import { useState, useId } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Field } from '../../components/Field';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
// 场景：在有界连续范围内调整值或选择区间，保留精确值展示。
export default function SliderDemo() {
  const { props: demoProps } = useDemoConfig();
  const id = useId(); const [value, setValue] = useDemoState('state.value', 40); const [start, setStart] = useDemoState('state.start', 20); const [end, setEnd] = useDemoState('state.end', 80);
  return <BusinessDemo title="Slider · 范围滑块" description="单值和区间选择，同时展示精确数字。"><Field control label={`采样比例 ${value}%`} htmlFor={id} {...demoProps('t0')}><RangeSlider id={id} min={0} max={100} value={value} onChange={event => setValue(Number(event.target.value))} {...demoProps('t1')} /></Field><Field control label={`区间下限 ${start}`} htmlFor={`${id}-start`} {...demoProps('t2')}><RangeSlider id={`${id}-start`} min={0} max={end} value={start} onChange={event => setStart(Number(event.target.value))} {...demoProps('t3')} /></Field><Field control label={`区间上限 ${end}`} htmlFor={`${id}-end`} {...demoProps('t4')}><RangeSlider id={`${id}-end`} min={start} max={100} value={end} onChange={event => setEnd(Number(event.target.value))} {...demoProps('t5')} /></Field><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">区间：{start}–{end}</p></BusinessDemo>;
}
