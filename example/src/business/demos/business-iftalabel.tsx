import { useState, useId } from 'react';
import { BusinessDemo } from '../support';

// 场景：标签常驻输入框上方内部，适合需要持续看到字段名称的密集表单。
export default function IftaLabelDemo() {
  const id = useId(); const [value, setValue] = useState('设计工作室');
  return <BusinessDemo title="IftaLabel · 内置顶部标签" description="字段名称常驻输入框内部上方，不依赖占位符。"><div className="aw-business-ifta"><label htmlFor={id}>空间名称</label><input id={id} value={value} onChange={event => setValue(event.target.value)} /></div><p className="aw-business-status" role="status">当前空间：{value || '未填写'}</p></BusinessDemo>;
}
