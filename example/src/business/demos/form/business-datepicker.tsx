import ownedStyles0 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { useId, useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Field } from '../../components/Field';
import { DatePicker } from '../../components/DatePicker';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function DatePickerDemo() {
  const { props: demoProps } = useDemoConfig();
  const id = useId();
  const [date, setDate] = useDemoState('state.date', '2026-10-12');
  const [end, setEnd] = useDemoState('state.end', '2026-10-19');
  return <BusinessDemo title="DatePicker · 日期选择" description="定制自然色日历，支持月份过渡、键盘选日和起止区间；日期保存为 YYYY-MM-DD。">
    <div data-ui="aw-business-grid" className={cn("aw-business-grid")}>
      <Field label="开始日期" htmlFor={id} {...demoProps('t0')}><DatePicker id={id} label="开始日期" value={date} rangeStart={date} rangeEnd={end} onChange={value => { setDate(value); if (value && end && value > end) setEnd(value); }} {...demoProps('t1')} /></Field>
      <Field label="结束日期" htmlFor={`${id}-end`} {...demoProps('t2')}><DatePicker id={`${id}-end`} label="结束日期" value={end} min={date || undefined} rangeStart={date} rangeEnd={end} onChange={setEnd} {...demoProps('t3')} /></Field>
    </div><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">区间：{date || '未选'} 至 {end || '未选'}</p>
    <p data-ui="aw-business-status" className={cn("aw-business-status")}>方向键移动日期 · Page Up / Down 切换月份 · Enter 选择 · Esc 关闭</p>
  </BusinessDemo>;
}
