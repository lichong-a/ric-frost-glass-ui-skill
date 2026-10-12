import { useState } from 'react';
import HoldButton from '../../.upstream/src/ts-default/Micro/HoldButton/HoldButton';
import { palette, DemoPanel } from '../shared/demo-support';
import '../shared/micro-demos.css';

export default function HoldButtonDemo() {
  const [message, setMessage] = useState('按住按钮约 1 秒完成本地模拟操作。');
  return <DemoPanel title="Hold Button · 长按确认"><div className="aw-micro-stack">
    <HoldButton doneLabel="确认完成" backgroundColor={palette.surface} fillColor={palette.primary} textColor={palette.ink} fillTextColor={palette.ivory} holdTime={1000} radius={10} wave glow={false} resetAfter={1800} onHold={() => setMessage('本地模拟操作已确认。')} onTap={() => setMessage('按下时间不足，请继续按住。')}>按住确认</HoldButton>
    <p className="aw-micro-status" role="status" aria-live="polite">{message}</p>
  </div></DemoPanel>;
}
