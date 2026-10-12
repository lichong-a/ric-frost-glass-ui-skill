import { useState, useId } from 'react';
import { BusinessDemo, Field } from '../support';

// 场景：选择明确的日历日期；本例使用浏览器原生日期选择，日期值不混入时区。
export default function DatePickerDemo() {
  const id = useId(); const [date, setDate] = useState('2026-10-12'); const [end, setEnd] = useState('2026-10-19');
  return <BusinessDemo title="DatePicker · 日期选择" description="单日或起止日期，保存 YYYY-MM-DD 日期值。"><div className="aw-business-grid"><Field label="开始日期" htmlFor={id}><input id={id} type="date" value={date} onChange={event => { setDate(event.target.value); if (end && event.target.value > end) setEnd(event.target.value); }} /></Field><Field label="结束日期" htmlFor={`${id}-end`}><input id={`${id}-end`} type="date" min={date || undefined} value={end} onChange={event => setEnd(event.target.value)} /></Field></div><p className="aw-business-status" role="status">区间：{date || '未选'} 至 {end || '未选'}</p></BusinessDemo>;
}
