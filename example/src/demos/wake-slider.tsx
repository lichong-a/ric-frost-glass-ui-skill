import { useState } from 'react';
import WakeSlider from '../../.upstream/src/ts-default/Micro/WakeSlider/WakeSlider';
import { palette, DemoPanel } from '../shared/demo-support';
import '../shared/micro-demos.css';

export default function WakeSliderDemo() {
  const [value, setValue] = useState(58);
  return <DemoPanel title="Wake Slider · 波纹滑块"><div className="aw-micro-stack">
    <div className="aw-micro-field"><WakeSlider value={value} onChange={setValue} min={0} max={100} step={1} fillColor={palette.primary} trackColor={palette.sage} crestColor={palette.sand} bars={40} height={52} showValue formatValue={number => `${Math.round(number)}%`} ariaLabel="调整演示强度" /></div>
    <p className="aw-micro-status" role="status" aria-live="polite">演示强度：{Math.round(value)}%</p>
  </div></DemoPanel>;
}
