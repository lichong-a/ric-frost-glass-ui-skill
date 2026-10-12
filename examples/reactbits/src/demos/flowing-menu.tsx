// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Components/FlowingMenu/FlowingMenu';
import { LABELS, MEDIA, palette } from '../shared/demo-support';
import { useState } from "react";
// 悬停启动真实图文跑马灯，示例点击更新本地状态。

export default function FlowingMenuDemo() {
  const [status, setStatus] = useState('悬停菜单项，点击选择');
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 440, position: 'relative', overflow: 'hidden' }}>
      <div style={{ height: 420 }} onClickCapture={event => { const link = (event.target as Element).closest('a'); if (link) { event.preventDefault(); setStatus('已选择：' + link.textContent?.trim().split(/\s+/)[0]); } }}><div style={{ height: 350 }}><Component items={LABELS.slice(0, 4).map((text, index) => ({ link: '#scene-' + index, text, image: MEDIA[index] }))} speed={24} textColor={palette.ink} bgColor={palette.ivory} marqueeBgColor={palette.sage} marqueeTextColor={palette.ink} borderColor={palette.canvas} /></div><p role="status" aria-live="polite" style={{ color: palette.muted, padding: '0 20px' }}>{status}</p></div>
    </div>
  );
}
