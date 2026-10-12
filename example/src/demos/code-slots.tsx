import { useState } from 'react';
import CodeSlots, { type CodeSlotsStatus } from '../../.upstream/src/ts-default/Micro/CodeSlots/CodeSlots';
import { palette, DemoPanel } from '../shared/demo-support';
import '../shared/micro-demos.css';

export default function CodeSlotsDemo() {
  const [value, setValue] = useState('');
  const [status, setStatus] = useState<CodeSlotsStatus>('idle');
  return <DemoPanel title="Code Slots · 验证码输入"><div className="aw-micro-stack">
    <p className="aw-micro-hint">输入演示码 246810 查看成功态，其他完整数字触发错误态。</p>
    <CodeSlots length={6} value={value} status={status} onChange={code => { setValue(code); setStatus('idle'); }} onComplete={code => setStatus(code === '246810' ? 'success' : 'error')} autoFocus={false} ariaLabel="六位演示验证码" accentColor={palette.primary} inkColor={palette.ink} slotColor={palette.surface} digitColor={palette.ink} dangerColor={palette.terra} slotSize={44} gap={8} radius={10} />
    <div className="aw-micro-controls"><button type="button" onClick={() => { setValue(''); setStatus('idle'); }}>清空重试</button></div>
    <p className="aw-micro-status" role="status" aria-live="polite">{status === 'success' ? '演示校验成功' : status === 'error' ? '演示码不匹配，请重试' : `已输入 ${value.length} / 6 位`}</p>
  </div></DemoPanel>;
}
