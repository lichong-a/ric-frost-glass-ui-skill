// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Components/GooeyNav/GooeyNav';
import { palette } from '../shared/demo-support';
import { useState } from "react";
// 导航选中状态由真实组件维护，事件反馈当前名称。
// 此演示需要可用WebGL上下文；不支持时应显示能力提示，不声称效果已运行。

export default function GooeyNavDemo() {
  const [status, setStatus] = useState("点击切换导航项，观察黏性高亮过渡");

  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 400, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <div style={{ width: '100%', height: '100%' }}><div style={{ height: 300, display: 'grid', placeItems: 'center' }}><Component items={['工作台', '智能体', '技能', '设置'].map(label => ({ label }))}
initialActiveIndex={0} theme="light" size="md" frame color={palette.primary}
activeTextColor={palette.ivory} colors={[palette.primary, palette.sage, palette.sand]}
particleCount={8} spread={28} animationTime={450} timeVariance={120}
gooeyness={0.4} wobble={0.3} hoverEffect
onChange={(_index, item) => setStatus('当前导航：' + item.label)} /></div><p role="status" aria-live="polite" style={{ margin: '12px 20px', fontSize: 14, color: palette.muted }}>{status}</p></div>
    </div>
  );
}
