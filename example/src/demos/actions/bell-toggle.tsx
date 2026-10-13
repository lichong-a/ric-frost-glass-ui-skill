import { useState } from 'react';
import BellToggle from '../../../.upstream/src/ts-default/Micro/BellToggle/BellToggle';
import { palette, DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
import { useDemoConfig, useDemoState } from '../../parameters/DemoConfig';
const cn=(names:string)=>componentClasses(styles,names);

export default function BellToggleDemo() {
  const { props: demoProps } = useDemoConfig();
  const [pressed, setPressed] = useDemoState('state.pressed', false);
  return <DemoPanel title="Bell Toggle · 通知开关"><div className={cn("aw-micro-stack")}>
    <BellToggle pressed={pressed} onChange={setPressed} offLabel="开启通知" onLabel="通知已开启" color={palette.ink} background={palette.surface} onColor={palette.ivory} onBackground={palette.primary} badge count={3} badgeColor={palette.terra} badgeTextColor={palette.ivory} radius={12} {...demoProps('t0')} />
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">演示通知：{pressed ? '已开启' : '已关闭'}</p>
  </div></DemoPanel>;
}
