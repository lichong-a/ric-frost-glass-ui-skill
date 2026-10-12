import { useState, useId } from 'react';
import { BusinessDemo } from '../support';

// 场景：少量互斥选项且需要同时看到候选项时使用单选组。
export default function RadioButtonDemo() {
  const options = ['仅当前空间','所有参与空间','全部空间']; const [value, setValue] = useState(options[0]); const id = useId();
  return <BusinessDemo title="RadioButton · 单选组" description="选项互斥，用同一 name 保留原生方向键操作。"><fieldset><legend>查看范围</legend>{options.map(item => <label key={item} className="aw-business-choice"><input type="radio" name={id} value={item} checked={value === item} onChange={() => setValue(item)} />{item}</label>)}</fieldset><p className="aw-business-status" role="status">范围：{value}</p></BusinessDemo>;
}
