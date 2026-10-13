import ownedStyles0 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { SegmentedControl } from '../../components/SegmentedControl';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function ButtonGroupDemo() {
  const { props: demoProps } = useDemoConfig();
  const [value, setValue] = useDemoState('state.value', '周');
  return <BusinessDemo title="ButtonGroup · 按钮组" description="相关动作放在一组，选中背景像 Rubber Segment 一样自然滑动。">
    <SegmentedControl label="视图周期" items={['日', '周', '月'].map(item => ({ value: item, label: `${item}视图` }))} value={value} onChange={setValue} {...demoProps('t0')} />
    <p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">当前：{value}视图</p>
  </BusinessDemo>;
}
