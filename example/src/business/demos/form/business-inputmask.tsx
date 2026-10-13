import ownedStyles0 from '../../components/DemoLayout.module.css';
import ownedStyles1 from '../../components/Input.module.css';
import { componentClasses } from '../../class-names';
import { useState, useId } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Field } from '../../components/Field';
import { useDemoConfig } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
// 场景：录入固定格式的标识符；掩码辅助输入，不替代完整格式与服务端校验。
export default function InputMaskDemo() {
  const { props: demoProps } = useDemoConfig();
  const id = useId(); const [digits, setDigits] = useState(''); const value = [digits.slice(0,3),digits.slice(3,7),digits.slice(7,11)].filter(Boolean).join(' ');
  return <BusinessDemo title="InputMask · 格式输入" description="手机号格式辅助；保存纯数字，展示按分组排版。"><Field label="手机号示例" htmlFor={id} hint="11 位数字，展示为 123 4567 8901。" {...demoProps('t0')}><input className={cn('aw-business-input')} id={id} type="tel" inputMode="numeric" autoComplete="off" value={value} placeholder="123 4567 8901" onChange={event => setDigits(event.target.value.replace(/\D/g,'').slice(0,11))} {...demoProps('t1')} /></Field><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">原始值：{digits || '空'} · {digits.length === 11 ? '格式完整' : `已录入 ${digits.length}/11 位`}</p></BusinessDemo>;
}
