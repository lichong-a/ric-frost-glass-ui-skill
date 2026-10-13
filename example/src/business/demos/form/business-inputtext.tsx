import ownedStyles0 from '../../components/DemoLayout.module.css';
import ownedStyles1 from '../../components/Input.module.css';
import { componentClasses } from '../../class-names';
import { useState, useId } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Field } from '../../components/Field';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
// 场景：普通短文本字段，明确标签、长度与错误状态。
export default function InputTextDemo() {
  const { props: demoProps } = useDemoConfig();
  const id = useId(); const [value, setValue] = useDemoState('state.value', ''); const [touched, setTouched] = useState(false); const invalid = touched && !value.trim();
  return <BusinessDemo title="InputText · 单行文本" description="标签、必填、字数与错误状态共同组成完整字段。"><Field label="工作空间名称" htmlFor={id} {...demoProps('t0')}><input className={cn('aw-business-input')} id={id} value={value} maxLength={40} required aria-invalid={invalid} aria-describedby={`${id}-hint`} onBlur={() => setTouched(true)} onChange={event => setValue(event.target.value)} {...demoProps('t1')} /></Field><p data-ui="aw-business-status" id={`${id}-hint`} className={cn("aw-business-status")} role="status">{invalid ? '请填写工作空间名称。' : `${value.length}/40 字`}</p></BusinessDemo>;
}
