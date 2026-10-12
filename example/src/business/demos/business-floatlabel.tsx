import { useState, useId } from 'react';
import { BusinessDemo } from '../support';

// 场景：空间紧凑的表单中，标签在聚焦或输入后浮起，避免丢失字段含义。
export default function FloatLabelDemo() {
  const id = useId(); const [value, setValue] = useState('');
  return <BusinessDemo title="FloatLabel · 浮动标签" description="有值或聚焦后标签浮起，字段始终保留可访问名称。"><div className="aw-business-float"><input id={id} placeholder=" " value={value} onChange={event => setValue(event.target.value)} /><label htmlFor={id}>工作空间名称</label></div><p className="aw-business-status" role="status">名称：{value || '未填写'}</p></BusinessDemo>;
}
