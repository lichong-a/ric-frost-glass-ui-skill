import { useState } from 'react';
import JellyRadio from '../../../.upstream/src/ts-default/Micro/JellyRadio/JellyRadio';
import { palette, DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
import { useDemoConfig, useDemoState } from '../../parameters/DemoConfig';
const cn=(names:string)=>componentClasses(styles,names);

const items = [{ value: 'all', label: '全部' }, { value: 'enabled', label: '已启用' }, { value: 'draft', label: '草稿' }];
export default function JellyRadioDemo() {
  const { props: demoProps } = useDemoConfig();
  const [value, setValue] = useDemoState('state.value', 'all');
  return <DemoPanel title="Jelly Radio · 弹性单选"><div className={cn("aw-micro-stack")}>
    <JellyRadio items={items} value={value} onChange={setValue} ariaLabel="按技能状态筛选" chipColor={palette.surface} activeColor={palette.primary} textColor={palette.ink} activeTextColor={palette.ivory} radius={10} {...demoProps('t0')} />
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">当前筛选：{items.find(item => item.value === value)?.label}</p>
  </div></DemoPanel>;
}
