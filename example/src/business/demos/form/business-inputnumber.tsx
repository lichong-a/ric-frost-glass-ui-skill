import ownedStyles0 from '../../components/DemoLayout.module.css';
import ownedStyles1 from '../../components/Input.module.css';
import { componentClasses } from '../../class-names';
import { useState, useId } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { Field } from '../../components/Field';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
// 场景：数量、金额或有上下限的数值录入，明确单位、范围和步长。
export default function InputNumberDemo() {
  const { props: demoProps } = useDemoConfig();
  const id = useId(); const [value, setValue] = useDemoState<number | null>('state.value', 12);
  return <BusinessDemo title="InputNumber · 数值输入" description="数量范围 0–100，支持输入、增减和空值。"><Field label="批处理数量" htmlFor={id} {...demoProps('t0')}><div data-ui="aw-business-row" className={cn("aw-business-row")}><Button variant="secondary" aria-label="减少数量" disabled={value === 0} onClick={() => setValue(Math.max(0,(value ?? 0)-1))} {...demoProps('t1')}>−</Button><input className={cn('aw-business-input')} id={id} type="number" style={{ width:120 }} min={0} max={100} step={1} value={value ?? ''} onChange={event => setValue(event.target.value === '' ? null : Math.min(100,Math.max(0,Math.round(Number(event.target.value)))))} {...demoProps('t2')} /><Button variant="secondary" aria-label="增加数量" disabled={value === 100} onClick={() => setValue(Math.min(100,(value ?? 0)+1))} {...demoProps('t3')}>+</Button></div></Field><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">数量：{value === null ? '未填写' : value}</p></BusinessDemo>;
}
