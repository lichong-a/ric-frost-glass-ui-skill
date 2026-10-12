import { useState, useId } from 'react';
import { BusinessDemo, Field } from '../support';

// 场景：给输入和控件提供稳定名称，点击标签将焦点交给关联输入。
export default function LabelDemo() {
  const id = useId(); const [value, setValue] = useState('');
  return <BusinessDemo title="Label · 字段标签" description="点击标签可聚焦关联输入；必填提示使用可读文字。"><Field label="显示名称（必填）" htmlFor={id}><input id={id} required value={value} onChange={event => setValue(event.target.value)} /></Field><p className="aw-business-status" role="status">名称：{value || '未填写'}</p></BusinessDemo>;
}
