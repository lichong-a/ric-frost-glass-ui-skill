import { useState, useId } from 'react';
import { BusinessDemo, Field } from '../support';

// 场景：在有界连续范围内调整值或选择区间，保留精确值展示。
export default function SliderDemo() {
  const id = useId(); const [value, setValue] = useState(40); const [start, setStart] = useState(20); const [end, setEnd] = useState(80);
  return <BusinessDemo title="Slider · 范围滑块" description="单值和区间选择，同时展示精确数字。"><Field label={`采样比例 ${value}%`} htmlFor={id}><input id={id} type="range" min={0} max={100} value={value} onChange={event => setValue(Number(event.target.value))} /></Field><Field label={`区间下限 ${start}`} htmlFor={`${id}-start`}><input id={`${id}-start`} type="range" min={0} max={end} value={start} onChange={event => setStart(Number(event.target.value))} /></Field><Field label={`区间上限 ${end}`} htmlFor={`${id}-end`}><input id={`${id}-end`} type="range" min={start} max={100} value={end} onChange={event => setEnd(Number(event.target.value))} /></Field><p className="aw-business-status" role="status">区间：{start}–{end}</p></BusinessDemo>;
}
