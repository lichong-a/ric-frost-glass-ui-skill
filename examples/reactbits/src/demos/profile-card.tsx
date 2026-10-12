// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Components/ProfileCard/ProfileCard';
import { LOGO, MEDIA, palette } from '../shared/demo-support';
import { useState } from "react";
// 不用真实个人头像或虚构身份数据；移动端设备方向权限默认不申请。

export default function ProfileCardDemo() {
  const [status, setStatus] = useState("移动指针查看卡片视差，点击下方按钮");

  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 620, position: 'relative', overflow: 'hidden' }}>
      <div style={{ width: '100%', height: '100%' }}><div style={{ height: 550, display: 'grid', placeItems: 'center' }}><Component avatarUrl={MEDIA[2]} miniAvatarUrl={MEDIA[2]} iconUrl={LOGO}
name="Agent Wan" title="智能体协作工作台" handle="agent-wan" status="示例在线"
statusColor={palette.primary} contactText="查看资料" showUserInfo
theme="light" backdropColor={palette.canvas} radius={20} holo={0.18}
glare={0.18} enableTilt tiltStrength={7} parallax={4} enableMobileTilt={false}
onContactClick={() => setStatus('已点击查看资料；此处接入项目自己的详情页')} /></div><p role="status" aria-live="polite" style={{ margin: '12px 20px', fontSize: 14, color: palette.muted }}>{status}</p></div>
    </div>
  );
}
