import ownedStyles0 from '../../components/DemoLayout.module.css';
import ownedStyles1 from '../../components/Input.module.css';
import { componentClasses } from '../../class-names';
import { useState, useId } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Field } from '../../components/Field';
import { palette } from '../../../shared/demo-support';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
// 场景：选择主题或对象标记色，仅修改当前对象的本地颜色值。
export default function InputColorDemo() {
  const { props: demoProps } = useDemoConfig();
  const id = useId(); const [color, setColor] = useDemoState<string>('state.color', palette.primary);
  return <BusinessDemo title="InputColor · 颜色选择" description="选择当前对象的标记色，预览立即反映所选值。"><Field label="对象标记色" htmlFor={id} {...demoProps('t0')}><div data-ui="aw-business-row" className={cn("aw-business-row")}><input className={cn('aw-business-color-input')} id={id} type="color" value={color} onChange={event => setColor(event.target.value)} {...demoProps('t1')} /><span style={{ width:70,height:44,borderRadius:10,background:color }} /><code>{color}</code></div></Field></BusinessDemo>;
}
