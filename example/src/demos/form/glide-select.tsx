import { useState } from 'react';
import GlideSelect from '../../../.upstream/src/ts-default/Micro/GlideSelect/GlideSelect';
import { palette, DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
import { useDemoConfig, useDemoState } from '../../parameters/DemoConfig';
const cn=(names:string)=>componentClasses(styles,names);

const options = [{ value: 'design', label: '设计工作空间', tag: '当前' }, { value: 'research', label: '研究工作空间', tag: '示例' }, { value: 'delivery', label: '交付工作空间', tag: '示例' }];
export default function GlideSelectDemo() {
  const { props: demoProps } = useDemoConfig();
  const [value, setValue] = useDemoState('state.value', 'design');
  return <DemoPanel title="Glide Select · 平滑选择"><div className={cn("aw-micro-stack")} style={{ minHeight: 360, paddingTop: 40 }}>
    <GlideSelect options={options} value={value} onChange={setValue} ariaLabel="选择演示工作空间" showTags accentColor={palette.primary} surfaceColor={palette.ivory} highlightColor={palette.sage} textColor={palette.ink} radius={10} menuWidth={280} {...demoProps('t0')} />
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">当前：{options.find(item => item.value === value)?.label}</p>
  </div></DemoPanel>;
}
