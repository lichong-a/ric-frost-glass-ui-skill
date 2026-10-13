import ownedStyles0 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { SpringCheckbox } from '../../components/SpringCheckbox';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
// 场景：从同一组候选中选择多项，使用 fieldset 与 legend 表达组含义。
export default function CheckboxGroupDemo() {
  const options = ['站内通知','邮件摘要','每周报告']; const [selected, setSelected] = useDemoState<string[]>('state.selected', ['站内通知']);
  return <BusinessDemo title="CheckboxGroup · 复选组" description="多个选项可以独立组合，适合权限或通知偏好。"><fieldset className={cn('aw-business-fieldset')}><legend>需要的通知渠道</legend>{options.map(item => <label data-ui="aw-business-choice" key={item} className={cn("aw-business-choice")}><SpringCheckbox checked={selected.includes(item)} onChange={event => setSelected(value => event.target.checked ? [...value,item] : value.filter(entry => entry !== item))} />{item}</label>)}</fieldset><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">已选：{selected.join('、') || '无'}</p></BusinessDemo>;
}
