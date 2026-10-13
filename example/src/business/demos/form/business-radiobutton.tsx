import ownedStyles0 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { SpringRadio } from '../../components/SpringRadio';
import { useState, useId } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
// 场景：少量互斥选项且需要同时看到候选项时使用单选组。
export default function RadioButtonDemo() {
  const options = ['仅当前空间','所有参与空间','全部空间']; const [value, setValue] = useDemoState('state.value', options[0]); const id = useId();
  return <BusinessDemo title="RadioButton · 单选组" description="选项互斥，用同一 name 保留原生方向键操作。"><fieldset className={cn('aw-business-fieldset')}><legend>查看范围</legend>{options.map(item => <label data-ui="aw-business-choice" key={item} className={cn("aw-business-choice")}><SpringRadio name={id} value={item} checked={value === item} onChange={() => setValue(item)} />{item}</label>)}</fieldset><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">范围：{value}</p></BusinessDemo>;
}
