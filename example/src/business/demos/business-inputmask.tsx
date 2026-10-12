import { useState, useId } from 'react';
import { BusinessDemo, Field } from '../support';

// 场景：录入固定格式的标识符；掩码辅助输入，不替代完整格式与服务端校验。
export default function InputMaskDemo() {
  const id = useId(); const [digits, setDigits] = useState(''); const value = [digits.slice(0,3),digits.slice(3,7),digits.slice(7,11)].filter(Boolean).join(' ');
  return <BusinessDemo title="InputMask · 格式输入" description="手机号格式辅助；保存纯数字，展示按分组排版。"><Field label="手机号示例" htmlFor={id} hint="11 位数字，展示为 123 4567 8901。"><input id={id} type="tel" inputMode="numeric" autoComplete="off" value={value} placeholder="123 4567 8901" onChange={event => setDigits(event.target.value.replace(/\D/g,'').slice(0,11))} /></Field><p className="aw-business-status" role="status">原始值：{digits || '空'} · {digits.length === 11 ? '格式完整' : `已录入 ${digits.length}/11 位`}</p></BusinessDemo>;
}
