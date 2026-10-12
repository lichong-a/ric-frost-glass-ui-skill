// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Components/StaggeredMenu/StaggeredMenu';
import { LOGO, palette } from '../shared/demo-support';
import { useState } from "react";
// 真实分层遮罩与菜单条目错峰动画，限定在预览容器内。

export default function StaggeredMenuDemo() {
  const [status, setStatus] = useState('点击Menu展开导航');
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 480, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'relative', width: '100%', height: 460 }} onClickCapture={event => { const link = (event.target as Element).closest('a'); if (link) { event.preventDefault(); setStatus('已选择：' + link.textContent); } }}><Component position="right" items={['工作台', '智能体', '技能', '设置'].map((label, index) => ({ label, ariaLabel: '选择' + label, link: '#section-' + index }))} socialItems={[]} displaySocials={false} displayItemNumbering logoUrl={LOGO} menuButtonColor={palette.ink} openMenuButtonColor={palette.ink} colors={[palette.sage, palette.sand]} accentColor={palette.primary} closeOnClickAway isFixed={false} onMenuOpen={() => setStatus('分层菜单已展开')} onMenuClose={() => setStatus('分层菜单已收起')} /><p role="status" aria-live="polite" style={{ position: 'absolute', left: 24, bottom: 12, color: palette.muted }}>{status}</p></div>
    </div>
  );
}
