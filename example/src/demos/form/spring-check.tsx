import { useState } from 'react';
import SpringCheck from '../../../.upstream/src/ts-default/Micro/SpringCheck/SpringCheck';
import { palette, DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
import { useDemoConfig, useDemoState } from '../../parameters/DemoConfig';
const cn=(names:string)=>componentClasses(styles,names);

export default function SpringCheckDemo() {
  const { props: demoProps } = useDemoConfig();
  const [checked, setChecked] = useDemoState('state.checked', false);
  return <DemoPanel title="Spring Check · 弹性复选"><div className={cn("aw-micro-stack")}>
    <SpringCheck label="已检查组件交互与响应式" checked={checked} onChange={setChecked} color={palette.ink} fillColor={palette.primary} checkColor={palette.ivory} boxSize={24} boxRadius={7} fontSize={14} ariaLabel="标记演示检查项完成" {...demoProps('t0')} />
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">本地演示检查项：{checked ? '已完成' : '未完成'}</p>
  </div></DemoPanel>;
}
