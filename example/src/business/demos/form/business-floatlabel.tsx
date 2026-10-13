import ownedStyles0 from '../../components/DemoLayout.module.css';
import ownedStyles1 from '../../components/Input.module.css';
import { componentClasses } from '../../class-names';
import { useState, useId } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
// 场景：空间紧凑的表单中，标签在聚焦或输入后浮起，避免丢失字段含义。
export default function FloatLabelDemo() {
  const { props: demoProps } = useDemoConfig();
  const id = useId(); const [value, setValue] = useDemoState('state.value', '');
  return <BusinessDemo title="FloatLabel · 浮动标签" description="有值或聚焦后标签浮起，字段始终保留可访问名称。"><div data-ui="aw-business-float" className={cn("aw-business-float")}><input className={cn('aw-business-input')} id={id} placeholder=" " value={value} onChange={event => setValue(event.target.value)} {...demoProps('t0')} /><label htmlFor={id}>工作空间名称</label></div><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">名称：{value || '未填写'}</p></BusinessDemo>;
}
