import { useState } from 'react';
import RubberSegment from '../../../.upstream/src/ts-default/Micro/RubberSegment/RubberSegment';
import { palette, DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
import { useDemoConfig, useDemoState } from '../../parameters/DemoConfig';
const cn=(names:string)=>componentClasses(styles,names);

const items = [{ value: 'overview', label: '概览' }, { value: 'activity', label: '活动' }, { value: 'settings', label: '设置' }];
export default function RubberSegmentDemo() {
  const { props: demoProps } = useDemoConfig();
  const [value, setValue] = useDemoState('state.value', 'overview');
  return <DemoPanel title="Rubber Segment · 弹性分段"><div className={cn("aw-micro-stack")}>
    <RubberSegment items={items} value={value} onChange={setValue} trackColor={palette.surface} thumbColor={palette.primary} textColor={palette.ink} activeTextColor={palette.ivory} radius={10} equalSlots draggable aria-label="切换演示信息分组" {...demoProps('t0')} />
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">当前分组：{items.find(item => item.value === value)?.label}</p>
  </div></DemoPanel>;
}
