import { useState, useId } from 'react';
import { BusinessDemo, Field } from '../support';

// 场景：固定候选项的单选或多选；大量可搜索候选项改用 AutoComplete。
export default function SelectDemo() {
  const id = useId(); const options = ['设计工作室','研发团队','运营空间','个人空间']; const [value, setValue] = useState(options[0]); const [multiple, setMultiple] = useState<string[]>([options[0]]);
  return <BusinessDemo title="Select · 下拉选择" description="固定候选项的单选和多选，状态由调用方维护。"><Field label="默认空间" htmlFor={id}><select id={id} value={value} onChange={event => setValue(event.target.value)}>{options.map(item => <option key={item}>{item}</option>)}</select></Field><fieldset><legend>同时参与的空间</legend>{options.map(item => <label className="aw-business-choice" key={item}><input type="checkbox" checked={multiple.includes(item)} onChange={event => setMultiple(current => event.target.checked ? [...current,item] : current.filter(entry => entry !== item))} />{item}</label>)}</fieldset><p className="aw-business-status" role="status">默认：{value}；参与：{multiple.join('、') || '无'}</p></BusinessDemo>;
}
