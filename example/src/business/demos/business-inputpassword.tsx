import { useState, useId } from 'react';
import { BusinessDemo, Button, Field } from '../support';

// 场景：敏感文本输入，提供显隐切换与本地强度提示，不记录或持久化值。
export default function InputPasswordDemo() {
  const id = useId(); const [value, setValue] = useState(''); const [visible, setVisible] = useState(false); const strength = [value.length >= 8,/[A-Z]/.test(value),/[0-9]/.test(value),/[^a-zA-Z0-9]/.test(value)].filter(Boolean).length;
  return <BusinessDemo title="InputPassword · 密码输入" description="可切换显隐，强度提示辅助理解规则。"><Field label="示例密码" htmlFor={id}><div className="aw-business-row"><input id={id} style={{ flex:1,minWidth:180 }} type={visible ? 'text' : 'password'} autoComplete="new-password" maxLength={128} value={value} onChange={event => setValue(event.target.value)} /><Button variant="secondary" aria-pressed={visible} onClick={() => setVisible(current => !current)}>{visible ? '隐藏' : '显示'}</Button></div></Field><meter min={0} max={4} value={strength} aria-label="密码强度" /><p className="aw-business-status" role="status">本地强度：{['未输入','较弱','一般','较好','较强'][value ? strength : 0]}</p></BusinessDemo>;
}
