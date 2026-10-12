import { useState } from 'react';
import WarmTooltip, { WarmTooltipGroup } from '../../.upstream/src/ts-default/Micro/WarmTooltip/WarmTooltip';
import { palette, DemoPanel } from '../shared/demo-support';
import '../shared/micro-demos.css';

const actions = [{ label: '复制', content: '复制当前组件配置', shortcut: '⌘ C' }, { label: '收藏', content: '加入本地演示收藏', shortcut: '⌘ D' }, { label: '检查', content: '查看组件验收要求', shortcut: '⌘ I' }];
export default function WarmTooltipDemo() {
  const [message, setMessage] = useState('悬停或聚焦一个操作，然后移到相邻操作。');
  const [warm, setWarm] = useState(false);
  return <DemoPanel title="Warm Tooltip · 连续提示"><div className="aw-micro-stack">
    <WarmTooltipGroup delay={600} warmWindow={1200} onWarmChange={setWarm}><div className="aw-micro-row">{actions.map(item => <WarmTooltip key={item.label} content={item.content} shortcut={item.shortcut} surfaceColor={palette.primary} inkColor={palette.ivory} radius={10} side="top"><button type="button" className="aw-micro-action" onClick={() => setMessage(`已触发本地演示操作：${item.label}`)}>{item.label}</button></WarmTooltip>)}</div></WarmTooltipGroup>
    <p className="aw-micro-status" role="status" aria-live="polite">{message} 提示组：{warm ? '连续浏览中' : '等待首次提示'}</p>
  </div></DemoPanel>;
}
