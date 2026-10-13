import ownedStyles0 from '../../components/DemoLayout.module.css';
import ownedStyles1 from '../../components/Input.module.css';
import { componentClasses } from '../../class-names';
import { useState, useId } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Field } from '../../components/Field';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
// 场景：多行说明、备注和反馈，明确长度与可调整高度。
export default function TextareaDemo() {
  const { props: demoProps } = useDemoConfig();
  const id = useId(); const [value, setValue] = useDemoState('state.value', '');
  return <BusinessDemo title="Textarea · 多行文本" description="适合说明、备注和反馈，提供字数提示。"><Field label="需求说明" htmlFor={id} {...demoProps('t0')}><textarea className={cn('aw-business-input')} id={id} rows={5} maxLength={500} value={value} onChange={event => setValue(event.target.value)} placeholder="描述需要完成的工作" {...demoProps('t1')} /></Field><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">{value.length}/500 字</p></BusinessDemo>;
}
