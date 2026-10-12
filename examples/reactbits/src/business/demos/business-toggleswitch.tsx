import { useState, useId } from 'react';
import { BusinessDemo } from '../support';

// 场景：立即生效的二元设置；危险或有外部副作用的设置仍需要业务确认。
export default function ToggleSwitchDemo() {
  const id = useId(); const [enabled, setEnabled] = useState(true);
  return <BusinessDemo title="ToggleSwitch · 设置开关" description="开关表示当前本地偏好，切换立即更新显示。"><label className="aw-business-choice" htmlFor={id}><input id={id} className="aw-business-switch" type="checkbox" role="switch" checked={enabled} onChange={event => setEnabled(event.target.checked)} />显示详细摘要</label><p className="aw-business-status" role="status">摘要：{enabled ? '详细' : '简洁'}</p></BusinessDemo>;
}
