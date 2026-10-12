import { useState } from 'react';
import { BusinessDemo } from '../support';

// 场景：从同一组候选中选择多项，使用 fieldset 与 legend 表达组含义。
export default function CheckboxGroupDemo() {
  const options = ['站内通知','邮件摘要','每周报告']; const [selected, setSelected] = useState<string[]>(['站内通知']);
  return <BusinessDemo title="CheckboxGroup · 复选组" description="多个选项可以独立组合，适合权限或通知偏好。"><fieldset><legend>需要的通知渠道</legend>{options.map(item => <label key={item} className="aw-business-choice"><input type="checkbox" checked={selected.includes(item)} onChange={event => setSelected(value => event.target.checked ? [...value,item] : value.filter(entry => entry !== item))} />{item}</label>)}</fieldset><p className="aw-business-status" role="status">已选：{selected.join('、') || '无'}</p></BusinessDemo>;
}
