// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Components/CardNav/CardNav';
import { LOGO, palette } from '../../shared/demo-support';
import { useState } from "react";
import { useDemoConfig } from '../../parameters/DemoConfig';
// 保留真实卡片导航展开与键盘菜单按钮，链接在本示例中更新结果提示。

export default function CardNavDemo() {
  const { props: demoProps } = useDemoConfig();
  const [status, setStatus] = useState('点击菜单按钮展开三个导航卡片');
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 400, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <div style={{ position: 'relative', width: '100%', maxWidth: 800, height: 420 }} onClickCapture={event => { const target = event.target as Element; const link = target.closest('a'); if (link) { event.preventDefault(); setStatus('已选择：' + link.textContent); } else if (target.closest('.card-nav-cta-button')) { setStatus('开始使用按钮已点击'); } }}><Component logo={LOGO} logoAlt="Agent Wan" items={[{ label: '构建', bgColor: palette.canvas, textColor: palette.ink, links: [{ label: '智能体', href: '#agents', ariaLabel: '选择智能体' }, { label: '工作流', href: '#flows', ariaLabel: '选择工作流' }] }, { label: '资源', bgColor: palette.sage, textColor: palette.ink, links: [{ label: '技能', href: '#skills', ariaLabel: '选择技能' }, { label: '知识', href: '#knowledge', ariaLabel: '选择知识' }] }, { label: '管理', bgColor: palette.ivory, textColor: palette.ink, links: [{ label: '空间', href: '#spaces', ariaLabel: '选择空间' }, { label: '设置', href: '#settings', ariaLabel: '选择设置' }] }]} baseColor={palette.ivory} menuColor={palette.ink} buttonBgColor={palette.primary} buttonTextColor={palette.ivory} ease="power3.out" {...demoProps('t0')} /><p role="status" aria-live="polite" style={{ position: 'absolute', left: 24, bottom: 12, color: palette.muted }}>{status}</p></div>
    </div>
  );
}
