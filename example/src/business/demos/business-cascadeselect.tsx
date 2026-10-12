// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Field } from '../support';


export default function BusinessCascadeSelectDemo() {
  const groups=[{label:'研发',teams:[{label:'界面组',members:['林清','周远']},{label:'平台组',members:['陈宁','许安']}]},{label:'服务',teams:[{label:'支持组',members:['赵禾','沈言']}]}]; const [department,setDepartment]=useState(''); const [team,setTeam]=useState(''); const [member,setMember]=useState(''); const teams=groups.find(item=>item.label===department)?.teams??[]; const members=teams.find(item=>item.label===team)?.members??[];
  return <BusinessDemo title="CascadeSelect" description="按区域、团队、成员三级联动选择；父级变化会清空不再有效的子级。">
    <div className="aw-business-grid"><Field label="区域"><select className="aw-business-input" value={department} onChange={event=>{setDepartment(event.target.value);setTeam('');setMember('');}}><option value="">请选择区域</option>{groups.map(item=><option key={item.label}>{item.label}</option>)}</select></Field><Field label="团队"><select className="aw-business-input" disabled={!department} value={team} onChange={event=>{setTeam(event.target.value);setMember('');}}><option value="">请选择团队</option>{teams.map(item=><option key={item.label}>{item.label}</option>)}</select></Field><Field label="成员"><select className="aw-business-input" disabled={!team} value={member} onChange={event=>setMember(event.target.value)}><option value="">请选择成员</option>{members.map(label=><option key={label}>{label}</option>)}</select></Field></div><p role="status">{member?`${department} / ${team} / ${member}`:'请选择完整的层级。'}</p>
  </BusinessDemo>;
}
