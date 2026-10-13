import ownedStyles0 from '../../components/DemoLayout.module.css';
import ownedStyles1 from '../../components/Input.module.css';
import { componentClasses } from '../../class-names';
import { useState, useId } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Field } from '../../components/Field';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
// 场景：为字段附加前缀、后缀或关联动作，如网址、单位和搜索按钮。
export default function InputGroupDemo() {
  const { props: demoProps } = useDemoConfig();
  const id = useId(); const [value, setValue] = useDemoState('state.value', 'studio');
  return <BusinessDemo title="InputGroup · 输入组合" description="前缀和后缀说明字段格式，不混入实际输入值。"><Field label="空间地址名称" htmlFor={id} {...demoProps('t0')}><div data-ui="aw-business-input-group" className={cn("aw-business-input-group")}><span>https://</span><input className={cn('aw-business-input')} id={id} value={value} onChange={event => setValue(event.target.value.replace(/[^a-z0-9-]/gi,''))} /><span>.example</span></div></Field><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">本地示例地址：https://{value || '空间名'}.example</p></BusinessDemo>;
}
