// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Components/SpotlightCard/SpotlightCard';
import { palette } from '../shared/demo-support';
import { useState } from "react";
// 高光层保留真实交互，业务按钮可正常收到点击。

export default function SpotlightCardDemo() {
  const [status, setStatus] = useState("指针移近卡片，观察光斑与细边缘");

  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 400, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <div style={{ width: '100%', height: '100%' }}><div style={{ height: 320, display: 'grid', placeItems: 'center', padding: 24 }}><Component theme="light" spotlightColor={palette.sage} intensity={0.12}
spotlightSize={200} softness={0.8} shape="circle" borderGlow={0.25}
proximity={70} smoothing={0.3} grain={0} ambient={false} flare
style={{ width: 'min(100%, 380px)', padding: 28, borderRadius: 20, color: palette.ink }}><h3>知识检索工作流</h3><p>6 个步骤 · 可重复执行</p><button type="button" className="aw-button" data-variant="primary" onClick={() => setStatus("工作流运行按钮已点击")}>运行示例</button></Component></div><p role="status" aria-live="polite" style={{ margin: '12px 20px', fontSize: 14, color: palette.muted }}>{status}</p></div>
    </div>
  );
}
