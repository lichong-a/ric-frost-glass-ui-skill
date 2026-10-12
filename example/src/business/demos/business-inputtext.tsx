import { useState, useId } from 'react';
import { BusinessDemo, Field } from '../support';

// 场景：普通短文本字段，明确标签、长度与错误状态。
export default function InputTextDemo() {
  const id = useId(); const [value, setValue] = useState(''); const [touched, setTouched] = useState(false); const invalid = touched && !value.trim();
  return <BusinessDemo title="InputText · 单行文本" description="标签、必填、字数与错误状态共同组成完整字段。"><Field label="工作空间名称" htmlFor={id}><input id={id} value={value} maxLength={40} required aria-invalid={invalid} aria-describedby={`${id}-hint`} onBlur={() => setTouched(true)} onChange={event => setValue(event.target.value)} /></Field><p id={`${id}-hint`} className="aw-business-status" role="status">{invalid ? '请填写工作空间名称。' : `${value.length}/40 字`}</p></BusinessDemo>;
}
