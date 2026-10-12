import { useState } from 'react';
import RubberSegment from '../../.upstream/src/ts-default/Micro/RubberSegment/RubberSegment';
import { palette, DemoPanel } from '../shared/demo-support';
import '../shared/micro-demos.css';

const items = [{ value: 'overview', label: '概览' }, { value: 'activity', label: '活动' }, { value: 'settings', label: '设置' }];
export default function RubberSegmentDemo() {
  const [value, setValue] = useState('overview');
  return <DemoPanel title="Rubber Segment · 弹性分段"><div className="aw-micro-stack">
    <RubberSegment items={items} value={value} onChange={setValue} trackColor={palette.surface} thumbColor={palette.primary} textColor={palette.ink} activeTextColor={palette.ivory} radius={10} equalSlots draggable aria-label="切换演示信息分组" />
    <p className="aw-micro-status" role="status" aria-live="polite">当前分组：{items.find(item => item.value === value)?.label}</p>
  </div></DemoPanel>;
}
