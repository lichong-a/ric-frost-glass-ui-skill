import { useState, useId } from 'react';
import { BusinessDemo, Button, Field } from '../support';

// 场景：数量、金额或有上下限的数值录入，明确单位、范围和步长。
export default function InputNumberDemo() {
  const id = useId(); const [value, setValue] = useState<number | null>(12);
  return <BusinessDemo title="InputNumber · 数值输入" description="数量范围 0–100，支持输入、增减和空值。"><Field label="批处理数量" htmlFor={id}><div className="aw-business-row"><Button variant="secondary" aria-label="减少数量" disabled={value === 0} onClick={() => setValue(Math.max(0,(value ?? 0)-1))}>−</Button><input id={id} type="number" style={{ width:120 }} min={0} max={100} step={1} value={value ?? ''} onChange={event => setValue(event.target.value === '' ? null : Math.min(100,Math.max(0,Math.round(Number(event.target.value)))))} /><Button variant="secondary" aria-label="增加数量" disabled={value === 100} onClick={() => setValue(Math.min(100,(value ?? 0)+1))}>+</Button></div></Field><p className="aw-business-status" role="status">数量：{value === null ? '未填写' : value}</p></BusinessDemo>;
}
