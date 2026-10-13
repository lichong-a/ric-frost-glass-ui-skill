// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Components/LineSidebar/LineSidebar';
import { palette } from '../../shared/demo-support';
import { useState } from "react";
import { useDemoConfig } from '../../parameters/DemoConfig';
// 静态菜单结构与指针距离位移分别保留，不替换后台主导航。

export default function LineSidebarDemo() {
  const { props: demoProps } = useDemoConfig();
  const [status, setStatus] = useState("悬停查看距离效果，点击选择导航项");

  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 400, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <div style={{ width: '100%', height: '100%' }}><div style={{ minHeight: 320, width: 'min(100%, 360px)', margin: '0 auto', padding: 24 }}><Component items={['工作台', '智能体', '技能', '工作流', '设置']}
accentColor={palette.primary} textColor={palette.muted} markerColor={palette.sage}
showIndex showMarker proximityRadius={100} maxShift={16} markerLength={42}
markerGap={8} tickScale={0.6} scaleTick itemGap={16} fontSize={1.1}
smoothing={120} defaultActive={0}
onItemClick={(_index, label) => setStatus('已选择：' + label)} {...demoProps('t0')} /></div><p role="status" aria-live="polite" style={{ margin: '12px 20px', fontSize: 14, color: palette.muted }}>{status}</p></div>
    </div>
  );
}
