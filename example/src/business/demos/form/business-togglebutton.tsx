import ownedStyles0 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { ToggleButton } from '../../components/ToggleButton';
import { useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function ToggleButtonDemo() {
  const [enabled, setEnabled] = useDemoState('state.enabled', false);
  return <BusinessDemo title="ToggleButton · 切换按钮" description="弹性图标与按压反馈表达开关状态，保留 aria-pressed。">
    <ToggleButton pressed={enabled} onPressedChange={setEnabled}>{enabled ? '已关注' : '关注此空间'}</ToggleButton>
    <p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">关注：{enabled ? '开启' : '关闭'}</p>
  </BusinessDemo>;
}
