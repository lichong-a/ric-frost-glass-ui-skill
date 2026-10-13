import { useState } from 'react';
import SloshGauge from '../../../.upstream/src/ts-default/Micro/SloshGauge/SloshGauge';
import { palette, DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
import { useDemoConfig, useDemoState } from '../../parameters/DemoConfig';
const cn=(names:string)=>componentClasses(styles,names);

export default function SloshGaugeDemo() {
  const { props: demoProps } = useDemoConfig();
  const [value, setValue] = useDemoState('state.value', 62);
  return <DemoPanel title="Slosh Gauge · 液体刻度"><div className={cn("aw-micro-stack")}>
    <SloshGauge value={value} onChange={setValue} interactive showValue liquidColor={palette.primary} glassColor={palette.surface} width={110} height={220} radius={20} unit="%" ariaLabel="调节示例容量" {...demoProps('t0')} />
    <label className={cn("aw-micro-field")}>示例容量 {Math.round(value)}%<input type="range" min="0" max="100" step="1" value={value} onChange={event => setValue(Number(event.target.value))} {...demoProps('t1')} /></label>
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">当前容量：{Math.round(value)}%</p>
  </div></DemoPanel>;
}
