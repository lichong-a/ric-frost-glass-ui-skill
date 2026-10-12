import { useState } from 'react';
import { BusinessDemo } from '../support';

// 场景：同组按钮表示多个可同时开启的筛选条件；互斥选择使用 RadioButton。
export default function ToggleButtonGroupDemo() {
  const options = ['仅我的','有附件','待处理']; const [selected, setSelected] = useState<string[]>(['待处理']);
  return <BusinessDemo title="ToggleButtonGroup · 按钮切换组" description="多个筛选条件可组合，按钮显示各自选择状态。"><div className="aw-business-segments" role="group" aria-label="任务筛选">{options.map(item => <button key={item} type="button" aria-pressed={selected.includes(item)} onClick={() => setSelected(value => value.includes(item) ? value.filter(entry => entry !== item) : [...value,item])}>{item}</button>)}</div><p className="aw-business-status" role="status">筛选：{selected.join('、') || '无'}</p></BusinessDemo>;
}
