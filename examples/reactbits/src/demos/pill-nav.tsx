// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Components/PillNav/PillNav';
import { LOGO, palette } from '../shared/demo-support';
import { MemoryRouter, useLocation } from "react-router-dom";
// MemoryRouter提供真实路由上下文；activeHref来自useLocation，不使用固定选中项。

export default function PillNavDemo() {
  function RoutedExample() { const location = useLocation(); return <div style={{ padding: 28, color: palette.ink }}><Component logo={LOGO} logoAlt="Agent Wan" items={[{ label: '工作台', href: '/overview' }, { label: '智能体', href: '/agents' }, { label: '技能', href: '/skills' }, { label: '设置', href: '/settings' }]} activeHref={location.pathname} baseColor={palette.primary} pillColor={palette.ivory} hoveredPillTextColor={palette.ivory} pillTextColor={palette.ink} ease="power2.out" /><p role="status" style={{ paddingTop: 190, color: palette.muted }}>当前示例路由：{location.pathname}</p></div>; }
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 400, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <MemoryRouter initialEntries={["/overview"]}><RoutedExample /></MemoryRouter>
    </div>
  );
}
