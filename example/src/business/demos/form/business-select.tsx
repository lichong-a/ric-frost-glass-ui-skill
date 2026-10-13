import ownedStyles0 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { useId, useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Field } from '../../components/Field';
import { AnimatedSelect } from '../../components/AnimatedSelect';
import { SpringCheckbox } from '../../components/SpringCheckbox';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function SelectDemo() {
  const { props: demoProps } = useDemoConfig();
  const id = useId();
  const options = ['设计工作室', '研发团队', '运营空间', '个人空间'];
  const [value, setValue] = useDemoState('state.value', options[0]);
  const [multiple, setMultiple] = useDemoState<string[]>('state.multiple', [options[0]]);
  return <BusinessDemo title="Select · 下拉选择" description="弹性展开的候选列表，单选与多选状态由调用方维护。">
    <Field label="默认空间" htmlFor={id} {...demoProps('t0')}><AnimatedSelect id={id} label="默认空间" value={value} options={options} onChange={setValue} {...demoProps('t1')} /></Field>
    <fieldset className={cn('aw-business-fieldset')}><legend>同时参与的空间</legend>{options.map(item => <label data-ui="aw-business-choice" className={cn("aw-business-choice")} key={item}><SpringCheckbox checked={multiple.includes(item)} onChange={event => setMultiple(current => event.target.checked ? [...current, item] : current.filter(entry => entry !== item))} />{item}</label>)}</fieldset>
    <p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">默认：{value}；参与：{multiple.join('、') || '无'}</p>
  </BusinessDemo>;
}
