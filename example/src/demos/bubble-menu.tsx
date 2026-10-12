// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Components/BubbleMenu/BubbleMenu';
import { palette } from '../shared/demo-support';
import { useState } from "react";
// 圆形菜单真实展开和收起；示例链接选择有反馈，不离开预览。

export default function BubbleMenuDemo() {
  const [status, setStatus] = useState('点击右上角展开菜单');
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 460, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'relative', height: 440 }} onClickCapture={event => { const link = (event.target as Element).closest('a'); if (link) { event.preventDefault(); setStatus('已选择：' + link.textContent); } }}><Component logo={<strong style={{ color: palette.ink }}>AW</strong>} items={['工作台', '智能体', '技能', '设置'].map((label, index) => ({ label, href: '#section-' + index, ariaLabel: label, rotation: index % 2 ? 5 : -5, hoverStyles: { bgColor: palette.primary, textColor: palette.ivory } }))} menuAriaLabel="展开或收起示例导航" menuBg={palette.ivory} menuContentColor={palette.ink} useFixedPosition={false} animationDuration={0.45} staggerDelay={0.08} onMenuClick={open => setStatus(open ? '导航已展开' : '导航已收起')} /><p role="status" aria-live="polite" style={{ position: 'absolute', left: 24, bottom: 12, color: palette.muted }}>{status}</p></div>
    </div>
  );
}
