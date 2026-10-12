import { useState, useId } from 'react';
import { BusinessDemo, Field } from '../support';

// 场景：多行说明、备注和反馈，明确长度与可调整高度。
export default function TextareaDemo() {
  const id = useId(); const [value, setValue] = useState('');
  return <BusinessDemo title="Textarea · 多行文本" description="适合说明、备注和反馈，提供字数提示。"><Field label="需求说明" htmlFor={id}><textarea id={id} rows={5} maxLength={500} value={value} onChange={event => setValue(event.target.value)} placeholder="描述需要完成的工作" /></Field><p className="aw-business-status" role="status">{value.length}/500 字</p></BusinessDemo>;
}
