import { useState } from 'react';
import SquishSwitch from '../../../.upstream/src/ts-default/Micro/SquishSwitch/SquishSwitch';
import { palette, DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
import { useDemoConfig, useDemoState } from '../../parameters/DemoConfig';
const cn=(names:string)=>componentClasses(styles,names);

export default function SquishSwitchDemo() {
  const { props: demoProps } = useDemoConfig();
  const [checked, setChecked] = useDemoState('state.checked', true);
  return <DemoPanel title="Squish Switch · 弹性开关"><div className={cn("aw-micro-stack")}>
    <SquishSwitch checked={checked} onChange={setChecked} label="显示辅助提示" ariaLabel="显示演示辅助提示" trackColor={palette.sage} trackOnColor={palette.primary} thumbColor={palette.ivory} thumbOnColor={palette.ivory} width={52} height={30} {...demoProps('t0')} />
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">辅助提示：{checked ? '开启' : '关闭'}</p>
  </div></DemoPanel>;
}
