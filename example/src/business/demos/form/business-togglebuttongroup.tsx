import ownedStyles0 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { SegmentedControl } from '../../components/SegmentedControl';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function ToggleButtonGroupDemo() {
  const { props: demoProps } = useDemoConfig();
  const options = ['进行中', '已完成', '已收藏'];
  const [selected, setSelected] = useDemoState<string[]>('state.selected', ['进行中']);
  return <BusinessDemo title="ToggleButtonGroup · 按钮切换组" description="多个筛选条件可组合，每个选中背景和勾选标记以弹性过渡呈现。">
    <SegmentedControl label="任务筛选" items={options.map(value => ({ value, label: value }))} values={selected}
      onChange={item => setSelected(current => current.includes(item) ? current.filter(value => value !== item) : [...current, item])} {...demoProps('t0')} />
    <p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">筛选：{selected.join('、') || '无'}</p>
  </BusinessDemo>;
}
