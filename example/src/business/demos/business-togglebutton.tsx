import { useState } from 'react';
import { BusinessDemo, Button } from '../support';

// 场景：用按钮表达一个可切换的本地布尔状态。
export default function ToggleButtonDemo() {
  const [enabled, setEnabled] = useState(false);
  return <BusinessDemo title="ToggleButton · 切换按钮" description="按钮呈现当前开关状态，并使用 aria-pressed。"><Button variant={enabled ? 'primary' : 'secondary'} aria-pressed={enabled} onClick={() => setEnabled(value => !value)}>{enabled ? '已关注' : '关注此空间'}</Button><p className="aw-business-status" role="status">关注：{enabled ? '开启' : '关闭'}</p></BusinessDemo>;
}
