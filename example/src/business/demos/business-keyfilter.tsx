import { useState, useId } from 'react';
import { BusinessDemo, Field } from '../support';

// 场景：限制输入字符的体验辅助；仍需要提交校验，不将键盘过滤视为安全边界。
export default function KeyFilterDemo() {
  const id = useId(); const [value, setValue] = useState('');
  return <BusinessDemo title="KeyFilter · 字符过滤" description="仅保留数字，粘贴与键入使用同一规则。"><Field label="数字编号" htmlFor={id} hint="最多 12 位数字。"><input id={id} inputMode="numeric" pattern="[0-9]*" maxLength={12} value={value} onChange={event => setValue(event.target.value.replace(/\D/g,'').slice(0,12))} /></Field><p className="aw-business-status" role="status">编号：{value || '未填写'}</p></BusinessDemo>;
}
