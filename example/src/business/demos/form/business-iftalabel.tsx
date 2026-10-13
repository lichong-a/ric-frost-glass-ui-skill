import ownedStyles0 from '../../components/DemoLayout.module.css';
import ownedStyles1 from '../../components/Input.module.css';
import { componentClasses } from '../../class-names';
import { useState, useId } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
// 场景：标签常驻输入框上方内部，适合需要持续看到字段名称的密集表单。
export default function IftaLabelDemo() {
  const id = useId(); const [value, setValue] = useDemoState('state.value', '设计工作室');
  return <BusinessDemo title="IftaLabel · 内置顶部标签" description="字段名称常驻输入框内部上方，不依赖占位符。"><div data-ui="aw-business-ifta" className={cn("aw-business-ifta")}><label htmlFor={id}>空间名称</label><input className={cn('aw-business-input')} id={id} value={value} onChange={event => setValue(event.target.value)} /></div><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">当前空间：{value || '未填写'}</p></BusinessDemo>;
}
