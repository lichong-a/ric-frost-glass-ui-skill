// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Components/Dock/Dock';
import { palette } from '../shared/demo-support';
import { useState } from "react";
import { Home, Layers, Folder, Settings } from "lucide-react";
// 真实Dock放大、弹跳、计数徽标与菜单均有对应数据和回调。

export default function DockDemo() {
  const [status, setStatus] = useState("悬停放大，点击图标，右键工作台打开菜单");

  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 400, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <div style={{ width: '100%', height: '100%' }}><div style={{ position: 'relative', height: 330, minHeight: 0, width: '100%' }}><Component items={[{ icon: <Home size={23} />, label: '工作台', active: true, onClick: () => setStatus('打开工作台'), menu: [{ label: '新建视图', onClick: () => setStatus('已选择新建视图') }, { separator: true }, { label: '固定到Dock', checked: true, onClick: () => setStatus('固定状态示例已点击') }] }, { icon: <Layers size={23} />, label: '智能体', badge: 3, onClick: () => setStatus('打开智能体') }, { icon: <Folder size={23} />, label: '资料', onClick: () => setStatus('打开资料') }, { separator: true }, { icon: <Settings size={23} />, label: '设置', onClick: () => setStatus('打开设置') }]}
position="bottom" theme="light" baseItemSize={48} magnification={66}
distance={140} panelHeight={66} gap={10} roundness={0.4} bounce
tiles showLabels showIndicators showBadges badgeColor={palette.primary}
accentColor={palette.primary} /></div><p role="status" aria-live="polite" style={{ margin: '12px 20px', fontSize: 14, color: palette.muted }}>{status}</p></div>
    </div>
  );
}
