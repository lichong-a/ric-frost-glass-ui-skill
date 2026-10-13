import ownedStyles0 from '../../components/DemoLayout.module.css';
import ownedStyles1 from '../../components/Input.module.css';
import { componentClasses } from '../../class-names';
import { useState, useId } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Field } from '../../components/Field';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
// 场景：给输入和控件提供稳定名称，点击标签将焦点交给关联输入。
export default function LabelDemo() {
  const { props: demoProps } = useDemoConfig();
  const id = useId(); const [value, setValue] = useDemoState('state.value', '');
  return <BusinessDemo title="Label · 字段标签" description="点击标签可聚焦关联输入；必填提示使用可读文字。"><Field label="显示名称（必填）" htmlFor={id} {...demoProps('t0')}><input className={cn('aw-business-input')} id={id} required value={value} onChange={event => setValue(event.target.value)} {...demoProps('t1')} /></Field><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">名称：{value || '未填写'}</p></BusinessDemo>;
}
