import ownedStyles0 from '../../components/DemoLayout.module.css';
import ownedStyles1 from '../../components/Input.module.css';
import { componentClasses } from '../../class-names';
import { useState, useId } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Field } from '../../components/Field';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
// 场景：限制输入字符的体验辅助；仍需要提交校验，不将键盘过滤视为安全边界。
export default function KeyFilterDemo() {
  const { props: demoProps } = useDemoConfig();
  const id = useId(); const [value, setValue] = useDemoState('state.value', '');
  return <BusinessDemo title="KeyFilter · 字符过滤" description="仅保留数字，粘贴与键入使用同一规则。"><Field label="数字编号" htmlFor={id} hint="最多 12 位数字。" {...demoProps('t0')}><input className={cn('aw-business-input')} id={id} inputMode="numeric" pattern="[0-9]*" maxLength={12} value={value} onChange={event => setValue(event.target.value.replace(/\D/g,'').slice(0,12))} {...demoProps('t1')} /></Field><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">编号：{value || '未填写'}</p></BusinessDemo>;
}
