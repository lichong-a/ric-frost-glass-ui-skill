import { useState } from 'react';
import SloshGauge from '../../.upstream/src/ts-default/Micro/SloshGauge/SloshGauge';
import { palette, DemoPanel } from '../shared/demo-support';
import '../shared/micro-demos.css';

export default function SloshGaugeDemo() {
  const [value, setValue] = useState(62);
  return <DemoPanel title="Slosh Gauge · 液体刻度"><div className="aw-micro-stack">
    <SloshGauge value={value} onChange={setValue} interactive showValue liquidColor={palette.primary} glassColor={palette.surface} width={110} height={220} radius={20} unit="%" ariaLabel="调节示例容量" />
    <label className="aw-micro-field">示例容量 {Math.round(value)}%<input type="range" min="0" max="100" step="1" value={value} onChange={event => setValue(Number(event.target.value))} /></label>
    <p className="aw-micro-status" role="status" aria-live="polite">当前容量：{Math.round(value)}%</p>
  </div></DemoPanel>;
}
