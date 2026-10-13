import ownedStyles0 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { useId, useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Field } from '../../components/Field';
import { AnimatedSelect } from '../../components/AnimatedSelect';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessCascadeSelectDemo() {
  const { props: demoProps } = useDemoConfig();
  const groups = [{ label: '研发', teams: [{ label: '界面组', members: ['林清', '周远'] }, { label: '平台组', members: ['陈宁', '许安'] }] }, { label: '服务', teams: [{ label: '支持组', members: ['赵禾', '沈言'] }] }];
  const [department, setDepartment] = useDemoState('state.department', '');
  const [team, setTeam] = useDemoState('state.team', '');
  const [member, setMember] = useDemoState('state.member', '');
  const prefix = useId();
  const teams = groups.find(item => item.label === department)?.teams ?? [];
  const members = teams.find(item => item.label === team)?.members ?? [];
  return <BusinessDemo title="CascadeSelect" description="按区域、团队、成员三级联动选择；弹性下拉保持各级状态清晰。">
    <div data-ui="aw-business-grid" className={cn("aw-business-grid")}>
      <Field label="区域" htmlFor={`${prefix}-department`} {...demoProps('t0')}><AnimatedSelect id={`${prefix}-department`} label="区域" placeholder="请选择区域" value={department} options={groups.map(item => item.label)} onChange={value => { setDepartment(value); setTeam(''); setMember(''); }} {...demoProps('t1')} /></Field>
      <Field label="团队" htmlFor={`${prefix}-team`} {...demoProps('t2')}><AnimatedSelect id={`${prefix}-team`} label="团队" placeholder="请选择团队" disabled={!department} value={team} options={teams.map(item => item.label)} onChange={value => { setTeam(value); setMember(''); }} {...demoProps('t3')} /></Field>
      <Field label="成员" htmlFor={`${prefix}-member`} {...demoProps('t4')}><AnimatedSelect id={`${prefix}-member`} label="成员" placeholder="请选择成员" disabled={!team} value={member} options={members} onChange={setMember} {...demoProps('t5')} /></Field>
    </div><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">{member ? `${department} / ${team} / ${member}` : '请选择完整的层级。'}</p>
  </BusinessDemo>;
}
