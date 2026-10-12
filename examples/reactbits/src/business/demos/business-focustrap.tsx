// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button, Field } from '../support';
import { FocusRegion } from '../primitives';


export default function BusinessFocusTrapDemo() {
  const [active,setActive]=useState(false);
  return <BusinessDemo title="FocusTrap" description="开启后Tab在示例内循环，Escape或结束按钮退出并返回开启按钮。">
    <Button disabled={active} onClick={()=>setActive(true)}>开启焦点约束</Button><FocusRegion active={active} onExit={()=>setActive(false)}><p role="status">焦点约束：{active?'已开启':'未开启'}</p><Field label="示例名称"><input className="aw-business-input" defaultValue="资料助理" /></Field><div className="aw-business-row"><Button variant="secondary">查看资料</Button><Button disabled={!active} onClick={()=>setActive(false)}>结束约束</Button></div></FocusRegion>
  </BusinessDemo>;
}
