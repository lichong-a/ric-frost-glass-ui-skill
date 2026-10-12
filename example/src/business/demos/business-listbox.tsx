import { useState, useId } from 'react';
import { BusinessDemo, Field } from '../support';

// 场景：候选项需要持续可见时使用列表选择，不必展开下拉框。
export default function ListboxDemo() {
  const id = useId(); const options = ['待处理','设计中','实现中','待验收','已完成']; const [value, setValue] = useState('待处理');
  return <BusinessDemo title="Listbox · 列表选择" description="候选项持续可见，支持原生键盘选择。"><Field label="任务阶段" htmlFor={id}><select id={id} size={5} value={value} onChange={event => setValue(event.target.value)}>{options.map(item => <option key={item}>{item}</option>)}</select></Field><p className="aw-business-status" role="status">阶段：{value}</p></BusinessDemo>;
}
