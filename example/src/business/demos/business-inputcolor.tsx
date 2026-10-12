import { useState, useId } from 'react';
import { BusinessDemo, Field } from '../support';
import { palette } from '../../shared/demo-support';

// 场景：选择主题或对象标记色，仅修改当前对象的本地颜色值。
export default function InputColorDemo() {
  const id = useId(); const [color, setColor] = useState<string>(palette.primary);
  return <BusinessDemo title="InputColor · 颜色选择" description="选择当前对象的标记色，预览立即反映所选值。"><Field label="对象标记色" htmlFor={id}><div className="aw-business-row"><input id={id} type="color" value={color} onChange={event => setColor(event.target.value)} /><span style={{ width:70,height:44,borderRadius:10,background:color }} /><code>{color}</code></div></Field></BusinessDemo>;
}
