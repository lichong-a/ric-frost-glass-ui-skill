import ownedStyles0 from '../../components/DemoLayout.module.css';
import ownedStyles1 from '../../components/Input.module.css';
import { componentClasses } from '../../class-names';
import { useRef, useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { Field } from '../../components/Field';
import { ToggleButton } from '../../components/ToggleButton';
import { FocusRegion } from '../../components/FocusRegion';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessFocusTrapDemo() {
  const { props: demoProps } = useDemoConfig();
  const [active, setActive] = useDemoState('state.active', false);
  const trigger = useRef<HTMLButtonElement>(null);
  return <BusinessDemo title="FocusTrap" description="开启后 Tab 在示例内循环，Escape 或结束按钮退出，并返回开启按钮。">
    <div data-ui="aw-business-row" className={cn("aw-business-row")}><ToggleButton ref={trigger} pressed={active} disabled={active} onPressedChange={setActive}>{active ? '焦点约束已开启' : '开启焦点约束'}</ToggleButton></div>
    <FocusRegion active={active} onExit={() => setActive(false)} returnFocusRef={trigger}>
      <p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">焦点约束：{active ? '已开启' : '未开启'}</p>
      <Field label="示例名称" {...demoProps('t2')}><input data-ui="aw-business-input" className={cn("aw-business-input")} defaultValue="资料助理" {...demoProps('t3')} /></Field>
      <div data-ui="aw-business-row" className={cn("aw-business-row")}><Button variant="secondary" {...demoProps('t4')}>查看资料</Button><ToggleButton pressed={active} disabled={!active} onPressedChange={setActive}>结束约束</ToggleButton></div>
    </FocusRegion>
  </BusinessDemo>;
}
