import ownedStyles0 from '../../components/DemoLayout.module.css';
import ownedStyles1 from '../../components/ToggleSwitch.module.css';
import { componentClasses } from '../../class-names';
import { useState, useId } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
// 场景：立即生效的二元设置；危险或有外部副作用的设置仍需要业务确认。
export default function ToggleSwitchDemo() {
  const { props: demoProps } = useDemoConfig();
  const id = useId(); const [enabled, setEnabled] = useDemoState('state.enabled', true);
  return <BusinessDemo title="ToggleSwitch · 设置开关" description="开关表示当前本地偏好，切换立即更新显示。"><label data-ui="aw-business-choice" className={cn("aw-business-choice")} htmlFor={id}><input data-ui="aw-business-switch" id={id} className={cn("aw-business-switch")} type="checkbox" role="switch" checked={enabled} onChange={event => setEnabled(event.target.checked)} {...demoProps('t0')} />显示详细摘要</label><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">摘要：{enabled ? '详细' : '简洁'}</p></BusinessDemo>;
}
