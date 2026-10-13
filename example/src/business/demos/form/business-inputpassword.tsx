import ownedStyles0 from '../../components/DemoLayout.module.css';
import ownedStyles1 from '../../components/Input.module.css';
import { componentClasses } from '../../class-names';
import { useState, useId } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { Field } from '../../components/Field';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
// 场景：敏感文本输入，提供显隐切换与本地强度提示，不记录或持久化值。
export default function InputPasswordDemo() {
  const { props: demoProps } = useDemoConfig();
  const id = useId(); const [value, setValue] = useDemoState('state.value', ''); const [visible, setVisible] = useDemoState('state.visible', false); const strength = [value.length >= 8,/[A-Z]/.test(value),/[0-9]/.test(value),/[^a-zA-Z0-9]/.test(value)].filter(Boolean).length;
  return <BusinessDemo title="InputPassword · 密码输入" description="可切换显隐，强度提示辅助理解规则。"><Field label="示例密码" htmlFor={id} {...demoProps('t0')}><div data-ui="aw-business-row" className={cn("aw-business-row")}><input className={cn('aw-business-input')} id={id} style={{ flex:1,minWidth:180 }} type={visible ? 'text' : 'password'} autoComplete="new-password" maxLength={128} value={value} onChange={event => setValue(event.target.value)} {...demoProps('t1')} /><Button variant="secondary" aria-pressed={visible} onClick={() => setVisible(current => !current)} {...demoProps('t2')}>{visible ? '隐藏' : '显示'}</Button></div></Field><meter min={0} max={4} value={strength} aria-label="密码强度" {...demoProps('t3')} /><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">本地强度：{['未输入','较弱','一般','较好','较强'][value ? strength : 0]}</p></BusinessDemo>;
}
