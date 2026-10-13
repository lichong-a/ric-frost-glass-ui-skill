import { useState } from 'react';
import WakeSlider from '../../../.upstream/src/ts-default/Micro/WakeSlider/WakeSlider';
import { palette, DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
import { useDemoConfig, useDemoState } from '../../parameters/DemoConfig';
const cn=(names:string)=>componentClasses(styles,names);

export default function WakeSliderDemo() {
  const { props: demoProps } = useDemoConfig();
  const [value, setValue] = useDemoState('state.value', 58);
  return <DemoPanel title="Wake Slider · 波纹滑块"><div className={cn("aw-micro-stack")}>
    <div className={cn("aw-micro-field")}><WakeSlider value={value} onChange={setValue} min={0} max={100} step={1} fillColor={palette.primary} trackColor={palette.sage} crestColor={palette.sand} bars={40} height={52} showValue formatValue={number => `${Math.round(number)}%`} ariaLabel="调整演示强度" {...demoProps('t0')} /></div>
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">演示强度：{Math.round(value)}%</p>
  </div></DemoPanel>;
}
