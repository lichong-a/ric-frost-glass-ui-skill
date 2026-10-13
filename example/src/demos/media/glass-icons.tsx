// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Components/GlassIcons/GlassIcons';
import { palette } from '../../shared/demo-support';
import { useState } from "react";
import { Folder, Layers, FileText, Settings } from "lucide-react";
import { useDemoConfig } from '../../parameters/DemoConfig';
// 图标使用线性Lucide图形；玻璃材质真实计算，颜色来自规范。
// 此演示需要可用WebGL上下文；不支持时应显示能力提示，不声称效果已运行。

export default function GlassIconsDemo() {
  const { props: demoProps } = useDemoConfig();
  const [status, setStatus] = useState("悬停图标并点击，查看真实玻璃折射与结果");

  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 400, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <div style={{ width: '100%', height: '100%' }}><div style={{ minHeight: 300, display: 'grid', placeItems: 'center', padding: 24 }}><Component items={[{ icon: <Folder size={24} />, color: palette.sage, label: '资料' }, { icon: <Layers size={24} />, color: palette.primary, label: '智能体' }, { icon: <FileText size={24} />, color: palette.sand, label: '规范' }, { icon: <Settings size={24} />, color: palette.primary, label: '设置' }].map(item => ({ ...item, onClick: () => setStatus('点击图标：' + item.label) }))}
size={68} gap={28} columns={4} roundness={0.5} refraction={0.45}
bevel={0.4} dispersion={0} frost={0.45} shine={0.45} tint={palette.ivory}
tintOpacity={0.3} iconColor={palette.ivory} plate="tilt" tilt={18}
spread={0.3} hover="lift" parallax={0.35} labels="always" theme="light" {...demoProps('t0')} /></div><p role="status" aria-live="polite" style={{ margin: '12px 20px', fontSize: 14, color: palette.muted }}>{status}</p></div>
    </div>
  );
}
