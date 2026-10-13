import ownedStyles0 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { SpringCheckbox } from '../../components/SpringCheckbox';
import { useState, useId } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
// 场景：独立布尔选项；完成任务动效可选择已有 Spring Check。
export default function CheckboxDemo() {
  const id = useId(); const [checked, setChecked] = useDemoState('state.checked', false);
  return <BusinessDemo title="Checkbox · 复选框" description="独立选项允许开关，选中状态由调用方维护。"><label data-ui="aw-business-choice" className={cn("aw-business-choice")}><SpringCheckbox id={id} checked={checked} onChange={event => setChecked(event.target.checked)} />接收任务完成通知</label><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">通知：{checked ? '开启' : '关闭'}</p></BusinessDemo>;
}
