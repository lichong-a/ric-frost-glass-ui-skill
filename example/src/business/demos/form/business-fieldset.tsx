import ownedStyles0 from '../../components/DemoLayout.module.css';
import ownedStyles1 from '../../components/Input.module.css';
import { componentClasses } from '../../class-names';
import { SpringCheckbox } from '../../components/SpringCheckbox';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Field } from '../../components/Field';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessFieldsetDemo() {
  const { props: demoProps } = useDemoConfig();
  const [enabled,setEnabled]=useDemoState('state.enabled', true); const [name,setName]=useDemoState('state.name', '资料助理');
  return <BusinessDemo title="Fieldset" description="用原生字段组组织联系信息；启用开关控制组内输入。">
    <label data-ui="aw-business-row" className={cn("aw-business-row")}><SpringCheckbox checked={enabled} onChange={event=>setEnabled(event.target.checked)} />允许编辑</label><fieldset data-ui="aw-business-item" disabled={!enabled} className={cn("aw-business-item aw-business-animated-fieldset")}><legend>联系资料</legend><Field label="显示名称" {...demoProps('t1')}><input data-ui="aw-business-input" className={cn("aw-business-input")} value={name} onChange={event=>setName(event.target.value)} /></Field></fieldset><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">当前名称：{name||'未填写'}；{enabled?'可编辑':'已禁用'}。</p>
  </BusinessDemo>;
}
