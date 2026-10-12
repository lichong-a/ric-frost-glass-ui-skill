// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button } from '../support';


export default function BusinessStyleClassDemo() {
  const [selected,setSelected]=useState(false);
  return <BusinessDemo title="StyleClass" description="通过React切换局部CSS类，应用选中皮肤并保持可访问状态一致。">
    <Button variant="secondary" aria-pressed={selected} onClick={()=>setSelected(value=>!value)}>切换强调样式</Button><article className={`aw-business-item${selected?' aw-business-selected':''}`}><h3>资料整理</h3><p>当前局部类：{selected?'aw-business-selected':'默认阅读面'}</p></article>
  </BusinessDemo>;
}
