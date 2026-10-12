// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Field } from '../support';


export default function BusinessFieldsetDemo() {
  const [enabled,setEnabled]=useState(true); const [name,setName]=useState('资料助理');
  return <BusinessDemo title="Fieldset" description="用原生字段组组织联系信息；启用开关控制组内输入。">
    <label className="aw-business-row"><input type="checkbox" checked={enabled} onChange={event=>setEnabled(event.target.checked)} />允许编辑</label><fieldset disabled={!enabled} className="aw-business-item"><legend>联系资料</legend><Field label="显示名称"><input className="aw-business-input" value={name} onChange={event=>setName(event.target.value)} /></Field></fieldset><p className="aw-business-status" role="status">当前名称：{name||'未填写'}；{enabled?'可编辑':'已禁用'}。</p>
  </BusinessDemo>;
}
