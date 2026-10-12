import { useState } from 'react';
import { BusinessDemo } from '../support';

// 场景：相关动作紧邻呈现，保持各按钮独立的语义与可访问名称。
export default function ButtonGroupDemo() {
  const [value, setValue] = useState('周');
  return <BusinessDemo title="ButtonGroup · 按钮组" description="相关动作放在一组，当前项有明确选中状态。"><div className="aw-business-segments" role="group" aria-label="视图周期">{['日','周','月'].map(item => <button type="button" key={item} aria-pressed={value === item} onClick={() => setValue(item)}>{item}视图</button>)}</div><p className="aw-business-status" role="status">当前：{value}视图</p></BusinessDemo>;
}
