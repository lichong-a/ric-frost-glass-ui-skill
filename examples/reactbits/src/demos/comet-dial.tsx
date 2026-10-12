import { useState } from 'react';
import CometDial from '../../.upstream/src/ts-default/Micro/CometDial/CometDial';
import { palette, DemoPanel } from '../shared/demo-support';
import '../shared/micro-demos.css';

export default function CometDialDemo() {
  const [value, setValue] = useState(48);
  const [committed, setCommitted] = useState(48);
  return <DemoPanel title="Comet Dial · 环形调节"><div className="aw-micro-stack">
    <CometDial value={value} onChange={setValue} onChangeEnd={setCommitted} min={0} max={100} step={1} label="生成强度" unit="%" accent={palette.primary} ink={palette.ink} size={250} momentum={0.7} />
    <p className="aw-micro-hint">拖动或使用键盘调节环形刻度。</p>
    <p className="aw-micro-status" role="status" aria-live="polite">最近确认值：{committed}%</p>
  </div></DemoPanel>;
}
