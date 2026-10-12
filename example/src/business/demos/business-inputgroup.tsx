import { useState, useId } from 'react';
import { BusinessDemo, Field } from '../support';

// 场景：为字段附加前缀、后缀或关联动作，如网址、单位和搜索按钮。
export default function InputGroupDemo() {
  const id = useId(); const [value, setValue] = useState('studio');
  return <BusinessDemo title="InputGroup · 输入组合" description="前缀和后缀说明字段格式，不混入实际输入值。"><Field label="空间地址名称" htmlFor={id}><div className="aw-business-input-group"><span>https://</span><input id={id} value={value} onChange={event => setValue(event.target.value.replace(/[^a-z0-9-]/gi,''))} /><span>.example</span></div></Field><p className="aw-business-status" role="status">本地示例地址：https://{value || '空间名'}.example</p></BusinessDemo>;
}
