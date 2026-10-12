import { useState } from 'react';
import BellToggle from '../../.upstream/src/ts-default/Micro/BellToggle/BellToggle';
import { palette, DemoPanel } from '../shared/demo-support';
import '../shared/micro-demos.css';

export default function BellToggleDemo() {
  const [pressed, setPressed] = useState(false);
  return <DemoPanel title="Bell Toggle · 通知开关"><div className="aw-micro-stack">
    <BellToggle pressed={pressed} onChange={setPressed} offLabel="开启通知" onLabel="通知已开启" color={palette.ink} background={palette.surface} onColor={palette.ivory} onBackground={palette.primary} badge count={3} badgeColor={palette.terra} badgeTextColor={palette.ivory} radius={12} />
    <p className="aw-micro-status" role="status" aria-live="polite">演示通知：{pressed ? '已开启' : '已关闭'}</p>
  </div></DemoPanel>;
}
